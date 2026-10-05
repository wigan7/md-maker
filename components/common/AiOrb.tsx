'use client';

import React from 'react';

interface AiOrbProps {
  size?: 'sm' | 'md' | 'lg';
  isThinking?: boolean;
  className?: string;
}

export function AiOrb({ size = 'md', isThinking = false, className = '' }: AiOrbProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
      {/* Outer subtle glow */}
      <div
        className={`absolute inset-0 rounded-full blur-[6px] transition-all duration-700 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 ${
          isThinking ? 'opacity-80 scale-125 animate-pulse' : 'opacity-40 scale-100'
        }`}
      />

      {/* Main glass orb sphere */}
      <div
        className={`relative w-full h-full rounded-full border border-white/40 shadow-inner bg-gradient-to-tr from-blue-600/80 via-indigo-500/80 to-sky-400/90 ${
          isThinking ? 'animate-orb-pulse' : ''
        }`}
      >
        {/* Specular highlight reflecting light */}
        <div className="absolute top-[12%] left-[18%] w-[35%] h-[35%] rounded-full bg-white/70 blur-[0.5px]" />
      </div>
    </div>
  );
}

