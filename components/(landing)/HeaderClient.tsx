"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";
import DarkModeToggle from "@/components/(landing)/DarkModeToggle";
import ResponsiveMenu from "@/components/(landing)/responsiveMobileMenue";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Category", href: "/category" },
    { label: "Login", href: "/auth/login" },
    { label: "Register", href: "/auth/register" },
    { label: "Contact", href: "/contact" },
];

export default function HeaderClient() {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const { state } = useCart();
    const { logout, isAuthenticated } = useAuth();
    const itemsCount = state.items.reduce((s, i) => s + i.quantity, 0);

    return (
        <>
            <div className="flex items-center justify-between mx-auto px-6 py-4">
                {/* logo */}
                <section>
                    <p className="text-xl font-bold tracking-tight dark:text-white">
                        Planet. <small className="text-gray-500">Moon</small>
                    </p>
                </section>

                {/* links */}
                <section className="hidden md:flex">
                    <nav className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 ${
                                    pathname === link.href
                                        ? "dark:text-gray-300 border-y px-2 py-1 rounded-md"
                                        : "dark:text-white dark:hover:text-gray-300 text-gray-600"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </section>

                <section className="flex items-center gap-4 dark:text-gray-200">
                    {/* search */}
                    <button
                        aria-label="Search"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>

                    {/* cart */}
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



                    {/* dark mode */}
                    <div className={'hidden md:block'}>
                        <DarkModeToggle />
                    </div>

                    {/* login/logout */}
                    {!isAuthenticated ? (
                        <Link
                            href="/auth/login"
                            className=" rounded-md  dark:text-white  text-black text-sm transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={logout}
                            className=" rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm transition"
                        >
                            Logout
                        </button>
                    )}

                    {/* mobile menu */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setShowMenu((prev) => !prev)}
                        aria-label="Toggle mobile menu"
                    >
                        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>
                </section>
            </div>

            <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </>
    );
}
