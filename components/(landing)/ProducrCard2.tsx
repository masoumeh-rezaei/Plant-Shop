"use client";

import DeeperTransparentCard from "@/components/(landing)/CustomBorderCard";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

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
        <div className="w-full">
            <DeeperTransparentCard>
                <div className="flex flex-col-reverse md:flex-row items-center gap-6 mt-5 md:px-20 py-10">

                    {/* ستون چپ: محتوای محصول */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between h-full gap-4 dark:text-white text-black px-4 md:px-0">
                        <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                                {title}
                            </h3>
                            <div>
                                <p className="text-sm opacity-80 mb-1">{description1}</p>
                                <p className="text-sm opacity-80 mb-4">{description2}</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row md:flex-col items-center md:items-start gap-4 mt-4 md:mt-auto">
                            {/* قیمت */}
                            <div className="text-lg md:text-xl font-semibold">{price}</div>

                            {/* دکمه‌ها */}
                            <div className="flex items-center gap-2">
                               <Link href={'/category'} className={'flex items-center gap-2'}>
                                   <button className="px-4 md:px-6 py-2 border-white border hover:bg-white/30 transition-colors rounded-md text-sm">
                                       Buy Now
                                   </button>
                                   <button className="p-2 border-white border hover:bg-white/30 transition-colors rounded-md">
                                       <ShoppingBag className="w-5 h-5" />
                                   </button>
                               </Link>
                            </div>
                        </div>
                    </div>

                    {/* ستون راست: تصویر */}
                    <div className="relative flex justify-center items-center w-full md:w-1/2 -mt-10 md:-mt-30 z-20">
                        {/* -mt-10 برای موبایل، -mt-30 دسکتاپ */}
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={200}
                            height={200}
                            className="md:!w-60 w-50 h-auto object-cover rounded-xl"
                        />
                    </div>
                </div>
            </DeeperTransparentCard>
        </div>
    );
}
