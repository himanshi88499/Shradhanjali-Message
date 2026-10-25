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

  // Helper to apply translation to entire page
  const applyPageTranslation = (targetLang: LanguageCode) => {
    try {
      if (typeof window === 'undefined') return;

      if (targetLang === 'gu') {
        // Clear translation cookies to restore original Gujarati
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
        if (select) {
          select.value = 'gu';
          select.dispatchEvent(new Event('change'));
        }
        return;
      }

      // Set cookie for Google Translate
      document.cookie = `googtrans=/gu/${targetLang}; path=/;`;
      document.cookie = `googtrans=/gu/${targetLang}; path=/; domain=${window.location.hostname};`;

      // Check if script already loaded
      if (!(window as any).google?.translate?.TranslateElement) {
        (window as any).googleTranslateElementInit = function () {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'gu',
              includedLanguages: 'gu,en,hi,mr',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        };

        const existingScript = document.getElementById('google-translate-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.id = 'google-translate-script';
          script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          script.async = true;
          document.body.appendChild(script);
        }
      } else {
        // Trigger select element change
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
        if (select) {
          select.value = targetLang;
          select.dispatchEvent(new Event('change'));
        }
      }
    } catch (e) {
      console.warn('Translate error:', e);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shradhanjali_lang') as LanguageCode | null;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
        if (saved !== 'gu') {
          setTimeout(() => applyPageTranslation(saved), 500);
        }
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
      applyPageTranslation(newLang);
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
      <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />
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
