'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentCategory: string;
  completedCategories: string[];
  currentStep: number;
  totalEstimatedSteps: number;
}

const CATEGORIES = [
  'Project',
  'Users',
  'Features',
  'Design',
  'Technology',
  'Data',
];

export function ProgressBar({
  currentCategory,
  completedCategories,
  currentStep,
}: ProgressBarProps) {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {CATEGORIES.map((cat) => {
          const isDone = completedCategories.includes(cat);
          const isCurrent = currentCategory === cat;

          return (
            <div
              key={cat}
              className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 transition-all duration-300 ${
                isDone
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                  : isCurrent
                  ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm border border-blue-500/40 font-semibold'
                  : 'text-gray-400 dark:text-gray-500 font-normal'
              }`}
            >
              {isDone ? (
                <Check className="w-3 h-3 text-blue-500" />
              ) : isCurrent ? (
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
              )}
              <span>{cat}</span>
            </div>
          );
        })}
      </div>

      {/* Step dot indicator */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <span>Step {currentStep}</span>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <span>Adaptive Discovery</span>
      </div>
    </div>
  );
}
