import React from 'react';
import type { Metadata } from 'next';
import { getPosts, getCategories, getSettings, getPageBySlug } from '@/lib/db';
import { HomePageContent } from '@/components/HomePageContent';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const homePage = getPageBySlug('home');
  const settings = getSettings();

  const title =
    homePage?.seoTitle?.trim() ||
    (settings?.siteName
      ? `${settings.siteName} — ${settings.tagline || 'પ્રિયજનોની સ્મૃતિઓ ક્યારેય ભૂલાતી નથી'}`
      : 'શ્રદ્ધાંજલિ — પ્રિયજનોની સ્મૃતિઓ ક્યારેય ભૂલાતી નથી | Shradhanjali Msg');

  const description =
    homePage?.seoDescription?.trim() ||
    settings?.tagline ||
    'શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અને સંવેદનશીલ માહિતી માટેનું વિશ્વસનીય અને સન્માનનીય ગુજરાતી મંચ.';

  const keywords = homePage?.seoKeywords
    ? homePage.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean)
    : ['શ્રદ્ધાંજલિ', 'શોક સંદેશ', 'પુણ્યતિથિ', 'ગુજરાતી'];

  const ogImage = homePage?.ogImage || '/images/hero-candle.jpg';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://shradhanjalimsg.com',
      siteName: settings?.siteName || 'Shradhanjali Msg',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: homePage?.canonicalUrl || '/',
    },
    robots: {
      index: settings?.technical?.allowIndexing ?? true,
      follow: settings?.technical?.allowIndexing ?? true,
    },
  };
}

export default function HomePage() {
  const settings = getSettings();
  const categories = getCategories();
  const allPosts = getPosts('published');
  const homepagePosts = allPosts.slice(0, 12);

  return (
    <HomePageContent
      settings={settings}
      categories={categories}
      homepagePosts={homepagePosts}
    />
  );
}
