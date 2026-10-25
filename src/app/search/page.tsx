import React from 'react';
import type { Metadata } from 'next';
import { searchPosts } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogCard } from '@/components/BlogCard';
import { Search } from 'lucide-react';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}" | Shradhanjali Msg` : 'Search | Shradhanjali Msg',
    description: 'Search memorial messages and articles on Shradhanjali Msg.',
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q ? q.trim() : '';
  const results = query ? searchPosts(query) : [];

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', url: '/' },
            { label: 'Search Results' },
          ]}
        />

        {/* Search header & input */}
        <div className="my-6 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-primary mb-4">
            Search Results
          </h1>

          <form action="/search" method="GET" className="relative flex items-center mb-6">
            <div className="relative flex items-center w-full bg-theme-card border border-theme focus-within:border-gold rounded-2xl p-1.5 shadow-xl transition-all">
              <Search size={18} className="text-theme-muted ml-3 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search memorial messages, punyatithi, shayari or topics..."
                className="w-full bg-transparent text-theme-primary px-3 py-2 text-sm focus:outline-none placeholder-theme-muted"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gold hover:bg-gold/90 text-white font-bold text-xs rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Search
              </button>
            </div>
          </form>

          {query && (
            <p className="text-sm text-theme-secondary">
              Showing {results.length} result{results.length === 1 ? '' : 's'} for{' '}
              <strong className="text-gold">&ldquo;{query}&rdquo;</strong>
            </p>
          )}
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {results.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16 bg-theme-card border border-theme rounded-2xl p-8 my-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-theme-surface border border-theme flex items-center justify-center text-gold">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-bold text-theme-primary mb-2">No Matching Messages Found</h3>
            <p className="text-sm text-theme-muted max-w-md mx-auto">
              We couldn&apos;t find any articles matching &ldquo;{query}&rdquo;. Please check the spelling or explore our categories.
            </p>
          </div>
        ) : (
          <div className="text-center py-12 text-sm text-theme-muted">
            Please enter a search keyword above to discover memorial messages.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
