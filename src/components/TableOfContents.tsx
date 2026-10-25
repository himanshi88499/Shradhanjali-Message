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
    // Parse markdown or find headings in DOM
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
      // Look up H2 and H3 elements within the article on mount
      const articleHeadings = document.querySelectorAll('article h2, article h3');
      const items: HeadingItem[] = [];
      articleHeadings.forEach((el, idx) => {
        const text = el.textContent || `વિષય ${idx + 1}`;
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

  if (isSidebar) {
    return (
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-xl p-5 card-glow mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#1C3A52]/60">
          <div className="flex items-center gap-2 text-white font-semibold text-base">
            <ListOrdered size={18} className="text-gold" />
            <span>વિષય સૂચિ</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-xs text-[#B9C6D6] hover:text-gold bg-[#061321] px-2.5 py-1 rounded border border-[#1C3A52] transition-colors"
          >
            <span>{isOpen ? 'છુપાવો' : 'દેખાવો'}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {isOpen && (
          <ul className="mt-4 space-y-2.5 animate-fade-in text-sm">
            {headings.map((item, idx) => (
              <li key={item.id} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#142B40] text-gold text-xs flex items-center justify-center font-medium mt-0.5">
                  {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left text-[#B9C6D6] hover:text-gold transition-colors leading-snug ${
                    item.level === 3 ? 'pl-2 text-xs text-[#8495A9]' : 'text-sm'
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
  }

  return (
    <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-xl p-4 sm:p-5 card-glow my-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-white font-semibold text-sm sm:text-base">
          <ListOrdered size={20} className="text-gold" />
          <span>Table of Content (વિષય સૂચિ)</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs font-medium text-[#B9C6D6] hover:text-gold bg-[#061321] px-3 py-1.5 rounded-lg border border-[#1C3A52] transition-colors"
        >
          <span>{isOpen ? 'છુપાવો' : 'દેખાવો'}</span>
          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-[#1C3A52]/70 animate-fade-in">
          <ul className="space-y-2 text-sm">
            {headings.map((item, idx) => (
              <li key={item.id} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#142B40] text-gold text-xs flex items-center justify-center font-medium mt-0.5">
                  {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left text-[#B9C6D6] hover:text-gold transition-colors ${
                    item.level === 3 ? 'pl-3 text-xs text-[#8495A9]' : 'font-medium'
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
