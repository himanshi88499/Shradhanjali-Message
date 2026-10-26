import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const truncateWords = (str: string, maxWords = 4) => {
  if (!str) return '';
  const words = str.trim().split(/\s+/);
  if (words.length <= maxWords) return str;
  return words.slice(0, maxWords).join(' ') + '...';
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url ? `https://shradhanjali.in${item.url}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-2 overflow-hidden">
        <ol className="flex items-center gap-1.5 text-xs text-theme-muted whitespace-nowrap overflow-hidden">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const displayLabel = isLast ? truncateWords(item.label, 4) : item.label;

            return (
              <li key={index} className="flex items-center gap-1.5 shrink-0 last:shrink last:min-w-0">
                {index === 0 && <Home size={13} className="text-theme-muted shrink-0" />}
                {item.url && !isLast ? (
                  <Link
                    href={item.url}
                    className="hover:text-gold transition-colors font-medium shrink-0 max-w-[120px] sm:max-w-[180px] truncate"
                  >
                    {displayLabel}
                  </Link>
                ) : (
                  <span
                    className="text-theme-muted font-normal truncate block max-w-[160px] sm:max-w-[280px]"
                    title={item.label}
                  >
                    {displayLabel}
                  </span>
                )}
                {!isLast && <ChevronRight size={12} className="text-theme-muted shrink-0" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
