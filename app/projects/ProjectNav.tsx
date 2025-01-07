import React, { memo, useCallback } from 'react';
import { NavButton } from '../components/buttons';
import { PROJECT_CATEGORIES, type ProjectCategory } from './projects';

interface ProjectNavProps {
  selectedCategory: 'all' | ProjectCategory;
  onCategoryChange: (category: 'all' | ProjectCategory) => void;
}

const ProjectNav = memo(({ selectedCategory, onCategoryChange }: ProjectNavProps) => {
  const handleCategoryChange = useCallback(
    (category: 'all' | ProjectCategory) => () => {
      onCategoryChange(category);
    },
    [onCategoryChange]
  );

  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-3xl px-4 py-2.5 inline-flex items-center space-x-4 overflow-x-auto scrollbar-hide">
      <NavButton
        active={selectedCategory === 'all'}
        onClick={handleCategoryChange('all')}
        size="sm"
        className="text-base"
      >
        All
      </NavButton>
      {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
        <NavButton
          key={key}
          active={selectedCategory === key}
          onClick={handleCategoryChange(key as ProjectCategory)}
          size="sm"
          className="text-base"
        >
          {value}
        </NavButton>
      ))}
    </div>
  );
});

ProjectNav.displayName = 'ProjectNav';

export default ProjectNav;
