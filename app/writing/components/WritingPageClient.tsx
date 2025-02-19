'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Article, ArticleCategory } from './articles/types';
import ArticleCard from './articles/ArticleCard';
import { WritingNav } from './WritingNav';
import { getArticles } from './articles/articles';
import { LoadingState } from '@/components/misc/Loading';

interface WritingPageClientProps {
  initialArticles: Article[];
  containerVariants?: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: {
        duration: number;
        ease: number[];
        staggerChildren: number;
      };
    };
  };
  enableLoadMore?: boolean;
}

const ARTICLES_PER_PAGE = 10;

export default function WritingPageClient({
  initialArticles,
  containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.48, 0.15, 0.25, 0.96],
        staggerChildren: 0.1,
      },
    },
  },
  enableLoadMore = false,
}: WritingPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [selectedCategory, articles]);

  const loadMoreArticles = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const moreArticles = await getArticles({
        excludeDrafts: true,
        featured: false,
        limit: ARTICLES_PER_PAGE,
        offset: nextPage * ARTICLES_PER_PAGE,
      });

      if (moreArticles.length < ARTICLES_PER_PAGE) {
        setHasMore(false);
      }

      setArticles((prev) => [...prev, ...moreArticles]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  const handleKeyboardNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newIndex =
          e.key === 'ArrowUp'
            ? Math.max(focusedIndex - 1, 0)
            : Math.min(focusedIndex + 1, filteredArticles.length - 1);
        setFocusedIndex(newIndex);
      }
    },
    [focusedIndex, filteredArticles.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, [handleKeyboardNavigation]);

  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-4" role="status" aria-live="polite">
        <h2 className="text-xl font-medium text-text-primary">No Articles Found</h2>
        <p className="text-text-secondary">
          Articles are currently being prepared. Check back soon for updates.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <WritingNav selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
      <div className="space-y-4">
        {filteredArticles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} isFocused={index === focusedIndex} />
        ))}
      </div>

      {enableLoadMore && hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMoreArticles}
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-text-primary bg-background-secondary rounded-md hover:bg-background-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Load More Articles'}
          </button>
        </div>
      )}

      {isLoading && (
        <LoadingState label="Loading more articles" height="h-24" barCount={1} className="mt-4" />
      )}
    </motion.div>
  );
}
