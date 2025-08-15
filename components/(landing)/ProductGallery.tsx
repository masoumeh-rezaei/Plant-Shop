"use client";

import TransparentCard from "@/components/(landing)/TransparentCard";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import SectionTitle from "@/components/(landing)/Title";
import Link from "next/link";

const products = [
    {
        title: "Cal 874 plant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: "Rs. 259/-",
        imageUrl: "/product6.png",
    },
    {
        title: "Show plant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: "Rs. 759/-",
        imageUrl: "/product3.png",
    },
    {
        title: "Cala plant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: "Rs. 699/-",
        imageUrl: "/product4.png",
    },{
        title: "Cal 874 plant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: "Rs. 259/-",
        imageUrl: "/product9.png",
    },
    {
        title: "Show plant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: "Rs. 759/-",
        imageUrl: "/product10.png",
    },
    {
        title: "Cala plant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        price: "Rs. 699/-",
        imageUrl: "/product7.png",
    },
];

export default function ProductGallery() {
    return (

        <div className="md:p-20 p-10  min-h-screen flex flex-col items-center justify-center">

            {/*  the SectionTitle component */}
            <SectionTitle className={'text-gray-600 dark:text-gray-300'}>
                Gallery
            </SectionTitle>

            {/* 3. We add a top margin (mt-16) to create space between the title and the product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-y-20 mt-16 m-auto ">

                {products.map((product, index) => (
                    <div key={index} className={'h-[300px] w-[80%] m-auto  mt-20 flex justify-center items-center'}>
                        <TransparentCard >
                            <div className="relative -mt-20 z-10 w-full flex justify-center">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.title}
                                    width={200}
                                    height={200}
                                    className="object-cover rounded-xl w-50"
                                />
                            </div>
                            <div className="flex flex-col gap-4 mt-4 dark:text-gray-100 text-black">
                                <h3 className="text-xl font-bold dark:text-gray-100 text-black">{product.title}</h3>
                                <p className="text-sm opacity-80 dark:text-gray-100 text-black">{product.description}</p>

                                <div className="flex items-center justify-between pt-4">
                                    <span className="text-xl font-semibold dark:text-gray-100 text-black">{product.price}</span>
                                    <Link href={'/category'} className={'cursor-pointer'}>
                                        <button className="p-2 bg-white/20 hover:bg-white/30 dark:border-black border dark:border-none transition-colors duration-300 rounded-lg">
                                            <ShoppingBag className="w-5 h-5 dark:text-white  text-black " />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </TransparentCard>
                    </div>
                ))}
            </div>
        </div>
    );
}