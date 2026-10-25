'use client';

import React from 'react';
import Link from 'next/link';
import { FolderOpen, ChevronRight, Sparkles } from 'lucide-react';
import { Category } from '@/lib/types';

interface SidebarCategoriesProps {
  categories: Category[];
  currentCategorySlug?: string;
}

export function SidebarCategories({ categories, currentCategorySlug }: SidebarCategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="bg-theme-card border border-theme rounded-2xl p-5 shadow-xl transition-colors">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-theme">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-gold" />
          <h3 className="text-theme-primary font-bold text-base tracking-wide">
            Shradhanjali Categories
          </h3>
        </div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 font-medium transition-colors"
        >
          <span>View All</span>
          <ChevronRight size={13} />
        </Link>
      </div>

      {/* Category List Items */}
      <div className="mt-3.5 space-y-1.5">
        {categories.map((cat) => {
          const isActive = currentCategorySlug === cat.slug;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`group flex items-center justify-between p-2.5 px-3 rounded-xl border transition-all duration-150 ${
                isActive
                  ? 'bg-gold/15 border-gold/40 text-gold font-semibold'
                  : 'bg-theme-surface/50 border-transparent hover:border-theme hover:bg-theme-card-hover text-theme-primary hover:text-gold'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                    isActive ? 'bg-gold' : 'bg-theme-muted group-hover:bg-gold'
                  }`}
                />
                <span className="text-xs sm:text-sm font-medium truncate">
                  {cat.name}
                </span>
              </div>

              <ChevronRight
                size={14}
                className={`shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${
                  isActive ? 'text-gold' : 'text-theme-muted group-hover:text-gold'
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
