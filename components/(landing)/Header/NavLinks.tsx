"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Category", href: "/category" },
    { label: "Register", href: "/auth/register" },
    { label: "Contact", href: "/contact" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center gap-6">
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
    );
}
