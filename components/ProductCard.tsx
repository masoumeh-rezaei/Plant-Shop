'use client';
import Image from "next/image";
import type { Product } from "@/data/fakeProducts";
import AddToCartClient from "./AddToCartClient"; // مسیر را متناسب با ساختار پروژه‌ت تغییر بده

export default function ProductCard({
                                        product,
                                        onClick,
                                    }: {
    product: Product;
    onClick: () => void;
}) {
    const priceAfter = (product.price * (1 - product.discountPercent / 100)).toFixed(2);

    return (
        <div
            className="bg-lightBg dark:bg-darkBg rounded-lg shadow-sm overflow-hidden flex flex-col cursor-pointer"
            onClick={onClick}
        >
            <div className="relative h-48 w-full">
                <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover" }} />
            </div>

            <div className="p-3 flex flex-col gap-2 flex-1">
                <h3 className="text-sm font-semibold text-black dark:text-white">{product.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        {product.discountPercent > 0 ? (
                            <div className="flex items-baseline gap-2">
                <span className="text-xs line-through text-gray-400 ">
                  ${product.price.toFixed(2)}
                </span>
                                <span className="font-bold text-sm text-black dark:text-white">
                  ${priceAfter}
                </span>
                                <span className="ml-2 text-xs text-red-500">
                  -{product.discountPercent}%
                </span>
                            </div>
                        ) : (
                            <span className="font-bold">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Stock: {product.stock}</div>
                </div>

                {/* دکمه AddToCart و کنترل تعداد */}
                <div className={'w-full'} onClick={e => e.stopPropagation()}>{/* جلوگیری از باز شدن صفحه محصول هنگام کلیک روی دکمه */}
                    <AddToCartClient product={product} />
                </div>
            </div>
        </div>
    );
}
