'use client';

import React, { useState, useEffect } from 'react';
import { Project, DocumentTypeId } from '@/types/project';
import { useProjectStore } from '@/lib/store/useProjectStore';
import { useInterviewStore } from '@/lib/store/useInterviewStore';
import { DocumentSidebar } from './DocumentSidebar';
import { MarkdownEditor } from './MarkdownEditor';
import { MarkdownPreview } from './MarkdownPreview';
import { DocumentToolbar } from './DocumentToolbar';
import { GeneratingView } from './GeneratingView';
import { RegenerateModal } from './RegenerateModal';
import { VersionHistoryModal } from './VersionHistoryModal';
import { ConsistencyAuditModal } from './ConsistencyAuditModal';
import { downloadSingleDocument, downloadProjectZip } from '@/lib/utils/export';
import { ConsistencyReport } from '@/lib/ai/types';
import { useLanguageStore } from '@/lib/store/useLanguageStore';

interface DocumentWorkspaceProps {
  project: Project;
}

export function DocumentWorkspace({ project }: DocumentWorkspaceProps) {
  const language = useLanguageStore((state) => state.language);
  const {
    activeDocType,
    setActiveDocType,
    updateDocumentContent,
    updateDocumentStatus,
    addDocumentVersion,
    restoreDocumentVersion,
  } = useProjectStore();

  const { getSession } = useInterviewStore();
  const session = getSession(project.id);

  const [viewMode, setViewMode] = useState<'both' | 'edit' | 'preview'>('both');
  const [isRegenerateOpen, setIsRegenerateOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditReport, setAuditReport] = useState<ConsistencyReport | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const currentDocType = activeDocType || project.selectedDocTypes[0] || 'PRD';
  const activeDocument = project.documents[currentDocType];

  // Check if any documents still need initial generation
  const pendingDocs = project.selectedDocTypes.filter(
    (type) => project.documents[type]?.status === 'pending'
  );
  const isGeneratingInitial = pendingDocs.length > 0;

  // Run sequential generation on initial mount if documents are pending
  useEffect(() => {
    let isCancelled = false;

    async function generateInitialDocs() {
      if (!isGeneratingInitial || !session) return;

      const generatedContentMap: Partial<Record<DocumentTypeId, string>> = {};

      for (const type of project.selectedDocTypes) {
        if (isCancelled) break;
        if (project.documents[type]?.status === 'completed') {
          generatedContentMap[type] = project.documents[type]?.content;
          continue;
        }

        updateDocumentStatus(project.id, type, 'generating');

        try {
          const res = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              docType: type,
              context: session.context,
              relatedDocs: generatedContentMap,
              language,
            }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || `HTTP ${res.status}`);
          }

          const data = await res.json();
          if (!isCancelled) {
            addDocumentVersion(project.id, type, data.content, 'Initial synthesis from interview');
            generatedContentMap[type] = data.content;
          }
        } catch (err: any) {
          console.error(`Error generating ${type}:`, err);
          if (!isCancelled) {
            updateDocumentStatus(project.id, type, 'error', err?.message);
          }
        }
      }
    }

    generateInitialDocs();

    return () => {
      isCancelled = true;
    };
  }, [project.id, isGeneratingInitial, project.selectedDocTypes, session, language]);

  if (isGeneratingInitial) {
    return (
      <GeneratingView
        documents={project.documents}
        selectedDocTypes={project.selectedDocTypes}
      />
    );
  }

  const handleCopy = () => {
    if (activeDocument?.content) {
      navigator.clipboard.writeText(activeDocument.content);
    }
  };

  const handleDownloadSingle = () => {
    if (activeDocument) {
      downloadSingleDocument(activeDocument.fileName, activeDocument.content);
    }
  };

  const handleDownloadZip = async () => {
    await downloadProjectZip(project.name, project.documents);
  };

  const handleRegenerate = async (feedback: string) => {
    if (!activeDocument || !session) return;
    setIsRegenerating(true);

    try {
      const res = await fetch('/api/ai/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType: currentDocType,
          currentContent: activeDocument.content,
          feedback,
          context: session.context,
          language,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      addDocumentVersion(project.id, currentDocType, data.content, feedback);
      setIsRegenerateOpen(false);
    } catch (err: any) {
      alert(`Regeneration failed: ${err?.message || 'Server error'}`);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleRunConsistencyAudit = async () => {
    setIsAuditModalOpen(true);
    setIsAuditing(true);

    try {
      const docsRecord: Partial<Record<DocumentTypeId, string>> = {};
      project.selectedDocTypes.forEach((type) => {
        if (project.documents[type]?.content) {
          docsRecord[type] = project.documents[type]?.content;
        }
      });

      const res = await fetch('/api/ai/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: docsRecord, language }),
      });

      if (!res.ok) throw new Error('Failed to run audit');
      const data = await res.json();
      setAuditReport(data);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] mt-16 px-3 sm:px-6 max-w-7xl mx-auto flex flex-col gap-3 animate-fade-in pb-4">
      {/* Top Toolbar */}
      <DocumentToolbar
        fileName={activeDocument?.fileName || `${currentDocType}.md`}
        version={activeDocument?.currentVersion || 1}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onCopy={handleCopy}
        onDownloadSingle={handleDownloadSingle}
        onRegenerate={() => setIsRegenerateOpen(true)}
        onOpenVersionHistory={() => setIsVersionHistoryOpen(true)}
        onDownloadZip={handleDownloadZip}
        onAuditConsistency={handleRunConsistencyAudit}
      />

      {/* Main Workspace Grid */}
      <div className="flex-1 flex flex-col md:flex-row gap-3 min-h-0 overflow-hidden">
        {/* Left: Document Tree Sidebar */}
        <DocumentSidebar
          selectedDocTypes={project.selectedDocTypes}
          documents={project.documents}
          activeDocType={currentDocType}
          onSelectDocType={setActiveDocType}
          onOpenVersionHistory={() => setIsVersionHistoryOpen(true)}
        />

        {/* Center & Right: Editor and Preview */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 h-full overflow-hidden">
          {/* Editor Column */}
          {(viewMode === 'both' || viewMode === 'edit') && (
            <div
              className={`h-full min-h-0 ${
                viewMode === 'edit' ? 'col-span-1 md:col-span-2' : 'col-span-1'
              }`}
            >
              <MarkdownEditor
                fileName={activeDocument?.fileName || `${currentDocType}.md`}
                content={activeDocument?.content || ''}
                onChange={(val) => updateDocumentContent(project.id, currentDocType, val)}
              />
            </div>
          )}

          {/* Preview Column */}
          {(viewMode === 'both' || viewMode === 'preview') && (
            <div
              className={`h-full min-h-0 ${
                viewMode === 'preview' ? 'col-span-1 md:col-span-2' : 'col-span-1'
              }`}
            >
              <MarkdownPreview content={activeDocument?.content || ''} />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {activeDocument && (
        <>
          <RegenerateModal
            isOpen={isRegenerateOpen}
            fileName={activeDocument.fileName}
            onClose={() => setIsRegenerateOpen(false)}
            onRegenerate={handleRegenerate}
            isLoading={isRegenerating}
          />

          <VersionHistoryModal
            isOpen={isVersionHistoryOpen}
            doc={activeDocument}
            onClose={() => setIsVersionHistoryOpen(false)}
            onRestore={(v) => restoreDocumentVersion(project.id, currentDocType, v)}
          />

          <ConsistencyAuditModal
            isOpen={isAuditModalOpen}
            onClose={() => setIsAuditModalOpen(false)}
            report={auditReport}
            isLoading={isAuditing}
          />
        </>
      )}
    </div>
  );
}

