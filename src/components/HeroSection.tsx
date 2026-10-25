'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { LotusIcon } from './LotusLogo';
import { useLanguage } from './LanguageContext';

interface HeroSectionProps {
  badge?: string;
  heading1?: string;
  heading2?: string;
  subtitle?: string;
  quote?: string;
  searchPlaceholder?: string;
  heroImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  heading1,
  heading2,
  subtitle,
  quote,
  searchPlaceholder,
  heroImage = '/images/hero-diya-banner.jpg',
}) => {
  const router = useRouter();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const displayBadge = badge || t('hero_badge');
  const displayHeading1 = heading1 || t('hero_heading_1');
  const displayHeading2 = heading2 || t('hero_heading_2');
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
    <section className="relative w-full overflow-hidden bg-[#030B12] text-white border-b border-[#173A54]">
      {/* Panoramic Hero Background Image with Cinematic Depth */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="શ્રદ્ધાંજલિ દીવો અને કમળ"
          className="w-full h-full object-cover object-right md:object-center select-none"
          loading="eager"
          decoding="async"
        />
        {/* Smooth Dark Gradient Overlays for Readability and Section Transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030B12] via-[#030B12]/85 md:via-[#030B12]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061625] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-[#030B12]/50 md:hidden" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Pill-shaped Search Bar */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small introductory badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#F5C45E] font-semibold tracking-wider text-xs sm:text-sm">
                {displayBadge}
              </span>
            </div>

            {/* 2-line Heading matching Reference Screenshot */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold tracking-tight leading-[1.2] mb-4">
              <span className="text-white block drop-shadow-md">
                {displayHeading1}
              </span>
              <span className="text-[#F5C45E] block mt-1 drop-shadow-md">
                {displayHeading2}
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p
              className="text-sm sm:text-base lg:text-[17px] leading-relaxed mb-8 max-w-xl whitespace-pre-line drop-shadow-md font-normal"
              style={{ color: '#E2E8F0' }}
            >
              {displaySubtitle}
            </p>

            {/* Pill-shaped Search Bar matching Reference Screenshot */}
            <form onSubmit={handleSearch} className="w-full max-w-xl">
              <div
                className="relative flex items-center backdrop-blur-md border border-[#173A54] hover:border-[#F5C45E]/60 focus-within:border-[#F5C45E] rounded-full p-1.5 pl-4 sm:pl-5 shadow-2xl transition-all"
                style={{ backgroundColor: 'rgba(7, 26, 43, 0.92)' }}
              >
                <Search size={19} className="text-[#F5C45E] shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={displayPlaceholder}
                  aria-label="Search memorial messages"
                  className="w-full bg-transparent px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none placeholder:text-[#8495A9]"
                  style={{ color: '#FFFFFF' }}
                />
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-2.5 rounded-full bg-[#F5C45E] hover:bg-[#E5B54E] text-[#030B12] font-bold text-xs sm:text-sm sm:text-base transition-colors shadow-md shrink-0 flex items-center justify-center"
                >
                  {t('search_button')}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Floating Memorial Quotation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:items-end lg:pr-4 pt-4 lg:pt-0">
            <div className="relative max-w-sm text-center px-4 py-4 sm:py-6">
              {/* Quote Container with golden quotation marks */}
              <div className="relative inline-block text-center">
                <span
                  className="text-[#F5C45E] text-3xl sm:text-4xl font-serif font-bold leading-none select-none inline-block align-top mr-1.5"
                  aria-hidden="true"
                >
                  “
                </span>

                <p
                  className="inline text-sm sm:text-base lg:text-[17px] font-medium leading-relaxed tracking-wide whitespace-pre-line drop-shadow-md"
                  style={{ color: '#FFFFFF' }}
                >
                  {displayQuote}
                </p>

                <span
                  className="text-[#F5C45E] text-3xl sm:text-4xl font-serif font-bold leading-none select-none inline-block align-bottom ml-1.5"
                  aria-hidden="true"
                >
                  ”
                </span>
              </div>

              {/* Subtle golden divider with memorial lotus emblem */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#F5C45E]/70" />
                <LotusIcon size={20} className="text-[#F5C45E] shrink-0 opacity-90" />
                <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#F5C45E]/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
