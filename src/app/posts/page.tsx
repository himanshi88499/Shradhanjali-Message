import React from 'react';
import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogArchiveClient } from '@/components/BlogArchiveClient';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'બધા લેખો | શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ અને શાયરી',
  description: 'શ્રદ્ધાંજલિ પોર્ટલ પર પ્રકાશિત થયેલા તમામ ગુજરાતી શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ શુભેચ્છા અને ઉપયોગી માહિતી લેખો.',
};

export default function PostsArchivePage() {
  const posts = getPosts('published');
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: 'બધા લેખો' },
          ]}
        />

        <div className="my-6">
          <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-semibold mb-1">
            <BookOpen size={18} />
            <span>લેખ સંગ્રહ</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 font-gujarati tracking-tight">
            બધા પ્રકાશિત લેખો
          </h1>
          <p className="text-sm sm:text-base text-[#B9C6D6] max-w-2xl leading-relaxed">
            શ્રદ્ધાંજલિ, પુણ્યતિથિ, શાયરી અને જીવન વિષયક ગુજરાતી લેખો વાંચો અને શેર કરો.
          </p>
        </div>

        {/* Interactive Blog Archive with Search, Category Filter, and Load More */}
        <BlogArchiveClient initialPosts={posts} categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
