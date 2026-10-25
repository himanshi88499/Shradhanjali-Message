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
    title: q ? `"${q}" માટે શોધ પરિણામો | શ્રદ્ધાંજલિ` : 'શોધો | શ્રદ્ધાંજલિ',
    description: 'શ્રદ્ધાંજલિ પોર્ટલ પર સંદેશાઓ અને લેખો શોધો.',
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q ? q.trim() : '';
  const results = query ? searchPosts(query) : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: 'શોધ પરિણામો' },
          ]}
        />

        {/* Search header & input */}
        <div className="my-6 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            શોધ પરિણામો
          </h1>

          <form action="/search" method="GET" className="relative flex items-center mb-6">
            <div className="relative flex items-center w-full bg-[#0B1D2D] border border-[#1C3A52] focus-within:border-gold rounded-xl p-1.5 shadow-xl">
              <Search size={18} className="text-[#8495A9] ml-3 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અથવા વિષય શોધો..."
                className="w-full bg-transparent text-white px-3 py-2 text-sm focus:outline-none placeholder-[#8495A9]"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] font-bold text-xs rounded-lg transition-colors shrink-0"
              >
                શોધો
              </button>
            </div>
          </form>

          {query && (
            <p className="text-sm text-[#B9C6D6]">
              <span className="text-gold font-semibold">&ldquo;{query}&rdquo;</span> માટે{' '}
              <span className="font-bold text-white">{results.length}</span> પરિણામો મળ્યા.
            </p>
          )}
        </div>

        {/* Results grid */}
        <div className="py-6">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-8 max-w-xl mx-auto">
              <p className="text-base text-[#B9C6D6] mb-3">
                માફ કરશો, <span className="text-gold font-semibold">&ldquo;{query}&rdquo;</span> સંબંધિત કોઈ લેખ મળ્યો નથી.
              </p>
              <p className="text-xs text-[#8495A9]">
                સૂચન: જોડણી તપાસો અથવા સામાન્ય શબ્દો જેમ કે &ldquo;માતાજી&rdquo;, &ldquo;પુણ્યતિથિ&rdquo;, &ldquo;શાયરી&rdquo; શોધો.
              </p>
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-8 max-w-xl mx-auto">
              <p className="text-base text-[#B9C6D6]">
                શોધ શરૂ કરવા માટે ઉપર આપેલા બોક્સમાં કોઈપણ વિષય અથવા કીવર્ડ દાખલ કરો.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
