'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/common/GlassPanel';
import { GlassButton } from '@/components/common/GlassButton';
import { DocumentTypeId } from '@/types/project';
import { DOCUMENT_REGISTRY } from '@/lib/documents/registry';
import { Check, Sparkles, X, Info } from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string, docTypes: DocumentTypeId[]) => void;
}

const ALL_DOC_TYPES: DocumentTypeId[] = ['PRD', 'DESIGN', 'AGENTS', 'ARCHITECTURE', 'DATABASE'];
const RECOMMENDED_DOC_TYPES: DocumentTypeId[] = ['PRD', 'DESIGN', 'ARCHITECTURE'];

export function CreateProjectModal({ isOpen, onClose, onCreate }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<DocumentTypeId[]>(RECOMMENDED_DOC_TYPES);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const toggleDocType = (type: DocumentTypeId) => {
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length === 1) {
        setError('At least one document type must be selected.');
        return;
      }
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
    setError('');
  };

  const handleSelectAll = () => {
    setSelectedTypes(ALL_DOC_TYPES);
    setError('');
  };

  const handleSelectRecommended = () => {
    setSelectedTypes(RECOMMENDED_DOC_TYPES);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a project name.');
      return;
    }
    if (selectedTypes.length === 0) {
      setError('Please select at least one document type.');
      return;
    }
    onCreate(name.trim(), description.trim(), selectedTypes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-xl glass-floating rounded-ios-2xl p-6 sm:p-8 shadow-glass-floating border border-white/30 dark:border-white/10 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Create a New Project
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Define your product and choose the specifications to generate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Mukti Adventure, FinTech Cloud, HealthHub"
              className="w-full px-4 py-3 rounded-ios-md glass-input text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Brief Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is your app about in 1-2 sentences?"
              className="w-full px-4 py-3 rounded-ios-md glass-input text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-none"
            />
          </div>

          {/* Document selection */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                What documents do you need?
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectRecommended}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Recommended
                </button>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Select all
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ALL_DOC_TYPES.map((type) => {
                const meta = DOCUMENT_REGISTRY[type];
                const isSelected = selectedTypes.includes(type);

                return (
                  <div
                    key={type}
                    onClick={() => toggleDocType(type)}
                    className={`cursor-pointer p-3 rounded-ios-md border transition-all duration-200 select-none flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-sm'
                        : 'glass-secondary border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:border-black/10 dark:hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs tracking-tight">{type}</span>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {meta.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {selectedTypes.includes('PRD') && selectedTypes.includes('ARCHITECTURE') && (
              <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500 dark:text-gray-400">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Architecture will inherit technical decisions from your PRD.</span>
              </div>
            )}
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="pt-2 flex items-center justify-end gap-3">
            <GlassButton type="button" variant="ghost" onClick={onClose}>
              Cancel
            </GlassButton>
            <GlassButton
              type="submit"
              variant="primary"
              size="lg"
              icon={<Sparkles className="w-4 h-4 text-blue-200" />}
            >
              Start AI Interview
            </GlassButton>
          </div>
        </form>
      </div>
    </div>
  );
}

