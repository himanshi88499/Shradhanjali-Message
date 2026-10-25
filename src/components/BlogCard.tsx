import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { Post } from '@/lib/types';

interface BlogCardProps {
  post: Post;
  priority?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, priority = false }) => {
  return (
    <article className="group flex flex-col bg-[#0B1D2D] hover:bg-[#10263B] border border-[#1C3A52] hover:border-gold/40 rounded-2xl overflow-hidden transition-all duration-300 card-glow h-full">
      {/* Thumbnail Container */}
      <Link href={`/post/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[#061321]">
        <img
          src={post.featuredImage || '/images/hero-candle.jpg'}
          alt={post.imageAlt || post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D2D] via-transparent to-transparent opacity-60" />

        {/* Category Pill Tag */}
        {post.categoryName && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-block px-3 py-1 bg-[#061321]/80 backdrop-blur-md border border-[#1C3A52] text-gold font-medium text-xs rounded-full shadow-md">
              {post.categoryName}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gold transition-colors leading-snug line-clamp-2 mb-2.5">
          <Link href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-[#B9C6D6] line-clamp-2 leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Card Footer: Metadata (Date & Reading Time) */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1C3A52]/60 text-xs text-[#8495A9]">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-[#8495A9]" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString('gu-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[#8495A9]" />
            <span>{post.readingTime || '5 મિનિટ વાંચો'}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
