import React from 'react';
import Link from 'next/link';

interface RichTextProps {
  content: string;
  className?: string;
}

export const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content) return null;

  // Split by markdown link [text](url) or bold **text**
  const regex = /(\*\*[\s\S]*?\*\*|\[[\s\S]*?\]\([\s\S]*?\))/g;
  const parts = content.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Bold match: **text**
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          const boldText = part.slice(2, -2);
          return (
            <strong key={index} className="font-bold text-white">
              {boldText}
            </strong>
          );
        }

        // Link match: [text](url)
        const linkMatch = part.match(/^\[([\s\S]*?)\]\(([\s\S]*?)\)$/);
        if (linkMatch) {
          const label = linkMatch[1];
          const href = linkMatch[2].trim();
          const isExternal = href.startsWith('http://') || href.startsWith('https://');

          if (isExternal) {
            return (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold no-underline hover:no-underline hover:text-[#ffd782] font-semibold transition-colors inline"
              >
                {label}
              </a>
            );
          }

          return (
            <Link
              key={index}
              href={href}
              className="text-gold no-underline hover:no-underline hover:text-[#ffd782] font-semibold transition-colors inline"
            >
              {label}
            </Link>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};
