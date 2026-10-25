'use client';

import React from 'react';
import Link from 'next/link';
import { LotusLogo } from './LotusLogo';
import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from './SocialIcons';

interface FooterProps {
  footerLinks?: Array<{ id: string; label: string; url: string }>;
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({ footerLinks, copyright }) => {
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const links = footerLinks || [
    { id: '1', label: 'હોમ', url: '/' },
    { id: '2', label: 'શ્રદ્ધાંજલિ સંદેશ', url: '/category/shradhanjali' },
    { id: '3', label: 'પુણ્યતિથિ', url: '/category/punyatithi' },
    { id: '4', label: 'શાયરી', url: '/category/shayari' },
    { id: '5', label: 'માહિતી', url: '/category/information' },
    { id: '6', label: 'વિશેષ લેખ', url: '/category/vishesh-lekh' },
    { id: '7', label: 'અમારા વિશે', url: '/about' },
    { id: '8', label: 'સંપર્ક', url: '/contact' },
  ];

  return (
    <footer className="bg-[#061321] border-t border-[#1C3A52] text-[#B9C6D6] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top row: Brand logo and Social icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1C3A52]/70">
          <LotusLogo size="md" />

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm" aria-label="Footer Navigation">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="text-[#B9C6D6] hover:text-gold transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 text-[#B9C6D6]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:text-gold hover:bg-[#0B1D2D] transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:text-gold hover:bg-[#0B1D2D] transition-colors"
              aria-label="X (Twitter)"
            >
              <TwitterIcon size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:text-gold hover:bg-[#0B1D2D] transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:text-gold hover:bg-[#0B1D2D] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>

        {/* Bottom row: Copyright & Legal links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-[#8495A9]">
          <p>
            {copyright || `© ${currentYear} શ્રદ્ધાંજલિ. સર્વ હકો સુરક્ષિત.`}
          </p>

          <div className="flex items-center space-x-4">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/disclaimer" className="hover:text-gold transition-colors">
              Disclaimer
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
            <span>|</span>
            <Link href="/admin" className="hover:text-gold transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
