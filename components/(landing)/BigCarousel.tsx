"use client";

import React, { useRef, useState } from "react";
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/(landing)/Title";
import CustomBorderCard from "@/components/(landing)/CustomBorderCard";


interface Slide {
    title: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        title: "We Have Small And Best O2 Plants Collection's",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/greenhouse2.jpg",
    },
    {
        title: "Another Plant Collection",
        description: "This is another description for a different plant. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/greenhouse4.jpg",
    },
    {
        title: "The Best O2 Plants",
        description: "A third collection of plants. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
        image: "/greenhouse5.jpg",
    },
];
const AutoplayPlugin: KeenSliderPlugin = (slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;
    let isStopped = false;

    function clearNextTimeout() {
        clearTimeout(timeout);
    }

    function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver || isStopped) return;
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

    slider.on("destroyed", () => {
        isStopped = true;
        clearNextTimeout();
    });
};

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const keenSliderInstanceRef = useRef<KeenSliderInstance | null>(null);

    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            slides: { perView: 1 },
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

            <div className="min-h-screen py-10 flex flex-col items-center justify-center">
                <SectionTitle>
                    Our Best O2
                </SectionTitle>

                <CustomBorderCard >
                <div className="relative w-full max-w-7xl mx-auto p-8  text-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Image Section */}
                        <div className="relative w-full  h-[330px] md:h-[650px] flex items-center justify-center">
                            <div ref={sliderRef} className="keen-slider h-full w-full">
                                {slides.map((slide: Slide, idx: number) => (
                                    <div key={idx} className="keen-slider__slide flex justify-center items-center">
                                        <div className="relative w-[60%] h-full flex items-center justify-center">
                                            <div className="w-full h-full relative">
                                                <div className="absolute inset-0 z-10">
                                                    <Image
                                                        src={slide.image}
                                                        alt={slide.title}
                                                        className="rounded-[40px] object-cover"
                                                        fill
                                                    />
                                                </div>
                                                <div className="absolute inset-0 z-0 rounded-[40px] bg-white/5 backdrop-filter backdrop-blur-3xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Text & Controls */}
                        <div className="relative w-full h-full flex flex-col justify-center p-8">
                            <div className="w-full">
                                <div className="w-full md:h-[350px] h-[430px] relative px-10 py-12 rounded-[40px] bg-[#DCC5B2] dark:bg-[#2F5249] backdrop-filter backdrop-blur-3xl">
                                    <div className="relative z-10">
                                        <h2 className="text-3xl font-bold mb-4 text-black dark:text-gray-300">
                                            {slides[currentSlide].title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                                            {slides[currentSlide].description}
                                        </p>
                                        <button className="flex items-center gap-2 text-black bg-transparent dark:text-white px-6 py-2 rounded-md border border-black dark:border-gray-300 transition-colors">
                                            Explore
                                        </button>
                                    </div>
                                </div>

                                {/* Dots & Arrows */}
                                <div className="mt-8 flex justify-between items-center px-10">
                                    <div className="flex space-x-2">
                                        {loaded && keenSliderInstanceRef.current?.track.details && (
                                            [...Array(keenSliderInstanceRef.current.track.details.slides.length).keys()].map((idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => keenSliderInstanceRef.current?.moveToIdx(idx)}
                                                    className={`h-1 rounded-full transition-all duration-300 ${
                                                        currentSlide === idx
                                                            ? "dark:bg-white bg-black w-8"
                                                            : "bg-black dark:bg-white/40 w-2"
                                                    }`}
                                                ></button>
                                            ))
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => keenSliderInstanceRef.current?.prev()}
                                            className="p-2 border dark:border-white/30 rounded-full dark:hover:bg-white/10 border-black text-black dark:text-white transition-colors"
                                        >
                                            <ArrowRight className="w-5 h-5 transform rotate-180" />
                                        </button>
                                        <button
                                            onClick={() => keenSliderInstanceRef.current?.next()}
                                            className="p-2 border dark:border-white/30 rounded-full dark:hover:bg-white/10 text-black dark:text-white border-black transition-colors"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </CustomBorderCard>
            </div>


    );
}
