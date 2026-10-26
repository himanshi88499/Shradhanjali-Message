import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategoryBySlug, getPostsByCategory } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogCard } from '@/components/BlogCard';
import { Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found | Shradhanjali Msg' };

  return {
    title: `${category.name} | Shradhanjali Msg`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', url: '/' },
            { label: 'Categories', url: '/categories' },
            { label: category.name },
          ]}
        />

        {/* Category Header Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-theme bg-theme-card p-5 sm:p-7 my-4 sm:my-5 card-glow transition-colors">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold px-2.5 py-1 bg-theme-surface rounded-full border border-theme mb-2">
              <Sparkles size={12} />
              <span>Category Collection</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-theme-primary mb-2">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="my-10">
          <h2 className="text-lg sm:text-xl font-bold text-theme-primary mb-6">
            Articles in &ldquo;{category.name}&rdquo; ({posts.length})
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-theme-card border border-theme rounded-2xl p-8">
              <p className="text-theme-muted text-sm">
                No published articles found in this category currently.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
