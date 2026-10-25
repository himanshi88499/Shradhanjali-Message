import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/db';
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
  if (!category) return { title: 'કેટેગરી મળી નથી | શ્રદ્ધાંજલિ' };

  return {
    title: `${category.name} | શ્રદ્ધાંજલિ સંદેશ અને લેખો`,
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
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: 'કેટેગરીઝ', url: '/categories' },
            { label: category.name },
          ]}
        />

        {/* Category Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#1C3A52] bg-gradient-to-r from-[#0B1D2D] via-[#0D2031] to-[#0B1D2D] p-8 sm:p-12 my-6 card-glow">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold px-3 py-1 bg-[#061321]/60 rounded-full border border-[#1C3A52] mb-3">
              <Sparkles size={13} />
              <span>કેટેગરી</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-[#B9C6D6] leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">
              કુલ લેખો ({posts.length})
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-8">
              <p className="text-lg text-[#B9C6D6]">
                આ કેટેગરીમાં હાલ કોઈ લેખો ઉપલબ્ધ નથી.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
