'use client';

import React from 'react';
import { useLanguageStore } from '@/lib/store/useLanguageStore';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center glass-secondary p-0.5 rounded-full border border-black/5 dark:border-white/10 shadow-glass-sm select-none">
      <button
        onClick={() => setLanguage('id')}
        className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          language === 'id'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
        title="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          language === 'en'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
}