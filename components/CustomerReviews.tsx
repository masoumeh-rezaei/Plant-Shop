// components/CustomerReviews.tsx
import Image from "next/image";
import TransparentCard from "./TransparentCard"; // ایمپورت کردن کارتی که ساختیم

// داده‌های نمونه برای نظرات
const reviewsData = [
    {
        name: "Main Josi",
        avatarUrl: "/avatars/avatar1.png", // مسیر عکس‌ها را متناسب با پروژه خود تغییر دهید
        rating: 5,
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
        name: "Alina Thakur",
        avatarUrl: "/avatars/avatar2.png",
        rating: 5,
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
        name: "Max M",
        avatarUrl: "/avatars/avatar3.png",
        rating: 5,
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
];

// کامپوننت کوچکی برای نمایش آیکون ستاره
const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


export default function CustomerReviews() {
    return (
        // پس‌زمینه کلی بخش نظرات
        <section className="bg-[#1a2e26] py-20 px-4">
            <div className="container mx-auto">

                {/* بخش عنوان */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Customer Review
                    </h2>
                    {/* المان گرافیکی زیر عنوان */}
                    <div className="flex justify-center">
                        <span className="inline-block w-16 h-8 border-l-4 border-b-4 border-green-400 rounded-bl-lg"></span>
                    </div>
                </div>

                {/* بخش کارت‌های نظرات */}
                <div className="flex flex-wrap justify-center items-stretch gap-8">
                    {reviewsData.map((review) => (
                        <div key={review.name} className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
                            <TransparentCard>
                                <div className="flex flex-col h-full">
                                    {/* بخش بالایی کارت: عکس و نام */}
                                    <div className="flex items-center mb-4">
                                        <Image
                                            src={review.avatarUrl}
                                            alt={`Avatar of ${review.name}`}
                                            width={60}
                                            height={60}
                                            className="rounded-full object-cover border-2 border-green-400/50"
                                        />
                                        <div className="ml-4">
                                            <h3 className="font-bold text-lg text-white">{review.name}</h3>
                                            <div className="flex mt-1">
                                                {Array.from({ length: review.rating }).map((_, i) => (
                                                    <StarIcon key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* متن نظر */}
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {review.reviewText}
                                    </p>
                                </div>
                            </TransparentCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}