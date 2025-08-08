import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/fakeProducts';

export default function ProductCard({ product }: { product: Product }) {
    const priceAfter = (product.price * (1 - product.discountPercent / 100)).toFixed(2);

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
            <Link href={`/product/${product.slug}`} className="block">
                <div className="relative h-48 w-full">
                    <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                </div>
            </Link>

            <div className="p-3 flex flex-col gap-2 flex-1">
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        {product.discountPercent > 0 ? (
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs line-through text-gray-400">${product.price.toFixed(2)}</span>
                                <span className="font-bold text-sm">${priceAfter}</span>
                                <span className="ml-2 text-xs text-red-500">-{product.discountPercent}%</span>
                            </div>
                        ) : (
                            <span className="font-bold">${product.price.toFixed(2)}</span>
                        )}
                    </div>

                    <div className="text-xs text-gray-600">Stock: {product.stock}</div>
                </div>
            </div>
        </div>
    );
}
