'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Field {
    name: string;
    type: string;
    placeholder: string;
    icon: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
}

interface AuthFormProps {
    title: string;
    fields: Field[];
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    error?: string | null;
    redirectText: string;
    redirectHref: string;
}

export default function AuthForm({
                                     title,
                                     fields,
                                     onSubmit,
                                     submitLabel,
                                     error,
                                     redirectText,
                                     redirectHref,
                                 }: AuthFormProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md
        dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20
        bg-white shadow-lg p-8 rounded-2xl"
        >
            <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-gray-800">
                {title}
            </h2>

            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mb-4 bg-red-100 dark:bg-red-500/20 p-2 rounded-lg text-center"
                >
                    {error}
                </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
                {fields.map((field) => (
                    <div className="relative" key={field.name}>
                        <div className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-300">
                            {field.icon}
                        </div>
                        <input
                            required
                            type={field.type}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full pl-10 pr-3 py-3 rounded-lg
                bg-gray-100 dark:bg-white/20
                text-gray-800 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-300
                border border-gray-300 dark:border-white/30
                focus:outline-none focus:border-green-500 dark:focus:border-green-400
                focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-400/50"
                        />
                    </div>
                ))}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all
            bg-gradient-to-r from-purple-300 to-pink-300 text-purple-900
            dark:from-green-600 dark:to-green-700 dark:text-white"
                >
                    {submitLabel}
                </motion.button>
            </form>

            <p className="text-center text-sm mt-4 dark:text-gray-200 text-gray-600">
                {redirectText} <a href={redirectHref} className="underline dark:text-green-400 text-purple-500">Click here</a>
            </p>
        </motion.div>
    );
}
