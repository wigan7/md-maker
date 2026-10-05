'use client';

import React, { useState } from 'react';
import { useProjectStore } from '@/lib/store/useProjectStore';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HomeView } from '@/components/home/HomeView';
import { CreateProjectModal } from '@/components/home/CreateProjectModal';
import { InterviewCanvas } from '@/components/interview/InterviewCanvas';
import { DocumentWorkspace } from '@/components/workspace/DocumentWorkspace';
import { CommandPalette } from '@/components/common/CommandPalette';
import { DocumentTypeId } from '@/types/project';

export default function App() {
  const {
    projects,
    activeProjectId,
    getActiveProject,
    createProject,
    setActiveProject,
    updateProjectStatus,
    deleteProject,
  } = useProjectStore();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const activeProject = getActiveProject();

  const handleCreateProject = (
    name: string,
    description: string,
    docTypes: DocumentTypeId[]
  ) => {
    createProject(name, description, docTypes);
  };

  const handleProceedToWorkspace = () => {
    if (activeProject) {
      updateProjectStatus(activeProject.id, 'workspace');
    }
  };

  return (
    <main className="flex-1 flex flex-col justify-between min-h-screen">
      {/* Floating Translucent Top Navigation */}
      <Header
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onGoHome={() => setActiveProject(null)}
      />

      {/* Main View Router */}
      <div className="flex-1 pt-16 flex flex-col">
        {!activeProject ? (
          <HomeView
            projects={projects}
            onNewProject={() => setIsCreateOpen(true)}
            onSelectProject={(id) => setActiveProject(id)}
            onDeleteProject={(id) => deleteProject(id)}
          />
        ) : activeProject.status === 'interview' ||
          activeProject.status === 'assumptions' ? (
          <InterviewCanvas
            project={activeProject}
            onProceedToGenerate={handleProceedToWorkspace}
            onExit={() => setActiveProject(null)}
          />
        ) : (
          <DocumentWorkspace project={activeProject} />
        )}
      </div>

      {/* Global Minimal Footer: wigan7 on github */}
      {(!activeProject || activeProject.status !== 'workspace') && <Footer />}

      {/* Global Modals */}
      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateProject}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNewProject={() => setIsCreateOpen(true)}
      />
    </main>
  );
}