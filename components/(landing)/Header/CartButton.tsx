"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartButton() {
    const { state } = useCart();
    const itemsCount = state.items.reduce((s, i) => s + i.quantity, 0);

    return (
        <Link href="/cart" className="relative">
            <button
                aria-label="Cart"
                className="relative p-2 rounded-full hover:scale-110 dark:bg-emerald-900 bg-rose-200 transition"
            >
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                {itemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5">
                        {itemsCount}
                    </span>
                )}
            </button>
        </Link>
    );
}
