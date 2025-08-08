import Link from 'next/link';

export default function CategorySidebar({
                                            categories,
                                            current
                                        }: {
    categories: { label: string; slug: string }[];
    current: string;
}) {
    return (
        <aside className="w-full  md:fixed top-15 md:w-64 p-4 bg-lightBg dark:bg-darkBg md:h-full ">
            <h4 className="font-bold text-black dark:text-white mb-3">Categories</h4>
            <ul className="space-y-2">
                {categories.map((c) => {
                    const isActive = c.slug === current;
                    const href = c.slug === 'all' ? '/category' : `/category/${encodeURIComponent(c.slug)}`;
                    return (
                        <li key={c.slug}>
                            <Link
                                href={href}
                                className={`block px-3 py-2 rounded ${isActive ? 'bg-rose-100 dark:bg-emerald-900 text-gray-600 dark:text-gray-200' : 'hover:bg-rose-100 dark:hover:bg-emerald-900 text-gray-800 dark:text-gray-100'}`}
                            >
                                {c.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
