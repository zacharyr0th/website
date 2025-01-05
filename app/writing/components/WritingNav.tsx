'use client';

import React, { memo, useCallback } from 'react';
import { NavButton } from '../../components/buttons';
import { ARTICLE_CONFIG, ArticleCategory } from '../types';

interface WritingNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const WritingNav = memo(({ selectedCategory, onCategoryChange }: WritingNavProps) => {
  const handleCategoryChange = useCallback(
    (category: string) => () => {
      onCategoryChange(category);
    },
    [onCategoryChange]
  );

  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-3xl px-4 py-2.5 flex items-center space-x-4 overflow-x-auto scrollbar-hide">
      <NavButton
        active={selectedCategory === 'all'}
        onClick={handleCategoryChange('all')}
        size="xs"
      >
        All
      </NavButton>
      {ARTICLE_CONFIG.allowedCategories.map((category) => (
        <NavButton
          key={category}
          active={selectedCategory === category}
          onClick={handleCategoryChange(category)}
          size="xs"
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </NavButton>
      ))}
    </div>
  );
});

WritingNav.displayName = 'WritingNav';

export default WritingNav; 