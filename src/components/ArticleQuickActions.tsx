'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from './LanguageContext';

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
  const { t } = useLanguage();
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
    const fullText = `${title}\n\n${excerpt}\n\nRead more: ${getArticleUrl()}`;
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
    const text = encodeURIComponent(`${title}\n\n${excerpt}\n\nRead more: ${getArticleUrl()}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(getArticleUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="bg-theme-card border border-theme rounded-2xl p-5 card-glow mb-6 transition-colors">
      <div className="flex items-center gap-2 pb-4 border-b border-theme text-theme-primary font-semibold text-base">
        <Share2 size={18} className="text-gold" />
        <span>Copy And Share</span>
      </div>

      <div className="mt-4 flex flex-col space-y-2.5">
        {/* Copy Article text */}
        <button
          type="button"
          onClick={handleCopyArticle}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-theme-surface hover:bg-theme-card-hover text-theme-primary text-sm font-medium rounded-xl border border-theme transition-colors shadow-sm"
        >
          {copiedArticle ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gold" />}
          <span>{copiedArticle ? t('copied') : t('copy_article')}</span>
        </button>

        {/* WhatsApp Share: Always crisp white text on green background in both dark & light themes */}
        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#128C7E] hover:bg-[#0f776a] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
        >
          <span>{t('share_whatsapp')}</span>
        </button>

        {/* Facebook Share: Always crisp white text on blue background in both dark & light themes */}
        <button
          type="button"
          onClick={handleFacebookShare}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1877F2] hover:bg-[#1567d3] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
        >
          <span>{t('share_facebook')}</span>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-theme-main hover:bg-theme-card text-gold text-xs font-medium rounded-xl border border-theme transition-colors"
        >
          {copiedLink ? <Check size={14} className="text-green-500" /> : <LinkIcon size={14} />}
          <span>{copiedLink ? t('copied') : t('copy_link')}</span>
        </button>
      </div>
    </div>
  );
};
