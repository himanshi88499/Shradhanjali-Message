import React from 'react';
import Link from 'next/link';

interface LotusLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Memorial Emblem:
 * Refined, minimalist tribute flame emblem representing enduring light and reverence.
 * Subtle golden amber tone (#D9A441), crisp on dark and light backgrounds.
 */
export const LotusIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="lotusGoldGradient" x1="18" y1="6" x2="18" y2="31" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFE399" />
        <stop offset="50%" stopColor="#F5C45E" />
        <stop offset="100%" stopColor="#E5B54E" />
      </linearGradient>
      <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#FFE399" />
        <stop offset="100%" stopColor="#F5C45E" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Base gentle pedicel */}
    <path
      d="M10 28C14 30.5 22 30.5 26 28C24 29.5 20 30.5 18 30.5C16 30.5 12 29.5 10 28Z"
      fill="url(#lotusGoldGradient)"
    />
    {/* Outer left petal */}
    <path
      d="M18 27C12 24 7 19 8 13C12 16 16 21 18 27Z"
      fill="url(#lotusGoldGradient)"
      opacity="0.9"
    />
    {/* Outer right petal */}
    <path
      d="M18 27C24 24 29 19 28 13C24 16 20 21 18 27Z"
      fill="url(#lotusGoldGradient)"
      opacity="0.9"
    />
    {/* Inner center eternal flame / petal */}
    <path
      d="M18 6C15 13 13 19 18 27C23 19 21 13 18 6Z"
      fill="url(#lotusGoldGradient)"
    />
    {/* Small center core ember */}
    <circle cx="18" cy="21" r="2.5" fill="url(#emberGlow)" />
  </svg>
);

export const LotusLogo: React.FC<LotusLogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 40 : 34;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const tagSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-opacity hover:opacity-95 select-none ${className}`}
      aria-label="Shradhanjali — હોમ"
    >
      <LotusIcon size={iconSize} className="lotus-logo-icon transition-transform duration-300 group-hover:scale-110 drop-shadow-md shrink-0" />
      <span
        className={`font-serif font-black tracking-wide logo-title-gradient transition-all drop-shadow-sm ${titleSize}`}
        style={{ letterSpacing: '0.02em' }}
      >
        Shradhanjali
      </span>
    </Link>
  );
};
