import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/(landing)/Header';
import React from "react";
import Footer from "@/components/(landing)/Footer";

export const metadata = {
    title: 'My Flower Shop',
    description: 'A demo flower shop — browse roses, bouquets, houseplants and more.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // Providers must be client components; but we can wrap them in the layout by using client children
    return (
        <html lang="en">
        <body>
        {/* HeaderClient consumes contexts; so create provider wrappers here */}
        <AuthProvider>
            <CartProvider>
                <Header />
                <main>{children}</main>
                <Footer/>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
