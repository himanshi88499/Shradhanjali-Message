import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RichText } from '@/components/RichText';
import { getPageBySlug } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageBySlug('disclaimer');
  return {
    title: page?.seoTitle || `${page?.title || 'Disclaimer'} | Shradhanjali Msg`,
    description:
      page?.seoDescription ||
      'Legal disclaimer and usage guidance for Shradhanjali Msg.',
    alternates: {
      canonical: '/disclaimer',
    },
  };
}

export default function DisclaimerPage() {
  const page = getPageBySlug('disclaimer');
  const pageTitle = page?.title || 'Disclaimer';
  const lastUpdated = page?.metadata?.lastUpdatedText || 'Last Updated: April 2026';

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', url: '/' },
            { label: pageTitle },
          ]}
        />

        <article className="mt-6 bg-theme-card border border-theme rounded-2xl p-6 sm:p-10 card-glow transition-colors">
          <h1 className="text-xl sm:text-2xl font-extrabold text-theme-primary mb-2">
            {pageTitle}
          </h1>
          <p className="text-xs text-theme-muted mb-8 pb-4 border-b border-theme">
            {lastUpdated}
          </p>

          <div className="prose prose-invert max-w-none text-sm sm:text-base text-theme-secondary leading-relaxed space-y-5">
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
                  <h3 key={index} className="text-base font-semibold text-theme-primary mt-4 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return <p key={index}><RichText content={paragraph} /></p>;
            })}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
