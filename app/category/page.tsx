import { categories } from '@/data/categories';
import { products } from '@/data/fakeProducts';
import CategorySidebar from '@/components/CategorySidebar';
import AllCategoriesContent from '@/components/AllCategoriesContent';

export const dynamic = 'force-static';

export async function generateStaticParams() {
    return categories.map(c => ({ category: c.slug }));
}

// استفاده از `params` مستقیم بدون PageProps اشتباه
export default function CategoryPage({ params }: { params: { category: string } }) {
    const categoryProducts = products.filter(p => p.category === params.category);

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <CategorySidebar categories={categories} current={params.category} />
            <AllCategoriesContent products={categoryProducts} categories={categories} />
        </div>
    );
}
