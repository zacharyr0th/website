'use client';

/**
 * WritingNav component
 * Navigation for filtering articles by category
 */

import React from 'react';
import { cn } from '@/lib';
import { Button } from '@/components/misc';
import type { ArticleCategory } from '../types';
import { CATEGORIES, CATEGORY_DISPLAY_NAMES } from '../types';

interface WritingNavProps {
  selectedCategory: ArticleCategory | null;
  onCategorySelect: (category: ArticleCategory | null) => void;
}

export const WritingNav = ({ selectedCategory, onCategorySelect }: WritingNavProps) => {
  const handleCategoryChange = (category: ArticleCategory | null) => () => {
    onCategorySelect(category);
  };

  return (
    <nav 
      className={cn(
        'flex items-center justify-center overflow-x-auto scrollbar-hide',
        'bg-surface/40 backdrop-blur-sm rounded-2xl',
        'px-4 py-2.5 md:px-6',
        'transition-colors duration-200 hover:bg-surface/60'
      )}
      role="navigation"
      aria-label="Article categories"
    >
      <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 w-full">
        <Button
          active={selectedCategory === null}
          onClick={handleCategoryChange(null)}
          size="sm"
          className={cn(
            'text-base font-mono font-medium',
            'transition-all duration-200',
          )}
        >
          All
        </Button>

        {CATEGORIES.map((category) => (
          <Button
            key={category}
            active={selectedCategory === category}
            onClick={handleCategoryChange(category)}
            size="sm"
            className={cn(
              'text-base font-mono font-medium',
              'transition-all duration-200',
            )}
          >
            {CATEGORY_DISPLAY_NAMES[category]}
          </Button>
        ))}
      </div>
    </nav>
  );
}; 