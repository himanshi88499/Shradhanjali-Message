import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getPageBySlug } from '@/lib/db';

export const metadata: Metadata = {
  title: 'અસ્વીકરણ (Disclaimer) | શ્રદ્ધાંજલિ',
  description: 'શ્રદ્ધાંજલિ વેબસાઇટનું અસ્વીકરણ, સામગ્રી વપરાશ અને કાયદાકીય માર્ગદર્શિકા.',
};

export default function DisclaimerPage() {
  const page = getPageBySlug('disclaimer');

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: 'અસ્વીકરણ' },
          ]}
        />

        <article className="mt-6 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 sm:p-10 card-glow">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {page?.title || 'અસ્વીકરણ (Disclaimer)'}
          </h1>
          <p className="text-xs text-[#8495A9] mb-8 pb-4 border-b border-[#1C3A52]">
            છેલ્લે અપડેટ: 12 એપ્રિલ 2026
          </p>

          <div className="prose prose-invert max-w-none text-sm sm:text-base text-[#B9C6D6] leading-relaxed space-y-5">
            {page?.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-xl font-bold text-gold mt-6 mb-2">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-base font-semibold text-white mt-4 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
