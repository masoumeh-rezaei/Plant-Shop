import { categories } from '@/data/categories';
import { products } from '@/data/fakeProducts';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-static';

export async function generateMetadata() {
    return {
        title: `All Products - My Flower Shop`,
        description: `Browse all ${products.length} products: roses, bouquets, houseplants and more.`
    };
}

export default function AllCategoriesPage() {
    return (
        <div className="flex flex-col  md:flex-row gap-6 mt-20">
            <CategorySidebar categories={categories} current="all" />
            <main className="flex-1 md:ml-64 h-full">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">All Products</h2>
                    <div className="text-sm text-gray-600">{products.length} products</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </main>
        </div>
    );
}
