import React from 'react';
import { Heart, BookOpen, ShieldCheck, Share2 } from 'lucide-react';

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
  const defaultItems: InfoItem[] = [
    {
      id: 1,
      title: 'અપાર શ્રદ્ધાંજલિ',
      description: 'દરેક પ્રિયજનને અમારી તરફથી હૃદયપૂર્વક શ્રદ્ધાંજલિ.',
      icon: 'Heart',
    },
    {
      id: 2,
      title: 'ઉપયોગી માહિતી',
      description: 'અંતિમ સંસ્કાર, વિધિ અને મહત્વપૂર્ણ માહિતી એક જ જગ્યાએ.',
      icon: 'BookOpen',
    },
    {
      id: 3,
      title: 'વિશ્વસનીય માહિતી',
      description: 'સચોટ અને પ્રામાણિક માહિતી માટે અમારી પ્રાથમિકતા.',
      icon: 'ShieldCheck',
    },
    {
      id: 4,
      title: 'સોશિયલ શેરિંગ',
      description: 'મનની વાતો જાતે શેર કરો અને અન્ય સુધી પહોંચાડો.',
      icon: 'Share2',
    },
  ];

  const displayItems = items || defaultItems;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart size={22} className="text-gold" />;
      case 'BookOpen':
        return <BookOpen size={22} className="text-gold" />;
      case 'ShieldCheck':
        return <ShieldCheck size={22} className="text-gold" />;
      case 'Share2':
        return <Share2 size={22} className="text-gold" />;
      default:
        return <Heart size={22} className="text-gold" />;
    }
  };

  return (
    <section className="bg-[#0A1B2B] border-y border-[#1C3A52] py-12" aria-label="અમારી વેબસાઇટ વિશે">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-5 rounded-2xl bg-[#0B1D2D] border border-[#1C3A52] hover:border-gold/40 transition-all card-glow"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#061321] border border-[#1C3A52] flex items-center justify-center">
                {renderIcon(item.icon)}
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                <p className="text-xs text-[#B9C6D6] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
