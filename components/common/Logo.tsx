'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const iconDimensions = {
    sm: { box: 24, radius: 6 },
    md: { box: 32, radius: 9 },
    lg: { box: 44, radius: 12 },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Subtle Ambient Glow Behind Logo */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-500 blur-[8px] opacity-40 dark:opacity-50" />

        <svg
          width={iconDimensions.box}
          height={iconDimensions.box}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Background Gradient */}
            <linearGradient id="prd-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            {/* Specular Highlight */}
            <linearGradient id="prd-specular" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Glyph Inner Shadow/Glow */}
            <linearGradient id="prd-glyph" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0E7FF" />
            </linearGradient>
          </defs>

          {/* Squircle Tile Surface */}
          <rect
            x="1"
            y="1"
            width="38"
            height="38"
            rx="11"
            fill="url(#prd-bg-grad)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.2"
          />

          {/* Glass Light Reflection Arc */}
          <path
            d="M 2 12 Q 2 2 12 2 L 28 2 Q 38 2 38 12 Q 20 18 2 12 Z"
            fill="url(#prd-specular)"
          />

          {/* Geometric Stylized 'P' & Specification Layers */}
          {/* Stem of P */}
          <rect
            x="11"
            y="10"
            width="4.5"
            height="20"
            rx="2.25"
            fill="url(#prd-glyph)"
          />

          {/* Loop of P (Smooth rounded curve with inner void) */}
          <path
            d="M 13 10 H 22.5 C 26.6 10 29.5 12.8 29.5 16.5 C 29.5 20.2 26.6 23 22.5 23 H 13 V 10 Z"
            fill="url(#prd-glyph)"
          />
          <path
            d="M 15.5 13.5 H 22 C 24.3 13.5 25.8 14.8 25.8 16.5 C 25.8 18.2 24.3 19.5 22 19.5 H 15.5 V 13.5 Z"
            fill="url(#prd-bg-grad)"
          />

          {/* Dynamic AI Spec Diamond Star */}
          <path
            d="M 27.5 25.5 C 28 27.2 28.8 28 30.5 28.5 C 28.8 29 28 29.8 27.5 31.5 C 27 29.8 26.2 29 24.5 28.5 C 26.2 28 27 27.2 27.5 25.5 Z"
            fill="#67E8F9"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Typography: prdmaker by wigan7 */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[15px] tracking-tight text-gray-900 dark:text-gray-100 flex items-center">
              prd<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">maker</span>
            </span>
            <span className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              AI
            </span>
          </div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-wide mt-0.5">
            by wigan7
          </span>
        </div>
      )}
    </div>
  );
}