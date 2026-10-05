'use client';

import React, { useState } from 'react';
import { GlassButton } from '@/components/common/GlassButton';
import { useTranslation } from '@/lib/store/useLanguageStore';
import {
  Copy,
  Check,
  Download,
  Sparkles,
  History,
  Archive,
  MoreHorizontal,
  Columns,
  Edit3,
  Eye,
  ShieldCheck,
} from 'lucide-react';

interface DocumentToolbarProps {
  fileName: string;
  version: number;
  viewMode: 'both' | 'edit' | 'preview';
  onChangeViewMode: (mode: 'both' | 'edit' | 'preview') => void;
  onCopy: () => void;
  onDownloadSingle: () => void;
  onRegenerate: () => void;
  onOpenVersionHistory: () => void;
  onDownloadZip: () => void;
  onAuditConsistency?: () => void;
}

export function DocumentToolbar({
  fileName,
  version,
  viewMode,
  onChangeViewMode,
  onCopy,
  onDownloadSingle,
  onRegenerate,
  onOpenVersionHistory,
  onDownloadZip,
  onAuditConsistency,
}: DocumentToolbarProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full glass-floating rounded-ios-lg px-4 py-2 flex items-center justify-between border border-white/30 dark:border-white/10 shadow-glass-sm select-none">
      {/* Left: Document Name and Version */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
          {fileName}
        </span>
        <button
          onClick={onOpenVersionHistory}
          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 text-gray-600 dark:text-gray-300 transition-colors"
          title={t.workspace.versionHistory.replace('{version}', String(version))}
        >
          v{version}
        </button>
      </div>

      {/* Center: View Switcher (Both / Edit / Preview) */}
      <div className="hidden sm:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-0.5 rounded-ios-sm text-xs">
        <button
          onClick={() => onChangeViewMode('both')}
          className={`px-2.5 py-1 rounded-ios-sm flex items-center gap-1 transition-colors ${
            viewMode === 'both'
              ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm font-medium'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Columns className="w-3.5 h-3.5" />
          <span>{t.common.split}</span>
        </button>
        <button
          onClick={() => onChangeViewMode('edit')}
          className={`px-2.5 py-1 rounded-ios-sm flex items-center gap-1 transition-colors ${
            viewMode === 'edit'
              ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm font-medium'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{t.common.editor}</span>
        </button>
        <button
          onClick={() => onChangeViewMode('preview')}
          className={`px-2.5 py-1 rounded-ios-sm flex items-center gap-1 transition-colors ${
            viewMode === 'preview'
              ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm font-medium'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{t.common.preview}</span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 relative">
        {/* Copy */}
        <button
          onClick={handleCopy}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-ios-sm text-xs flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title={t.common.copy}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline text-emerald-500 font-medium">{t.common.copied}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.common.copy}</span>
            </>
          )}
        </button>

        {/* Download Single */}
        <button
          onClick={onDownloadSingle}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-ios-sm text-xs flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title={t.common.download}
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.common.download}</span>
        </button>

        {/* Regenerate with Feedback */}
        <GlassButton
          variant="primary"
          size="sm"
          onClick={onRegenerate}
          icon={<Sparkles className="w-3.5 h-3.5 text-blue-200" />}
        >
          <span className="hidden sm:inline">{t.workspace.improveDoc}</span>
        </GlassButton>

        {/* More Actions Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-ios-sm text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="More actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-48 glass-floating rounded-ios-lg p-1.5 border border-white/20 dark:border-white/10 shadow-glass-floating z-50 text-xs space-y-1 animate-scale-up"
              onClick={() => setMenuOpen(false)}
            >
              <button
                onClick={onOpenVersionHistory}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-ios-sm text-left text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <History className="w-3.5 h-3.5 text-gray-400" />
                <span>{t.workspace.versionHistory.replace('{version}', String(version))}</span>
              </button>

              {onAuditConsistency && (
                <button
                  onClick={onAuditConsistency}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-ios-sm text-left text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t.workspace.auditConsistency}</span>
                </button>
              )}

              <button
                onClick={onDownloadZip}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-ios-sm text-left text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Archive className="w-3.5 h-3.5 text-gray-400" />
                <span>{t.common.downloadZip}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}