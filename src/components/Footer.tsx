'use client';

import React from 'react';
import Link from 'next/link';
import { LotusLogo } from './LotusLogo';
import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from './SocialIcons';
import { useLanguage } from './LanguageContext';

interface FooterProps {
  footerLinks?: Array<{ id: string; label: string; url: string }>;
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({ footerLinks, copyright }) => {
  const [currentYear, setCurrentYear] = React.useState(2026);
  const { t } = useLanguage();

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const links = footerLinks || [
    { id: '1', label: t('nav_home') || 'Home', url: '/' },
    { id: '2', label: t('nav_categories') || 'Categories', url: '/categories' },
    { id: '3', label: t('nav_blog') || 'Blog', url: '/posts' },
    { id: '4', label: t('nav_about') || 'About Us', url: '/about' },
    { id: '5', label: t('nav_contact') || 'Contact Us', url: '/contact' },
  ];

  return (
    <footer className="bg-theme-main border-t border-theme text-theme-secondary mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top row: Brand summary, Navigation, and Social links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-theme items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start space-y-3">
            <LotusLogo size="md" />
            <p className="text-xs sm:text-sm text-theme-muted leading-relaxed max-w-sm">
              {t('brand_description')}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 flex flex-col space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
              Navigation
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-theme-secondary hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Channels */}
          <div className="md:col-span-3 flex flex-col md:items-end space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              Connect With Us
            </span>
            <div className="flex items-center space-x-2 text-theme-secondary">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-theme-surface hover:text-gold hover:bg-theme-card border border-theme transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-theme-surface hover:text-gold hover:bg-theme-card border border-theme transition-colors"
                aria-label="X (Twitter)"
              >
                <TwitterIcon size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-theme-surface hover:text-gold hover:bg-theme-card border border-theme transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-theme-surface hover:text-gold hover:bg-theme-card border border-theme transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: Copyright & Legal links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-theme-muted">
          <p>
            {copyright || `© ${currentYear} Shradhanjali Msg. ${t('all_rights_reserved')}`}
          </p>

          <div className="flex items-center space-x-4">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              {t('nav_privacy')}
            </Link>
            <span className="text-theme-muted/40">|</span>
            <Link href="/terms" className="hover:text-gold transition-colors">
              {t('nav_terms')}
            </Link>
            <span className="text-theme-muted/40">|</span>
            <Link href="/disclaimer" className="hover:text-gold transition-colors">
              {t('nav_disclaimer')}
            </Link>
            <span className="text-theme-muted/40">|</span>
            <Link href="/admin" className="hover:text-gold transition-colors">
              {t('nav_admin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
