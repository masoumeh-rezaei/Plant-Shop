import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';


interface QuickLinkProps {
    href: string;
    label: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ href, label }) => (
    <a href={href} className="hover:text-white transition-colors duration-200">
        {label}
    </a>
);

export default function Footer(): React.ReactElement {
    return (
        <footer className="dark:bg-[#1A3636] bg-[#1D1616] text-white py-12 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Section 1: Logo & Description */}
                <div className="flex flex-col items-start gap-6">
                    <div className="flex items-center gap-2">
                        {/* Replace with your Planto logo image */}

                        <h3 className="text-3xl font-bold">Plant</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                {/* Section 2: Quick Links */}
                <div className="flex flex-col items-start">
                    <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                    <nav className="flex flex-col gap-2 text-gray-400 text-sm">
                        <QuickLink href="#" label="Home" />
                        <QuickLink href="#" label="Plant Type's" />
                        <QuickLink href="#" label="Contact" />
                        <QuickLink href="#" label="Privacy" />
                    </nav>
                </div>

                {/* Section 3: Subscription Form */}
                <div className="flex flex-col items-start">
                    <h4 className="font-semibold text-lg mb-4">For Every Update</h4>
                    <div className="flex w-full max-w-sm">
                        <input
                            type="email"
                            placeholder="Enter Email..."
                            className="flex-grow p-3 rounded-l-md border border-gray-600 bg-transparent focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-200 placeholder-gray-500"
                        />
                        <button className="bg-white text-black font-semibold px-6 py-3 rounded-r-md hover:bg-gray-200 transition-colors duration-200">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section: Social & Copyright */}
            <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                <div className="flex gap-4 mb-4 md:mb-0">
                    <a href="#" aria-label="Facebook" className="hover:text-white transition-colors duration-200"><FaFacebookF /></a>
                    <a href="#" aria-label="Twitter" className="hover:text-white transition-colors duration-200"><FaTwitter /></a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors duration-200"><FaLinkedinIn /></a>
                </div>
                <p>Planto © All right reserve</p>
            </div>
        </footer>
    );
}