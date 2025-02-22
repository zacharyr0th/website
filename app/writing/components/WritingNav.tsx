'use client';

import React, { memo, useCallback } from 'react';
import { NavButton } from '../../components/buttons';
import { CATEGORIES } from './articles/types';
import type { ArticleCategory } from './articles/types';
import { cn } from '@/lib';

interface WritingNavProps {
  selectedCategory: ArticleCategory | null;
  onCategorySelect: (category: ArticleCategory | null) => void;
}

export const WritingNav = memo<WritingNavProps>(({ selectedCategory, onCategorySelect }) => {
  const handleCategoryChange = useCallback(
    (category: ArticleCategory | null) => () => {
      onCategorySelect(category);
    },
    [onCategorySelect]
  );

  return (
    <div className="flex justify-center md:justify-start md:inline-flex bg-surface/80 backdrop-blur-sm rounded-3xl px-2 md:px-4 py-1.5 md:py-2.5 items-center space-x-0.5 md:space-x-4 overflow-x-auto scrollbar-hide">
      <NavButton
        active={selectedCategory === null}
        onClick={handleCategoryChange(null)}
        size="sm"
        className={cn(
          'text-sm md:text-base font-mono font-medium px-2 md:px-3',
          'transition-all duration-200',
          selectedCategory === null
            ? 'text-accent bg-accent/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]'
            : 'text-zinc-400 hover:text-white'
        )}
      >
        All
      </NavButton>
      {CATEGORIES.map((category) => (
        <NavButton
          key={category}
          active={selectedCategory === category}
          onClick={handleCategoryChange(category)}
          size="sm"
          className={cn(
            'text-sm md:text-base font-mono font-medium px-2 md:px-3',
            'transition-all duration-200',
            selectedCategory === category
              ? 'text-accent bg-accent/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]'
              : 'text-zinc-400 hover:text-white'
          )}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </NavButton>
      ))}
    </div>
  );
});

WritingNav.displayName = 'WritingNav';
