'use client';

import React from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useProjectStore } from '@/lib/store/useProjectStore';
import { Command, FolderKanban, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette?: () => void;
  onGoHome?: () => void;
}

export function Header({ onOpenCommandPalette, onGoHome }: HeaderProps) {
  const { activeProjectId, getActiveProject, setActiveProject } = useProjectStore();
  const activeProject = getActiveProject();

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 max-w-6xl mx-auto pointer-events-none">
      <div className="glass-floating px-4 py-2.5 rounded-full flex items-center justify-between pointer-events-auto shadow-glass-md">
        {/* Brand / Logo: prdmaker by wigan7 */}
        <div
          onClick={() => {
            setActiveProject(null);
            if (onGoHome) onGoHome();
          }}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <Logo size="md" />
          {activeProject && (
            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-black/10 dark:border-white/10">
              <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                Project
              </span>
              <span className="text-xs text-gray-800 dark:text-gray-200 font-semibold truncate max-w-[160px]">
                {activeProject.name}
              </span>
            </div>
          )}
        </div>

        {/* Floating Center Pill: Navigation */}
        <div className="hidden sm:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full text-xs font-medium">
          <button
            onClick={() => {
              setActiveProject(null);
              if (onGoHome) onGoHome();
            }}
            className={`px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
              !activeProjectId
                ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            Projects
          </button>

          {activeProject && (
            <button
              onClick={() => {}}
              className={`px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                activeProjectId
                  ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Workspace
            </button>
          )}
        </div>

        {/* Right Actions: Command Palette & Theme */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono text-[11px]">⌘K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}