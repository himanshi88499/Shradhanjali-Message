'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Post } from '@/lib/types';

interface PostFaqAccordionProps {
  post: Post;
}

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Generate 5 distinct, highly relevant, and contextual FAQs based on the post's
 * specific relation, title, category, and content keywords so every post has a unique set of FAQs.
 */
export function generateContextualFaqs(post: Post): FaqItem[] {
  const title = (post.title || '').trim();
  const category = (post.categoryName || '').trim();
  const excerpt = (post.excerpt || '').trim();
  const fullText = `${title} ${category} ${excerpt} ${post.slug}`.toLowerCase();

  // Detect relation or subject
  const isFather = /પિતા|બાપુજી|પપ્પા|father|pitaji/i.test(fullText);
  const isMother = /માતા|બા|મમ્મી|mother|mataji|matrushri/i.test(fullText);
  const isGrandparent = /દાદા|દાદી|નાના|નાની|grand/i.test(fullText);
  const isBrother = /ભાઈ|brother/i.test(fullText);
  const isFriend = /મિત્ર|દોસ્ત|friend/i.test(fullText);
  const isPunyatithi = /પુણ્યતિથિ|તિથિ|વર્ષી|anniversary|punyatithi/i.test(fullText);
  const isShayari = /શાયરી|કવિતા|પંક્તિ|shayari|poetry/i.test(fullText);
  const isBesnu = /બેસણું|શોકસભા|પ્રાર્થના|besnu|sabha/i.test(fullText);

  const subjectLabel = isFather
    ? 'પૂજ્ય પિતાશ્રી'
    : isMother
    ? 'પૂજ્ય માતાજી'
    : isGrandparent
    ? 'પૂજ્ય વડીલ'
    : isBrother
    ? 'સ્નેહી ભાઈ'
    : isFriend
    ? 'પ્રિય મિત્ર'
    : isPunyatithi
    ? 'પુણ્યતિથિ સ્મરણ'
    : isShayari
    ? 'શ્રદ્ધાંજલિ શાયરી'
    : isBesnu
    ? 'બેસણું અને પ્રાર્થના સભા'
    : 'દિવંગત સ્વજન';

  const faqs: FaqItem[] = [];

  // Question 1: Specific to relation / topic
  if (isFather) {
    faqs.push({
      question: `પિતાશ્રીની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશમાં કઈ વાતોનો ઉલ્લેખ કરવો જોઈએ?`,
      answer: `પિતાશ્રીના આશીર્વાદ, તેમણે આપેલા સંસ્કારો, પરિવાર માટે કરેલ ત્યાગ અને તેમના જીવનમૂલ્યોને યાદ કરતા સન્માનજનક શબ્દો લખવા જોઈએ. 'પિતાનો છાંયો જીવનભરનું સંરક્ષણ છે' તેવી કૃતજ્ઞતા વ્યક્ત કરવી શ્રેષ્ઠ ગણાય.`,
    });
  } else if (isMother) {
    faqs.push({
      question: `માતાજીની પુણ્યતિથિ નિમિત્તે માતૃપ્રેમ વ્યક્ત કરતો સંદેશ કેવી રીતે લખવો?`,
      answer: `માતાના વાત્સલ્ય, નિઃસ્વાર્થ પ્રેમ અને તેમના પ્રેમાળ આશીર્વાદને વંદન કરતા શબ્દો શ્રદ્ધાંજલિ સંદેશમાં સામેલ કરવા જોઈએ. 'મા તે મા, બીજા બધા વગડાના વા' જેવી આત્મીય લાગણીથી સ્મરણ કરવું જોઈએ.`,
    });
  } else if (isGrandparent) {
    faqs.push({
      question: `દાદા-દાદી કે વડીલોની પુણ્યતિથિ પર કેવો શ્રદ્ધાંજલિ સંદેશ પાઠવવો?`,
      answer: `વડીલોના અનુભવ, તેમના માર્ગદર્શન અને સંયુક્ત કુટુંબને જોડી રાખવાના તેમના સંસ્કારોને ભાવપૂર્વક નમન કરતા સંદેશાઓ સૌથી યોગ્ય અને પ્રેરણાદાયી રહે છે.`,
    });
  } else if (isShayari) {
    faqs.push({
      question: `શ્રદ્ધાંજલિ શાયરી અને કાવ્ય પંક્તિઓ શેર કરતી વખતે કઈ બાબતો ધ્યાનમાં રાખવી?`,
      answer: `શાયરી ગંભીર, શાંત અને દિવંગત પ્રત્યે ઊંડા આદરભાવવાળી હોવી જોઈએ. તેમાં દુઃખની સાથે તેમના સદ્ગુણોની સુવાસ અને આત્માની શાંતિની પ્રાર્થના મુખ્ય હોવી જરૂરી છે.`,
    });
  } else if (isBesnu) {
    faqs.push({
      question: `બેસણું અથવા પ્રાર્થના સભા માટે શ્રદ્ધાંજલિ સંદેશમાં શું લખવું?`,
      answer: `બેસણાના સંદેશમાં દિવંગત સ્વજનનું નામ, તારીખ, સમય, સ્થળ અને શોકગ્રસ્ત પરિવારને આશ્વાસન આપતા નમ્ર અને શ્રદ્ધાસભર શબ્દો સ્પષ્ટ રીતે લખવા જોઈએ.`,
    });
  } else if (isPunyatithi) {
    faqs.push({
      question: `વાર્ષિક પુણ્યતિથિ સ્મરણ પ્રસંગે સંદેશ કેવી રીતે અર્પણ કરવો?`,
      answer: `પુણ્યતિથિ પર સ્વજનની યાદ તાજી કરતા તેમના સદ્કાર્યો, આશીર્વાદ અને પરમકૃપાળુ પરમાત્મા તેમના આત્માને ચિર શાંતિ અર્પે તેવી પ્રાર્થના સાથે સંદેશ મોકલવો ઉત્તમ છે.`,
    });
  } else {
    faqs.push({
      question: `આ લેખમાં આપેલા શ્રદ્ધાંજલિ સંદેશાઓનો શ્રેષ્ઠ ઉપયોગ કેવી રીતે કરવો?`,
      answer: `અહીં પ્રસ્તુત સંદેશાઓ તમે પરિવાર, સગા-સંબંધીઓ કે મિત્રોને મુશ્કેલ સમયમાં સાંત્વના આપવા, શોક સંદેશ પત્રિકામાં અથવા ડિજિટલ સ્ટેટસમાં મુકવા માટે વાપરી શકો છો.`,
    });
  }

  // Question 2: Customization with Name / Dates
  faqs.push({
    question: `શું હું આ ${subjectLabel} સંદેશમાં નામ અથવા તારીખ ઉમેરીને ફેરફાર કરી શકું?`,
    answer: `ચોક્કસ, અહીં આપેલા દરેક સંદેશ કાર્ડની ટેક્સ્ટ તમે 'Copy' બટન દ્વારા કૉપી કરી શકો છો અને તેમાં તમારા દિવંગત સ્વજનનું નામ, તિથિ કે પરિવારજનોના નામ જોડીને સરળતાથી કસ્ટમાઇઝ કરી શકો છો.`,
  });

  // Question 3: WhatsApp and Social Media Sharing
  faqs.push({
    question: `આ શ્રદ્ધાંજલિ સંદેશાઓ WhatsApp કે Facebook પર કેવી રીતે શેર કરવા?`,
    answer: `દરેક સંદેશ કાર્ડની નીચે 'WhatsApp Share' અને સોશિયલ બટનો આપેલા છે. એક જ ક્લિક કરવાથી સંદેશો સીધો WhatsApp ચેટ અથવા સ્ટેટસ પર શેર થઈ જશે.`,
  });

  // Question 4: Respect & Condolence Etiquette
  if (isPunyatithi) {
    faqs.push({
      question: `પુણ્યતિથિ પર દીપ પ્રગટાવી પ્રાર્થના કરતી વખતે કયા વિચારો પ્રગટ કરવા?`,
      answer: `સ્વજનના વિચારો હંમેશા આપણા હૃદયમાં જીવંત રહે, તેમના દર્શાવેલા સત્ય અને સદાચારના પંથે આપણે ચાલીએ અને તેમની પવિત્ર આત્માને મોક્ષ મળે તેવી શાંતિપૂર્ણ પ્રાર્થના કરવી જોઈએ.`,
    });
  } else if (isFather || isMother) {
    faqs.push({
      question: `માતા-પિતાની સ્મૃતિમાં શ્રદ્ધાંજલિ આપતી વખતે કયો ભાવ સૌથી મહત્વનો છે?`,
      answer: `કૃતજ્ઞતા અને શ્રદ્ધાનો ભાવ સૌથી મહત્વનો છે. તેમના આપેલા સંસ્કારોનું જતન કરવું અને તેમના આશીર્વાદ હંમેશા આપણી સાથે છે તેવો આસ્થાવાન ભાવ રાખવો જોઈએ.`,
    });
  } else {
    faqs.push({
      question: `શોકગ્રસ્ત પરિવારને સાંત્વના આપતી વખતે કઈ સાવચેતી રાખવી?`,
      answer: `સાંત્વના સંદેશ હંમેશા વિનમ્ર અને સંવેદનશીલ હોવો જોઈએ. દુઃખની આ ઘડીમાં ઈશ્વર પરિવારને ધૈર્ય આપે અને દિવંગત આત્માને પરમધામમાં સ્થાન મળે તેવી શુદ્ધ ભાવના પ્રગટ કરવી જોઈએ.`,
    });
  }

  // Question 5: Free Usage and Download
  faqs.push({
    question: `શું આ શ્રદ્ધાંજલિ પોર્ટલ પર આપેલા તમામ લખાણો નિઃશુલ્ક વાપરી શકાય છે?`,
    answer: `હા, શ્રદ્ધાંજલિ પોર્ટલ પર આપેલા તમામ સંદેશાઓ, સ્મૃતિ કાર્ડ્સ અને શાયરી જાહેર જનતા માટે સંપૂર્ણપણે વિનામૂલ્યે અને મુક્તપણે ઉપલબ્ધ છે.`,
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
    <div className="mt-3.5 mb-2.5 sm:mt-4 sm:mb-3 bg-theme-card border border-theme rounded-2xl p-4 sm:p-5.5 card-glow transition-colors">
      {/* Schema.org FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header with Dark Yellow / Gold Theme Color by default */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-theme mb-3.5">
        <div className="w-7 h-7 rounded-lg bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/30">
          <HelpCircle size={16} />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gold flex items-center gap-1.5 tracking-tight">
            <span>સવાલ જવાબ (FAQ)</span>
          </h3>
        </div>
      </div>

      {/* 5 Distinct Contextual Accordion Items */}
      <div className="space-y-2.5">
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
                className="w-full py-3 px-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-theme-primary hover:text-gold transition-colors"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-gold/20 text-gold text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  size={15}
                  className={`text-gold shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-3.5 pt-1 text-xs sm:text-sm text-theme-secondary leading-relaxed border-t border-theme-subtle animate-fade-in pl-11">
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
