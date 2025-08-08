'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/data/fakeProducts';

export default function AddToCartClient({ product }: { product: Product }) {
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    const handleAdd = () => {
        if (!isAuthenticated) {
            // redirect to login with next param
            const next = encodeURIComponent(pathname);
            router.push(`/auth/login?next=${next}`);
            return;
        }
        setLoading(true);
        // small delay to simulate async
        setTimeout(() => {
            addToCart(product, 1);
            setLoading(false);
            router.push('/cart');
        }, 250);
    };

    return (
        <div className="mt-4">
            <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
                disabled={loading || product.stock <= 0}
            >
                {product.stock <= 0 ? 'Out of stock' : loading ? 'Adding...' : 'Add to Cart'}
            </button>
        </div>
    );
}
