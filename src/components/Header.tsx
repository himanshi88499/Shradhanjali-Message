'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { LotusLogo } from './LotusLogo';
import { useTheme } from './ThemeProvider';
import LanguageDropdown from './LanguageDropdown';

interface HeaderProps {
  navLinks?: Array<{ id: string; label: string; url: string }>;
}

export const Header: React.FC<HeaderProps> = ({ navLinks }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const links = navLinks || [
    { id: '1', label: 'હોમ', url: '/' },
    { id: '2', label: 'શ્રદ્ધાંજલિ સંદેશ', url: '/category/shradhanjali' },
    { id: '3', label: 'પુણ્યતિથિ', url: '/category/punyatithi' },
    { id: '4', label: 'શાયરી', url: '/category/shayari' },
    { id: '5', label: 'માહિતી', url: '/category/information' },
    { id: '6', label: 'વિશેષ લેખ', url: '/category/vishesh-lekh' },
    { id: '7', label: 'અમારા વિશે', url: '/about' },
    { id: '8', label: 'સંપર્ક', url: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#061321]/95 backdrop-blur-md shadow-lg border-[#1C3A52]'
            : 'bg-[#061321] border-[#1C3A52]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <LotusLogo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
              {links.map((link) => {
                const isActive =
                  link.url === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.url);

                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-gold font-semibold'
                        : 'text-[#B9C6D6] hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold rounded-full transition-all" />
                    )}
                  </Link>
                );
              })}

              {/* Language Dropdown at the far end of main navigation */}
              <div className="ml-1 pl-1">
                <LanguageDropdown />
              </div>
            </nav>

            {/* Right controls: Search, Theme Toggle, Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-[#B9C6D6] hover:text-gold hover:bg-[#0B1D2D] transition-colors"
                aria-label="શોધો"
              >
                <Search size={19} />
              </button>

              {/* Day/Night Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-full text-[#B9C6D6] hover:text-gold hover:bg-[#0B1D2D] transition-colors"
                aria-label={theme === 'dark' ? 'ડે મોડ પર સ્વિચ કરો' : 'નાઈટ મોડ પર સ્વિચ કરો'}
                title={theme === 'dark' ? 'લાઈટ મોડ' : 'ડાર્ક મોડ'}
              >
                {theme === 'dark' ? <Sun size={19} className="text-gold" /> : <Moon size={19} />}
              </button>

              {/* Mobile menu hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#B9C6D6] hover:text-white hover:bg-[#0B1D2D] transition-colors"
                aria-label="મેનુ ખોલો"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-[#1C3A52] bg-[#0A1B2B] px-4 py-3 sm:px-6 animate-fade-in shadow-xl">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અથવા વિષય શોધો..."
                  className="w-full bg-[#061321] text-white pl-4 pr-24 py-2.5 rounded-lg border border-[#1C3A52] focus:outline-none focus:border-gold text-sm transition-colors placeholder-[#8495A9]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-gold hover:bg-[#ffd782] text-[#061321] font-semibold text-xs rounded-md transition-colors"
                >
                  શોધો
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs bg-[#0A1B2B] border-l border-[#1C3A52] h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-5 border-b border-[#1C3A52]">
              <LotusLogo size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md text-[#B9C6D6] hover:text-white hover:bg-[#0B1D2D]"
                aria-label="બંધ કરો"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="mt-6 flex flex-col space-y-2">
              {links.map((link) => {
                const isActive =
                  link.url === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.url);

                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0B1D2D] text-gold font-semibold border-l-2 border-gold pl-4'
                        : 'text-[#B9C6D6] hover:bg-[#0B1D2D] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Language selector in mobile menu */}
              <div className="pt-3 border-t border-[#1C3A52]/50">
                <LanguageDropdown isMobile={true} />
              </div>
            </nav>

            {/* Mobile Footer / Admin Link */}
            <div className="mt-auto pt-6 border-t border-[#1C3A52]">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-xs text-[#8495A9] hover:text-gold py-2"
              >
                વ્યવસ્થાપક લૉગિન (Admin)
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
