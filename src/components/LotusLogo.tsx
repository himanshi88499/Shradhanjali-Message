import React from 'react';
import Link from 'next/link';

interface LotusLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LotusIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 38 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <defs>
      <linearGradient id="lotusGold" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C99632" />
        <stop offset="50%" stopColor="#F5C45E" />
        <stop offset="100%" stopColor="#FFD782" />
      </linearGradient>
      <filter id="lotusGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="glow" />
        <feComposite in="SourceGraphic" in2="glow" operator="over" />
      </filter>
    </defs>

    {/* Center petal */}
    <path
      d="M50 15 C44 32, 40 54, 50 82 C60 54, 56 32, 50 15 Z"
      fill="url(#lotusGold)"
      filter="url(#lotusGlow)"
    />

    {/* Left inner petal */}
    <path
      d="M49 26 C36 40, 24 55, 33 78 C42 66, 47 48, 49 26 Z"
      fill="url(#lotusGold)"
      opacity="0.95"
    />

    {/* Right inner petal */}
    <path
      d="M51 26 C64 40, 76 55, 67 78 C58 66, 53 48, 51 26 Z"
      fill="url(#lotusGold)"
      opacity="0.95"
    />

    {/* Left outer petal */}
    <path
      d="M46 44 C28 54, 12 65, 20 83 C35 83, 44 70, 46 44 Z"
      fill="url(#lotusGold)"
      opacity="0.85"
    />

    {/* Right outer petal */}
    <path
      d="M54 44 C72 54, 88 65, 80 83 C65 83, 56 70, 54 44 Z"
      fill="url(#lotusGold)"
      opacity="0.85"
    />

    {/* Base stem / pod */}
    <ellipse cx="50" cy="84" rx="16" ry="4" fill="url(#lotusGold)" opacity="0.9" />
  </svg>
);

export const LotusLogo: React.FC<LotusLogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 30 : size === 'lg' ? 46 : 38;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const taglineSize = size === 'sm' ? 'text-[10px]' : 'text-xs';

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
      aria-label="શ્રદ્ધાંજલિ હોમપેજ"
    >
      <LotusIcon size={iconSize} className="transition-transform duration-300 group-hover:scale-105" />
      <div className="flex flex-col">
        <span
          className={`font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-gold ${titleSize}`}
        >
          શ્રદ્ધાંજલિ
        </span>
        {showTagline && (
          <span className={`text-muted-theme tracking-wide ${taglineSize}`}>
            સ્મૃતિઓમાં સદાય...
          </span>
        )}
      </div>
    </Link>
  );
};
