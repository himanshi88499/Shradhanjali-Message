import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LotusIcon } from '@/components/LotusLogo';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md bg-theme-card border border-theme rounded-3xl p-8 sm:p-10 card-glow transition-colors">
          <div className="flex justify-center mb-4">
            <LotusIcon size={44} />
          </div>
          <span className="text-gold font-extrabold text-5xl">404</span>
          <h1 className="text-2xl font-bold text-theme-primary mt-3 mb-2">
            Page Not Found
          </h1>
          <p className="text-sm text-theme-secondary mb-8 leading-relaxed">
            The page you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 text-white font-bold text-sm rounded-xl transition-all shadow-md"
          >
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
