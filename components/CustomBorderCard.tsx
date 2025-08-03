"use client";

import { ReactNode } from "react";

export default function CustomBorderCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative  mx-auto p-6 bg-transparent backdrop-blur-md rounded-3xl shadow-lg text-white text-center overflow-hidden">

      {/* محتوا */}
      {children}

      {/* گوشه ها */}
      {/* بالا چپ */}
      <span className="absolute top-0 left-0 w-[24px] h-[24px] rounded-tl-3xl border-t-[3px] border-l-[3px] border-white/90 pointer-events-none" />
      {/* بالا راست */}
      <span className="absolute top-0 right-0 w-[24px] h-[24px] rounded-tr-3xl border-t-[3px] border-r-[3px] border-white/90 pointer-events-none" />
      {/* پایین چپ */}
      <span className="absolute bottom-0 left-0 w-[24px] h-[24px] rounded-bl-3xl border-b-[3px] border-l-[3px] border-white/90 pointer-events-none" />
      {/* پایین راست */}
      <span className="absolute bottom-0 right-0 w-[24px] h-[24px] rounded-br-3xl border-b-[3px] border-r-[3px] border-white/90 pointer-events-none" />

      {/* خطوط راست و چپ - کامل */}
      <span className="absolute top-6 bottom-6 right-0 w-[3px] bg-white/90 pointer-events-none" />
      <span className="absolute top-6 bottom-6 left-0 w-[3px] bg-white/90 pointer-events-none" />

      {/* خطوط بالا و پایین با gradient محو */}
      <span
        className="absolute top-0 left-6 right-6 h-[3px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)",
        }}
      />
      <span
        className="absolute bottom-0 left-6 right-6 h-[3px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)",
        }}
      />
    </div>
  );
}
