import React from 'react';
import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import { AboutPageContent } from '@/components/AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us | Shradhanjali Msg — Compassionate Memorial Platform',
  description:
    'Learn about Shradhanjali Msg, our mission to support families with reverent condolences, memorial poetry, and thoughtful remembrance resources.',
};

export default function AboutPage() {
  const page = getPageBySlug('about');

  return <AboutPageContent page={page} />;
}
