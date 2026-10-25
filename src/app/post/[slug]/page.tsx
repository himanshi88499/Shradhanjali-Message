import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { TwitterIcon, InstagramIcon, YoutubeIcon } from '@/components/SocialIcons';
import { getPostBySlug, getPosts, getAuthorById, getCategoryBySlug } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TableOfContents } from '@/components/TableOfContents';
import { MessageCardItem } from '@/components/MessageCardItem';
import { ArticleQuickActions } from '@/components/ArticleQuickActions';
import { SidebarRelatedPosts } from '@/components/SidebarRelatedPosts';
import { BlogCard } from '@/components/BlogCard';
import { LotusIcon } from '@/components/LotusLogo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'લેખ મળ્યો નથી | શ્રદ્ધાંજલિ' };

  return {
    title: `${post.seoTitle || post.title} | શ્રદ્ધાંજલિ`,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    alternates: {
      canonical: post.canonicalUrl || `https://shradhanjali.in/post/${post.slug}`,
    },
  };
}

export default async function SingleArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthorById(post.authorId);
  const allPosts = getPosts('published');
  
  // Related posts: exclude current post, match category or general
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => (a.categoryId === post.categoryId ? -1 : 1))
    .slice(0, 5);

  const bottomRelated = relatedPosts.slice(0, 4);

  // Schema.org Article Structured Data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: author?.name || 'હિના પટેલ',
    },
    publisher: {
      '@type': 'Organization',
      name: 'શ્રદ્ધાંજલિ',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shradhanjali.in/images/lotus-logo.svg',
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: post.categoryName || 'શ્રદ્ધાંજલિ સંદેશ', url: `/category/${post.categorySlug || 'shradhanjali'}` },
            { label: post.tags[0] || 'વિશેષ' },
            { label: post.title },
          ]}
        />

        {/* Article Header Metadata */}
        <div className="flex flex-wrap items-center gap-3 my-3">
          <span className="px-3.5 py-1 bg-gold text-[#061321] font-bold text-xs rounded-full">
            {post.categoryName || 'માતાજી'}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#B9C6D6]">
            <Calendar size={13} className="text-[#8495A9]" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString('gu-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <span className="text-[#8495A9]">•</span>
          <div className="flex items-center gap-1.5 text-xs text-[#B9C6D6]">
            <Clock size={13} className="text-[#8495A9]" />
            <span>{post.readingTime || '5 મિનિટ વાંચો'}</span>
          </div>
        </div>

        {/* H1 Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
          {post.title}
        </h1>

        {/* Introduction */}
        <p className="text-base sm:text-lg text-[#B9C6D6] leading-relaxed mb-8 max-w-4xl font-normal">
          {post.excerpt}
        </p>

        {/* Main 2-Column Layout: Content Column & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Article Body (8 cols on lg) */}
          <article className="lg:col-span-8 flex flex-col">
            {/* Featured Image with Quote Card Overlay */}
            <div className="relative rounded-2xl overflow-hidden border border-[#1C3A52] bg-[#0B1D2D] aspect-[16/9] mb-6 shadow-2xl">
              <img
                src={post.featuredImage || '/images/hero-candle.jpg'}
                alt={post.imageAlt || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/90 via-[#061321]/30 to-transparent" />

              {/* Quote Card Overlay */}
              {post.quote && (
                <div className="absolute top-6 right-6 max-w-xs sm:max-w-sm bg-[#061321]/80 backdrop-blur-md border border-[#1C3A52] rounded-2xl p-4 sm:p-5 shadow-2xl text-right">
                  <p className="text-sm sm:text-base text-white italic font-medium leading-relaxed">
                    &ldquo;{post.quote}&rdquo;
                  </p>
                  <div className="mt-2.5 flex justify-end">
                    <LotusIcon size={22} className="opacity-80" />
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Inline Table of Contents */}
            {post.showTableOfContents !== false && (
              <TableOfContents content={post.content} />
            )}

            {/* Sub-heading & Intro before messages */}
            <div className="mt-4 mb-6">
              <div className="flex items-center gap-2 text-gold text-lg sm:text-xl font-bold mb-2">
                <LotusIcon size={22} />
                <span>{post.title}</span>
              </div>
              <p className="text-sm sm:text-base text-[#B9C6D6] leading-relaxed">
                આપણા પ્રિયજનોનું જીવન પ્રેમ, ત્યાગ અને સંસ્કારોની ખાણ હતું. તેમના આશીર્વાદ અને સ્નેહ આજે પણ આપણા હૃદયમાં જીવંત છે. અહીં આપેલ સંદેશાઓ તમે તમારા પરિવાર અને સ્નેહીજનો સાથે શેર કરી શકો છો.
              </p>
            </div>

            {/* Individual Message Cards */}
            {post.messageCards && post.messageCards.length > 0 && (
              <div className="space-y-4 my-6">
                {post.messageCards.map((card) => (
                  <MessageCardItem
                    key={card.id}
                    id={card.id}
                    text={card.text}
                    articleUrl={`https://shradhanjali.in/post/${post.slug}`}
                    articleTitle={post.title}
                  />
                ))}
              </div>
            )}

            {/* Main Rich Text Content */}
            <div className="prose prose-invert max-w-none text-[#F4F6FA] text-base leading-relaxed mt-6 space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  const heading = paragraph.replace('## ', '');
                  const id = heading.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-');
                  return (
                    <h2
                      key={index}
                      id={id}
                      className="text-xl sm:text-2xl font-bold text-white border-b border-[#1C3A52] pb-2 mt-8 mb-4 text-gold flex items-center gap-2"
                    >
                      <Sparkles size={18} />
                      <span>{heading}</span>
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  const heading = paragraph.replace('### ', '');
                  const id = heading.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-');
                  return (
                    <h3
                      key={index}
                      id={id}
                      className="text-lg sm:text-xl font-semibold text-[#FFD782] mt-6 mb-3"
                    >
                      {heading}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="text-[#B9C6D6] leading-relaxed text-base">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Author Information Box (લેખક વિશે) */}
            {author && (
              <div className="mt-12 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow">
                <div className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                  <span>લેખક વિશે</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold shrink-0 shadow-lg bg-[#061321]">
                    <img
                      src={author.avatar || '/images/author-hina.jpg'}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">{author.name}</h4>
                        <p className="text-xs text-gold">{author.roleTitle}</p>
                      </div>
                      {/* Social icons */}
                      <div className="flex items-center justify-center sm:justify-end space-x-2 text-[#8495A9]">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-gold transition-colors">
                          <TwitterIcon size={16} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-gold transition-colors">
                          <InstagramIcon size={16} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-gold transition-colors">
                          <YoutubeIcon size={16} />
                        </a>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#B9C6D6] leading-relaxed">
                      {author.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Desktop Right Sidebar (4 cols on lg) */}
          <aside className="lg:col-span-4 flex flex-col space-y-6">
            {/* Widget 1: સંબંધિત લેખો (6 randomly selected posts with thumbnails) */}
            <SidebarRelatedPosts currentPostId={post.id} initialPosts={allPosts} />

            {/* Widget 2: ઝડપી ક્રિયાઓ (Quick Actions) */}
            <ArticleQuickActions
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          </aside>
        </div>

        {/* Bottom Related Articles Grid (4 cards) */}
        <section className="mt-16 pt-10 border-t border-[#1C3A52]">
          <div className="flex items-center gap-2 text-gold text-lg sm:text-xl font-bold mb-6">
            <Sparkles size={20} />
            <span>સંબંધિત લેખો</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bottomRelated.map((rel) => (
              <BlogCard key={rel.id} post={rel} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
