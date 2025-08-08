import { categories } from '@/data/categories';
import { products } from '@/data/fakeProducts';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

type Props = { params: { category: string } };

export const dynamic = 'force-static';

export async function generateStaticParams() {
    return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
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

    const filtered = categorySlug === 'all' ? products : products.filter((p) => p.category === categorySlug);

    return (
        <div className="flex flex-col md:flex-row gap-6 mt-20">
            <CategorySidebar categories={categories} current={categorySlug} />

            <main className="flex-1 md:ml-64 h-full">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{cat.label}</h2>
                    <div className="text-sm text-gray-600">{filtered.length} products</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </main>
        </div>
    );
}
