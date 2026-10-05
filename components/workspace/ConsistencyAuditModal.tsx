'use client';

import React from 'react';
import { GlassButton } from '@/components/common/GlassButton';
import { ConsistencyReport } from '@/lib/ai/types';
import { ShieldCheck, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface ConsistencyAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ConsistencyReport | null;
  isLoading: boolean;
}

export function ConsistencyAuditModal({
  isOpen,
  onClose,
  report,
  isLoading,
}: ConsistencyAuditModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg glass-floating rounded-ios-2xl p-6 sm:p-8 shadow-glass-floating border border-white/30 dark:border-white/10 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <ShieldCheck className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Cross-Document Consistency Audit
            </h2>
            <p className="text-xs text-gray-400">
              Verifying alignment across PRD, Design, Architecture, Database & Agents.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-gray-500">Auditing document contracts for conflicts...</p>
          </div>
        ) : report ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-ios-lg glass-secondary">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Coherence Score
              </span>
              <span
                className={`font-mono text-base font-bold ${
                  report.score >= 80
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-500'
                }`}
              >
                {report.score} / 100
              </span>
            </div>

            {report.issues.length === 0 ? (
              <div className="p-6 text-center rounded-ios-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 space-y-1">
                <CheckCircle className="w-6 h-6 mx-auto stroke-[2]" />
                <p className="text-sm font-semibold">Perfect Alignment</p>
                <p className="text-xs opacity-90">
                  No technical or design conflicts detected between specifications.
                </p>
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-2.5">
                {report.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-ios-md bg-amber-500/10 border border-amber-500/20 text-xs text-gray-800 dark:text-gray-200 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-bold text-amber-700 dark:text-amber-400">
                        {issue.docTypeA} ⟷ {issue.docTypeB}: {issue.topic}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
                      {issue.conflictDescription}
                    </p>
                    <div className="pt-1 border-t border-amber-500/20 text-[10px] text-amber-800 dark:text-amber-300">
                      <strong>Resolution: </strong> {issue.recommendedResolution}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5 flex justify-end">
          <GlassButton variant="secondary" size="sm" onClick={onClose}>
            Close
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
