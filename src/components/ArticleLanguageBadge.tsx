'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const ArticleLanguageBadge: React.FC = () => {
  const { language, t } = useLanguage();

  if (language === 'gu') {
    return null;
  }

  return (
    <div className="mb-6 p-4 rounded-2xl bg-theme-card border border-theme card-glow flex items-start gap-3 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
        <BookOpen size={16} />
      </div>
      <div>
        <h4 className="text-xs sm:text-sm font-bold text-theme-primary mb-1">
          {t('article_language_notice')}
        </h4>
        <p className="text-xs text-theme-muted leading-relaxed">
          {t('article_language_desc')}
        </p>
      </div>
    </div>
  );
};
