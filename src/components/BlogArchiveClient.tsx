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
      <div className="bg-theme-card border border-theme rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md transition-colors">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8);
              }}
              placeholder="Search title, category or memorial keywords..."
              className="w-full bg-theme-main text-theme-primary pl-10 pr-16 py-2.5 rounded-xl border border-theme focus:outline-none focus:border-gold text-sm placeholder-theme-muted transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-theme-muted hover:text-theme-primary px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Result Count Info */}
          <div className="text-xs text-theme-muted flex items-center gap-1.5 self-center md:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>
              Total <strong className="text-theme-primary font-semibold">{filteredPosts.length}</strong> articles found
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-theme-subtle">
          <div className="flex items-center gap-1.5 text-xs text-gold font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Categories:</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setVisibleCount(8);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-gold text-white font-bold shadow-sm'
                : 'bg-theme-main text-theme-secondary border border-theme hover:border-gold hover:text-gold'
            }`}
          >
            All ({initialPosts.length})
          </button>

          {categories.map((cat) => {
            const count = initialPosts.filter(
              (p) => p.categoryId === cat.id || p.categorySlug === cat.slug
            ).length;
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
                    ? 'bg-gold text-white font-bold shadow-sm'
                    : 'bg-theme-main text-theme-secondary border border-theme hover:border-gold hover:text-gold'
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
        <div className="text-center py-16 bg-theme-card border border-theme rounded-2xl p-8 transition-colors">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-theme-surface border border-theme flex items-center justify-center text-gold">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-theme-primary mb-2">No Articles Found</h3>
          <p className="text-sm text-theme-muted max-w-md mx-auto mb-6">
            No articles match your query &ldquo;{searchQuery}&rdquo;. Try another search keyword or select all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-gold text-white text-xs font-bold hover:bg-gold/90 transition-colors shadow-sm"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Load More Pagination Button */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={handleLoadMore}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-theme-card border border-theme text-gold font-semibold text-sm hover:bg-theme-card-hover hover:border-gold transition-all shadow-md"
          >
            <span>Load More Articles ({filteredPosts.length - visibleCount} remaining)</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
