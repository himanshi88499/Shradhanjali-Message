'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, ChevronDown } from 'lucide-react';
import { Post, Category } from '@/lib/types';
import { BlogCard } from './BlogCard';

interface BlogArchiveClientProps {
  initialPosts: Post[];
  categories: Category[];
}

export function BlogArchiveClient({ initialPosts, categories }: BlogArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        post.categoryId === selectedCategory ||
        post.categorySlug === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.categoryName && post.categoryName.toLowerCase().includes(q)) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredPosts.length));
  };

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Toolbar */}
      <div className="bg-[#0B1D2D]/90 border border-[#C5A880]/20 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9EB5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8);
              }}
              placeholder="લેખનું શીર્ષક, વિષય અથવા કીવર્ડ શોધો..."
              className="w-full bg-[#061321] text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#1C3A52] focus:outline-none focus:border-[#D4AF37] text-sm placeholder-[#8495A9] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A9EB5] hover:text-white"
              >
                સાફ કરો
              </button>
            )}
          </div>

          {/* Result Count Info */}
          <div className="text-xs text-[#8A9EB5] flex items-center gap-1.5 self-center md:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              કુલ <strong className="text-white font-semibold">{filteredPosts.length}</strong> લેખો મળ્યા
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#1C3A52]/60">
          <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>કેટેગરી:</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setVisibleCount(8);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#D4AF37] text-[#061321] font-bold shadow-md shadow-[#D4AF37]/20'
                : 'bg-[#061321] text-[#B9C6D6] border border-[#1C3A52] hover:border-[#D4AF37]/50 hover:text-white'
            }`}
          >
            બધા ({initialPosts.length})
          </button>

          {categories.map((cat) => {
            const count = initialPosts.filter((p) => p.categoryId === cat.id || p.categorySlug === cat.slug).length;
            const isSelected = selectedCategory === cat.id || selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setVisibleCount(8);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#061321] font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'bg-[#061321] text-[#B9C6D6] border border-[#1C3A52] hover:border-[#D4AF37]/50 hover:text-white'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Post Grid (4 cards per row on desktop) */}
      {displayedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-[#0B1D2D]/50 border border-[#1C3A52] rounded-2xl p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#132A3E] border border-[#C5A880]/30 flex items-center justify-center text-[#D4AF37]">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">કોઈ લેખ મળ્યો નથી</h3>
          <p className="text-sm text-[#8A9EB5] max-w-md mx-auto mb-6">
            તમારા શોધ માપદંડ &ldquo;{searchQuery}&rdquo; મુજબ કોઈ લેખ ઉપલબ્ધ નથી. કૃપા કરીને અન્ય શબ્દ અથવા કેટેગરી અજમાવી જુઓ.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#E5C158] text-[#061321] text-xs font-bold hover:opacity-95 transition-opacity"
          >
            બધા ફિલ્ટર્સ સાફ કરો
          </button>
        </div>
      )}

      {/* Load More Pagination Button */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={handleLoadMore}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1D2D] border border-[#C5A880]/40 text-[#D4AF37] font-semibold text-sm hover:bg-[#132A3E] hover:border-[#D4AF37] transition-all shadow-lg shadow-black/20"
          >
            <span>વધુ લેખો જુઓ ({filteredPosts.length - visibleCount} બાકી)</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
