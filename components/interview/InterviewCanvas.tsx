'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types/project';
import { useInterviewStore } from '@/lib/store/useInterviewStore';
import { useTranslation } from '@/lib/store/useLanguageStore';
import { GlassPanel } from '@/components/common/GlassPanel';
import { GlassButton } from '@/components/common/GlassButton';
import { AiOrb } from '@/components/common/AiOrb';
import { ProgressBar } from './ProgressBar';
import { QuestionInput } from './QuestionInput';
import { AssumptionReview } from './AssumptionReview';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

interface InterviewCanvasProps {
  project: Project;
  onProceedToGenerate: () => void;
  onExit: () => void;
}

export function InterviewCanvas({
  project,
  onProceedToGenerate,
  onExit,
}: InterviewCanvasProps) {
  const {
    isLoading,
    error,
    initSession,
    submitAnswer,
    toggleAssumption,
    setError,
    getSession,
  } = useInterviewStore();

  const { t, language } = useTranslation();
  const session = getSession(project.id);

  useEffect(() => {
    initSession(project, language);
  }, [project, initSession, language]);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AiOrb size="lg" isThinking={true} />
        <p className="text-sm text-gray-500 animate-pulse">{t.interview.initializing}</p>
      </div>
    );
  }

  // If interview is complete, render assumptions review
  if (session.isComplete) {
    return (
      <div className="py-12 px-4 max-w-4xl mx-auto">
        <AssumptionReview
          context={session.context}
          assumptions={session.assumptions}
          onToggleAssumption={(id) => toggleAssumption(project.id, id)}
          onProceedToGenerate={onProceedToGenerate}
        />
      </div>
    );
  }

  const currentQ = session.currentQuestion;
  const categoryLabel =
    t.interview.categories[currentQ?.category as keyof typeof t.interview.categories] ||
    currentQ?.category ||
    'Discovery';

  return (
    <div className="py-12 sm:py-16 px-4 max-w-3xl mx-auto flex flex-col items-center animate-fade-in">
      {/* Top Bar with Exit and Category Progress */}
      <div className="w-full mb-8 flex flex-col items-center gap-6">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.interview.backToProjects}</span>
          </button>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {project.name}
          </span>
          <div className="w-16" />
        </div>

        <ProgressBar
          currentCategory={session.currentCategory}
          completedCategories={session.completedCategories}
          currentStep={session.currentStep}
        />
      </div>

      {/* Main Glass Architect Question Card */}
      <GlassPanel
        variant="floating"
        className="w-full p-6 sm:p-10 shadow-glass-floating border border-white/40 dark:border-white/10 relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4 mb-6">
          <AiOrb size="md" isThinking={isLoading} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {categoryLabel}
              </span>
              {currentQ?.isClarification && (
                <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {t.interview.clarification}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-1 leading-snug">
              {currentQ?.text || (language === 'id' ? 'Mari kita kaji kebutuhan produk Anda...' : "Let's examine your product requirements...")}
            </h2>

            {currentQ?.rationale && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-normal">
                {currentQ.rationale}
              </p>
            )}
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-ios-md bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-700 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{t.interview.errorTitle}</p>
              <p className="text-[11px] mt-0.5 opacity-90">{error}</p>
              <div className="mt-2.5 flex items-center gap-2">
                <GlassButton
                  size="sm"
                  variant="secondary"
                  icon={<RefreshCw className="w-3 h-3" />}
                  onClick={() => {
                    setError(null);
                    if (currentQ) {
                      submitAnswer(project.id, project.selectedDocTypes, 'Retrying step...', language);
                    }
                  }}
                >
                  {t.common.retry}
                </GlassButton>
              </div>
            </div>
          </div>
        )}

        {/* Input area */}
        {currentQ && (
          <div className="pt-2">
            <QuestionInput
              question={currentQ}
              isLoading={isLoading}
              onSubmit={(answer) =>
                submitAnswer(project.id, project.selectedDocTypes, answer, language)
              }
            />
          </div>
        )}
      </GlassPanel>
    </div>
  );
}