'use client';
import React, { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { computeTotals, priceAfterDiscount } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

export default function CartPage() {
    const { state, removeFromCart, setQty, clear } = useCart();
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) router.push('/auth/login');
    }, [user, router]);

    if (!user) return null;

    const totals = computeTotals(state.items as never);

    return (
        <div className="min-h-screen p-6 transition-colors duration-300
            bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100
            dark:bg-gradient-to-br dark:from-emerald-900 dark:via-green-950 dark:to-black">

            <h1 className="text-3xl font-bold mb-8 text-center dark:text-white text-gray-800">
                Your Cart
            </h1>

            {state.items.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/70 dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20
                        p-6 rounded-2xl text-center shadow-lg">
                    <p className="dark:text-gray-200 text-gray-700">Your cart is empty.</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-2 bg-white/70 dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20
                            p-6 rounded-2xl shadow-lg">
                        <ul className="space-y-6">
                            {state.items.map((it) => (
                                <li key={it.productId} className="flex items-center gap-4 border-b border-gray-200 dark:border-white/20 pb-4">
                                    <img
                                        src={it.image}
                                        alt={it.name}
                                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold dark:text-white text-gray-800">{it.name}</div>
                                        <div className="text-sm dark:text-gray-300 text-gray-600">
                                            ${priceAfterDiscount(it.price, it.discountPercent).toFixed(2)} ×
                                            <input
                                                type="number"
                                                value={it.quantity}
                                                min={1}
                                                onChange={(e) => setQty(it.productId, Number(e.target.value))}
                                                className="w-16 ml-2 px-2 py-1 rounded-lg
                                                    bg-gray-100 dark:bg-white/20
                                                    text-gray-800 dark:text-white
                                                    border border-gray-300 dark:border-white/30
                                                    focus:outline-none focus:border-green-500 dark:focus:border-green-400
                                                    focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-400/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="font-semibold dark:text-white text-gray-800">
                                            ${(priceAfterDiscount(it.price, it.discountPercent) * it.quantity).toFixed(2)}
                                        </div>
                                        <button
                                            className="flex items-center gap-1 text-sm text-red-500 dark:text-red-400 hover:underline"
                                            onClick={() => removeFromCart(it.productId)}
                                        >
                                            <FiTrash2 /> Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Summary */}
                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/70 dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20
                            p-6 rounded-2xl shadow-lg space-y-4">
                        <div>
                            <div className="text-sm dark:text-gray-300 text-gray-600">Subtotal</div>
                            <div className="text-lg font-bold dark:text-white">${totals.subtotal.toFixed(2)}</div>
                        </div>
                        <div>
                            <div className="text-sm dark:text-gray-300 text-gray-600">Tax</div>
                            <div className="dark:text-white">${totals.tax.toFixed(2)}</div>
                        </div>
                        <div>
                            <div className="text-sm dark:text-gray-300 text-gray-600">Shipping</div>
                            <div className="dark:text-white">${totals.shipping.toFixed(2)}</div>
                        </div>
                        <div>
                            <div className="text-sm dark:text-gray-300 text-gray-600">Total</div>
                            <div className="text-2xl font-bold dark:text-green-400 text-purple-600">${totals.total.toFixed(2)}</div>
                        </div>

                        <button className="w-full py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all
                            bg-gradient-to-r from-purple-300 to-pink-300 text-purple-900
                            dark:from-green-600 dark:to-green-700 dark:text-white">
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={() => clear()}
                            className="w-full py-3 rounded-lg font-semibold mt-2 bg-gray-200 text-gray-800
                                dark:bg-white/20 dark:text-gray-200 hover:opacity-80 transition"
                        >
                            Clear Cart
                        </button>
                    </motion.aside>
                </div>
            )}
        </div>
    );
}
