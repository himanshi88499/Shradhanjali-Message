import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LotusIcon } from '@/components/LotusLogo';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md bg-[#0B1D2D] border border-[#1C3A52] rounded-3xl p-8 sm:p-10 card-glow">
          <div className="flex justify-center mb-4">
            <LotusIcon size={48} />
          </div>
          <span className="text-gold font-extrabold text-5xl">404</span>
          <h1 className="text-2xl font-bold text-white mt-3 mb-2">
            પૃષ્ઠ મળ્યું નથી
          </h1>
          <p className="text-sm text-[#B9C6D6] mb-8 leading-relaxed">
            તમે જે પૃષ્ઠ શોધી રહ્યા છો તે અસ્તિત્વમાં નથી અથવા તેને ખસેડવામાં આવ્યું છે.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-[#ffd782] text-[#061321] font-bold text-sm rounded-xl transition-all shadow-md"
          >
            <ArrowLeft size={16} />
            <span>મુખ્ય પૃષ્ઠ પર પાછા જાઓ</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
