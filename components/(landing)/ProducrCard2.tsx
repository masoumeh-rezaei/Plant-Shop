"use client";

import DeeperTransparentCard from "@/components/(landing)/CustomBorderCard";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface ReversedProductCardProps {
    title: string;
    description1: string;
    description2: string;
    price: string;
    imageUrl: string;
}

export default function ReversedProductCard({
                                                title,
                                                description1,
                                                description2,
                                                price,
                                                imageUrl,
                                            }: ReversedProductCardProps) {
    return (
        <div className="w-full ">
            <DeeperTransparentCard>
                <div className="flex items-center gap-6 mt-5 px-20">

                    {/* ستون چپ: محتوای محصول (جابه‌جا شده) */}
                    <div className="w-1/2 flex flex-col justify-between h-full gap-4 dark:text-white text-black">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-3xl font-semibold mb-2">{title}</h3>
                            <div>
                                <p className="text-sm opacity-80 mb-1">{description1}</p>
                                <p className="text-sm opacity-80 mb-4">{description2}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 mt-auto">
                            {/* قیمت */}
                            <div className="text-xl font-semibold">{price}</div>

                            {/* دکمه‌ها */}
                            <div className="flex items-center gap-2">
                                <button className="px-6 py-2 border-white border hover:bg-white/30 transition-colors rounded-md text-sm">
                                    Buy Now
                                </button>
                                <button className="p-2 border-white border hover:bg-white/30 transition-colors rounded-md">
                                    <ShoppingBag className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ستون راست: تصویر (جابه‌جا شده) */}
                    <div className="relative text-center flex justify-center items-center w-1/2 -mt-30  z-20 !pr-0"> {/* -mt-30: بیرون زدن از بالا، mr-20: فاصله از راست */}
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={400}
                            height={200}
                            className="w-auto h-auto object-cover rounded-xl"
                        />
                    </div>

                </div>
            </DeeperTransparentCard>
        </div>
    );
}