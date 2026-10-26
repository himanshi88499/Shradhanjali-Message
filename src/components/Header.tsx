'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { LotusLogo } from './LotusLogo';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageContext';
import LanguageDropdown from './LanguageDropdown';

interface HeaderProps {
  navLinks?: Array<{ id: string; label: string; url: string }>;
}

export const Header: React.FC<HeaderProps> = ({ navLinks }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Exact Navigation links matching the Reference Screenshot with full multilingual support
  const links = navLinks || [
    { id: '1', label: t('nav_home') || 'હોમ', url: '/' },
    { id: '2', label: t('cat_shradhanjali') || 'શ્રદ્ધાંજલિ સંદેશ', url: '/category/shradhanjali' },
    { id: '3', label: t('cat_punyatithi') || 'પુણ્યતિથિ', url: '/category/punyatithi' },
    { id: '4', label: t('cat_shayari') || 'શાયરી', url: '/category/shayari' },
    { id: '5', label: t('cat_information') || 'માહિતી', url: '/category/information' },
    { id: '6', label: t('cat_vishesh_lekh') || 'વિશેષ લેખ', url: '/category/vishesh-lekh' },
    { id: '7', label: t('nav_about') || 'અમારા વિશે', url: '/about' },
    { id: '8', label: t('nav_contact') || 'સંપર્ક', url: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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
        className={`sticky top-0 z-50 transition-all duration-200 border-b ${
          scrolled
            ? 'bg-theme-main/95 backdrop-blur-md shadow-md border-theme'
            : 'bg-theme-main border-theme'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[66px]">
            {/* Brand Logo matching Reference Screenshot */}
            <div className="flex-shrink-0">
              <LotusLogo size="md" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5" aria-label="Main Navigation">
              {links.map((link) => {
                const isActive =
                  link.url === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.url);

                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    className={`relative px-3 py-1.5 text-[13px] xl:text-sm font-medium transition-colors duration-150 rounded-lg ${
                      isActive
                        ? 'text-gold font-semibold'
                        : 'text-theme-secondary hover:text-gold hover:bg-theme-card-hover'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* Language Selector in Desktop Navigation */}
              <div className="ml-2 pl-2 border-l border-theme">
                <LanguageDropdown />
              </div>
            </nav>

            {/* Right utility buttons: Search, Theme Toggle, Mobile Menu Hamburger */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 sm:p-2.5 rounded-full text-theme-secondary hover:text-gold hover:bg-theme-card-hover border border-transparent hover:border-theme transition-colors"
                aria-label={t('search_button')}
                title={t('search_button')}
              >
                <Search size={18} />
              </button>

              {/* Theme Toggle (Sun in Dark mode, Moon in Light mode) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-full text-theme-secondary hover:text-gold hover:bg-theme-card-hover border border-transparent hover:border-theme transition-colors"
                aria-label={theme === 'dark' ? t('theme_switch_to_light') : t('theme_switch_to_dark')}
                title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-gold" />
                ) : (
                  <Moon size={18} className="text-theme-primary" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-lg text-theme-secondary hover:text-gold hover:bg-theme-card-hover border border-theme transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Input Drawer */}
        {searchOpen && (
          <div className="border-t border-theme bg-theme-surface px-4 py-3 sm:px-6 animate-fade-in shadow-xl">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className="w-full bg-theme-card text-theme-primary pl-4 pr-24 py-2.5 rounded-xl border border-theme focus:outline-none focus:border-gold text-sm transition-colors placeholder:text-theme-muted"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-gold hover:bg-gold/90 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
                >
                  {t('search_button')}
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs bg-theme-surface border-l border-theme h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-theme">
              <LotusLogo size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-theme-card-hover"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="mt-5 flex flex-col space-y-1.5">
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
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-theme-card text-gold font-semibold border-l-2 border-gold pl-4'
                        : 'text-theme-secondary hover:bg-theme-card-hover hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Language Switcher in Mobile menu */}
              <div className="pt-4 mt-2 border-t border-theme">
                <span className="block text-xs font-semibold text-theme-muted mb-2 px-1">
                  {t('language_select')}
                </span>
                <LanguageDropdown isMobile={true} />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
