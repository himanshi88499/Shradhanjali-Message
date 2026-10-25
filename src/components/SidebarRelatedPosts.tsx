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
  // Filter out current post
  const eligible = initialPosts.filter((p) => p.id !== currentPostId);

  // Helper to get 6 random unique posts
  const pickRandomSix = (items: Post[]): Post[] => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 6);
  };

  // Pre-seed with the first 6 eligible posts for SSR hydration consistency
  const [selectedPosts, setSelectedPosts] = useState<Post[]>(() => eligible.slice(0, 6));

  // On client mount or route change, dynamically generate a fresh random selection of 6 posts
  useEffect(() => {
    if (eligible.length > 0) {
      setSelectedPosts(pickRandomSix(eligible));
    }
  }, [currentPostId]);

  if (selectedPosts.length === 0) return null;

  return (
    <div className="bg-[#0B1D2D] border border-[#C5A880]/25 rounded-2xl p-5 shadow-xl transition-all">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#C5A880]/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-white font-bold text-base tracking-wide font-gujarati">
            સંબંધિત લેખો
          </h3>
        </div>
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:text-[#ffd782] font-medium transition-colors"
        >
          <span>બધા જુઓ</span>
          <ChevronRight size={13} />
        </Link>
      </div>

      {/* 6 Post List Items */}
      <div className="mt-3.5 space-y-3">
        {selectedPosts.map((item) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group flex items-center gap-3 p-2 rounded-xl hover:bg-[#132A3E] border border-transparent hover:border-[#C5A880]/20 transition-all duration-200"
          >
            {/* Small Compact Thumbnail */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-[#1C3A52] bg-[#061321]">
              <img
                src={item.featuredImage || '/images/hero-candle.jpg'}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Post Meta */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider block mb-0.5 truncate">
                {item.categoryName || 'શ્રદ્ધાંજલિ'}
              </span>
              <h4 className="text-xs font-semibold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug font-gujarati">
                {item.title}
              </h4>
              <div className="flex items-center gap-1 text-[10px] text-[#8495A9] mt-1">
                <Calendar size={10} className="shrink-0" />
                <span>
                  {new Date(item.publishedAt).toLocaleDateString('gu-IN', {
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
