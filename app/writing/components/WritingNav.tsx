'use client';

import React, { memo, useCallback } from 'react';
import { NavButton } from '../../components/buttons';
import { CATEGORIES } from '../types';
import type { ArticleCategory } from '../types';

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
    <div className="relative w-full">
      <div className="absolute left-0 right-0 h-full bg-gradient-to-r from-background via-transparent to-background pointer-events-none z-10" />
      <div className="overflow-x-auto scrollbar-hide -mx-4 sm:mx-0">
        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl px-3 py-2 inline-flex items-center space-x-2 sm:space-x-4 min-w-full sm:min-w-0 whitespace-nowrap">
          <NavButton
            active={selectedCategory === null}
            onClick={handleCategoryChange(null)}
            size="sm"
            className="text-sm sm:text-base px-3 py-1"
          >
            All
          </NavButton>
          {CATEGORIES.map((category) => (
            <NavButton
              key={category}
              active={selectedCategory === category}
              onClick={handleCategoryChange(category)}
              size="sm"
              className="text-sm sm:text-base px-3 py-1"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavButton>
          ))}
        </div>
      </div>
    </div>
  );
});

WritingNav.displayName = 'WritingNav';
