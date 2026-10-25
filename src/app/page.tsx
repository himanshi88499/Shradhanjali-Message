import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { getPosts, getCategories, getSettings } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { CategoryCard } from '@/components/CategoryCard';
import { BlogCard } from '@/components/BlogCard';
import { InfoStrip } from '@/components/InfoStrip';

export default function HomePage() {
  const settings = getSettings();
  const categories = getCategories();
  const allPosts = getPosts('published');
  // Exactly up to 12 articles for the homepage grid as required
  const homepagePosts = allPosts.slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
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

        {/* B. Category Section */}
        <section className="py-14 border-b border-[#1C3A52] bg-[#061321]" aria-label="મુખ્ય કેટેગરીઝ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold text-sm font-semibold mb-1">
                  <Sparkles size={16} />
                  <span>પ્રમુખ કેટેગરીઝ</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  તમારી જરૂરિયાત મુજબ શ્રદ્ધાંજલિ સંદેશ અને માહિતી મેળવો
                </h2>
              </div>

              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-[#ffd782] transition-colors"
              >
                <span>બધી કેટેગરીઝ</span>
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

        {/* C. Blog Posts Section (12 Articles Grid) */}
        <section className="py-16 bg-[#061321]" aria-label="બ્લોગ પોસ્ટ્સ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold text-sm font-semibold mb-1">
                  <BookOpen size={16} />
                  <span>બ્લોગ પોસ્ટ્સ</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  શ્રદ્ધાંજલિ, પુણ્યતિથિ, શાયરી અને ઉપયોગી માહિતી ભરપૂર 12 લેખો
                </h2>
              </div>

              <Link
                href="/posts"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-[#ffd782] transition-colors"
              >
                <span>બધી પોસ્ટ્સ</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* 12 Cards Grid: 4 per row on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homepagePosts.map((post, idx) => (
                <BlogCard key={post.id} post={post} priority={idx < 4} />
              ))}
            </div>

            {/* View all articles button */}
            <div className="mt-12 text-center">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B1D2D] hover:bg-[#10263B] border border-[#1C3A52] hover:border-gold text-gold font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg"
              >
                <span>બધા લેખો જુઓ</span>
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
}
