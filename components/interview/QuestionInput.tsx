'use client';

import React, { useState } from 'react';
import { InterviewQuestion } from '@/types/interview';
import { GlassButton } from '@/components/common/GlassButton';
import { useTranslation } from '@/lib/store/useLanguageStore';
import { Check, ArrowRight } from 'lucide-react';

interface QuestionInputProps {
  question: InterviewQuestion;
  onSubmit: (answer: string | string[] | number | boolean) => void;
  isLoading: boolean;
}

export function QuestionInput({ question, onSubmit, isLoading }: QuestionInputProps) {
  const { t } = useTranslation();
  const [textValue, setTextValue] = useState('');
  const [singleChoice, setSingleChoice] = useState<string>('');
  const [multiChoice, setMultiChoice] = useState<string[]>([]);
  const [numberValue, setNumberValue] = useState<number>(1);
  const [yesNoValue, setYesNoValue] = useState<boolean | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    switch (question.type) {
      case 'text':
      case 'textarea':
        if (!textValue.trim()) return;
        onSubmit(textValue.trim());
        setTextValue('');
        break;

      case 'single-choice':
        if (!singleChoice) return;
        onSubmit(singleChoice);
        setSingleChoice('');
        break;

      case 'multi-choice':
        if (multiChoice.length === 0) return;
        onSubmit(multiChoice);
        setMultiChoice([]);
        break;

      case 'number':
        onSubmit(numberValue);
        break;

      case 'yes-no':
        if (yesNoValue === null) return;
        onSubmit(yesNoValue);
        setYesNoValue(null);
        break;
    }
  };

  const toggleMultiChoice = (option: string) => {
    if (multiChoice.includes(option)) {
      setMultiChoice(multiChoice.filter((o) => o !== option));
    } else {
      setMultiChoice([...multiChoice, option]);
    }
  };

  // Render by question type
  switch (question.type) {
    case 'single-choice':
      return (
        <div className="space-y-4">
          <div className="space-y-2.5">
            {(question.options || ['Option A', 'Option B', 'Option C']).map((opt) => {
              const isSelected = singleChoice === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setSingleChoice(opt)}
                  className={`p-4 rounded-ios-lg border cursor-pointer transition-all duration-200 select-none flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'glass-secondary border-black/5 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:border-black/15 dark:hover:border-white/15'
                  }`}
                >
                  <span className="text-sm font-medium">{opt}</span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <GlassButton
              variant="primary"
              size="md"
              disabled={!singleChoice || isLoading}
              onClick={() => handleSubmit()}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.continue}
            </GlassButton>
          </div>
        </div>
      );

    case 'multi-choice':
      return (
        <div className="space-y-4">
          <div className="space-y-2.5">
            {(question.options || ['Option A', 'Option B', 'Option C']).map((opt) => {
              const isSelected = multiChoice.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleMultiChoice(opt)}
                  className={`p-4 rounded-ios-lg border cursor-pointer transition-all duration-200 select-none flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'glass-secondary border-black/5 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:border-black/15 dark:hover:border-white/15'
                  }`}
                >
                  <span className="text-sm font-medium">{opt}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <GlassButton
              variant="primary"
              size="md"
              disabled={multiChoice.length === 0 || isLoading}
              onClick={() => handleSubmit()}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.interview.continueSelected.replace('{count}', String(multiChoice.length))}
            </GlassButton>
          </div>
        </div>
      );

    case 'yes-no':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setYesNoValue(true)}
              className={`p-6 text-center rounded-ios-lg border cursor-pointer transition-all duration-200 ${
                yesNoValue === true
                  ? 'bg-blue-500/15 border-blue-500/50 text-blue-700 dark:text-blue-300 font-semibold shadow-sm'
                  : 'glass-secondary border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:border-black/15'
              }`}
            >
              <span className="text-base">{t.interview.yesOption}</span>
            </div>

            <div
              onClick={() => setYesNoValue(false)}
              className={`p-6 text-center rounded-ios-lg border cursor-pointer transition-all duration-200 ${
                yesNoValue === false
                  ? 'bg-blue-500/15 border-blue-500/50 text-blue-700 dark:text-blue-300 font-semibold shadow-sm'
                  : 'glass-secondary border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:border-black/15'
              }`}
            >
              <span className="text-base">{t.interview.noOption}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <GlassButton
              variant="primary"
              size="md"
              disabled={yesNoValue === null || isLoading}
              onClick={() => handleSubmit()}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.continue}
            </GlassButton>
          </div>
        </div>
      );

    case 'number':
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={numberValue}
              onChange={(e) => setNumberValue(Number(e.target.value))}
              className="w-32 px-4 py-3 rounded-ios-md glass-input text-base text-gray-900 dark:text-gray-100 font-medium"
              autoFocus
            />
          </div>
          <div className="flex justify-end">
            <GlassButton
              variant="primary"
              size="md"
              disabled={isLoading}
              type="submit"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.continue}
            </GlassButton>
          </div>
        </form>
      );

    case 'text':
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder={question.placeholder || t.interview.inputPlaceholder}
            className="w-full px-4 py-3.5 rounded-ios-md glass-input text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
            autoFocus
          />
          <div className="flex justify-end">
            <GlassButton
              variant="primary"
              size="md"
              disabled={!textValue.trim() || isLoading}
              type="submit"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.continue}
            </GlassButton>
          </div>
        </form>
      );

    case 'textarea':
    default:
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={4}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={question.placeholder || t.interview.typeAnswerPlaceholder}
            className="w-full p-4 rounded-ios-lg glass-input text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-none leading-relaxed"
            autoFocus
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400">
              {t.interview.pressKeyHint}
            </span>
            <GlassButton
              variant="primary"
              size="md"
              disabled={!textValue.trim() || isLoading}
              type="submit"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.continue}
            </GlassButton>
          </div>
        </form>
      );
  }
}