'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

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
  articleTitle = 'શ્રદ્ધાંજલિ સંદેશ',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-https or older browsers
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
    return `${text}\n\n- ${articleTitle}\nવાંચો: ${siteUrl}`;
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
    <div className="relative group bg-[#0B1D2D] hover:bg-[#10263B] border border-[#1C3A52] rounded-xl p-5 sm:p-6 transition-all duration-200 card-glow mb-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Message index & Text */}
        <div className="flex items-start gap-4 flex-1">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#142B40] border border-[#234768] text-gold font-semibold text-sm flex items-center justify-center">
            {id}
          </div>
          <p className="text-[#F4F6FA] text-base leading-relaxed tracking-wide whitespace-pre-line font-medium">
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
                ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                : 'bg-[#061321] text-gold border border-[#1C3A52] hover:border-gold hover:bg-[#061321]/80'
            }`}
            title="સંદેશ કૉપી કરો"
            aria-label="સંદેશ કૉપી કરો"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'કૉપી થયું!' : 'Copy'}</span>
          </button>

          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#128C7E] hover:bg-[#0f776a] text-white rounded-lg text-xs font-medium transition-colors"
            title="WhatsApp પર શેર કરો"
            aria-label="WhatsApp પર શેર કરો"
          >
            <span>WhatsApp</span>
          </button>

          {/* Facebook Button */}
          <button
            type="button"
            onClick={handleFacebookShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] hover:bg-[#1567d3] text-white rounded-lg text-xs font-medium transition-colors"
            title="Facebook પર શેર કરો"
            aria-label="Facebook પર શેર કરો"
          >
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
