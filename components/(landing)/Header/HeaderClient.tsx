"use client";

import { useState } from "react";
import { Search, Menu } from "lucide-react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";
import DarkModeToggle from "@/components/(landing)/DarkModeToggle";
import ResponsiveMenu from "@/components/(landing)/responsiveMobileMenue";
import SearchModal from "./SearchModal";
import { useAuth } from "@/contexts/AuthContext";

export default function HeaderClient() {
    const [showMenu, setShowMenu] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { logout, isAuthenticated } = useAuth();

    return (
        <>
            <div className="flex items-center justify-between mx-auto px-6 py-4">
                <Logo />
                <NavLinks />

                <div className="flex items-center gap-4 dark:text-gray-200">
                    {/* Search Button */}
                    <button
                        aria-label="Search"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>

                    {/* Cart */}
                    <CartButton />

                    {/* Dark Mode */}
                    <div className="hidden md:block">
                        <DarkModeToggle />
                    </div>

                    {/* Auth */}
                    {!isAuthenticated ? (
                        <a
                            href="/auth/login"
                            className="rounded-md dark:text-white text-black text-sm transition"
                        >
                            Login
                        </a>
                    ) : (
                        <button
                            onClick={logout}
                            className="rounded-md text-black dark:text-white text-sm transition"
                        >
                            Logout
                        </button>
                    )}

                    {/* Mobile Menu */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setShowMenu((prev) => !prev)}
                        aria-label="Toggle mobile menu"
                    >
                        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>
                </div>
            </div>

            <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />

            {/* Search Modal */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
