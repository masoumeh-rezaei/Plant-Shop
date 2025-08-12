import { products } from '@/data/fakeProducts';
import AddToCartClient from '@/components/AddToCartClient';
import { notFound } from 'next/navigation';
import Image from "next/image";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
    return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
    const prod = products.find((p) => p.slug === params.slug);
    if (!prod) {
        return { title: 'Product not found' };
    }
    return {
        title: `${prod.name} - My Flower Shop`,
        description: prod.description
    };
}

export default function ProductPage({ params }: Props) {
    const prod = products.find((p) => p.slug === params.slug);
    if (!prod) return notFound();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-amber-50 mt-10 p-10">
            <div className="md:col-span-2 bg-white rounded shadow p-4">
                <div className="relative h-96">
                    {/* big image */}
                    <Image width={300} height={300} src={prod.image} alt={prod.name} className="object-cover w-full h-full rounded" />
                </div>

                <div className="mt-4">
                    <h1 className="text-2xl font-bold">{prod.name}</h1>
                    <p className="text-sm text-gray-600 mt-2">{prod.description}</p>
                </div>
            </div>

            <aside className="bg-white rounded shadow p-4">
                <div>
                    <div className="mb-3">
                        {prod.discountPercent > 0 ? (
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm line-through text-gray-400">${prod.price.toFixed(2)}</span>
                                <span className="text-xl font-bold">${(prod.price * (1 - prod.discountPercent / 100)).toFixed(2)}</span>
                                <span className="ml-2 text-xs text-blue-500">-{prod.discountPercent}%</span>
                            </div>
                        ) : (
                            <div className="text-xl font-bold">${prod.price.toFixed(2)}</div>
                        )}
                        <div className="text-xs text-gray-600 mt-1">Stock: {prod.stock}</div>
                    </div>

                    {/* Add to cart (client) */}
                    <AddToCartClient product={prod} />
                </div>
            </aside>
        </div>
    );
}
