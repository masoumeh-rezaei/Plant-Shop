'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface MobileNavProps {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<MobileNavProps> = ({ showMenu, setShowMenu }) => {
  const pathName = usePathname();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleLinkClick = () => setShowMenu(false);
  const handleBackdropClick = () => setShowMenu(false);
  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setShowMenu(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setShowMenu]);

  const menues = [
    { id: 1, name: "home", link: '/' },
    { id: 2, name: "login", link: '/login' },
    { id: 3, name: "More", link: '#menu' },
    { id: 4, name: "Contact", link: '/impressum' },
  ];

  return (
      <>
        {showMenu && (
            <div
                className="fixed top-0 left-0 w-full h-screen bg-black/40 z-50"
                onClick={handleBackdropClick}
            />
        )}

        <div
            onClick={handleMenuClick}
            className={`${showMenu ? 'left-0' : '-left-[100%]'}
        fixed top-0 h-screen sm:w-[40%] w-[75%]
        bg-darkBg text-white dark:bg-darkBg dark:text-gray-200
        transition-all duration-500 pt-5 pb-6 px-8 flex flex-col justify-between
        z-[9999]`}
        >
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center">
              <p className="text-3xl font-bold">Plant</p>
              <small className="ml-2 text-gray-300">Moon</small>
            </div>

            <ul className="flex flex-col gap-2 w-full mt-2">
              {menues.map((menu) => (
                  <li
                      key={menu.id}
                      onMouseEnter={() => setHoveredId(menu.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`w-full py-3 pl-2 rounded-md transition-all duration-300 transform
                  ${
                          hoveredId === menu.id
                              ? 'scale-105 text-white dark:text-white'
                              : pathName === menu.link
                                  ? 'text-blue-400 scale-110 dark:text-blue-400'
                                  : hoveredId && hoveredId !== menu.id
                                      ? 'text-slate-400 dark:text-slate-500 scale-100'
                                      : 'text-white dark:text-gray-200 scale-100'
                      }
                `}
                  >
                    <Link
                        href={menu.link}
                        onClick={handleLinkClick}
                        className="flex gap-4"
                    >
                      <span>{menu.name}</span>
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          <div className="footer mt-6 text-sm text-slate-400 dark:text-slate-500">
            <h1>@2024 All rights reserved by Masomeh</h1>
          </div>
        </div>
      </>
  );
};

export default MobileNav;
