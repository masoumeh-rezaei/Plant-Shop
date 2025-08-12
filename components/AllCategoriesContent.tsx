'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import type { Product } from '@/data/fakeProducts';
import type { Category } from '@/data/categories';

export default function AllCategoriesContent({
                                                 products,
                                             }: {
    products: Product[];
    categories: Category[];
}) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <main className="flex-1 md:ml-64 h-full p-5 bg-amber-50 dark:bg-[#A6B28B]">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black dark:text-white">All Products</h2>
                <div className="text-sm text-gray-600">{products.length} products</div>
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
