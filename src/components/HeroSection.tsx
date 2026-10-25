'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { LotusIcon } from './LotusLogo';

interface HeroSectionProps {
  badge?: string;
  heading?: string;
  subtitle?: string;
  quote?: string;
  searchPlaceholder?: string;
  heroImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = '|| શ્રદ્ધાંજલિ ||',
  heading = 'પ્રિયજનની સ્મૃતિઓ ક્યારેય ભૂલાતી નથી...',
  subtitle = 'આપણી પ્રિયજનોને યાદ રાખવું એ માત્ર સંસ્મરણ નથી, પણ એ તેમની પ્રત્યેની આપણી અખંડ શ્રદ્ધાંજલિ છે.',
  quote = 'યાદો એ જીવનની સૌથી સુંદર સંપત્તિ છે, જેને ક્યારેય કોઈ છીનવી શકતું નથી.',
  searchPlaceholder = 'શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અથવા વિષય શોધો...',
  heroImage = '/images/hero-candle.jpg',
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative bg-[#061321] overflow-hidden py-12 md:py-20 border-b border-[#1C3A52]">
      {/* Background ambient light effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#128C7E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Search */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-gold font-bold tracking-widest text-sm sm:text-base">
                {badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
              {heading}
            </h1>

            <p className="text-base sm:text-lg text-[#B9C6D6] leading-relaxed mb-8 max-w-xl">
              {subtitle}
            </p>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <div className="relative flex items-center bg-[#0B1D2D] border border-[#1C3A52] focus-within:border-gold rounded-xl p-1.5 shadow-2xl transition-all">
                <Search size={20} className="text-[#8495A9] ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-white px-3 py-2.5 text-sm sm:text-base focus:outline-none placeholder-[#8495A9]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gold hover:bg-[#FFD782] text-[#061321] font-bold text-sm sm:text-base rounded-lg transition-colors shadow-md shrink-0"
                >
                  શોધો
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Diya, Candlelight, White flowers & Quote */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#1C3A52] shadow-2xl bg-[#0B1D2D] aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={heroImage}
                alt="શ્રદ્ધાંજલિ દીવો અને કમળ"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/90 via-[#061321]/30 to-transparent" />

              {/* Floating Quote Banner */}
              <div className="absolute top-6 right-6 max-w-xs sm:max-w-sm bg-[#061321]/80 backdrop-blur-md border border-[#1C3A52] rounded-2xl p-4 sm:p-5 shadow-2xl text-right">
                <p className="text-sm sm:text-base text-[#F4F6FA] italic leading-relaxed font-medium">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-3 flex justify-end">
                  <LotusIcon size={24} className="opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
