'use client';

import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import GlassLayer from '@/components/GlassLayer';

import Carousel from '@/components/ProductCarousel';

export default function PromoSection() {
  return (
    <section className="w-full overflow-x-hidden py-10 px-4 sm:px-6 ">
      <div className="max-w-9xl mx-auto flex flex-col lg:flex-row items-stretch justify-between gap-10">
        {/* Left Side */}
        <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          {/* Title */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Breath Naturally in our site
            </h1>
            <div className="mt-4 space-y-2 text-md text-gray-700 dark:text-gray-300">
              <p>Discover the calming beauty of nature in your home.Bring serenity to your everyday life.Bring serenity to you.</p>
              <p>Bring serenity to your everyday life.Bring serenity to your everyday life</p>
            </div>
          </div>

          {/* Explore Button */}
          <button className="px-7 py-2 border border-gray-800 dark:border-gray-300 text-gray-900 dark:text-white bg-transparent rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition font-medium shadow-sm">
            Explore
          </button>

          {/* Review / Comment Box */}
          <div className="w-full max-w-md lg:w-[70%] ">
            <GlassLayer>
              <div className="flex items-start gap-4 flex-col">
                <div className='flex flex-row gap-3 '>
                <Image
                  src="/profile1.jpg"
                  alt="User"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div className='pt-4'>
                      <span className="block font-semibold text-gray-900 dark:text-white">
                        Amir Hossein
                      </span>
                      <div className="flex items-center text-yellow-400 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                  </div>
                </div>

                <div>
                  
                  <p className="text-sm text-gray-800 dark:text-gray-300 text-left">
                    These flowers completely transformed my space. The scent and energy are amazing!
                  </p>
                </div>
              </div>
            </GlassLayer>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3 flex items-center justify-center">
    <Carousel />
  </div>
      </div>
    </section>
  );
}
