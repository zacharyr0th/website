import React, { useMemo } from 'react';
import { ArchiveSectionProps, Article } from '@/lib/types';
import dynamic from 'next/dynamic';

const ArticleCard = dynamic(() => import('./ArticleCard'), {
  ssr: true,
  loading: () => (
    <div className="p-4 border rounded-lg">
      <div className="h-40 bg-[var(--color-surface)] rounded-lg mb-4"></div>
      <div className="h-4 bg-[var(--color-surface)] rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-[var(--color-surface)] rounded w-1/2"></div>
    </div>
  ),
});

const CategoryButton = React.memo<{
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}>(({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm ${
      active
        ? 'bg-[var(--color-primary)] text-[var(--color-white)]'
        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
    }`}
    aria-label={`Select category ${children}`}
    aria-pressed={active}
  >
    {children}
  </button>
));
CategoryButton.displayName = 'CategoryButton';

const CategoryButtons = React.memo<{
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}>(({ categories, selectedCategory, onCategoryChange }) => (
  <div className="flex flex-wrap gap-[var(--spacing-xs)]">
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
));
CategoryButtons.displayName = 'CategoryButtons';

const ArticleGrid = React.memo<{ 
  articles: Article[]; 
  selectedTag: string;
}>(
  ({ articles }) => {
    if (!articles.length) {
      return <p className="text-[var(--color-text-secondary)]">No articles found.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-md)]">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="p-[var(--spacing-md)] transition-all duration-[var(--transition-speed)] ease-in-out hover:-translate-y-1"
          >
            <div className="h-full transform transition-all duration-[var(--transition-speed)] ease-in-out hover:shadow-[var(--box-shadow)] rounded-[var(--border-radius-lg)]">
              <ArticleCard article={article} />
            </div>
          </div>
        ))}
      </div>
    );
  }
);
ArticleGrid.displayName = 'ArticleGrid';

const ArchiveHeader = React.memo<{
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}>(({ categories, selectedCategory, onCategoryChange }) => (
  <>
    <h3 className="text-2xl font-semibold mb-[var(--spacing-md)] text-[var(--heading-color)]">Archives</h3>
    <div className="flex justify-between items-center mb-[var(--spacing-xl)]">
      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </div>
  </>
));
ArchiveHeader.displayName = 'ArchiveHeader';

const ArchiveSection: React.FC<ArchiveSectionProps> = ({
  selectedTag,
  onTagChange,
  content = [],
  tags,
}) => {
  const allTags = useMemo(() => {
    const uniqueTags = new Set(['all', ...tags]);
    return Array.from(uniqueTags);
  }, [tags]);

  const filteredArticles = useMemo(() => {
    if (selectedTag === 'all') return content;
    return content.filter((article) => article.tags?.includes(selectedTag));
  }, [content, selectedTag]);

  const headerProps = useMemo(() => ({
    categories: allTags,
    selectedCategory: selectedTag,
    onCategoryChange: onTagChange,
  }), [allTags, selectedTag, onTagChange]);

  return (
    <section className="mt-12">
      <ArchiveHeader {...headerProps} />
      <ArticleGrid articles={filteredArticles} selectedTag={selectedTag} />
    </section>
  );
};

export default React.memo(ArchiveSection);
