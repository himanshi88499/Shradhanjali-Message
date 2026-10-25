'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { LanguageInfo } from '@/lib/translations';

interface LanguageDropdownProps {
  isMobile?: boolean;
}

export default function LanguageDropdown({ isMobile = false }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, languages, currentLanguageInfo, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: LanguageInfo) => {
    setLanguage(lang.code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${isMobile ? 'w-full mt-2' : 'inline-block'}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('language_select')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme text-sm font-medium transition-all ${
          isMobile
            ? 'w-full justify-between bg-theme-card text-theme-primary hover:border-gold'
            : 'text-theme-secondary hover:text-gold hover:border-gold/60 bg-theme-surface/70 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-gold shrink-0" />
          <span className="font-medium text-xs sm:text-sm">{currentLanguageInfo.nativeName}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-theme-muted transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-gold' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute z-50 py-1.5 rounded-xl border border-theme shadow-2xl backdrop-blur-xl animate-fade-in ${
            isMobile
              ? 'left-0 right-0 top-full mt-2 bg-theme-card'
              : 'right-0 top-full mt-2 w-52 bg-theme-card'
          }`}
        >
          <div className="px-3.5 py-1.5 border-b border-theme text-[11px] font-semibold text-gold uppercase tracking-wider">
            {t('language_select')}
          </div>

          <div className="py-1">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang)}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-sm transition-colors ${
                    isSelected
                      ? 'bg-gold/15 text-gold font-semibold'
                      : 'text-theme-primary hover:bg-theme-card-hover hover:text-gold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 inline-block shrink-0" />
                    )}
                    <div>
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className="text-xs text-theme-muted ml-1.5">({lang.name})</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
