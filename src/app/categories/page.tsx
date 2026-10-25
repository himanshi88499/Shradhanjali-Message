import React from 'react';
import type { Metadata } from 'next';
import { getCategories } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CategoryCard } from '@/components/CategoryCard';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'પ્રમુખ કેટેગરીઝ | શ્રદ્ધાંજલિ',
  description: 'શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી, વિધિ અને સંસ્કાર સંબંધિત મુખ્ય કેટેગરીઓ.',
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: 'બધી કેટેગરીઝ' },
          ]}
        />

        <div className="my-6">
          <div className="flex items-center gap-2 text-gold text-sm font-semibold mb-1">
            <Sparkles size={18} />
            <span>કેટેગરીઝ</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            મુખ્ય કેટેગરી સંગ્રહ
          </h1>
          <p className="text-sm sm:text-base text-[#B9C6D6] max-w-2xl">
            તમારી લાગણીઓ અને જરૂરિયાત મુજબ કેટેગરી પસંદ કરીને સંબંધિત સંદેશાઓ મેળવો.
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
