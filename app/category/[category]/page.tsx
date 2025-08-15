import { categories } from '@/data/categories';
import { products } from '@/data/fakeProducts';
import CategorySidebar from '@/components/CategorySidebar';
import CategoryContent from '@/components/CategoryContent';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateStaticParams() {
    return categories.map((c) => ({ category: c.slug }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
    const categorySlug = params.category;
    const cat = categories.find((c) => c.slug === categorySlug);

    if (!cat) return notFound();

    const filtered =
        categorySlug === 'all'
            ? products
            : products.filter((p) => p.category === categorySlug);

    return (
        <div className="flex flex-col md:flex-row gap-6 mt-10">
            <CategorySidebar categories={categories} current={categorySlug} />
            <CategoryContent products={filtered} categoryName={cat.label} />
        </div>
    );
}
