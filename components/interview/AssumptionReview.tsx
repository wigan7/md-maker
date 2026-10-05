'use client';

import React from 'react';
import { GlassPanel } from '@/components/common/GlassPanel';
import { GlassButton } from '@/components/common/GlassButton';
import { ProjectContext, AIAssumption } from '@/types/interview';
import { useTranslation } from '@/lib/store/useLanguageStore';
import { Check, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AssumptionReviewProps {
  context: ProjectContext;
  assumptions: AIAssumption[];
  onToggleAssumption: (id: string) => void;
  onProceedToGenerate: () => void;
  isGenerating?: boolean;
}

export function AssumptionReview({
  context,
  assumptions,
  onToggleAssumption,
  onProceedToGenerate,
  isGenerating = false,
}: AssumptionReviewProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
          <CheckCircle2 className="w-6 h-6 stroke-[2]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t.assumptions.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          {t.assumptions.subtitle}
        </p>
      </div>

      {/* Synthesis Overview Card */}
      <GlassPanel variant="primary" className="p-6 space-y-4">
        <div className="border-b border-black/5 dark:border-white/5 pb-3">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            {t.assumptions.overviewTitle}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-0.5">
            {context.projectName}
          </h3>
          {context.problem && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              <strong className="text-gray-800 dark:text-gray-200">{t.assumptions.coreProblem} </strong>
              {context.problem}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-400 font-medium">{t.assumptions.platforms}</span>
            <p className="text-gray-800 dark:text-gray-200 font-semibold mt-0.5 capitalize">
              {context.platforms.join(', ') || 'Web Application'}
            </p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">{t.assumptions.techStack}</span>
            <p className="text-gray-800 dark:text-gray-200 font-semibold mt-0.5">
              {context.technology.frontend || 'Next.js, TypeScript'}
            </p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">{t.assumptions.database}</span>
            <p className="text-gray-800 dark:text-gray-200 font-semibold mt-0.5">
              {context.database || 'PostgreSQL'}
            </p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">{t.assumptions.designSystem}</span>
            <p className="text-gray-800 dark:text-gray-200 font-semibold mt-0.5">
              {context.designPreferences.style || 'Premium iOS Glass UI'}
            </p>
          </div>
        </div>
      </GlassPanel>

      {/* AI Assumptions Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            {t.assumptions.assumptionsTitle} ({assumptions.length})
          </span>
          <span className="text-xs text-gray-400">{t.assumptions.assumptionsHint}</span>
        </div>

        {assumptions.length === 0 ? (
          <GlassPanel variant="secondary" className="p-4 text-center text-xs text-gray-400">
            {t.assumptions.noAssumptions}
          </GlassPanel>
        ) : (
          <div className="space-y-2">
            {assumptions.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleAssumption(item.id)}
                className={`p-4 rounded-ios-lg border cursor-pointer select-none transition-all duration-200 flex items-start gap-3.5 ${
                  item.accepted
                    ? 'glass-secondary border-blue-500/30 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'bg-black/5 dark:bg-white/5 border-transparent text-gray-400 line-through opacity-60'
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    item.accepted ? 'bg-blue-600 text-white' : 'border border-gray-400'
                  }`}
                >
                  {item.accepted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs font-medium mt-1 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="flex justify-end pt-4">
        <GlassButton
          variant="primary"
          size="lg"
          disabled={isGenerating}
          onClick={onProceedToGenerate}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {t.assumptions.generateBtn}
        </GlassButton>
      </div>
    </div>
  );
}