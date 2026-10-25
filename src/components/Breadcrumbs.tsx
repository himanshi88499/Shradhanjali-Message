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
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-theme-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {index === 0 && <Home size={13} className="text-theme-muted" />}
                {item.url && !isLast ? (
                  <Link
                    href={item.url}
                    className="hover:text-gold transition-colors font-medium truncate max-w-[200px]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-theme-primary font-semibold truncate max-w-[240px]">
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronRight size={12} className="text-theme-muted" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
