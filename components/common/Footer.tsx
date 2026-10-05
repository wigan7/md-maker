'use client';

import React from 'react';
import { Github, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            prdmaker
          </span>
          <span>•</span>
          <span>AI-Powered Specification Engine</span>
        </div>

        {/* Center/Right: wigan7 on GitHub Link */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/wigan7"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-secondary text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all duration-200"
          >
            <Github className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            <span className="font-medium text-xs">wigan7 on github</span>
          </a>
        </div>
      </div>
    </footer>
  );
}