import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, DICTIONARIES, TranslationDictionary } from '@/lib/i18n/dictionaries';

interface LanguageStoreState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStoreState>()(
  persist(
    (set) => ({
      language: 'id', // Default is Indonesian as requested
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'prdmaker-language-v1',
    }
  )
);

export function useTranslation(): {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
} {
  const { language, setLanguage } = useLanguageStore();
  const t = DICTIONARIES[language] || DICTIONARIES.id;
  return { language, setLanguage, t };
}