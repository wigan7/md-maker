'use client';

import React, { useEffect, useState } from 'react';
import { useProjectStore } from '@/lib/store/useProjectStore';
import {
  PlusCircle,
  FileText,
  Download,
  Moon,
  Search,
  FolderOpen,
  X,
} from 'lucide-react';
import { downloadProjectZip } from '@/lib/utils/export';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNewProject: () => void;
}

export function CommandPalette({ isOpen, onClose, onNewProject }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const { projects, activeProjectId, setActiveProject, getActiveProject, setActiveDocType } = useProjectStore();
  const activeProject = getActiveProject();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExportZip = async () => {
    if (activeProject) {
      await downloadProjectZip(activeProject.name, activeProject.documents);
      onClose();
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/30 dark:bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg glass-floating rounded-ios-2xl overflow-hidden shadow-glass-floating border border-white/30 dark:border-white/10 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-black/5 dark:border-white/5 gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search documents..."
            className="w-full bg-transparent border-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Items */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1 text-sm">
          {/* Create Project */}
          <button
            onClick={() => {
              onClose();
              onNewProject();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-ios-md text-left text-gray-800 dark:text-gray-200 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-blue-500" />
            <span>Create New Project</span>
          </button>

          {/* Active project documents */}
          {activeProject &&
            activeProject.selectedDocTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveDocType(type);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-ios-md text-left text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Go to {type}.md</span>
                </div>
                <span className="text-xs text-gray-400">
                  {activeProject.documents[type]?.status || 'pending'}
                </span>
              </button>
            ))}

          {/* Export Project ZIP */}
          {activeProject && (
            <button
              onClick={handleExportZip}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-ios-md text-left text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Download className="w-4 h-4 text-gray-400" />
              <span>Download Project as ZIP</span>
            </button>
          )}

          {/* Projects Switcher */}
          {projects.length > 0 && (
            <div className="pt-2 border-t border-black/5 dark:border-white/5">
              <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Projects
              </div>
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveProject(p.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-ios-md text-left text-xs transition-colors ${
                    p.id === activeProjectId
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[280px]">{p.name}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {p.selectedDocTypes.length} docs
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Theme switch */}
          <div className="pt-2 border-t border-black/5 dark:border-white/5">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-ios-md text-left text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Moon className="w-4 h-4 text-gray-400" />
              <span>Toggle Dark / Light Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
