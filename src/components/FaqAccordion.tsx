'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: 'તમારા સંદેશ કેવી રીતે મોકલવો?',
      answer:
        'તમે ઉપર આપેલા સંપર્ક ફોર્મમાં તમારું નામ, ઇમેઇલ, વિષય અને સંદેશ લખીને "સંદેશ મોકલો" બટન દબાવીને સીધો સંપર્ક કરી શકો છો.',
    },
    {
      question: 'શું અહીં મેસેજ શેર કરી શકાય?',
      answer:
        'હા, દરેક શ્રદ્ધાંજલિ કાર્ડ સાથે Copy, WhatsApp અને Facebook શેર બટન આપેલા છે, જેથી તમે એક જ ક્લિકમાં સંદેશ શેર કરી શકો છો.',
    },
    {
      question: 'શું કોઈ પણ શ્રદ્ધાંજલિ માટે મેસેજ લખી શકીએ?',
      answer:
        'ચોક્કસ! માતાજી, પિતાજી, દાદા-દાદી, મિત્રો, ગુરુજનો તેમજ શોક સંદેશ અને શાયરી માટે વિવિધ કેટેગરીમાં ઉત્કૃષ્ટ સંદેશાઓ સંગ્રહિત છે.',
    },
    {
      question: 'આ સાઈટ સંપૂર્ણપણે મફત છે?',
      answer:
        'હા, શ્રદ્ધાંજલિ પોર્ટલ સામાજિક ભાવના અને સેવાર્થે બનાવવામાં આવ્યું છે. તમામ સામગ્રી વાચકો માટે 100% નિઃશુલ્ક છે.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className="border border-[#1C3A52] rounded-xl overflow-hidden bg-[#061321] transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-semibold text-white hover:text-gold transition-colors gap-2"
            >
              <span>{faq.question}</span>
              <span className="shrink-0 text-gold">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            {isOpen && (
              <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#B9C6D6] leading-relaxed border-t border-[#1C3A52]/50 animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
