'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/data/fakeProducts';

export default function AddToCartClient({ product }: { product: Product }) {
    const { isAuthenticated } = useAuth();
    const { addToCart, setQty, getItemQuantity, removeFromCart } = useCart();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    const quantity = getItemQuantity(product.id);

    // تابع اضافه کردن محصول به سبد
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
        }, 250);
    };

    // کم کردن تعداد
    const handleDecrease = () => {
        if (quantity <= 1) {
            removeFromCart(product.id);
        } else {
            setQty(product.id, quantity - 1);
        }
    };

    // زیاد کردن تعداد (تا سقف استوک)
    const handleIncrease = () => {
        if (quantity < product.stock) {
            setQty(product.id, quantity + 1);
        }
    };

    // اگر استوک صفر باشه یا کمتر دکمه غیرفعال
    const outOfStock = product.stock <= 0;

    return (
        <div className="mt-4 flex items-center space-x-2">
            {quantity === 0 ? (
                <button
                    onClick={handleAdd}
                    disabled={loading || outOfStock}
                    className={`px-4 py-2 rounded text-white font-semibold transition-colors duration-300
                        ${outOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {outOfStock ? 'Out of stock' : loading ? 'Adding...' : 'Add to Cart'}
                </button>
            ) : (
                <div className="flex items-center border rounded overflow-hidden select-none">
                    <button
                        onClick={handleDecrease}
                        disabled={loading}
                        className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition"
                        aria-label="Decrease quantity"
                    >
                        –
                    </button>
                    <div
                        key={quantity} // باعث انیمیشن بهتر روی تغییر مقدار میشه
                        className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-center font-medium min-w-[2rem]"
                        style={{ transition: 'all 0.3s ease' }}
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {quantity}
                    </div>
                    <button
                        onClick={handleIncrease}
                        disabled={loading || quantity >= product.stock}
                        className={`px-3 py-1 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition`}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}
