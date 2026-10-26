'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { Post } from '@/lib/types';

interface SidebarRelatedPostsProps {
  currentPostId: string;
  initialPosts: Post[];
}

const PranamHandsIcon: React.FC<{ className?: string }> = ({ className = 'w-4.5 h-4.5 text-gold' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {/* Folded Hands (Pranam / Namaste) respectful memorial icon */}
    <path d="M12 2.5a1.2 1.2 0 0 0-1 .6L8.8 6.8c-.4.7-.5 1.5-.3 2.3l1 4c.2.7.7 1.2 1.4 1.4l1.1.3 1.1-.3c.7-.2 1.2-.7 1.4-1.4l1-4c.2-.8.1-1.6-.3-2.3L13 3.1a1.2 1.2 0 0 0-1-.6zm-.1 2.5l1.6 3.2c.2.4.2.8 0 1.2l-.9 3.4c-.1.3-.3.4-.6.4s-.5-.1-.6-.4l-.9-3.4c-.2-.4-.2-.8 0-1.2l1.6-3.2h.4zM6 10c-.3 0-.6.2-.6.5l-1.2 4.5c-.3 1.2.2 2.4 1.1 3.2l3.4 2.6c.7.5 1.5.7 2.3.7h2c.8 0 1.6-.2 2.3-.7l3.4-2.6c.9-.8 1.4-2 1.1-3.2L18.6 10.5c-.1-.3-.4-.5-.7-.5s-.5.3-.4.6l1.1 4.2c.2.8-.2 1.6-.8 2.2l-3.4 2.6c-.5.4-1.1.5-1.7.5h-2c-.6 0-1.2-.1-1.7-.5L6.9 17c-.6-.6-1-1.4-.8-2.2l1.1-4.2c.1-.3-.1-.6-.4-.6H6z" />
  </svg>
);

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
          <PranamHandsIcon className="w-5 h-5 text-gold shrink-0" />
          <h3 className="text-theme-primary font-bold text-base tracking-wide">
            Shradhanjali Messages
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
                  {(() => {
                    const d = item.publishedAt ? new Date(item.publishedAt) : new Date();
                    const valid = !isNaN(d.getTime()) ? d : new Date();
                    return valid.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    });
                  })()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
