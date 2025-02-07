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
    <div className="flex justify-center md:justify-start md:inline-flex bg-surface/80 backdrop-blur-sm rounded-3xl px-4 py-2.5 items-center space-x-1 md:space-x-4 overflow-x-auto scrollbar-hide">
      <NavButton
        active={selectedCategory === null}
        onClick={handleCategoryChange(null)}
        size="sm"
        className="text-base"
      >
        All
      </NavButton>
      {CATEGORIES.map((category) => (
        <NavButton
          key={category}
          active={selectedCategory === category}
          onClick={handleCategoryChange(category)}
          size="sm"
          className="text-base"
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </NavButton>
      ))}
    </div>
  );
});

WritingNav.displayName = 'WritingNav';
