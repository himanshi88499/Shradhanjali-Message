import React from 'react';
import type { Metadata } from 'next';
import { getPosts, getCategories, getSettings } from '@/lib/db';
import { HomePageContent } from '@/components/HomePageContent';

export const metadata: Metadata = {
  title: 'શ્રદ્ધાંજલિ — પ્રિયજનોની સ્મૃતિઓ ક્યારેય ભૂલાતી નથી | Shradhanjali Msg',
  description:
    'શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અને સંવેદનશીલ માહિતી માટેનું વિશ્વસનીય અને સન્માનનીય ગુજરાતી મંચ.',
  alternates: {
    canonical: '/',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
