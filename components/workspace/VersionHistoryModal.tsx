'use client';

import React from 'react';
import { GlassButton } from '@/components/common/GlassButton';
import { ProjectDocument } from '@/types/project';
import { History, X, RotateCcw } from 'lucide-react';

interface VersionHistoryModalProps {
  isOpen: boolean;
  doc: ProjectDocument;
  onClose: () => void;
  onRestore: (versionNumber: number) => void;
}

export function VersionHistoryModal({
  isOpen,
  doc,
  onClose,
  onRestore,
}: VersionHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-md glass-floating rounded-ios-2xl p-6 shadow-glass-floating border border-white/30 dark:border-white/10 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <History className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Version History: {doc.fileName}
          </h2>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {doc.versions.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">
              Current version is the only recorded revision (v{doc.currentVersion}).
            </p>
          ) : (
            doc.versions.map((ver) => {
              const isCurrent = ver.version === doc.currentVersion;

              return (
                <div
                  key={ver.version}
                  className={`p-3.5 rounded-ios-md border flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300'
                      : 'glass-secondary border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">Version {ver.version}</span>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold tracking-wide px-1.5 py-0.2 rounded-full bg-blue-500 text-white">
                          Active
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      {new Date(ver.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {ver.feedbackSummary && (
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 italic line-clamp-1">
                        &quot;{ver.feedbackSummary}&quot;
                      </p>
                    )}
                  </div>

                  {!isCurrent && (
                    <GlassButton
                      size="sm"
                      variant="secondary"
                      icon={<RotateCcw className="w-3 h-3" />}
                      onClick={() => {
                        onRestore(ver.version);
                        onClose();
                      }}
                    >
                      Restore
                    </GlassButton>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
