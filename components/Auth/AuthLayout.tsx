'use client';
import React from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
    children: React.ReactNode;
    imageSrc: never; // Static import (e.g. from public)
}

export default function AuthLayout({ children, imageSrc }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row w-full items-center justify-center transition-colors duration-300
      dark:bg-gradient-to-br dark:from-darkBg dark:via-emerald-900 dark:to-emerald-950
      bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 p-4">

            {/* فرم */}
            <div className=" flex items-center justify-center min-w-md">
                {children}
            </div>

            {/* تصویر کنار فرم - فقط در دسکتاپ */}
            <div className="hidden md:flex justify-center items-center ">
                <Image
                    src={imageSrc}
                    alt="Auth Illustration"
                    width={500}
                    height={500}
                    className="rounded-2xl"
                />
            </div>
        </div>
    );
}
