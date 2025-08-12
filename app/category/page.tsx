import { categories } from '@/data/categories';
import { products } from '@/data/fakeProducts';
import CategorySidebar from '@/components/CategorySidebar';
import AllCategoriesContent from '@/components/AllCategoriesContent';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `All Products - My Flower Shop`,
        description: `Browse all ${products.length} products: roses, bouquets, houseplants and more.`
    };
}

export default function AllCategoriesPage() {
    return (
        <div className="flex flex-col md:flex-row gap-6">
            <CategorySidebar categories={categories} current="all" />
            <AllCategoriesContent products={products} categories={categories} />
        </div>
    );
}
