'use client';

import React, { memo, useCallback } from 'react';
import { NavButton } from '@/components/buttons';
import { PROJECT_CATEGORIES, type ProjectCategory } from '../types/types';
import { cn } from '@/lib';

interface ProjectNavProps {
  selectedCategory: 'all' | ProjectCategory;
  onCategoryChange: (category: 'all' | ProjectCategory) => void;
  className?: string;
}

const ProjectNav = memo<ProjectNavProps>(({ selectedCategory, onCategoryChange, className }) => {
  const handleCategoryChange = useCallback(
    (category: 'all' | ProjectCategory) => () => {
      onCategoryChange(category);
    },
    [onCategoryChange]
  );

  return (
    <nav
      className={cn(
        'flex items-center justify-center overflow-x-auto scrollbar-hide',
        'bg-surface/40 backdrop-blur-sm rounded-2xl',
        'px-4 py-2.5 md:px-6',
        'transition-colors duration-200 hover:bg-surface/60',
        className
      )}
      role="navigation"
      aria-label="Project categories"
    >
      <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 w-full">
        <NavButton
          active={selectedCategory === 'all'}
          onClick={handleCategoryChange('all')}
          size="sm"
          className={cn(
            'text-base font-mono font-medium',
            'transition-all duration-200',
            selectedCategory === 'all'
              ? 'text-accent bg-accent/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]'
              : 'text-zinc-400 hover:text-white'
          )}
        >
          All
        </NavButton>
        {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
          <NavButton
            key={key}
            active={selectedCategory === key}
            onClick={handleCategoryChange(key as ProjectCategory)}
            size="sm"
            className={cn(
              'text-base font-mono font-medium',
              'transition-all duration-200',
              selectedCategory === key
                ? 'text-accent bg-accent/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]'
                : 'text-zinc-400 hover:text-white'
            )}
          >
            {value}
          </NavButton>
        ))}
      </div>
    </nav>
  );
});

ProjectNav.displayName = 'ProjectNav';

export default ProjectNav;
