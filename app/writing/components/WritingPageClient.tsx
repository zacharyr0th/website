'use client';

/**
 * WritingPageClient component
 * Client-side component for the writing page with filtering and pagination
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button, LoadingState } from '@/components/misc';
import type { Article, ArticleCategory } from '../types';
import { ArticleCard } from './ArticleCard';
import { WritingNav } from './WritingNav';

interface WritingPageClientProps {
  initialArticles: Article[];
  enableLoadMore?: boolean;
}

export const WritingPageClient = ({
  initialArticles,
  enableLoadMore = true,
}: WritingPageClientProps) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(initialArticles.length);

  // Filter articles by selected category
  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  // Load more articles
  const loadMoreArticles = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        offset: offset.toString(),
        limit: '10',
      });

      if (selectedCategory) {
        params.append('category', selectedCategory);
      }

      const response = await fetch(`/writing/api/articles?${params.toString()}`);
      const newArticles = await response.json();

      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
        setOffset((prev) => prev + newArticles.length);
      }
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: ArticleCategory | null) => {
    setSelectedCategory(category);

    // Reset pagination when changing category
    if (category !== selectedCategory) {
      setOffset(initialArticles.length);
      setHasMore(true);

      // If changing to a new category, fetch articles for that category
      if (category) {
        const fetchCategoryArticles = async () => {
          setIsLoading(true);
          try {
            const response = await fetch(`/writing/api/articles?category=${category}`);
            const categoryArticles = await response.json();
            setArticles((prev) => {
              // Merge with existing articles, avoiding duplicates
              const existingIds = new Set(prev.map((a) => a.id));
              const newArticles = categoryArticles.filter((a: Article) => !existingIds.has(a.id));
              return [...prev, ...newArticles];
            });
          } catch (error) {
            console.error('Error fetching category articles:', error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchCategoryArticles();
      }
    }
  };

  return (
    <div className="space-y-8">
      <WritingNav selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />

      <motion.div
        className="grid grid-cols-1 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </motion.div>

      {filteredArticles.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-lg text-[var(--color-text-secondary)]">
            No articles found in this category.
          </p>
        </div>
      )}

      {enableLoadMore && hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMoreArticles} disabled={isLoading} className="px-6 py-2">
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {isLoading && <LoadingState label="Loading more articles" height="h-24" barCount={3} />}
    </div>
  );
};
