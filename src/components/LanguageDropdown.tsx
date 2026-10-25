'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Sparkles, X } from 'lucide-react';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  isAvailable: boolean;
  statusBadge?: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', isAvailable: true, statusBadge: 'સક્રિય' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', isAvailable: false, statusBadge: 'ટૂંક સમયમાં' },
  { code: 'en', name: 'English', nativeName: 'English', isAvailable: false, statusBadge: 'Coming Soon' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', isAvailable: false, statusBadge: 'लवकरच' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', isAvailable: false, statusBadge: 'త్వరలో' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', isAvailable: false, statusBadge: 'விரைவில்' },
];

interface LanguageDropdownProps {
  isMobile?: boolean;
}

export default function LanguageDropdown({ isMobile = false }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('gu');
  const [pendingNoticeLang, setPendingNoticeLang] = useState<LanguageOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shradhanjali_lang');
      if (saved && saved === 'gu') {
        setSelectedLang(saved);
      }
    } catch {
      // ignore
    }

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: LanguageOption) => {
    if (lang.code === 'gu') {
      setSelectedLang('gu');
      try {
        localStorage.setItem('shradhanjali_lang', 'gu');
      } catch {}
      setIsOpen(false);
    } else {
      // Non-Gujarati languages: Explain authentic translation workflow
      setPendingNoticeLang(lang);
      setIsOpen(false);
    }
  };

  const currentOption = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className={`relative ${isMobile ? 'w-full mt-2' : 'inline-block'}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C5A880]/30 text-sm font-medium transition-all ${
          isMobile
            ? 'w-full justify-between bg-[#081726] text-white hover:border-[#D4AF37]'
            : 'text-[#E2EDF8] hover:text-[#D4AF37] hover:border-[#D4AF37]/60 bg-[#081726]/70 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{currentOption.nativeName}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#A3B8CC] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D4AF37]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute z-50 py-1.5 rounded-xl border border-[#C5A880]/30 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
            isMobile
              ? 'left-0 right-0 top-full mt-2 bg-[#0B1D2D]'
              : 'right-0 top-full mt-2 w-52 bg-[#0B1D2D]/95'
          }`}
        >
          <div className="px-3 py-1.5 border-b border-[#C5A880]/15 text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
            ભાષા પસંદ કરો (Language)
          </div>

          <div className="py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang)}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-sm transition-colors ${
                    isSelected
                      ? 'bg-[#C5A880]/15 text-[#D4AF37] font-semibold'
                      : 'text-[#E2EDF8] hover:bg-[#132A3E] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    ) : (
                      <span className="w-3.5 h-3.5 inline-block" />
                    )}
                    <div>
                      <span className="font-gujarati">{lang.nativeName}</span>
                      <span className="text-xs text-[#8A9EB5] ml-1.5">({lang.name})</span>
                    </div>
                  </div>

                  {lang.statusBadge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        lang.isAvailable
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                          : 'bg-white/5 text-[#8A9EB5] border border-white/10'
                      }`}
                    >
                      {lang.statusBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Notice Dialog for upcoming translations */}
      {pendingNoticeLang && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0B1D2D] border border-[#C5A880]/40 rounded-2xl p-6 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setPendingNoticeLang(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-[#8A9EB5] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">
                  {pendingNoticeLang.nativeName} ({pendingNoticeLang.name})
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-[#D4AF37]">
                  <Sparkles className="w-3 h-3" /> અધિકૃત અનુવાદ કાર્ય પ્રગતિમાં છે
                </span>
              </div>
            </div>

            <p className="text-sm text-[#B9C6D6] leading-relaxed mb-4">
              શ્રદ્ધાંજલિ પોર્ટલની તમામ સામગ્રી, ભાવપૂર્ણ સંદેશાઓ અને પુણ્યતિથિ લેખો હાલમાં{' '}
              <strong className="text-white font-semibold">ગુજરાતી ભાષા</strong>માં સંપૂર્ણપણે
              ઉપલબ્ધ છે.
            </p>

            <p className="text-xs text-[#8A9EB5] leading-relaxed mb-6 bg-[#061321] p-3.5 rounded-xl border border-[#C5A880]/20">
              અમે આપોઆપ મશીન અનુવાદના બદલે મૂળ સાહિત્યિક શુદ્ધતા જાળવવા માટે વ્યાવસાયિક ભાષાંતરકારો
              સાથે કાર્ય કરી રહ્યા છીએ. ટૂંક સમયમાં {pendingNoticeLang.nativeName} સંસ્કરણ લાઈવ થશે.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingNoticeLang(null)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#E5C158] text-[#061321] font-semibold text-sm hover:opacity-95 transition-opacity"
              >
                ગુજરાતીમાં આગળ વધો
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
