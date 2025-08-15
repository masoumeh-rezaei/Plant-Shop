import {  products } from '@/data/fakeProducts';
import {  categories } from '@/data/categories';
import type { Metadata } from 'next';
import CategorySidebar from "@/components/CategorySidebar";
import AllCategoriesContent from "@/components/AllCategoriesContent";

interface PageProps {
    params: { category: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const category = params.category;
    const productCount = products.filter(p => p.category === category).length;

    return {
        title: `${category} - My Flower Shop`,
        description: `Browse ${productCount} products in the ${category} category.`,
    };
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
