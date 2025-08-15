'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import type { Product } from '@/data/fakeProducts';

export default function CategoryContent({
                                            products,
                                            categoryName
                                        }: {
    products: Product[];
    categoryName: string;
}) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <main className="flex-1 md:ml-64 h-full p-5 bg-amber-50  dark:bg-gradient-to-br dark:from-darkBg dark:via-emerald-900 dark:to-emerald-950">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black dark:text-white">{categoryName}</h2>
                <div className="text-sm text-gray-700 dark:text-gray-200">{products.length} products</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p: Product) => (
                    <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />
                ))}
            </div>

            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </main>
    );
}
