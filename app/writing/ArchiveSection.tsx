import React, { useState, useCallback, useMemo } from 'react';
import { Article } from '@/lib/types';
import dynamic from 'next/dynamic';

const ArticleCard = dynamic(() => import('./ArticleCard'), { 
  loading: () => <p>Loading...</p>
});

interface ArchiveSectionProps {
  content: Article[];
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

const ArchiveSection: React.FC<ArchiveSectionProps> = ({
  selectedTag,
  onTagChange,
  content = [],
  tags,
}) => {
  const allTags = useMemo(() => {
    return ['all', ...tags].filter((tag, index, self) => 
      self.indexOf(tag) === index
    );
  }, [tags]);

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">Archives</h3>
      <div className="flex justify-between items-center mb-8">
        <CategoryButtons
          categories={allTags}
          selectedCategory={selectedTag}
          onCategoryChange={onTagChange}
        />
        <SearchButton />
      </div>
      <ArticleGrid articles={content} />
    </section>
  );
};

interface CategoryButtonsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = React.memo(
  ({ categories, selectedCategory, onCategoryChange }) => (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryButton
          key={category}
          active={category === selectedCategory}
          onClick={() => onCategoryChange(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </CategoryButton>
      ))}
    </div>
  )
);
CategoryButtons.displayName = 'CategoryButtons';

interface CategoryButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

const buttonStyles = `
  px-4 py-2 rounded-lg text-sm transition-colors
`;

const CategoryButton: React.FC<CategoryButtonProps> = React.memo(
  ({ children, active, onClick }) => (
    <button
      onClick={onClick}
      className={`${buttonStyles} ${
        active
          ? 'bg-[var(--color-primary)] text-[var(--color-white)]'
          : 'bg-[var(--color-secondary)]/10 text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)]/20'
      }`}
      aria-label={`Select category ${children}`}
    >
      {children}
    </button>
  )
);
CategoryButton.displayName = 'CategoryButton';

const SearchButton: React.FC = React.memo(() => (
  <button
    className={`${buttonStyles} border border-[var(--color-text-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)]/10`}
    aria-label="Search articles"
  >
    <SearchIcon className="w-5 h-5" />
  </button>
));
SearchButton.displayName = 'SearchButton';

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = React.memo((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = React.memo(({ articles }) => {
  if (!articles.length) {
    return <p className="text-[var(--color-text-secondary)]">No articles found.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <div key={index} className="p-4">
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
});

export default ArchiveSection;