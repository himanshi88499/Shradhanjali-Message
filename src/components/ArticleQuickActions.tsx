'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2, Link as LinkIcon } from 'lucide-react';

interface ArticleQuickActionsProps {
  title: string;
  excerpt: string;
  slug: string;
}

export const ArticleQuickActions: React.FC<ArticleQuickActionsProps> = ({
  title,
  excerpt,
  slug,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedArticle, setCopiedArticle] = useState(false);

  const getArticleUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://shradhanjali.in/post/${slug}`;
  };

  const handleCopyLink = async () => {
    const url = getArticleUrl();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyArticle = async () => {
    const fullText = `${title}\n\n${excerpt}\n\nવાંચો: ${getArticleUrl()}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const ta = document.createElement('textarea');
        ta.value = fullText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setCopiedArticle(true);
      setTimeout(() => setCopiedArticle(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${title}\n\n${excerpt}\n\nવાંચો: ${getArticleUrl()}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(getArticleUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-xl p-5 card-glow mb-6">
      <div className="flex items-center gap-2 pb-4 border-b border-[#1C3A52]/60 text-white font-semibold text-base">
        <Share2 size={18} className="text-gold" />
        <span>ઝડપી ક્રિયાઓ</span>
      </div>

      <div className="mt-4 flex flex-col space-y-2.5">
        {/* Copy Article text */}
        <button
          type="button"
          onClick={handleCopyArticle}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#142B40] hover:bg-[#1A3854] text-[#F4F6FA] text-sm font-medium rounded-lg border border-[#2A4F6E] transition-colors"
        >
          {copiedArticle ? <Check size={16} className="text-[#22C55E]" /> : <Copy size={16} />}
          <span>{copiedArticle ? 'લેખ કૉપી થઈ ગયો!' : 'આ લેખ કૉપી કરો'}</span>
        </button>

        {/* WhatsApp Share */}
        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#128C7E] hover:bg-[#0f776a] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <span>WhatsApp પર શેર કરો</span>
        </button>

        {/* Facebook Share */}
        <button
          type="button"
          onClick={handleFacebookShare}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1877F2] hover:bg-[#1567d3] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <span>Facebook પર શેર કરો</span>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#061321] hover:bg-[#091B2E] text-gold text-xs font-medium rounded-lg border border-[#1C3A52] transition-colors"
        >
          {copiedLink ? <Check size={14} className="text-[#22C55E]" /> : <LinkIcon size={14} />}
          <span>{copiedLink ? 'લિંક કૉપી થઈ ગઈ!' : 'લિંક કૉપી કરો'}</span>
        </button>
      </div>
    </div>
  );
};
