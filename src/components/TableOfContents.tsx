'use client';

import React, { useState, useEffect } from 'react';
import { ListOrdered, ChevronDown, ChevronUp } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content?: string;
  isSidebar?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  content = '',
  isSidebar = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    if (content) {
      const lines = content.split('\n');
      const items: HeadingItem[] = [];
      lines.forEach((line) => {
        const h2Match = line.match(/^##\s+(.*)/);
        const h3Match = line.match(/^###\s+(.*)/);
        if (h2Match) {
          const text = h2Match[1].trim();
          const id = text.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-');
          items.push({ id, text, level: 2 });
        } else if (h3Match) {
          const text = h3Match[1].trim();
          const id = text.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-');
          items.push({ id, text, level: 3 });
        }
      });
      setHeadings(items);
    } else {
      const articleHeadings = document.querySelectorAll('article h2, article h3');
      const items: HeadingItem[] = [];
      articleHeadings.forEach((el, idx) => {
        const text = el.textContent || `Section ${idx + 1}`;
        let id = el.id;
        if (!id) {
          id = `heading-${idx}`;
          el.id = id;
        }
        items.push({
          id,
          text,
          level: el.tagName === 'H2' ? 2 : 3,
        });
      });
      setHeadings(items);
    }
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-theme-card border border-theme rounded-2xl p-4 sm:p-5 card-glow mt-2.5 mb-5 transition-colors">
      <div className="flex items-center justify-between pb-3 border-b border-theme">
        <div className="flex items-center gap-2 text-theme-primary font-semibold text-base">
          <ListOrdered size={18} className="text-gold" />
          <span>Table of Contents</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs text-theme-secondary hover:text-gold bg-theme-surface px-3 py-1.5 rounded-xl border border-theme transition-colors"
        >
          <span>{isOpen ? 'Collapse' : 'Expand'}</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {isOpen && (
        <ul className="mt-4 space-y-2.5 animate-fade-in text-sm">
          {headings.map((item, idx) => (
            <li key={item.id} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-theme-surface border border-theme text-gold text-xs flex items-center justify-center font-bold mt-0.5">
                {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => scrollToHeading(item.id)}
                className={`text-left text-theme-secondary hover:text-gold transition-colors leading-snug ${
                  item.level === 3 ? 'pl-2 text-xs text-theme-muted' : 'text-sm'
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
