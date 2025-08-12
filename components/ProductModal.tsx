'use client';
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AddToCartClient from "@/components/AddToCartClient";
import type { Product } from "@/data/fakeProducts";

export default function ProductModal({
                                         product,
                                         onClose
                                     }: {
    product: Product;
    onClose: () => void;
}) {
    const priceAfter = (product.price * (1 - product.discountPercent / 100)).toFixed(2);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <div
                            className="relative bg-white rounded-lg shadow-lg max-w-5xl w-full overflow-y-auto max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
                            >
                                ✕
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-amber-50 p-4">
                                <div className="md:col-span-2 bg-white rounded shadow p-4">
                                    <div className="relative h-96">
                                        <Image
                                            width={300}
                                            height={300}
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-full h-full rounded"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h1 className="text-2xl font-bold">{product.name}</h1>
                                        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                                    </div>
                                </div>

                                <aside className="bg-white rounded shadow p-4">
                                    <div className="mb-3">
                                        {product.discountPercent > 0 ? (
                                            <div className="flex items-baseline gap-2">
                        <span className="text-sm line-through text-gray-400">
                          ${product.price.toFixed(2)}
                        </span>
                                                <span className="text-xl font-bold">${priceAfter}</span>
                                                <span className="ml-2 text-xs text-blue-500">
                          -{product.discountPercent}%
                        </span>
                                            </div>
                                        ) : (
                                            <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
                                        )}
                                        <div className="text-xs text-gray-600 mt-1">Stock: {product.stock}</div>
                                    </div>
                                    <AddToCartClient product={product} />
                                </aside>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
