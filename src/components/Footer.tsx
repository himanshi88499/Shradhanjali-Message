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
  const [currentYear, setCurrentYear] = React.useState(2025);
  const { t } = useLanguage();

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const links = footerLinks || [
    { id: '1', label: t('nav_home') || 'હોમ', url: '/' },
    { id: '2', label: t('cat_shradhanjali') || 'શ્રદ્ધાંજલિ સંદેશ', url: '/category/shradhanjali' },
    { id: '3', label: t('cat_punyatithi') || 'પુણ્યતિથિ', url: '/category/punyatithi' },
    { id: '4', label: t('cat_shayari') || 'શાયરી', url: '/category/shayari' },
    { id: '5', label: t('cat_information') || 'માહિતી', url: '/category/information' },
    { id: '6', label: t('cat_vishesh_lekh') || 'વિશેષ લેખ', url: '/category/vishesh-lekh' },
    { id: '7', label: t('nav_about') || 'અમારા વિશે', url: '/about' },
    { id: '8', label: t('nav_contact') || 'સંપર્ક', url: '/contact' },
  ];

  return (
    <footer className="bg-[#030B12] border-t border-[#173A54] text-[#C7D0DA] mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Section: Brand info, Nav Links, Social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#173A54]">
          {/* Brand Wordmark & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <LotusLogo size="md" />
          </div>

          {/* Quick Nav Links matching Reference Screenshot */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="text-[#C7D0DA] hover:text-[#F5C45E] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Channels */}
          <div className="flex items-center space-x-2 text-[#C7D0DA]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#071A2B] hover:text-[#F5C45E] hover:bg-[#0A1F32] border border-[#173A54] transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon size={15} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#071A2B] hover:text-[#F5C45E] hover:bg-[#0A1F32] border border-[#173A54] transition-colors"
              aria-label="X (Twitter)"
            >
              <TwitterIcon size={14} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#071A2B] hover:text-[#F5C45E] hover:bg-[#0A1F32] border border-[#173A54] transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon size={15} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#071A2B] hover:text-[#F5C45E] hover:bg-[#0A1F32] border border-[#173A54] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={15} />
            </a>
          </div>
        </div>

        {/* Bottom row: Copyright & Legal links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-[#8495A9]">
          <p>
            {copyright || `© ${currentYear} શ્રદ્ધાંજલિ. ${t('all_rights_reserved')}`}
          </p>

          <div className="flex items-center space-x-4">
            <Link href="/privacy-policy" className="hover:text-[#F5C45E] transition-colors">
              {t('nav_privacy')}
            </Link>
            <span className="text-[#173A54]">|</span>
            <Link href="/disclaimer" className="hover:text-[#F5C45E] transition-colors">
              {t('nav_disclaimer')}
            </Link>
            <span className="text-[#173A54]">|</span>
            <Link href="/contact" className="hover:text-[#F5C45E] transition-colors">
              {t('nav_contact')}
            </Link>
            <span className="text-[#173A54]">|</span>
            <Link href="/admin" className="hover:text-[#F5C45E] transition-colors">
              {t('nav_admin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
