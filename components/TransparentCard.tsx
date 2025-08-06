"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface TransparentCardProps {
    children: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
}

export default function TransparentCard({
                                            children,
                                            imageUrl,
                                            imageAlt = "Card Image",
                                        }: TransparentCardProps) {
    return (
        <div className="relative mx-auto p-6 bg-transparent backdrop-blur-md rounded-3xl shadow-lg text-white">

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

            {/* خطوط تزئینی برای تمام چهار گوشه و ضلع */}

            {/* خطوط بالا-چپ */}
            <span className="absolute top-0 left-5 h-[3px] w-[200px] bg-gradient-to-r from-white/80 to-transparent pointer-events-none" />
            <span className="absolute top-5 left-0 w-[3px] h-[100px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
            <span className="absolute top-0 left-0 w-[24px] h-[24px] rounded-tl-3xl border-l-[3px] border-t-[3px] border-white/80 pointer-events-none" />

            {/* خطوط بالا-راست */}
            <span className="absolute top-0 right-5 h-[3px] w-[200px] bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
            <span className="absolute top-5 right-0 w-[3px] h-[100px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
            <span className="absolute top-0 right-0 w-[24px] h-[24px] rounded-tr-3xl border-r-[3px] border-t-[3px] border-white/80 pointer-events-none" />

            {/*/!* خطوط پایین-چپ *!/*/}
            {/*<span className="absolute bottom-0 left-5 h-[3px] w-[200px] bg-gradient-to-r from-white/80 to-transparent pointer-events-none" />*/}
            {/*<span className="absolute bottom-5 left-0 w-[3px] h-[100px] bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />*/}
            {/*<span className="absolute bottom-0 left-0 w-[24px] h-[24px] rounded-bl-3xl border-l-[3px] border-b-[3px] border-white/80 pointer-events-none" />*/}

            {/* خطوط پایین-راست */}
            <span className="absolute bottom-0 right-5 h-[3px] w-[200px] bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
            <span className="absolute bottom-5 right-0 w-[3px] h-[100px] bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-[24px] h-[24px] rounded-br-3xl border-r-[3px] border-b-[3px] border-white/80 pointer-events-none" />

        </div>
    );
}