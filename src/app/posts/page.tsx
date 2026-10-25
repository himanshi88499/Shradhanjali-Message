import React from 'react';
import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogArchiveClient } from '@/components/BlogArchiveClient';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Articles | Shradhanjali Msg — Memorial Tributes & Condolences',
  description:
    'Browse all memorial articles, condolences, punyatithi tributes, and memorial poetry published on Shradhanjali Msg.',
};

export default function PostsArchivePage() {
  const posts = getPosts('published');
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', url: '/' },
            { label: 'Blog' },
          ]}
        />

        <div className="my-6">
          <div className="flex items-center gap-2 text-gold text-sm font-semibold mb-1">
            <BookOpen size={18} />
            <span>Latest Blog Posts</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-primary mb-2 tracking-tight">
            All Memorial Articles
          </h1>
          <p className="text-sm sm:text-base text-theme-secondary max-w-2xl leading-relaxed">
            Read and share thoughtful memorial messages, condolences, punyatithi tributes, and reflections.
          </p>
        </div>

        {/* Interactive Blog Archive with Search, Category Filter, and Load More */}
        <BlogArchiveClient initialPosts={posts} categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
