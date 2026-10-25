'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { Post } from '@/lib/types';

interface SidebarRelatedPostsProps {
  currentPostId: string;
  initialPosts: Post[];
}

export function SidebarRelatedPosts({ currentPostId, initialPosts }: SidebarRelatedPostsProps) {
  const eligible = initialPosts.filter((p) => p.id !== currentPostId);

  const pickRandomSix = (items: Post[]): Post[] => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 6);
  };

  const [selectedPosts, setSelectedPosts] = useState<Post[]>(() => eligible.slice(0, 6));

  useEffect(() => {
    if (eligible.length > 0) {
      setSelectedPosts(pickRandomSix(eligible));
    }
  }, [currentPostId]);

  if (selectedPosts.length === 0) return null;

  return (
    <div className="bg-theme-card border border-theme rounded-2xl p-5 shadow-xl transition-colors">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-theme">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <h3 className="text-theme-primary font-bold text-base tracking-wide">
            Best Shradhanjali Messages
          </h3>
        </div>
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 font-medium transition-colors"
        >
          <span>View All</span>
          <ChevronRight size={13} />
        </Link>
      </div>

      {/* 6 Post List Items */}
      <div className="mt-3.5 space-y-2">
        {selectedPosts.map((item) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group flex items-center gap-3 p-2 rounded-xl hover:bg-theme-card-hover border border-transparent hover:border-theme transition-all duration-150"
          >
            {/* Small Compact Thumbnail */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-theme bg-theme-main">
              <img
                src={item.featuredImage || '/images/hero-candle.jpg'}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Post Meta */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold text-gold uppercase tracking-wider block mb-0.5 truncate">
                {item.categoryName || 'Tribute'}
              </span>
              <h4 className="text-xs font-semibold text-theme-primary group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h4>
              <div className="flex items-center gap-1 text-[10px] text-theme-muted mt-1">
                <Calendar size={10} className="shrink-0" />
                <span>
                  {new Date(item.publishedAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
