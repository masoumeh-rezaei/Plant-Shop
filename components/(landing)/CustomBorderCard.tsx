"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface DeeperTransparentCardProps {
    children: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
}

export default function DeeperTransparentCard({
                                                  children,
                                                  imageUrl,
                                                  imageAlt = "Card Image",
                                              }: DeeperTransparentCardProps) {
    return (
        <div className="relative mx-auto p-6 bg-transparent backdrop-blur-md  rounded-[100px] shadow-lg text-white md:border-none border border-y-2 ">

            {/* اگر عکس داشت، نشون بده */}
            {imageUrl && (
                <div className="w-full flex justify-center mb-4">
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        width={200}
                        height={200}
                        className="rounded-xl object-cover"
                    />
                </div>
            )}

            {children}

            {/* خطوط اصلی بردر با گوشه‌های منطبق بر rounded-[100px] */}

            {/* گوشه بالا-چپ */}
            <span className="absolute top-0 left-0 w-[100px] h-[100px] border-t-[3px] border-l-[3px] dark:border-white/80 border-gray-800/40  rounded-tl-[100px] pointer-events-none" />
            {/* گوشه بالا-راست */}
            <span className="absolute top-0 right-0 w-[100px] h-[100px] border-t-[3px] border-r-[3px] dark:border-white/80 border-gray-800/40 rounded-tr-[100px] pointer-events-none" />
            {/* گوشه پایین-چپ */}
            <span className="absolute bottom-0 left-0 w-[100px] h-[100px] border-b-[3px] border-l-[3px] dark:border-white/80 border-gray-800/40 rounded-bl-[100px] pointer-events-none" />
            {/* گوشه پایین-راست */}
            <span className="absolute bottom-0 right-0 w-[100px] h-[100px] border-b-[3px] border-r-[3px] dark:border-white/80 border-gray-800/40 rounded-br-[100px] pointer-events-none" />

            {/* بردر بالا (از گوشه‌ها به سمت مرکز محو می‌شود) */}
            <span className="absolute top-0 left-[100px] w-[500px] h-[3px] bg-transparent md:bg-gradient-to-r dark:from-white/80 from-gray-800/40 to-transparent pointer-events-none" />
            <span className="absolute top-0 right-[100px] w-[500px] h-[3px] bg-transparent md:bg-gradient-to-l dark:from-white/80 from-gray-800/40 to-transparent pointer-events-none" />

            {/* بردر پایین (از گوشه‌ها به سمت مرکز محو می‌شود) */}
            <span className="absolute bottom-0 left-[100px] w-[500px] h-[3px] bg-transparent md:bg-gradient-to-r dark:from-white/80 from-gray-800/40 to-transparent pointer-events-none" />
            <span className="absolute bottom-0 right-[100px] w-[500px] h-[3px] bg-transparent md:bg-gradient-to-l dark:from-white/80 from-gray-800/40 to-transparent pointer-events-none" />

            {/* بردر سمت چپ (ثابت) */}
            <span className="absolute top-[100px] left-0 w-[3px] h-[calc(100%-200px)] dark:bg-white/80 bg-gray-800/40 pointer-events-none" />
            {/* بردر سمت راست (ثابت) */}
            <span className="absolute top-[100px] right-0 w-[3px] h-[calc(100%-200px)] dark:bg-white/80 bg-gray-800/40 pointer-events-none" />
        </div>
    );
}