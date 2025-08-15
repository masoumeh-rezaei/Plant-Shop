import { categories } from '@/data/categories';
import { products } from '@/data/fakeProducts';
import CategorySidebar from '@/components/CategorySidebar';
import AllCategoriesContent from '@/components/AllCategoriesContent';

// تایپ props مطابق Next.js 15
interface PageProps {
    params: { category: string };
}

export const dynamic = 'force-static';

// تولید مسیرهای استاتیک برای build
export async function generateStaticParams() {
    return categories.map(c => ({ category: c.slug }));
}

// کامپوننت صفحه
export default function CategoryPage({ params }: PageProps) {
    const categoryProducts = products.filter(p => p.category === params.category);

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <CategorySidebar categories={categories} current={params.category} />
            <AllCategoriesContent products={categoryProducts} categories={categories} />
        </div>
    );
}
