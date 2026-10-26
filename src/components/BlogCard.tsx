import React from 'react';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Post } from '@/lib/types';

interface BlogCardProps {
  post: Post;
  priority?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, priority = false }) => {
  return (
    <article className="group flex flex-col bg-theme-card hover:bg-theme-card-hover border border-theme hover:border-gold/50 rounded-2xl overflow-hidden transition-all duration-300 card-glow h-full">
      {/* Thumbnail Container */}
      <Link href={`/post/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-theme-main">
        <img
          src={post.featuredImage || '/images/hero-candle.jpg'}
          alt={post.imageAlt || post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* Category Pill Tag */}
        {post.categoryName && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-block px-3 py-1 bg-black/75 backdrop-blur-md border border-white/15 text-gold font-medium text-xs rounded-full shadow-md">
              {post.categoryName}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base sm:text-lg font-bold text-theme-primary group-hover:text-gold transition-colors leading-snug line-clamp-2 mb-2.5">
          <Link href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-theme-secondary line-clamp-2 leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Card Footer: Metadata (Date only) */}
        <div className="flex items-center justify-between pt-3 border-t border-theme-subtle text-xs text-theme-muted">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-theme-muted" />
            <span>
              {(() => {
                const d = post.publishedAt ? new Date(post.publishedAt) : new Date();
                const valid = !isNaN(d.getTime()) ? d : new Date();
                return valid.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });
              })()}
            </span>
          </div>

          <span className="text-[11px] font-medium text-gold hover:underline group-hover:translate-x-0.5 transition-transform">
            વાંચો →
          </span>
        </div>
      </div>
    </article>
  );
};
