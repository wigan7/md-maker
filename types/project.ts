export type DocumentTypeId = 'PRD' | 'DESIGN' | 'AGENTS' | 'ARCHITECTURE' | 'DATABASE';

export type DocumentStatus = 'pending' | 'generating' | 'completed' | 'error';

export interface DocumentVersion {
  version: number;
  content: string;
  createdAt: string;
  feedbackSummary?: string;
}

export interface ProjectDocument {
  id: DocumentTypeId;
  name: string;
  fileName: string;
  status: DocumentStatus;
  content: string;
  currentVersion: number;
  versions: DocumentVersion[];
  lastUpdated: string;
  error?: string;
}

export type ProjectStatus = 'setup' | 'interview' | 'assumptions' | 'generating' | 'workspace';

export interface Project {
  id: string;
  name: string;
  description: string;
  selectedDocTypes: DocumentTypeId[];
  documents: Partial<Record<DocumentTypeId, ProjectDocument>>;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}