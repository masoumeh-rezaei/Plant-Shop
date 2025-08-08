'use client';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { Product } from '@/data/fakeProducts';

type CartItem = {
    productId: string;
    name: string;
    price: number;
    discountPercent: number;
    quantity: number;
    image?: string;
};

type State = { items: CartItem[] };

type Action =
    | { type: 'INIT'; state: State }
    | { type: 'ADD'; item: CartItem; maxStock?: number }
    | { type: 'REMOVE'; productId: string }
    | { type: 'SET_QTY'; productId: string; quantity: number }
    | { type: 'CLEAR' };

const CartContext = createContext<
    | {
    state: State;
    addToCart: (product: Product, qty?: number) => void;
    removeFromCart: (productId: string) => void;
    setQty: (productId: string, quantity: number) => void;
    clear: () => void;
}
    | undefined
>(undefined);

const STORAGE_KEY = 'demo_cart_v1';

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'INIT':
            return action.state;
        case 'ADD': {
            const exists = state.items.find((i) => i.productId === action.item.productId);
            if (exists) {
                return {
                    items: state.items.map((i) =>
                        i.productId === action.item.productId
                            ? { ...i, quantity: Math.min(i.quantity + action.item.quantity, action.maxStock ?? 9999) }
                            : i
                    )
                };
            }
            return { items: [...state.items, action.item] };
        }
        case 'REMOVE':
            return { items: state.items.filter((i) => i.productId !== action.productId) };
        case 'SET_QTY':
            return { items: state.items.map((i) => (i.productId === action.productId ? { ...i, quantity: Math.max(1, action.quantity) } : i)) };
        case 'CLEAR':
            return { items: [] };
        default:
            return state;
    }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { items: [] });

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                dispatch({ type: 'INIT', state: JSON.parse(raw) });
            }
        } catch {}
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {}
    }, [state]);

    function addToCart(product: Product, qty = 1) {
        dispatch({
            type: 'ADD',
            item: {
                productId: product.id,
                name: product.name,
                price: product.price,
                discountPercent: product.discountPercent,
                quantity: Math.min(qty, product.stock),
                image: product.image
            },
            maxStock: product.stock
        });
    }

    function removeFromCart(productId: string) {
        dispatch({ type: 'REMOVE', productId });
    }

    function setQty(productId: string, quantity: number) {
        dispatch({ type: 'SET_QTY', productId, quantity });
    }

    function clear() {
        dispatch({ type: 'CLEAR' });
    }

    return (
        <CartContext.Provider value={{ state, addToCart, removeFromCart, setQty, clear }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
