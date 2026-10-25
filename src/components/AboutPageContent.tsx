'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LotusIcon } from '@/components/LotusLogo';
import { Page } from '@/lib/types';
import { useLanguage } from '@/components/LanguageContext';

interface AboutPageContentProps {
  page?: Page;
}

export const AboutPageContent: React.FC<AboutPageContentProps> = ({ page }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: t('nav_home'), url: '/' },
            { label: t('nav_about') },
          ]}
        />

        {/* Hero Section */}
        <div className="mt-4 mb-14">
          <span className="text-gold font-bold tracking-widest text-xs sm:text-sm uppercase">
            {t('brand_name')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-primary mt-2 mb-3">
            {t('about_title')}
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-6">
            {t('about_subtitle')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-theme-secondary leading-relaxed">
              <p>
                {page?.content ||
                  'Shradhanjali Msg is a dedicated digital memorial platform created to preserve loving memories of our departed loved ones with sincerity, peace, and cultural reverence.'}
              </p>
              <p>
                Our objective is to offer everyone a calm, respectful, and comforting space to discover heartfelt condolences, punyatithi messages, and solemn memorial expressions.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-theme aspect-[16/10] bg-theme-card shadow-xl">
                <img
                  src="/images/hero-candle.jpg"
                  alt="Shradhanjali Memorial Diya"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: Empathy / ભાવના */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 text-center card-glow flex flex-col items-center transition-colors">
            <div className="w-12 h-12 rounded-full bg-theme-surface border border-theme flex items-center justify-center mb-4 text-gold">
              <Heart size={22} />
            </div>
            <h3 className="text-lg font-bold text-theme-primary mb-2">Empathy & Reverence</h3>
            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              Every message is crafted with genuine respect and emotional depth.
            </p>
          </div>

          {/* Card 2: Authenticity / વિશ્વસનીયતા */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 text-center card-glow flex flex-col items-center transition-colors">
            <div className="w-12 h-12 rounded-full bg-theme-surface border border-theme flex items-center justify-center mb-4 text-gold">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-theme-primary mb-2">Authenticity & Trust</h3>
            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              Committed to verified, meaningful, and culturally respectful content.
            </p>
          </div>

          {/* Card 3: Community / સમાજ માટે */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 text-center card-glow flex flex-col items-center transition-colors">
            <div className="w-12 h-12 rounded-full bg-theme-surface border border-theme flex items-center justify-center mb-4 text-gold">
              <Users size={22} />
            </div>
            <h3 className="text-lg font-bold text-theme-primary mb-2">For Families & Community</h3>
            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              Bringing solace and shared comfort across generations and families.
            </p>
          </div>

          {/* Card 4: Simplicity / સાદગી */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 text-center card-glow flex flex-col items-center transition-colors">
            <div className="w-12 h-12 rounded-full bg-theme-surface border border-theme flex items-center justify-center mb-4 text-gold">
              <LotusIcon size={22} />
            </div>
            <h3 className="text-lg font-bold text-theme-primary mb-2">Simplicity & Elegance</h3>
            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              Clean typography, serene aesthetics, and calm, accessible navigation.
            </p>
          </div>
        </div>

        {/* Our Purpose & Mission Section (Requirement 8 — Fixed contrast & multilingual display) */}
        <div className="bg-theme-card border border-theme rounded-3xl p-8 sm:p-12 text-center card-glow mb-14 transition-colors">
          <div className="w-14 h-14 rounded-full bg-theme-surface border border-theme flex items-center justify-center mx-auto mb-5 text-gold">
            <LotusIcon size={28} />
          </div>

          {/* Correctly styled quote with full contrast in both Light & Dark modes */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-theme-primary max-w-3xl mx-auto leading-relaxed mb-4">
            &ldquo;{t('about_mission_quote')}&rdquo;
          </h3>

          <p className="text-sm sm:text-base text-theme-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            {t('about_mission_sub')}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold/90 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md"
          >
            <span>{t('contact_us_btn')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
