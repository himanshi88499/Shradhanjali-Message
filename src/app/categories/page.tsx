import React from 'react';
import type { Metadata } from 'next';
import { getCategories } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CategoryCard } from '@/components/CategoryCard';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'શ્રદ્ધાંજલિ કેટેગરીઝ | Shradhanjali Msg',
  description:
    'Explore memorial message categories, condolences, punyatithi tributes, and memorial poetry.',
  alternates: {
    canonical: '/categories',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', url: '/' },
            { label: 'Categories' },
          ]}
        />

        <div className="my-6">
          <div className="flex items-center gap-2 text-gold text-sm font-semibold mb-1">
            <Sparkles size={18} />
            <span>વિશેષ કેટેગરીઝ</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-theme-primary mb-3">
            શ્રદ્ધાંજલિ કેટેગરી
          </h1>
          <p className="text-sm sm:text-base text-theme-secondary max-w-2xl">
            તમારા સ્નેહીજનોને યાદ કરતા શ્રેષ્ઠ સંદેશાઓ અને લાગણીઓને અનુરૂપ કેટેગરી પસંદ કરો.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
