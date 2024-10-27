import React from 'react';
import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

type HeroProps = {
  primaryArticle: Article;
  featuredArticles: Article[];
  onRefresh: () => void;
};

export default function Hero({ primaryArticle, featuredArticles, onRefresh }: HeroProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <ArticleCard article={primaryArticle} variant="featured" />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-text-primary">Random Selection</h2>
          <button 
            onClick={onRefresh} 
            className="text-accent hover:text-accent-dark"
            aria-label="Refresh random articles"
          >
            <RefreshIcon className="w-5 h-5" />
          </button>
        </div>
        {featuredArticles.length === 0 ? (
          <p className="text-text-secondary">No articles available.</p>
        ) : (
          <div className="space-y-4">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="side" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
