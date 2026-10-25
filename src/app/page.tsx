import React from 'react';
import type { Metadata } from 'next';
import { getPosts, getCategories, getSettings } from '@/lib/db';
import { HomePageContent } from '@/components/HomePageContent';

export const metadata: Metadata = {
  title: 'Shradhanjali Msg — Memorial Condolences & Tributes',
  description:
    'Shradhanjali Msg is a respectful digital memorial and tribute publishing platform offering condolences, punyatithi messages, memorial poetry, and thoughtful remembrance guidance.',
};

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
