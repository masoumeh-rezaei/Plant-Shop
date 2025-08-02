'use client';

import React from "react";
import Image from "next/image";

interface ScrollableBackgroundProps {
    imageUrl: string;
    imageAlt?: string;
    children?: React.ReactNode;
}

const ScrollableBackground: React.FC<ScrollableBackgroundProps> = ({
                                                                       imageUrl,
                                                                       imageAlt = "background",
                                                                       children
                                                                   }) => {
    return (
        <div className="w-full min-h-[150vh] relative overflow-auto !mt-[70px] bg-lightBg dark:bg-darkBg">
            <Image
                src={imageUrl}
                alt={imageAlt}
                width={800}
                height={800}
                className="w-full h-auto object-cover"
            />
            {children}

        </div>
    );
};

export default ScrollableBackground;
