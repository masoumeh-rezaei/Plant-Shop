'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function HeaderClient() {
    const { user, logout, isAuthenticated } = useAuth();
    const { state } = useCart();
    const router = useRouter();
    const pathname = usePathname();

    const itemsCount = state.items.reduce((s, i) => s + i.quantity, 0);

    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    My Flower Shop
                </Link>

                <nav className="flex items-center gap-4">
                    <Link href="/category" className={pathname.startsWith('/category') ? 'underline' : ''}>
                        Categories
                    </Link>

                    <Link href="/cart" className="relative">
                        Cart
                        {itemsCount > 0 && (
                            <span className="ml-2 inline-flex items-center justify-center bg-red-500 text-white text-xs rounded-full w-5 h-5">
                {itemsCount}
              </span>
                        )}
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <span className="text-sm">Hi, {user?.name}</span>
                            <button
                                className="text-sm px-3 py-1 bg-gray-100 rounded"
                                onClick={() => {
                                    logout();
                                    router.push('/');
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="text-sm">
                                Login
                            </Link>
                            <Link href="/auth/register" className="text-sm">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
