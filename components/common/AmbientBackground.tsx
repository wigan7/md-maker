'use client';

import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary Indigo/Blue Blob */}
      <div
        className="absolute -top-[15%] left-[10%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-25 dark:opacity-20 animate-blob-float-slow bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400"
      />

      {/* Secondary Soft Purple/Violet Blob */}
      <div
        className="absolute top-[35%] -right-[10%] w-[550px] h-[550px] rounded-full blur-[140px] opacity-20 dark:opacity-15 animate-blob-float-reverse bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
      />

      {/* Tertiary Subtle Cyan Glow */}
      <div
        className="absolute -bottom-[20%] left-[25%] w-[650px] h-[650px] rounded-full blur-[150px] opacity-15 dark:opacity-10 animate-blob-float-slow bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"
      />
    </div>
  );
}

