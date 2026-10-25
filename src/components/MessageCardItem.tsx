'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MessageCardItemProps {
  id: number;
  text: string;
  articleUrl?: string;
  articleTitle?: string;
}

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
    const siteUrl = articleUrl || (typeof window !== 'undefined' ? window.location.href : 'https://shradhanjali.in');
    return `${text}\n\n- ${articleTitle}\nRead more: ${siteUrl}`;
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(getFullShareText());
    const url = `https://api.whatsapp.com/send?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const siteUrl = articleUrl || (typeof window !== 'undefined' ? window.location.href : 'https://shradhanjali.in');
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="relative group bg-theme-card hover:bg-theme-card-hover border border-theme rounded-2xl p-5 sm:p-6 transition-all duration-200 card-glow mb-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Message index & Text */}
        <div className="flex items-start gap-4 flex-1">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-surface border border-theme text-gold font-bold text-xs flex items-center justify-center">
            {id}
          </div>
          <p className="text-theme-primary text-base leading-relaxed tracking-wide whitespace-pre-line font-medium">
            {text}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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

          {/* WhatsApp Button: Always white on green */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#128C7E] hover:bg-[#0f776a] text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
          >
            <span>WhatsApp</span>
          </button>

          {/* Facebook Button: Always white on blue */}
          <button
            type="button"
            onClick={handleFacebookShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] hover:bg-[#1567d3] text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
