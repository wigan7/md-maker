'use client';

import React from 'react';
import { DocumentTypeId, ProjectDocument } from '@/types/project';
import { DOCUMENT_REGISTRY } from '@/lib/documents/registry';
import { Check, Loader2, FileCode } from 'lucide-react';

interface DocumentSidebarProps {
  selectedDocTypes: DocumentTypeId[];
  documents: Partial<Record<DocumentTypeId, ProjectDocument>>;
  activeDocType: DocumentTypeId;
  onSelectDocType: (type: DocumentTypeId) => void;
  onOpenVersionHistory?: (type: DocumentTypeId) => void;
}

export function DocumentSidebar({
  selectedDocTypes,
  documents,
  activeDocType,
  onSelectDocType,
  onOpenVersionHistory,
}: DocumentSidebarProps) {
  return (
    <aside className="w-full md:w-60 shrink-0 glass-secondary rounded-ios-xl p-3 border border-white/20 dark:border-white/5 flex flex-col justify-between">
      <div>
        <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Specifications
        </div>

        <nav className="space-y-1">
          {selectedDocTypes.map((type) => {
            const doc = documents[type];
            const meta = DOCUMENT_REGISTRY[type];
            const isActive = activeDocType === type;
            const status = doc?.status || 'pending';
            const version = doc?.currentVersion || 1;

            return (
              <div
                key={type}
                onClick={() => onSelectDocType(type)}
                className={`group px-3 py-2.5 rounded-ios-md flex items-center justify-between cursor-pointer select-none transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileCode className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <div className="truncate">
                    <span className="text-xs truncate block">{meta.fileName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {doc && doc.versions.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenVersionHistory) onOpenVersionHistory(type);
                      }}
                      className={`text-[10px] px-1.5 py-0.2 rounded-full border transition-all ${
                        isActive
                          ? 'border-white/40 bg-white/20 text-white'
                          : 'border-black/10 dark:border-white/10 text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      title="View version history"
                    >
                      v{version}
                    </button>
                  )}

                  {status === 'completed' ? (
                    <Check className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                  ) : status === 'generating' ? (
                    <Loader2 className={`w-3.5 h-3.5 animate-spin ${isActive ? 'text-white' : 'text-blue-500'}`} />
                  ) : (
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white/60' : 'bg-gray-300 dark:bg-gray-600'}`} />
                  )}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="pt-3 border-t border-black/5 dark:border-white/5 px-3 text-[11px] text-gray-400 flex items-center justify-between">
        <span>{selectedDocTypes.length} documents</span>
        <span>Markdown</span>
      </div>
    </aside>
  );
}
