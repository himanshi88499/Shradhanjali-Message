import React from 'react';
import Link from 'next/link';
import { ChevronRight, Heart, Sparkles, Feather, BookOpen, Scroll, Users } from 'lucide-react';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart size={18} className="text-gold" />;
      case 'Sparkles':
        return <Sparkles size={18} className="text-gold" />;
      case 'Feather':
        return <Feather size={18} className="text-gold" />;
      case 'BookOpen':
        return <BookOpen size={18} className="text-gold" />;
      case 'Scroll':
        return <Scroll size={18} className="text-gold" />;
      case 'Users':
        return <Users size={18} className="text-gold" />;
      default:
        return <Sparkles size={18} className="text-gold" />;
    }
  };

  const targetUrl = category.slug === 'about' ? '/about' : `/category/${category.slug}`;

  return (
    <Link
      href={targetUrl}
      className="group relative flex flex-col bg-[#0B1D2D] hover:bg-[#10263B] border border-[#1C3A52] hover:border-gold/50 rounded-2xl overflow-hidden transition-all duration-300 card-glow"
    >
      {/* Category Image Header */}
      <div className="relative h-32 w-full overflow-hidden bg-[#061321]">
        <img
          src={category.image || '/images/hero-candle.jpg'}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D2D] via-[#0B1D2D]/60 to-transparent" />
        
        {/* Floating Gold Icon */}
        <div className="absolute -bottom-3 left-4 w-9 h-9 rounded-xl bg-[#061321] border border-[#1C3A52] flex items-center justify-center shadow-lg group-hover:border-gold transition-colors">
          {getIcon(category.icon)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-6 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white group-hover:text-gold transition-colors">
            {category.name}
          </h3>
          <span className="w-6 h-6 rounded-full bg-[#061321] text-[#8495A9] group-hover:text-gold group-hover:bg-[#142B40] flex items-center justify-center text-xs transition-colors">
            <ChevronRight size={14} />
          </span>
        </div>
        <p className="mt-2 text-xs text-[#B9C6D6] line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Link>
  );
};
