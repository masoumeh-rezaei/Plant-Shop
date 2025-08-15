"use client";

import React, { useRef, useState } from "react";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Slide {
  title: string;
  type: string;
  image: string;
}

const slides: Slide[] = [
  { title: "Calathea plant", type: "Trendy House Plant", image: "/product8.png" },
  { title: "Lavender Peace", type: "Flower", image: "/product9.png" },
  { title: "Rose Elegance", type: "Rose", image: "/product7.png" },
];

// Autoplay Plugin ساده‌تر
const AutoplayPlugin: KeenSliderPlugin = (slider) => {
  let interval: NodeJS.Timeout;
  const autoplay = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      slider.next();
    }, 4000);
  };

  slider.on("created", autoplay);
  slider.on("dragStarted", () => clearInterval(interval));
  slider.on("animationEnded", autoplay);
  slider.on("updated", autoplay);
};

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const keenSliderInstanceRef = useRef<KeenSliderInstance | null>(null);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
      {
        loop: true,
        mode: "snap",
        slides: { perView: 1 },
        slideChanged(s) {
          setCurrentSlide(s.track.details.rel);
        },
        created(s) {
          keenSliderInstanceRef.current = s;
        },
      },
      [AutoplayPlugin]
  );

  return (
      <div className="relative w-full mx-auto px-4 py-10 min-h-screen flex items-center justify-center">
        <div className="relative w-full max-w-sm mx-auto">
          <div ref={sliderRef} className="keen-slider h-[500px]">
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    className="keen-slider__slide flex justify-center items-center p-4"
                >
                  <div className="relative w-full h-[450px]">
                    {/* تصویر محصول */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-2/3 h-auto z-20">
                      <Image
                          src={slide.image}
                          alt={slide.title}
                          width={400}
                          height={400}
                          className="w-full h-auto object-cover rounded-[2rem]"
                      />
                    </div>

                    {/* کارت اطلاعات */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] p-6 pt-44 pb-4
                  bg-transparent backdrop-blur-md rounded-3xl shadow-lg dark:text-white text-black">

                      {/* دکمه رفتن به اسلاید بعد */}
                      <button
                          aria-label="Next Slide"
                          onClick={() => slider?.current?.next()}
                          className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full z-30"
                      >
                        <ArrowRight className="dark:text-white text-gray-700 w-5 h-5" />
                      </button>

                      {/* تزئینات */}
                      <span className="absolute bottom-5 left-0 w-[3px] h-[100px] bg-gradient-to-t dark:from-white/80 from-gray-600/50 to-transparent" />
                      <span className="absolute bottom-0 left-5 h-[3px] w-[200px] bg-gradient-to-r dark:from-white/80 from-gray-600/50 to-transparent" />
                      <span className="absolute bottom-0 left-0 w-[24px] h-[24px] rounded-bl-3xl border-l-[3px] border-b-[3px] border-gray-600/50 dark:border-white/80" />
                      <span className="absolute top-5 right-0 w-[3px] h-[100px] bg-gradient-to-b dark:from-white/80 from-gray-600/50 to-transparent" />
                      <span className="absolute top-0 right-5 w-[200px] h-[3px] bg-gradient-to-l dark:from-white/80 from-gray-600/50 to-transparent" />
                      <span className="absolute top-0 right-0 w-[24px] h-[24px] rounded-tr-3xl border-r-[3px] border-t-[3px] dark:border-white/80 border-gray-600/50" />

                      {/* متن و دکمه خرید */}
                      <div className="relative z-20 w-full text-center">
                        <p className="text-sm opacity-80 font-light mb-2">{slide.type}</p>
                        <h2 className="text-xl font-bold mb-6 text-gray-700 dark:text-gray-100">
                          {slide.title}
                        </h2>
                        <button className="px-6 py-2 border dark:border-white/20 hover:bg-black/10 rounded-md dark:hover:bg-white/10 transition-colors duration-300">
                          Buy Now
                        </button>
                      </div>

                      {/* Indicators */}
                      {slider && (
                          <div className="flex justify-center mt-8 space-x-2">
                            {Array.from({ length: slider.current?.track.details.slides.length || 0 }).map((_, i) => (
                                <button
                                    key={i}
                                    aria-label={`Go to slide ${i + 1}`}
                                    onClick={() => slider.current?.moveToIdx(i)}
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                        currentSlide === i
                                            ? "dark:bg-white bg-gray-700 w-4"
                                            : "dark:bg-white/40 bg-gray-400 w-1"
                                    }`}
                                />
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
