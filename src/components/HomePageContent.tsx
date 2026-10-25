'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { Post, Category, SiteSettings } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { CategoryCard } from '@/components/CategoryCard';
import { BlogCard } from '@/components/BlogCard';
import { InfoStrip } from '@/components/InfoStrip';
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
        {/* A. Hero Section */}
        <HeroSection
          badge={settings.heroBadge}
          heading={settings.heroHeading}
          subtitle={settings.heroSubtitle}
          quote={settings.heroQuote}
          searchPlaceholder={settings.searchPlaceholder}
        />

        {/* B. Category Section: Featured Categories (Requirement 7) */}
        <section className="py-14 border-b border-theme bg-theme-main transition-colors" aria-label="Featured Categories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold text-sm font-semibold mb-1.5">
                  <Sparkles size={16} />
                  {/* English default heading as requested: 'Featured Categories' */}
                  <span>{t('section_featured_categories')}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-theme-primary">
                  {t('section_categories_sub')}
                </h2>
              </div>

              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
              >
                <span>{t('view_all_categories')}</span>
                <ArrowRight size={15} />
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

        {/* C. Blog Posts Section: Latest Blog Posts (Requirement 7) */}
        <section className="py-16 bg-theme-main transition-colors" aria-label="Latest Blog Posts">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold text-sm font-semibold mb-1.5">
                  <BookOpen size={16} />
                  {/* English default heading as requested: 'Latest Blog Posts' */}
                  <span>{t('section_latest_posts')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-primary">
                  {t('section_posts_sub')}
                </h2>
              </div>

              <Link
                href="/posts"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
              >
                <span>{t('view_all_posts')}</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* 12 Cards Grid: 4 per row desktop, 2 tablet, 1 mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homepagePosts.map((post, idx) => (
                <BlogCard key={post.id} post={post} priority={idx < 4} />
              ))}
            </div>

            {/* View all articles button */}
            <div className="mt-12 text-center">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-theme-card hover:bg-theme-card-hover border border-theme hover:border-gold text-gold font-bold text-sm sm:text-base rounded-xl transition-all shadow-md"
              >
                <span>{t('view_all_posts')}</span>
                <ArrowRight size={16} />
              </Link>
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
