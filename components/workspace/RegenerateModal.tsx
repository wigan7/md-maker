'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/common/GlassPanel';
import { GlassButton } from '@/components/common/GlassButton';
import { Sparkles, X } from 'lucide-react';
import { useTranslation } from '@/lib/store/useLanguageStore';

interface RegenerateModalProps {
  isOpen: boolean;
  fileName: string;
  onClose: () => void;
  onRegenerate: (feedback: string) => void;
  isLoading: boolean;
}

export function RegenerateModal({
  isOpen,
  fileName,
  onClose,
  onRegenerate,
  isLoading,
}: RegenerateModalProps) {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || isLoading) return;
    onRegenerate(feedback.trim());
    setFeedback('');
  };

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

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {t.regenerateModal.title.replace('{fileName}', fileName)}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t.regenerateModal.subtitle}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              {t.regenerateModal.label}
            </label>
            <textarea
              rows={4}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t.regenerateModal.placeholder}
              className="w-full p-3.5 rounded-ios-md glass-input text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-none leading-relaxed"
              autoFocus
            />
          </div>

          {/* Quick suggestions */}
          <div>
            <span className="text-[11px] font-medium text-gray-400 block mb-1.5">
              {t.regenerateModal.suggestionsLabel}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {t.regenerateModal.suggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setFeedback(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-full glass-secondary text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:border-blue-500/30 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-black/5 dark:border-white/5">
            <GlassButton type="button" variant="ghost" onClick={onClose}>
              {t.common.cancel}
            </GlassButton>
            <GlassButton
              type="submit"
              variant="primary"
              size="md"
              disabled={!feedback.trim() || isLoading}
              icon={<Sparkles className="w-4 h-4 text-blue-200" />}
            >
              {isLoading ? t.regenerateModal.submittingBtn : t.regenerateModal.submitBtn}
            </GlassButton>
          </div>
        </form>
      </div>
    </div>
  );
}

