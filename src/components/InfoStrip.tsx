'use client';

import React from 'react';
import { Heart, BookOpen, ShieldCheck, Share2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface InfoItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface InfoStripProps {
  title?: string;
  items?: InfoItem[];
}

export const InfoStrip: React.FC<InfoStripProps> = ({ title, items }) => {
  const { t } = useLanguage();

  const defaultItems: InfoItem[] = [
    {
      id: 1,
      title: t('info_tribute_title') || 'અપાર શ્રદ્ધાંજલિ',
      description: t('info_tribute_desc') || 'દરેક પ્રિયજનને અમારી તરફથી હૃદયપૂર્વક શ્રદ્ધાંજલિ.',
      icon: 'Heart',
    },
    {
      id: 2,
      title: t('info_rituals_title') || 'ઉપયોગી માહિતી',
      description: t('info_rituals_desc') || 'અંતિમ સંસ્કાર, વિધિ અને મહત્વપૂર્ણ માહિતી એક જ જગ્યાએ.',
      icon: 'BookOpen',
    },
    {
      id: 3,
      title: t('info_trust_title') || 'વિશ્વસનીય માહિતી',
      description: t('info_trust_desc') || 'સચોટ અને પ્રામાણિક માહિતી માટે અમારી પ્રાથમિકતા.',
      icon: 'ShieldCheck',
    },
    {
      id: 4,
      title: t('info_share_title') || 'સોશિયલ શેરિંગ',
      description: t('info_share_desc') || 'મનની વાતો જાતે શેર કરો અને અન્ય સુધી પહોંચાડો.',
      icon: 'Share2',
    },
  ];

  const displayItems = items || defaultItems;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart size={22} className="text-[#F5C45E]" />;
      case 'BookOpen':
        return <BookOpen size={22} className="text-[#F5C45E]" />;
      case 'ShieldCheck':
        return <ShieldCheck size={22} className="text-[#F5C45E]" />;
      case 'Share2':
        return <Share2 size={22} className="text-[#F5C45E]" />;
      default:
        return <Heart size={22} className="text-[#F5C45E]" />;
    }
  };

  return (
    <section className="bg-[#0A1F32] border-y border-[#173A54] py-12" aria-label="અમારી વેબસાઇટ વિશે">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-5 rounded-2xl bg-[#071A2B] border border-[#173A54] hover:border-[#F5C45E]/40 transition-all card-glow"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#030B12] border border-[#173A54] flex items-center justify-center">
                {renderIcon(item.icon)}
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                <p className="text-xs text-[#C7D0DA] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
