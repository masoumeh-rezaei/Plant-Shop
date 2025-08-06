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
        <div className="relative mx-auto w-full max-w-sm p-px rounded-[30px] bg-[conic-gradient(at_top_left,rgba(255,255,255,0.2),transparent_30%)] shadow-lg overflow-hidden">

            {/*  */}
            <svg
                className="absolute inset-0 w-full h-full z-0"
                viewBox="0 0 400 400"
                preserveAspectRatio="none"
            >
                <defs>
                    <clipPath id="concaveClip" clipPathUnits="userSpaceOnUse">
                        <path d="
              M0,40
              Q100,0 200,40
              Q300,80 400,40
              L400,400
              L0,400
              Z
            " />
                    </clipPath>
                </defs>
                <rect width="400" height="400" fill="#18181b" clipPath="url(#concaveClip)" />
            </svg>

            {/* کارت محتوا */}
            <div className="relative bg-zinc-900/80 backdrop-blur-md text-white px-6 pb-6 pt-16 rounded-[30px] z-10">

                {/* تصویر کاربر */}
                {imageUrl && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden border-4 border-zinc-900 shadow-md bg-zinc-800 z-20">
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            width={80}
                            height={80}
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
