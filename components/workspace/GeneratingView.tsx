'use client';

import React from 'react';
import { GlassPanel } from '@/components/common/GlassPanel';
import { AiOrb } from '@/components/common/AiOrb';
import { DocumentTypeId, ProjectDocument } from '@/types/project';
import { DOCUMENT_REGISTRY } from '@/lib/documents/registry';
import { useTranslation } from '@/lib/store/useLanguageStore';
import { Check, Loader2 } from 'lucide-react';

interface GeneratingViewProps {
  documents: Partial<Record<DocumentTypeId, ProjectDocument>>;
  selectedDocTypes: DocumentTypeId[];
  onFinish?: () => void;
}

export function GeneratingView({ documents, selectedDocTypes }: GeneratingViewProps) {
  const { t } = useTranslation();

  return (
    <div className="py-20 px-4 max-w-lg mx-auto text-center space-y-8 animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <AiOrb size="lg" isThinking={true} />
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {t.generating.title}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {t.generating.subtitle}
          </p>
        </div>
      </div>

      <GlassPanel variant="primary" className="p-6 divide-y divide-black/5 dark:divide-white/5">
        {selectedDocTypes.map((type) => {
          const doc = documents[type];
          const status = doc?.status || 'pending';
          const meta = DOCUMENT_REGISTRY[type];

          return (
            <div key={type} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
              <div className="text-left">
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {meta.fileName}
                </span>
                <p className="text-[11px] text-gray-400 truncate max-w-[240px]">
                  {meta.description}
                </p>
              </div>

              <div>
                {status === 'completed' ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>{t.common.ready}</span>
                  </div>
                ) : status === 'generating' ? (
                  <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.common.writing}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-normal">
                    <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span>{t.common.queued}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </GlassPanel>
    </div>
  );
}