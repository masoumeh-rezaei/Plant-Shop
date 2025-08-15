"use client";

import Link from "next/link";

export default function Logo() {
    return (
        <section>
            <Link href="/">
                <p className="text-xl font-bold tracking-tight dark:text-white">
                    Planet. <small className="text-gray-500">Moon</small>
                </p>
            </Link>
        </section>
    );
}
