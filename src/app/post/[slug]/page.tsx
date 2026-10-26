import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { TwitterIcon, InstagramIcon, YoutubeIcon } from '@/components/SocialIcons';
import { getPostBySlug, getPosts, getAuthorById, getCategories } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TableOfContents } from '@/components/TableOfContents';
import { MessageCardItem } from '@/components/MessageCardItem';
import { ArticleQuickActions } from '@/components/ArticleQuickActions';
import { SidebarRelatedPosts } from '@/components/SidebarRelatedPosts';
import { SidebarCategories } from '@/components/SidebarCategories';
import { BlogCard } from '@/components/BlogCard';
import { LotusIcon } from '@/components/LotusLogo';
import { ArticleLanguageBadge } from '@/components/ArticleLanguageBadge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | Shradhanjali Msg' };

  return {
    title: `${post.seoTitle || post.title} | Shradhanjali Msg`,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      siteName: 'Shradhanjali Msg',
    },
    alternates: {
      canonical: post.canonicalUrl || `https://shradhanjali.in/post/${post.slug}`,
    },
  };
}

interface ContentBlock {
  type: 'h2' | 'h3' | 'paragraph' | 'card';
  text: string;
}

function parseContentBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const parts = content.split(/(:::card[\s\S]*?:::)/g);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith(':::card') && trimmed.endsWith(':::')) {
      const cardText = trimmed
        .replace(/^:::card\s*/, '')
        .replace(/\s*:::$/, '')
        .trim();
      if (cardText) {
        blocks.push({ type: 'card', text: cardText });
      }
    } else {
      const paras = trimmed.split(/\n\n+/);
      for (const p of paras) {
        const pTrimmed = p.trim();
        if (!pTrimmed) continue;
        if (pTrimmed.startsWith('## ')) {
          blocks.push({ type: 'h2', text: pTrimmed.replace(/^##\s+/, '') });
        } else if (pTrimmed.startsWith('### ')) {
          blocks.push({ type: 'h3', text: pTrimmed.replace(/^###\s+/, '') });
        } else {
          blocks.push({ type: 'paragraph', text: pTrimmed });
        }
      }
    }
  }

  return blocks;
}

export default async function SingleArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthorById(post.authorId);
  const allPosts = getPosts('published');
  const categories = getCategories();

  // Internal linking: 1 recommendation after message cards, 1 at post end
  const otherPosts = allPosts.filter((p) => p.id !== post.id);
  const midPostRecommendation = otherPosts[0] || allPosts[0];
  const endPostRecommendation = otherPosts[1] || allPosts[1] || otherPosts[0];

  // Related posts: exclude current post, match category or general
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => (a.categoryId === post.categoryId ? -1 : 1))
    .slice(0, 5);

  const bottomRelated = relatedPosts.slice(0, 4);

  const hasEmbeddedCards = post.content.includes(':::card');
  const contentBlocks = parseContentBlocks(post.content);
  const midPoint = Math.max(1, Math.floor(contentBlocks.length / 2));
  let cardCounter = 1;

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
      name: 'Shradhanjali Msg',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shradhanjali.in/images/lotus-logo.svg',
      },
    },
  };

  const renderRecommendationBox = (recPost: typeof post) => (
    <div className="my-8 p-4 sm:p-5 rounded-2xl bg-theme-surface border border-theme hover:border-[#F5C45E]/60 transition-all card-glow group">
      <div className="flex items-center gap-2 text-xs font-bold text-[#F5C45E] uppercase tracking-wider mb-3">
        <Sparkles size={15} className="text-[#F5C45E]" />
        <span>આ પણ વાંચો</span>
      </div>
      <a
        href={`/post/${recPost.slug}`}
        rel="dofollow"
        className="flex items-center gap-4 group-hover:opacity-95 transition-opacity"
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-theme bg-theme-main">
          <img
            src={recPost.featuredImage || '/images/hero-candle.jpg'}
            alt={recPost.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-[#F5C45E] uppercase tracking-wider block mb-1">
            {recPost.categoryName || 'Shradhanjali'}
          </span>
          <h4 className="text-sm sm:text-base font-bold text-theme-primary group-hover:text-[#F5C45E] transition-colors line-clamp-2 leading-snug">
            {recPost.title}
          </h4>
          <span className="inline-flex items-center gap-1 text-xs text-[#F5C45E] font-semibold mt-2">
            <span>સંપૂર્ણ લેખ વાંચો</span>
            <span>→</span>
          </span>
        </div>
      </a>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full">
        {/* Main 2-Column Layout starting at the top so sidebar aligns flush with breadcrumbs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Body (8 cols on lg) */}
          <article className="lg:col-span-8 flex flex-col">
            {/* Breadcrumbs at the top of left article column */}
            <Breadcrumbs
              items={[
                { label: 'Home', url: '/' },
                {
                  label: post.categoryName || 'Shradhanjali',
                  url: `/category/${post.categorySlug || 'shradhanjali'}`,
                },
                { label: post.title },
              ]}
            />

            {/* Article Language Notice */}
            <ArticleLanguageBadge />

            {/* Article Header Metadata without reading time */}
            <div className="flex flex-wrap items-center gap-3 my-2.5">
              <span className="px-3.5 py-1 bg-gold !text-white font-bold text-xs rounded-full shadow-sm">
                {post.categoryName || 'Tribute'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-theme-secondary">
                <Calendar size={13} className="text-theme-muted" />
                <span>
                  {(() => {
                    const d = post.publishedAt ? new Date(post.publishedAt) : new Date();
                    const valid = !isNaN(d.getTime()) ? d : new Date();
                    return valid.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                  })()}
                </span>
              </div>
            </div>

            {/* H1 Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-theme-primary leading-tight mb-5 tracking-tight">
              {post.title}
            </h1>

            {/* Featured Image with Quote Card Overlay */}
            <div className="relative rounded-2xl overflow-hidden border border-theme bg-theme-card aspect-[16/9] mb-3.5 shadow-xl">
              <img
                src={post.featuredImage || '/images/hero-candle.jpg'}
                alt={post.imageAlt || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Quote Card Overlay */}
              {post.quote && (
                <div className="absolute top-6 right-6 max-w-xs sm:max-w-sm bg-black/75 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl text-right">
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

            {/* Sub-heading & Intro before messages (Configurable in Post Editor) */}
            {(post.introHeading || post.introText) && (
              <div className="mt-4 mb-6">
                {post.introHeading && (
                  <div className="flex items-center gap-2 text-gold text-lg sm:text-xl font-bold mb-2">
                    <LotusIcon size={22} />
                    <span>{post.introHeading}</span>
                  </div>
                )}
                {post.introText && (
                  <p className="text-sm sm:text-base text-theme-secondary leading-relaxed">
                    {post.introText}
                  </p>
                )}
              </div>
            )}

            {/* Content Display: Interweaved Message Cards & Headings OR Classic Mode */}
            {hasEmbeddedCards ? (
              <div className="prose prose-invert max-w-none text-theme-primary text-base leading-relaxed space-y-6">
                {contentBlocks.map((block, idx) => {
                  const shouldInsertMidRec = idx === midPoint && midPostRecommendation;

                  if (block.type === 'card') {
                    const currentNum = cardCounter++;
                    return (
                      <React.Fragment key={idx}>
                        <div className="not-prose my-4">
                          <MessageCardItem
                            id={currentNum}
                            text={block.text}
                            articleUrl={`https://shradhanjali.in/post/${post.slug}`}
                            articleTitle={post.title}
                          />
                        </div>
                        {shouldInsertMidRec && (
                          <div className="not-prose">{renderRecommendationBox(midPostRecommendation)}</div>
                        )}
                      </React.Fragment>
                    );
                  }

                  if (block.type === 'h2') {
                    const id = block.text.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-');
                    return (
                      <React.Fragment key={idx}>
                        <h2
                          id={id}
                          className="text-xl sm:text-2xl font-bold border-b border-theme pb-2 mt-8 mb-4 text-[#F5C45E] flex items-center gap-2"
                        >
                          <Sparkles size={18} className="text-[#F5C45E]" />
                          <span>{block.text}</span>
                        </h2>
                        {shouldInsertMidRec && (
                          <div className="not-prose">{renderRecommendationBox(midPostRecommendation)}</div>
                        )}
                      </React.Fragment>
                    );
                  }

                  if (block.type === 'h3') {
                    const id = block.text.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-');
                    return (
                      <React.Fragment key={idx}>
                        <h3
                          id={id}
                          className="text-lg sm:text-xl font-semibold text-[#F5C45E] mt-6 mb-3"
                        >
                          {block.text}
                        </h3>
                        {shouldInsertMidRec && (
                          <div className="not-prose">{renderRecommendationBox(midPostRecommendation)}</div>
                        )}
                      </React.Fragment>
                    );
                  }

                  return (
                    <React.Fragment key={idx}>
                      <p className="text-theme-secondary leading-relaxed text-base">
                        {block.text}
                      </p>
                      {shouldInsertMidRec && (
                        <div className="not-prose">{renderRecommendationBox(midPostRecommendation)}</div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <>
                {/* H2 Heading & Paragraph before Individual Message Cards */}
                {(post.cardsH2Heading || post.cardsParagraph) && (
                  <div className="mt-8 mb-4">
                    {post.cardsH2Heading && (
                      <h2
                        id={post.cardsH2Heading.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-')}
                        className="text-xl sm:text-2xl font-bold border-b border-theme pb-2 mb-3 text-[#F5C45E] flex items-center gap-2"
                      >
                        <Sparkles size={18} className="text-[#F5C45E]" />
                        <span>{post.cardsH2Heading}</span>
                      </h2>
                    )}
                    {post.cardsParagraph && (
                      <p className="text-sm sm:text-base text-theme-secondary leading-relaxed">
                        {post.cardsParagraph}
                      </p>
                    )}
                  </div>
                )}

                {/* Classic Mode: Individual Message Cards */}
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

                {/* Auto Internal Link 1: Mid-Article Also Read (Do-follow) */}
                {midPostRecommendation && renderRecommendationBox(midPostRecommendation)}

                {/* Main Rich Text Content */}
                <div className="prose prose-invert max-w-none text-theme-primary text-base leading-relaxed mt-6 space-y-6">
                  {post.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      const heading = paragraph.replace('## ', '');
                      const id = heading.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-');
                      return (
                        <h2
                          key={index}
                          id={id}
                          className="text-xl sm:text-2xl font-bold border-b border-theme pb-2 mt-8 mb-4 text-[#F5C45E] flex items-center gap-2"
                        >
                          <Sparkles size={18} className="text-[#F5C45E]" />
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
                          className="text-lg sm:text-xl font-semibold text-[#F5C45E] mt-6 mb-3"
                        >
                          {heading}
                        </h3>
                      );
                    }
                    return (
                      <p key={index} className="text-theme-secondary leading-relaxed text-base">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </>
            )}

            {/* Auto Internal Link 2: End-of-Article Do-Follow Recommendation */}
            {endPostRecommendation && (
              <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-theme-card to-theme-surface border border-theme hover:border-[#F5C45E]/70 transition-all card-glow group">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-theme">
                  <span className="text-xs font-bold text-[#F5C45E] uppercase tracking-wider flex items-center gap-1.5">
                    <LotusIcon size={18} className="text-[#F5C45E]" />
                    <span>આ પણ વાંચો</span>
                  </span>
                </div>
                <a
                  href={`/post/${endPostRecommendation.slug}`}
                  rel="dofollow"
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="relative w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 border border-theme bg-theme-main">
                    <img
                      src={endPostRecommendation.featuredImage || '/images/hero-candle.jpg'}
                      alt={endPostRecommendation.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#F5C45E] uppercase tracking-wider block mb-1">
                      {endPostRecommendation.categoryName || 'Tribute'}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-theme-primary group-hover:text-[#F5C45E] transition-colors line-clamp-2 leading-snug mb-1">
                      {endPostRecommendation.title}
                    </h4>
                    <p className="text-xs text-theme-secondary line-clamp-1">
                      {endPostRecommendation.excerpt}
                    </p>
                  </div>
                  <div className="hidden sm:flex shrink-0">
                    <span className="px-4 py-2 rounded-xl bg-gold text-[#030B12] font-bold text-xs group-hover:bg-[#E5B54E] transition-colors shadow-md">
                      વાંચો →
                    </span>
                  </div>
                </a>
              </div>
            )}

            {/* Author Information Box */}
            {author && (
              <div className="mt-12 bg-theme-card border border-theme rounded-2xl p-6 card-glow transition-colors">
                <div className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                  <span>About the Author</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold shrink-0 shadow-lg bg-theme-main">
                    <img
                      src={author.avatar || '/images/author-hina.jpg'}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-theme-primary">
                          {author.name}
                        </h4>
                        <p className="text-xs text-gold">{author.roleTitle}</p>
                      </div>
                      {/* Social icons */}
                      <div className="flex items-center justify-center sm:justify-end space-x-2 text-theme-muted">
                        <a
                          href="https://x.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full hover:text-gold transition-colors"
                          aria-label="Twitter"
                        >
                          <TwitterIcon size={16} />
                        </a>
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full hover:text-gold transition-colors"
                          aria-label="Instagram"
                        >
                          <InstagramIcon size={16} />
                        </a>
                        <a
                          href="https://youtube.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full hover:text-gold transition-colors"
                          aria-label="YouTube"
                        >
                          <YoutubeIcon size={16} />
                        </a>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                      {author.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Desktop Right Sidebar starting flush with breadcrumbs */}
          <aside className="lg:col-span-4 flex flex-col space-y-6">
            {/* Widget 1: Best Shradhanjali Messages */}
            <SidebarRelatedPosts currentPostId={post.id} initialPosts={allPosts} />

            {/* Widget 2: Shradhanjali Categories */}
            <SidebarCategories
              categories={categories}
              currentCategorySlug={post.categorySlug}
            />

            {/* Widget 3: Social Media Share */}
            <ArticleQuickActions
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          </aside>
        </div>

        {/* Bottom Related Articles Grid (4 cards) */}
        <section className="mt-16 pt-10 border-t border-theme">
          <div className="flex items-center gap-2 text-gold text-lg sm:text-xl font-bold mb-6">
            <Sparkles size={20} />
            <span>Related Articles</span>
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
