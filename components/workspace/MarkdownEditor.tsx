'use client';

import React from 'react';

interface MarkdownEditorProps {
  content: string;
  onChange: (value: string) => void;
  fileName: string;
}

export function MarkdownEditor({ content, onChange, fileName }: MarkdownEditorProps) {
  return (
    <div className="h-full flex flex-col rounded-ios-xl glass-primary overflow-hidden border border-white/20 dark:border-white/10">
      {/* Editor Header Bar */}
      <div className="px-4 py-2.5 border-b border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-gray-400 select-none">
        <span className="font-mono text-gray-700 dark:text-gray-300 font-medium">
          {fileName}
        </span>
        <span className="text-[11px]">
          {content.length.toLocaleString()} characters · {content.split('\n').length} lines
        </span>
      </div>

      {/* Editor Textarea */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-5 bg-transparent text-gray-800 dark:text-gray-200 font-mono text-xs sm:text-[13px] leading-relaxed resize-none focus:outline-none selection:bg-blue-500/20"
          placeholder="# Write or edit markdown here..."
        />
      </div>
    </div>
  );
}

