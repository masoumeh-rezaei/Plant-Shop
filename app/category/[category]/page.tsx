import { categories } from '@/data/categories';
import { products } from '@/data/fakeProducts';
import CategorySidebar from '@/components/CategorySidebar';
import CategoryContent from '@/components/CategoryContent';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: { category: string } };

export const dynamic = 'force-static';

export async function generateStaticParams() {
    return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.category;
    const cat = categories.find((c) => c.slug === slug);

    if (!cat) {
        return { title: 'Category not found', description: 'Category does not exist' };
    }

    const filtered = products.filter((p) => p.category === slug);
    return {
        title: `${cat.label} - My Flower Shop`,
        description: `Browse ${filtered.length} ${cat.label.toLowerCase()} products.`
    };
}
export default function CategoryPage({ params }: Props) {
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
