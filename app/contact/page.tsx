"use client";

import SectionTitle from "@/components/(landing)/Title";

export default function ContactPage() {
    const phoneNumber = "989106765667";
    const message = encodeURIComponent("hi masoomeh I wanna contact you..");

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-20 bg-gradient-to-br from-purple-100 via-pink-200 to-purple-100 dark:from-darkBg dark:via-emerald-900 dark:to-darkBg transition-colors duration-500">

            <SectionTitle className="text-gray-800 dark:text-green-200 mb-12 text-4xl md:text-5xl font-extrabold">
                Contact Me
            </SectionTitle>

            <div className="bg-white dark:bg-green-900/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-md w-full flex flex-col gap-8 border-2 border-transparent  transition-all duration-300">

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-700 dark:text-green-300">Name</h3>
                    <p className="text-gray-700 dark:text-green-200 text-md md:text-lg font-medium">Masoumeh Rezaei</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-700 dark:text-green-300">Phone</h3>
                    <p className="text-gray-700 dark:text-green-200 text-md md:text-lg font-medium">09106765667</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-700 dark:text-green-300">Email</h3>
                    <p className="text-gray-700 dark:text-green-200 text-md md:text-lg font-medium">masomehrezaei83.r@gmail.com</p>
                </div>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 py-3 px-6 bg-green-600 dark:bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 text-center"
                >
                    Send WhatsApp Message
                </a>

            </div>
        </div>
    );
}
