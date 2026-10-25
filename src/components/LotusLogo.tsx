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
 * Subtle golden amber tone (#D9A441), crisp on dark and light backgrounds without heavy glow.
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
    {/* Base gentle pedicel */}
    <path
      d="M10 28C14 30.5 22 30.5 26 28C24 29.5 20 30.5 18 30.5C16 30.5 12 29.5 10 28Z"
      fill="#D9A441"
    />
    {/* Outer left petal */}
    <path
      d="M18 27C12 24 7 19 8 13C12 16 16 21 18 27Z"
      fill="#D9A441"
      opacity="0.85"
    />
    {/* Outer right petal */}
    <path
      d="M18 27C24 24 29 19 28 13C24 16 20 21 18 27Z"
      fill="#D9A441"
      opacity="0.85"
    />
    {/* Inner center eternal flame / petal */}
    <path
      d="M18 6C15 13 13 19 18 27C23 19 21 13 18 6Z"
      fill="#D9A441"
    />
    {/* Small center core ember */}
    <circle cx="18" cy="21" r="2" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

export const LotusLogo: React.FC<LotusLogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 38 : 32;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const tagSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-opacity hover:opacity-95 ${className}`}
      aria-label="Shradhanjali Msg — Home"
    >
      <LotusIcon size={iconSize} className="transition-transform duration-200 group-hover:scale-105" />
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold tracking-tight text-theme-primary transition-colors ${titleSize}`}
          >
            Shradhanjali
          </span>
          <span
            className="px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] sm:text-xs bg-gold/15 text-gold border border-gold/30"
          >
            Msg
          </span>
        </div>
        {showTagline && (
          <span className={`text-theme-muted tracking-wide mt-1 font-normal ${tagSize}`}>
            Everlasting in Loving Memories
          </span>
        )}
      </div>
    </Link>
  );
};
