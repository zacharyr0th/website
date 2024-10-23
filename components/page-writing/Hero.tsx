import React from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '@/lib/types';

interface HeroProps {
  primaryArticle: Article;
  featuredArticles: Article[];
  onRefreshRandomSelection: () => void;
}

const Hero: React.FC<HeroProps> = ({
  primaryArticle,
  featuredArticles,
  onRefreshRandomSelection,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
    <PrimaryArticle article={primaryArticle} />
    <RandomSelection 
      articles={featuredArticles.slice(0, 3)} 
      onRefresh={onRefreshRandomSelection} 
    />
  </div>
);

const PrimaryArticle: React.FC<{ article: Article }> = ({ article }) => (
  <div className="lg:col-span-2">
    <ArticleCard article={article} variant="featured" />
  </div>
);

interface RandomSelectionProps {
  articles: Article[];
  onRefresh: () => void;
}

const RandomSelection: React.FC<RandomSelectionProps> = ({ articles, onRefresh }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-semibold text-[var(--color-text-primary)]">
        Random Selection
      </h3>
      <RefreshButton onClick={onRefresh} />
    </div>
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant="side" />
      ))}
    </div>
  </div>
);

const RefreshButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-1.5 rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)]/20 transition-colors"
    aria-label="Refresh random selection"
  >
    <RefreshIcon className="w-6 h-6" />
  </button>
);

const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

export default Hero;
