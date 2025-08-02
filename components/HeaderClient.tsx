"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import ResponsiveMenu from "@/components/responsiveMobileMenue";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "More", href: "/more" },
    { label: "Contact", href: "/contact" },
];

export default function HeaderClient() {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
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
                    <button
                        aria-label="Cart"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>

                    {/* darkMod */}
                    <DarkModeToggle />

                    {/* mobile button */}
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
