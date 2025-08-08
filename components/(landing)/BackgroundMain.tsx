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
    <div className="w-full  relative min-h-screen  bg-lightBg dark:bg-darkBg overflow-hidden">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover z-0 !mt-[400px]"
        priority
      />

      <div className="relative z-10 w-full  mx-auto py-20 px-4 ">
        {children}
      </div>
    </div>
  );
};

export default ScrollableBackground;
