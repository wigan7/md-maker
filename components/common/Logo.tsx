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
      {/* SVG Icon Emblem: PreVibe */}
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
            <linearGradient id="previbe-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            {/* Specular Highlight */}
            <linearGradient id="previbe-specular" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Glyph Inner Shadow/Glow */}
            <linearGradient id="previbe-glyph" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0E7FF" />
            </linearGradient>

            {/* Neon Vibe Wave Accent */}
            <linearGradient id="previbe-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>

          {/* Squircle Tile Surface */}
          <rect
            x="1"
            y="1"
            width="38"
            height="38"
            rx="11"
            fill="url(#previbe-bg-grad)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.2"
          />

          {/* Glass Light Reflection Arc */}
          <path
            d="M 2 12 Q 2 2 12 2 L 28 2 Q 38 2 38 12 Q 20 18 2 12 Z"
            fill="url(#previbe-specular)"
          />

          {/* Architectural 'P' Stem */}
          <rect
            x="9.5"
            y="9.5"
            width="4"
            height="21"
            rx="2"
            fill="url(#previbe-glyph)"
          />

          {/* Upper Loop of 'P' */}
          <path
            d="M 11.5 9.5 H 19.5 C 23.5 9.5 26 12.2 26 15.8 C 26 19.4 23.5 22.1 19.5 22.1 H 11.5 V 9.5 Z"
            fill="url(#previbe-glyph)"
          />
          <path
            d="M 13.5 13 H 19 C 21.3 13 22.6 14.2 22.6 15.8 C 22.6 17.4 21.3 18.6 19 18.6 H 13.5 V 13 Z"
            fill="url(#previbe-bg-grad)"
          />

          {/* Dynamic Vibe Pulse Waves (Frequency Bars) */}
          <rect x="25" y="18" width="2.5" height="10" rx="1.25" fill="url(#previbe-wave)" />
          <rect x="29" y="13.5" width="2.5" height="14.5" rx="1.25" fill="url(#previbe-wave)" />
          <rect x="33" y="19.5" width="2.5" height="8.5" rx="1.25" fill="url(#previbe-wave)" />

          {/* AI Spark Star Above Waveform */}
          <path
            d="M 30.2 6.5 C 30.6 7.8 31.2 8.4 32.5 8.8 C 31.2 9.2 30.6 9.8 30.2 11.1 C 29.8 9.8 29.2 9.2 27.9 8.8 C 29.2 8.4 29.8 7.8 30.2 6.5 Z"
            fill="#67E8F9"
          />
        </svg>
      </div>

      {/* Typography: PreVibe by wigan7 */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[15px] tracking-tight text-gray-900 dark:text-gray-100 flex items-center">
              Pre<span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">Vibe</span>
            </span>
            <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
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