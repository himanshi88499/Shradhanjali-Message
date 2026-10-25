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
            ? 'bg-[#030B12]/95 backdrop-blur-md shadow-lg border-[#173A54]'
            : 'bg-[#030B12] border-[#173A54]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo matching Reference Screenshot */}
            <div className="flex-shrink-0">
              <LotusLogo />
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
                        ? 'text-[#F5C45E] font-semibold'
                        : 'text-[#C7D0DA] hover:text-[#F5C45E] hover:bg-[#071A2B]/60'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#F5C45E] rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* Language Selector in Desktop Navigation */}
              <div className="ml-2 pl-2 border-l border-[#173A54]">
                <LanguageDropdown />
              </div>
            </nav>

            {/* Right utility buttons: Search, Theme Toggle, Mobile Menu Hamburger */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 sm:p-2.5 rounded-full text-[#C7D0DA] hover:text-[#F5C45E] hover:bg-[#071A2B] border border-transparent hover:border-[#173A54] transition-colors"
                aria-label={t('search_button')}
                title={t('search_button')}
              >
                <Search size={18} />
              </button>

              {/* Theme Toggle (Sun in Dark mode, Moon in Light mode) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-full text-[#C7D0DA] hover:text-[#F5C45E] hover:bg-[#071A2B] border border-transparent hover:border-[#173A54] transition-colors"
                aria-label={theme === 'dark' ? t('theme_switch_to_light') : t('theme_switch_to_dark')}
                title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-[#F5C45E]" />
                ) : (
                  <Moon size={18} className="text-white" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-lg text-[#C7D0DA] hover:text-[#F5C45E] hover:bg-[#071A2B] border border-[#173A54] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Input Drawer */}
        {searchOpen && (
          <div className="border-t border-[#173A54] bg-[#0A1F32] px-4 py-3 sm:px-6 animate-fade-in shadow-xl">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className="w-full bg-[#071A2B] text-white pl-4 pr-24 py-2.5 rounded-xl border border-[#173A54] focus:outline-none focus:border-[#F5C45E] text-sm transition-colors placeholder-[#8495A9]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-[#F5C45E] hover:bg-[#E5B54E] text-[#030B12] font-semibold text-xs rounded-lg transition-colors shadow-sm"
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
          <div className="relative ml-auto w-full max-w-xs bg-[#030B12] border-l border-[#173A54] h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#173A54]">
              <LotusLogo size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-[#8495A9] hover:text-white hover:bg-[#071A2B]"
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
                        ? 'bg-[#071A2B] text-[#F5C45E] font-semibold border-l-2 border-[#F5C45E] pl-4'
                        : 'text-[#C7D0DA] hover:bg-[#071A2B] hover:text-[#F5C45E]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Language Switcher in Mobile menu */}
              <div className="pt-4 mt-2 border-t border-[#173A54]">
                <span className="block text-xs font-semibold text-[#8495A9] mb-2 px-1">
                  {t('language_select')}
                </span>
                <LanguageDropdown isMobile={true} />
              </div>
            </nav>

            {/* Mobile Footer Admin Link */}
            <div className="mt-auto pt-6 border-t border-[#173A54]">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-xs text-[#8495A9] hover:text-[#F5C45E] py-2"
              >
                {t('nav_admin')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
