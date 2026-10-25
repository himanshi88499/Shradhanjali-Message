'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  LanguageCode,
  SUPPORTED_LANGUAGES,
  LanguageInfo,
  TranslationDictionary,
  translations,
} from '@/lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof TranslationDictionary) => string;
  languages: LanguageInfo[];
  currentLanguageInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'gu',
  setLanguage: () => {},
  t: (key) => translations.gu[key] || '',
  languages: SUPPORTED_LANGUAGES,
  currentLanguageInfo: SUPPORTED_LANGUAGES[0],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('gu');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shradhanjali_lang') as LanguageCode | null;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        // Default to Gujarati as strictly required
        setLanguageState('gu');
        document.documentElement.lang = 'gu';
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (newLang: LanguageCode) => {
    if (!SUPPORTED_LANGUAGES.some((l) => l.code === newLang)) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem('shradhanjali_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {}
  };

  const t = (key: keyof TranslationDictionary): string => {
    const currentDict = translations[language];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Strict fallback: Gujarati first, then English
    return translations.gu[key] || translations.en[key] || '';
  };

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageInfo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
