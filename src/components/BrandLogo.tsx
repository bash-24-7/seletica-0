import React from "react";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 60 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 sm:h-10 w-auto mb-1"
      >
        <path
          d="M42 16C39 9 29 7 22 12C15 17 16 26 24 31L36 38C44 43 46 53 39 60C32 67 20 65 15 56"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M45 20C41 12 31 10 24 15C18 20 20 28 28 33L39 40C46 45 47 54 41 60"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
      <span className="font-serif tracking-[0.32em] text-xs sm:text-sm uppercase leading-none">
        SELETICA
      </span>
    </div>
  );
}