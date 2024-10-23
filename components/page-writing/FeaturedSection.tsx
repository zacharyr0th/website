import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface FeaturedSectionProps {
  primaryArticle: Article;
  sideArticles: Article[];
  randomArticles: Article[];
  onRefreshRandomSelection: () => void;
  featuredArticles: Article[];
  currentFeaturedIndex: number;
  onNextArticle: () => void;
  onPrevArticle: () => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  primaryArticle,
  sideArticles,
  randomArticles,
  onRefreshRandomSelection,
  featuredArticles,
  currentFeaturedIndex,
  onNextArticle,
  onPrevArticle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold mb-6 text-text-primary">Featured Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ArticleCard article={primaryArticle} variant="featured" />
        </div>
        <div className="space-y-4">
          {sideArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="side" />
          ))}
        </div>
      </div>
      
      {/* Random Articles Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-text-primary">Random Picks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {randomArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="default" />
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <button
            onClick={onPrevArticle}
            className="mr-2 px-4 py-2 bg-surface rounded-full text-text-secondary hover:bg-accent hover:text-white transition-colors"
          >
            Previous
          </button>
          <button
            onClick={onNextArticle}
            className="px-4 py-2 bg-surface rounded-full text-text-secondary hover:bg-accent hover:text-white transition-colors"
          >
            Next
          </button>
        </div>
        <button
          onClick={onRefreshRandomSelection}
          className="px-4 py-2 bg-surface rounded-full text-text-secondary hover:bg-accent hover:text-white transition-colors"
        >
          Refresh Selection
        </button>
      </div>
    </motion.div>
  );
};

export default FeaturedSection;
