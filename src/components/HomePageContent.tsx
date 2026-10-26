'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Post, Category, SiteSettings } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { CategoryCard } from '@/components/CategoryCard';
import { BlogCard } from '@/components/BlogCard';
import { InfoStrip } from '@/components/InfoStrip';
import { LotusIcon } from '@/components/LotusLogo';
import { useLanguage } from '@/components/LanguageContext';

interface HomePageContentProps {
  settings: SiteSettings;
  categories: Category[];
  homepagePosts: Post[];
}

export const HomePageContent: React.FC<HomePageContentProps> = ({
  settings,
  categories,
  homepagePosts,
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1">
        {/* A. Hero Section matching Reference Screenshot */}
        <HeroSection
          badge={settings.heroBadge}
          heading1={t('hero_heading_1')}
          heading2={t('hero_heading_2')}
          subtitle={settings.heroSubtitle}
          quote={settings.heroQuote}
          searchPlaceholder={settings.searchPlaceholder}
        />

        {/* B. Category Section: Featured Categories matching Reference Screenshot */}
        <section className="py-14 border-b border-theme bg-theme-main transition-colors" aria-label="Featured Categories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8 gap-3">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <LotusIcon size={20} className="text-gold shrink-0 sm:w-[22px] sm:h-[22px]" />
                <h2 className="text-lg sm:text-2xl font-bold text-theme-primary tracking-tight truncate">
                  {t('section_featured_categories')}
                </h2>
              </div>

              <Link
                href="/categories"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gold hover:text-gold/80 transition-colors shrink-0 whitespace-nowrap"
              >
                <span>{t('view_all_categories')}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 6 Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {categories.slice(0, 6).map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* C. Blog Posts Section: Blog Posts matching Reference Screenshot */}
        <section className="py-12 sm:py-16 bg-theme-main transition-colors" aria-label="Latest Blog Posts">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 sm:mb-10 gap-3">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <BookOpen size={20} className="text-gold shrink-0 sm:w-[22px] sm:h-[22px]" />
                <h2 className="text-lg sm:text-2xl font-bold text-theme-primary tracking-tight truncate">
                  {t('section_latest_posts')}
                </h2>
              </div>

              <Link
                href="/posts"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gold hover:text-gold/80 transition-colors shrink-0 whitespace-nowrap"
              >
                <span>{t('view_all_posts')}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 12 Cards Grid: 4 per row desktop, 2 tablet, 1 mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homepagePosts.map((post, idx) => (
                <BlogCard key={post.id} post={post} priority={idx < 4} />
              ))}
            </div>
          </div>
        </section>

        {/* D. Information Section Strip */}
        <InfoStrip title={settings.infoCardsTitle} items={settings.infoCards} />
      </main>

      <Footer copyright={settings.copyrightText} />
    </div>
  );
};
