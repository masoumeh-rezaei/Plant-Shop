"use client";

import React, { useRef, useState } from "react";
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

interface Slide {
  title: string;
  type: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Calathea plant",
    type: "Trendy House Plant",
    image: "/carousel1.png",
  },
  {
    title: "Lavender Peace",
    type: "Flower",
    image: "/carousel2.png",
  },
  {
    title: "Rose Elegance",
    type: "Rose",
    image: "/carousel3.png",
  },
];

const AutoplayPlugin: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 4000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  
  const keenSliderInstanceRef = useRef<KeenSliderInstance | null>(null);

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "snap",
      slides: {
        perView: 1,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created(slider) {
        setLoaded(true);
        keenSliderInstanceRef.current = slider;
      },
    },
    [AutoplayPlugin]
  );

  return (
    <div className="relative w-full mx-auto px-4 py-10  min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-sm mx-auto">
        <div ref={sliderRef} className="keen-slider h-[500px]">
          {slides.map((slide: Slide, idx: number) => (
            <div
              key={idx}
              className="keen-slider__slide flex justify-center p-4"
            >
              <div className="flex flex-col items-center">
                {/* Image positioned on top with negative margin */}
                <div className="w-2/3 h-auto z-20 shadow-2xl">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover rounded-[2rem] -mb-30" // margin-bottom: -80px
                  />
                </div>

                {/* Glass Card Container positioned on top of the image's negative margin */}
                <div className="relative w-full bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-[3rem] shadow-2xl p-6   pt-28 flex flex-col items-center z-10">
                  {/* Content inside the card */}
                  <div className="relative z-20 text-center w-full">
                    <p className="text-sm opacity-80 font-light mb-2">
                      {slide.type}
                    </p>
                    <h2 className="text-3xl font-semibold mb-6">
                      {slide.title}
                    </h2>
                    <button className="px-6 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors duration-300">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dots for navigation */}
        {loaded && keenSliderInstanceRef.current && (
          <div className="flex justify-center mt-8 space-x-2">
            {[
              ...Array(keenSliderInstanceRef.current.track.details.slides.length).keys(),
            ].map((idx: number) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    keenSliderInstanceRef.current?.moveToIdx(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "bg-white w-6" : "bg-white/40 w-2"
                  }`}
                ></button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}