'use client';
import React,{useEffect} from 'react';
import { useCart } from '@/contexts/CartContext';
import { computeTotals, priceAfterDiscount } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { state, removeFromCart, setQty, clear } = useCart();
    const router = useRouter();
    const { user } = useAuth();


    useEffect(() => {
        if (!user) {
            router.push('/login?next=/cart');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    const totals = computeTotals(state.items as never);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
            {state.items.length === 0 ? (
                <div className="bg-white p-4 rounded shadow">Your cart is empty.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white p-4 rounded shadow">
                        <ul className="space-y-4">
                            {state.items.map((it) => (
                                <li key={it.productId} className="flex items-center gap-4">
                                    <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-1">
                                        <div className="font-semibold">{it.name}</div>
                                        <div className="text-sm text-gray-600">
                                            ${priceAfterDiscount(it.price, it.discountPercent)} ×{' '}
                                            <input
                                                type="number"
                                                value={it.quantity}
                                                min={1}
                                                onChange={(e) => setQty(it.productId, Number(e.target.value))}
                                                className="w-16 px-2 py-1 border rounded"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold">${(priceAfterDiscount(it.price, it.discountPercent) * it.quantity).toFixed(2)}</div>
                                        <button className="text-sm text-red-500" onClick={() => removeFromCart(it.productId)}>
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <aside className="bg-white p-4 rounded shadow">
                        <div className="mb-4">
                            <div className="text-sm text-gray-600">Subtotal</div>
                            <div className="text-lg font-bold">${totals.subtotal.toFixed(2)}</div>
                        </div>
                        <div className="mb-4">
                            <div className="text-sm text-gray-600">Tax</div>
                            <div>${totals.tax.toFixed(2)}</div>
                        </div>
                        <div className="mb-4">
                            <div className="text-sm text-gray-600">Shipping</div>
                            <div>${totals.shipping.toFixed(2)}</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-sm text-gray-600">Total</div>
                            <div className="text-xl font-bold">${totals.total.toFixed(2)}</div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-2 rounded">Proceed to Checkout (fake)</button>
                        <button className="w-full mt-2 bg-gray-200 py-2 rounded" onClick={() => clear()}>
                            Clear Cart
                        </button>
                    </aside>
                </div>
            )}
        </div>
    );
}
