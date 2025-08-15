"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/data/fakeProducts";
import ProductModal from "@/components/ProductModal";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed  inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white dark:bg-darkBg rounded-lg w-full max-w-xl p-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            type="text"
                            autoFocus
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white mb-3"
                        />

                        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-green-700 transition cursor-pointer"
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div>
                                            <h1 className="text-sm font-semibold dark:text-green-100">{product.name}</h1>
                                            <p className="text-xs text-gray-500 dark:text-green-300">${product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-green-300 text-sm text-center">
                                    No products found
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {selectedProduct && (
                        <ProductModal
                            product={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
