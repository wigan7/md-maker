'use client';

import React from 'react';
import { GlassPanel } from '@/components/common/GlassPanel';
import { GlassButton } from '@/components/common/GlassButton';
import { Logo } from '@/components/common/Logo';
import { Project } from '@/types/project';
import { Plus, ArrowRight, Trash2, FileText, Sparkles, FolderKanban } from 'lucide-react';

interface HomeViewProps {
  projects: Project[];
  onNewProject: () => void;
  onSelectProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
}

export function HomeView({
  projects,
  onNewProject,
  onSelectProject,
  onDeleteProject,
}: HomeViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 animate-fade-in">
      {/* Hero Minimal Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-secondary text-xs font-medium text-gray-700 dark:text-gray-300 mb-6 border border-black/5 dark:border-white/5 shadow-glass-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>prdmaker by wigan7</span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className="text-gray-500 dark:text-gray-400">AI Specification Architect</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 max-w-2xl mx-auto leading-tight">
          Turn your idea into <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            production-ready specifications.
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          An adaptive AI architect interviews you, maps your project requirements, and writes comprehensive PRD, Design, Architecture, Database, and Agent docs.
        </p>

        <div className="mt-8 flex justify-center">
          <GlassButton
            variant="primary"
            size="lg"
            onClick={onNewProject}
            icon={<Plus className="w-5 h-5" />}
          >
            Create New Project
          </GlassButton>
        </div>
      </div>

      {/* Projects List */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Your Projects ({projects.length})
          </h2>
        </div>

        {projects.length === 0 ? (
          <GlassPanel
            variant="secondary"
            className="p-12 text-center border-dashed border-black/10 dark:border-white/10"
          >
            <FolderKanban className="w-10 h-10 text-gray-400 mx-auto mb-3 stroke-[1.5]" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              No projects yet
            </p>
            <p className="text-xs text-gray-400 mt-1 mb-5">
              Start by creating your first software specification project.
            </p>
            <GlassButton variant="secondary" size="sm" onClick={onNewProject}>
              Create Project
            </GlassButton>
          </GlassPanel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => {
              const completedDocs = Object.values(project.documents).filter(
                (d) => d?.status === 'completed'
              ).length;
              const totalDocs = project.selectedDocTypes.length;

              return (
                <GlassPanel
                  key={project.id}
                  variant="primary"
                  className="p-5 flex flex-col justify-between hover:shadow-glass-lg hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer relative"
                  onClick={() => onSelectProject(project.id)}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete "${project.name}"?`)) {
                            onDeleteProject(project.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {project.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {completedDocs} / {totalDocs} docs ready
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </GlassPanel>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}