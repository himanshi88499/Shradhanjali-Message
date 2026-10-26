'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { Post } from '@/lib/types';

interface PostFaqAccordionProps {
  post: Post;
}

interface FaqItem {
  question: string;
  answer: string;
}

export function generateContextualFaqs(post: Post): FaqItem[] {
  const title = post.title || 'શ્રદ્ધાંજલિ સંદેશ';
  const category = (post.categoryName || 'શ્રદ્ધાંજલિ').trim();
  const isPunyatithi = title.includes('પુણ્યતિથિ') || category.includes('પુણ્યતિથિ');
  const isShayari = title.includes('શાયરી') || category.includes('શાયરી');

  const faqs: FaqItem[] = [];

  // Question 1: Sharing via WhatsApp / Social media
  faqs.push({
    question: `આ લેખમાં આપેલા ${isPunyatithi ? 'પુણ્યતિથિ સંદેશાઓ' : isShayari ? 'શ્રદ્ધાંજલિ શાયરી' : 'શ્રદ્ધાંજલિ સંદેશાઓ'} હું WhatsApp પર કેવી રીતે મોકલી શકું?`,
    answer: `દરેક સંદેશ કાર્ડની નીચે આપેલા 'WhatsApp Share' બટન પર ક્લિક કરીને તમે સીધા જ તમારા પરિવાર, મિત્રો અથવા WhatsApp ગ્રૂપમાં આ સંદેશો મોકલી શકો છો. આ ઉપરાંત 'Copy' બટન દ્વારા ટેક્સ્ટ કૉપી કરીને મનપસંદ સ્ટેટસમાં પણ મૂકી શકાય છે.`,
  });

  // Question 2: Customization with names & dates
  faqs.push({
    question: `શું હું આ સંદેશાઓમાં સ્વજનનું નામ અથવા તારીખ ઉમેરીને ફેરફાર કરી શકું?`,
    answer: `ચોક્કસ, અહીં આપેલા તમામ સંદેશાઓ અને શાયરી સંપૂર્ણપણે મુક્ત છે. તમે સંદેશ કૉપી કર્યા બાદ તેમાં દિવંગત સ્વજનનું નામ, સંબંધ (જેમ કે પિતાશ્રી, માતાજી, દાદાજી) તેમજ તિથિ કે તારીખ ઉમેરીને તમારી ભાવનાઓ અનુસાર કસ્ટમાઇઝ કરી શકો છો.`,
  });

  // Question 3: Etiquette / Timing
  if (isPunyatithi) {
    faqs.push({
      question: `પુણ્યતિથિ નિમિત્તે શ્રદ્ધાંજલિ અર્પણ કરતી વખતે કઈ બાબતો ધ્યાનમાં રાખવી જોઈએ?`,
      answer: `પુણ્યતિથિ પર સંદેશ હંમેશા દિવંગતના સદ્ગુણો, તેમના આશીર્વાદ અને સંસ્કારોને યાદ કરતો હોવો જોઈએ. સંદેશમાં આદર, કૃતજ્ઞતા અને તેમના પવિત્ર આત્માની ચિરંતન શાંતિ માટે ઈશ્વર સમક્ષ પ્રાર્થના મુખ્ય હોવી જોઈએ.`,
    });
  } else {
    faqs.push({
      question: `શ્રદ્ધાંજલિ અને શોક સંદેશ લખતી વખતે કઈ બાબતોની સાવચેતી રાખવી?`,
      answer: `શોક સંદેશ હંમેશા વિનમ્ર, સન્માનજનક અને શોકગ્રસ્ત પરિવારને આશ્વાસન તેમજ હિંમત આપે તેવો હોવો જોઈએ. દુઃખની આ ઘડીમાં ઈશ્વર તેમના પરિવારને ધૈર્ય આપે અને દિવંગતના આત્માને મોક્ષ મળે તેવી સાચી પ્રાર્થના વ્યક્ત કરવી જોઈએ.`,
    });
  }

  // Question 4: Free usage & copyright
  faqs.push({
    question: `શું આ શ્રદ્ધાંજલિ પોર્ટલ પર આપેલ લખાણોનો ઉપયોગ નિઃશુલ્ક છે?`,
    answer: `હા, શ્રદ્ધાંજલિ પોર્ટલ પર પ્રસ્તુત તમામ શ્રદ્ધાંજલિ સંદેશાઓ, પુણ્યતિથિ સ્મરણ લખાણો, શાયરી અને વિચાર માર્ગદર્શન જાહેર જનતા માટે સંપૂર્ણપણે વિનામૂલ્યે અને સુલભ રાખવામાં આવ્યા છે.`,
  });

  // Question 5: Cards and image downloading
  faqs.push({
    question: `શું હું આ શ્રદ્ધાંજલિ કાર્ડ્સ સોશિયલ મીડિયા પર શેર કરી શકું છું?`,
    answer: `હા, તમે ફેસબુક, ટેલિગ્રામ, ઇન્સ્ટાગ્રામ કે વોટ્સએપ પર એક જ ક્લિકથી આ સંદેશાઓ શેર કરી શકો છો. દરેક સંદેશ કાર્ડને ખાસ એ રીતે ડિઝાઇન કરવામાં આવ્યો છે જેથી વાંચનારના હૃદયને શાંતિ અને આદરની અનુભૂતિ થાય.`,
  });

  return faqs;
}

export const PostFaqAccordion: React.FC<PostFaqAccordionProps> = ({ post }) => {
  const faqs = generateContextualFaqs(post);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Schema.org FAQPage Structured Data for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="my-8 sm:my-10 bg-theme-card border border-theme rounded-2xl p-5 sm:p-7 card-glow transition-colors">
      {/* Schema.org FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-theme mb-5">
        <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/30">
          <HelpCircle size={18} />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-theme-primary flex items-center gap-1.5 tracking-tight">
            <span>સવાલ જવાબ (FAQ) — વારંવાર પૂછાતા પ્રશ્નો</span>
          </h3>
          <p className="text-xs text-theme-muted mt-0.5">
            {post.categoryName || 'શ્રદ્ધાંજલિ'} સંબંધિત ઉપયોગી પ્રશ્નોત્તરી અને માર્ગદર્શન
          </p>
        </div>
      </div>

      {/* 5 Accordion Items */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-gold/50 bg-theme-surface/70 shadow-sm'
                  : 'border-theme bg-theme-surface/30 hover:border-theme-subtle'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-theme-primary hover:text-gold transition-colors"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-gold/20 text-gold text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gold shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-theme-secondary leading-relaxed border-t border-theme-subtle animate-fade-in pl-11">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
