import React, { memo, useCallback } from 'react';
import { NavButton } from '../components/common/buttons';

const PROJECT_CATEGORIES = {
  crypto: 'Crypto',
  ai: 'AI',
  web: 'WebDev',
  devtools: 'DevTools',
} as const;

interface ProjectNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectNav = memo(({ selectedCategory, onCategoryChange }: ProjectNavProps) => {
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
      {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
        <NavButton
          key={key}
          active={selectedCategory === key}
          onClick={handleCategoryChange(key)}
          size="xs"
        >
          {value}
        </NavButton>
      ))}
    </div>
  );
});

ProjectNav.displayName = 'ProjectNav';

export default ProjectNav;
