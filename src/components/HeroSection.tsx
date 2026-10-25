'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { LotusIcon } from './LotusLogo';
import { useLanguage } from './LanguageContext';

interface HeroSectionProps {
  badge?: string;
  heading?: string;
  subtitle?: string;
  quote?: string;
  searchPlaceholder?: string;
  heroImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  heading,
  subtitle,
  quote,
  searchPlaceholder,
  heroImage = '/images/hero-candle.jpg',
}) => {
  const router = useRouter();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const displayBadge = badge || t('hero_badge');
  const displayHeading = heading || t('hero_heading');
  const displaySubtitle = subtitle || t('hero_subtitle');
  const displayQuote = quote || t('hero_quote');
  const displayPlaceholder = searchPlaceholder || t('search_placeholder');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative bg-theme-main overflow-hidden py-12 md:py-20 border-b border-theme transition-colors">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#128C7E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Search */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-gold font-bold tracking-widest text-xs sm:text-sm uppercase">
                {displayBadge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-primary leading-tight tracking-tight mb-5">
              {displayHeading}
            </h1>

            <p className="text-base sm:text-lg text-theme-secondary leading-relaxed mb-8 max-w-xl">
              {displaySubtitle}
            </p>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <div className="relative flex items-center bg-theme-card border border-theme focus-within:border-gold rounded-2xl p-1.5 shadow-xl transition-all">
                <Search size={19} className="text-theme-muted ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={displayPlaceholder}
                  className="w-full bg-transparent text-theme-primary px-3.5 py-2.5 text-sm sm:text-base focus:outline-none placeholder-theme-muted"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-white font-bold text-sm sm:text-base rounded-xl transition-colors shadow-md shrink-0"
                >
                  {t('search_button')}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Diya, Candlelight, White flowers & Quote */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-theme shadow-2xl bg-theme-card aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={heroImage}
                alt="Shradhanjali Memorial Diya"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Quote Banner */}
              <div className="absolute top-6 right-6 max-w-xs sm:max-w-sm bg-black/75 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl text-right">
                <p className="text-sm sm:text-base text-white italic leading-relaxed font-medium">
                  &ldquo;{displayQuote}&rdquo;
                </p>
                <div className="mt-3 flex justify-end">
                  <LotusIcon size={24} className="opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
