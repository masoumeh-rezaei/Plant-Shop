// app/category/[category]/page.tsx
import { categories } from '@/data/categories';
import { products } from '@/data/fakeProducts';
import CategorySidebar from '@/components/CategorySidebar';
import AllCategoriesContent from '@/components/AllCategoriesContent';
import type { Metadata } from 'next';

export const dynamic = 'force-static';


interface PageProps {
    params: { category: string };
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = params;

    const categoryProducts = products.filter(p => p.category === category);
    const productCount = categoryProducts.length;

    return {
        title: `${category} - My Flower Shop`,
        description: `Browse ${productCount} products in the ${category} category.`,
    };
}


export async function generateStaticParams() {
    return categories.map(c => ({
        category: c.slug, // فرض شده categories هر کدام slug دارند
    }));
}


export default function CategoryPage({ params }: PageProps) {
    const { category } = params;

    const categoryProducts = products.filter(p => p.category === category);

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <CategorySidebar categories={categories} current={category} />
            <AllCategoriesContent products={categoryProducts} categories={categories} />
        </div>
    );
}
