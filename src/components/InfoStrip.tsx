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
      title: 'Heartfelt Condolences',
      description: 'Sincere tribute messages honoring every precious life with love.',
      icon: 'Heart',
    },
    {
      id: 2,
      title: 'Punyatithi Remembrances',
      description: 'Solemn anniversary remembrance and respectful guidance in one place.',
      icon: 'BookOpen',
    },
    {
      id: 3,
      title: 'Authenticity & Trust',
      description: 'Dedicated to preserving cultural sanctity and genuine literary expressions.',
      icon: 'ShieldCheck',
    },
    {
      id: 4,
      title: 'Easy Solace Sharing',
      description: 'Comforting verses and cards ready to share with family and friends.',
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
    <section className="bg-theme-surface border-y border-theme py-12 transition-colors" aria-label="About Our Platform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-5 rounded-2xl bg-theme-card border border-theme hover:border-gold/40 transition-all card-glow"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-theme-surface border border-theme flex items-center justify-center">
                {renderIcon(item.icon)}
              </div>
              <div>
                <h4 className="text-base font-bold text-theme-primary mb-1.5">{item.title}</h4>
                <p className="text-xs text-theme-secondary leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
