'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MessageCardItemProps {
  id: number;
  text: string;
  articleUrl?: string;
  articleTitle?: string;
}

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.031 2C6.516 2 2.031 6.484 2.031 12c0 1.953.562 3.844 1.625 5.469L2 22l4.672-1.609A9.914 9.914 0 0 0 12.03 22c5.516 0 10-4.484 10-10s-4.484-10-10-10zm5.828 14.281c-.25.703-1.453 1.344-2 1.39-.5.047-1.14.078-3.672-.968-3.078-1.281-5.062-4.422-5.219-4.625-.156-.203-1.25-1.656-1.25-3.156s.781-2.25 1.062-2.547c.281-.297.61-.375.813-.375.203 0 .406.015.578.015.187 0 .438-.078.687.516.25.594.86 2.094.938 2.25.078.156.125.344.031.547-.094.203-.14.328-.281.5-.14.172-.313.375-.438.5-.14.14-.297.297-.125.594.172.297.765 1.266 1.64 2.047 1.125 1 2.078 1.312 2.375 1.453.297.14.469.125.641-.078.172-.203.734-.86.938-1.156.203-.297.406-.25.687-.156.281.094 1.781.844 2.094 1 .313.156.516.234.594.359.078.125.078.719-.172 1.422z"/>
  </svg>
);

const FacebookIcon: React.FC<{ size?: number; className?: string }> = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const MessageCardItem: React.FC<MessageCardItemProps> = ({
  id,
  text,
  articleUrl = '',
  articleTitle = 'Shradhanjali Msg',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getFullShareText = () => {
    const siteUrl = articleUrl || (typeof window !== 'undefined' ? window.location.href : 'https://shradhanjalimsg.com');
    return `${text}\n\n- ${articleTitle}\nRead more: ${siteUrl}`;
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(getFullShareText());
    const url = `https://api.whatsapp.com/send?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const siteUrl = articleUrl || (typeof window !== 'undefined' ? window.location.href : 'https://shradhanjalimsg.com');
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="relative group bg-theme-card hover:bg-theme-card-hover border border-theme rounded-2xl p-4 sm:p-6 transition-all duration-200 card-glow mb-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Message index & Text */}
        <div className="flex items-start gap-3.5 flex-1 w-full">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-surface border border-theme text-gold font-bold text-xs flex items-center justify-center">
            {id}
          </div>
          <p className="text-theme-primary text-sm sm:text-base leading-relaxed tracking-wide whitespace-pre-line font-medium flex-1">
            {text}
          </p>
        </div>

        {/* Right: Actions (Centered on mobile, aligned right on desktop) */}
        <div className="flex items-center justify-center md:justify-end gap-2.5 w-full md:w-auto shrink-0 pt-2.5 md:pt-0 border-t md:border-t-0 border-theme-subtle">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              copied
                ? 'bg-green-500/20 text-green-500 border border-green-500/40'
                : 'bg-theme-main text-gold border border-theme hover:border-gold hover:bg-theme-surface'
            }`}
            title="Copy Message"
            aria-label="Copy Message"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* WhatsApp Button: ICON ONLY */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="p-2 bg-[#128C7E] hover:bg-[#0f776a] text-white rounded-lg transition-colors shadow-sm flex items-center justify-center"
            title="WhatsApp પર શેર કરો"
            aria-label="Share on WhatsApp"
          >
            <WhatsAppIcon size={16} />
          </button>

          {/* Facebook Button: ICON ONLY */}
          <button
            type="button"
            onClick={handleFacebookShare}
            className="p-2 bg-[#1877F2] hover:bg-[#1567d3] text-white rounded-lg transition-colors shadow-sm flex items-center justify-center"
            title="Facebook પર શેર કરો"
            aria-label="Share on Facebook"
          >
            <FacebookIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
