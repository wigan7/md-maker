'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useTranslation } from '@/lib/store/useLanguageStore';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const { t } = useTranslation();

  if (!content) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-xs text-gray-400 glass-primary rounded-ios-xl border border-white/20 dark:border-white/10">
        {t.workspace.emptyPreview}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 rounded-ios-xl glass-primary border border-white/20 dark:border-white/10">
      <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-xl prose-h2:text-base prose-h2:border-b prose-h2:border-black/5 dark:prose-h2:border-white/5 prose-h2:pb-1.5 prose-h3:text-sm prose-p:text-xs sm:prose-p:text-sm prose-p:leading-relaxed prose-pre:rounded-ios-md prose-pre:bg-black/5 dark:prose-pre:bg-black/50 prose-pre:border prose-pre:border-black/5 dark:prose-pre:border-white/5 prose-table:text-xs">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}