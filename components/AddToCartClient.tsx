'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/data/fakeProducts';
import toast from 'react-hot-toast';

export default function AddToCartClient({ product }: { product: Product }) {
    const { isAuthenticated } = useAuth();
    const { addToCart, setQty, getItemQuantity, removeFromCart } = useCart();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    const quantity = getItemQuantity(product.id);
    const outOfStock = product.stock <= 0;

    const handleAdd = () => {
        if (!isAuthenticated) {
            const next = encodeURIComponent(pathname);
            router.push(`/auth/login?next=${next}`);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            addToCart(product, 1);
            setLoading(false);
            toast.success(`${product.name} added to cart!`, {
                icon: '🛒',
                style: {
                    borderRadius: '6px',
                    background: '#2c7be5', // classic blue
                    color: '#fff',
                    fontWeight: '600',
                },
            });
        }, 300);
    };

    const handleDecrease = () => {
        if (quantity <= 1) {
            removeFromCart(product.id);
            toast(`${product.name} removed from cart`, {
                icon: '❌',
                style: {
                    borderRadius: '6px',
                    background: '#6c757d', // muted gray
                    color: '#fff',
                    fontWeight: '600',
                },
            });
        } else {
            setQty(product.id, quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < product.stock) {
            setQty(product.id, quantity + 1);
            toast(`${product.name} quantity increased`, {
                icon: '➕',
                style: {
                    borderRadius: '6px',
                    background: '#ade8f4', // classic blue
                    color: '#fff',
                    fontWeight: '600',
                },
            });
        }
    };

    return (
        <div className="mt-4 flex items-center space-x-2">
            {quantity === 0 ? (
                <button
                    onClick={handleAdd}
                    disabled={loading || outOfStock}
                    className={`px-5 py-2  w-full rounded border font-semibold transition-transform duration-300
            ${
                        outOfStock
                            ? 'bg-gray-300 cursor-not-allowed text-gray-600 border-gray-300 dark:bg-transparent dark:text-gray-400 dark:border-gray-700'
                            : 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100 active:scale-95 dark:bg-transparent dark:text-gray-200 dark:border-gray-600 dark:hover:bg-emerald-950'
                    }`}
                >
                    {outOfStock ? 'Out of stock' : loading ? 'Adding...' : 'Add to Cart'}
                </button>
            ) : (
                <div className="flex items-center justify-between space-x-2 w-full">
                    <div className="flex items-center border rounded overflow-hidden select-none shadow-sm border-gray-300 dark:border-gray-600">

                        <button
                            onClick={handleDecrease}
                            disabled={loading}
                            className="px-4 py-1 bg-transparent text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-transform duration-150 active:scale-90 dark:text-gray-300 dark:hover:text-white"
                            aria-label="Decrease quantity"
                        >
                            –
                        </button>
                        <div
                            key={quantity}
                            className="px-6 py-1 bg-gray-100 dark:bg-transparent text-center font-semibold min-w-[2.5rem] transition-transform duration-300 text-gray-800 dark:text-gray-200 border-x  border-gray-300 dark:border-gray-600"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {quantity}
                        </div>
                        <button
                            onClick={handleIncrease}
                            disabled={loading || quantity >= product.stock}
                            className="px-4 py-1 bg-transparent text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-transform duration-150 active:scale-90 dark:text-gray-300 dark:hover:text-white"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>
                    <div>
                        <p>Product added </p>
                    </div>
                </div>
            )}
        </div>
    );
}
