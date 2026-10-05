import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, DocumentTypeId, ProjectDocument, DocumentStatus } from '@/types/project';
import { DOCUMENT_REGISTRY } from '@/lib/documents/registry';

interface ProjectStoreState {
  projects: Project[];
  activeProjectId: string | null;
  activeDocType: DocumentTypeId | null;

  // Actions
  createProject: (name: string, description: string, docTypes: DocumentTypeId[]) => Project;
  setActiveProject: (id: string | null) => void;
  setActiveDocType: (type: DocumentTypeId | null) => void;
  getActiveProject: () => Project | undefined;
  updateProjectStatus: (id: string, status: Project['status']) => void;
  updateDocumentStatus: (projectId: string, docType: DocumentTypeId, status: DocumentStatus, error?: string) => void;
  updateDocumentContent: (projectId: string, docType: DocumentTypeId, content: string) => void;
  addDocumentVersion: (projectId: string, docType: DocumentTypeId, content: string, feedback?: string) => void;
  restoreDocumentVersion: (projectId: string, docType: DocumentTypeId, version: number) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStoreState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      activeDocType: null,

      createProject: (name, description, docTypes) => {
        const id = `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const now = new Date().toISOString();

        const docs: Partial<Record<DocumentTypeId, ProjectDocument>> = {};
        for (const type of docTypes) {
          const meta = DOCUMENT_REGISTRY[type];
          docs[type] = {
            id: type,
            name: meta.name,
            fileName: meta.fileName,
            status: 'pending',
            content: '',
            currentVersion: 0,
            versions: [],
            lastUpdated: now,
          };
        }

        const newProject: Project = {
          id,
          name,
          description,
          selectedDocTypes: docTypes,
          documents: docs,
          status: 'interview',
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          projects: [newProject, ...state.projects],
          activeProjectId: id,
          activeDocType: docTypes[0] || null,
        }));

        return newProject;
      },

      setActiveProject: (id) => {
        const project = get().projects.find((p) => p.id === id);
        set({
          activeProjectId: id,
          activeDocType: project ? (project.selectedDocTypes[0] || null) : null,
        });
      },

      setActiveDocType: (type) => set({ activeDocType: type }),

      getActiveProject: () => {
        const { projects, activeProjectId } = get();
        return projects.find((p) => p.id === activeProjectId);
      },

      updateProjectStatus: (id, status) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      updateDocumentStatus: (projectId, docType, status, error) => {
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const doc = p.documents[docType];
            if (!doc) return p;
            return {
              ...p,
              documents: {
                ...p.documents,
                [docType]: {
                  ...doc,
                  status,
                  error,
                  lastUpdated: new Date().toISOString(),
                },
              },
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      updateDocumentContent: (projectId, docType, content) => {
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const doc = p.documents[docType];
            if (!doc) return p;

            return {
              ...p,
              documents: {
                ...p.documents,
                [docType]: {
                  ...doc,
                  content,
                  status: 'completed',
                  lastUpdated: new Date().toISOString(),
                },
              },
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      addDocumentVersion: (projectId, docType, content, feedback) => {
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const doc = p.documents[docType];
            if (!doc) return p;

            const nextVersion = doc.currentVersion + 1;
            const newVersionEntry = {
              version: nextVersion,
              content,
              createdAt: new Date().toISOString(),
              feedbackSummary: feedback,
            };

            return {
              ...p,
              documents: {
                ...p.documents,
                [docType]: {
                  ...doc,
                  content,
                  status: 'completed',
                  currentVersion: nextVersion,
                  versions: [...doc.versions, newVersionEntry],
                  lastUpdated: new Date().toISOString(),
                },
              },
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      restoreDocumentVersion: (projectId, docType, version) => {
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const doc = p.documents[docType];
            if (!doc) return p;

            const target = doc.versions.find((v) => v.version === version);
            if (!target) return p;

            return {
              ...p,
              documents: {
                ...p.documents,
                [docType]: {
                  ...doc,
                  content: target.content,
                  currentVersion: version,
                  lastUpdated: new Date().toISOString(),
                },
              },
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          activeProjectId: state.activeProjectId === id ? null : state.activeProjectId,
        }));
      },
    }),
    {
      name: 'md-maker-projects-v1',
    }
  )
);

