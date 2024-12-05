'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/app/components/common/Footer';
import ThemeProvider from '@/app/components/common/ThemeProvider';
import { Article } from './types';
import Hero from './components/Hero';
import ArchiveSection from './components/ArchiveSection';

// Optimized loading state component
const LoadingState = () => (
  <motion.div
    className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-36 pb-8 md:pb-18 max-w-5xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.h1
      className="text-3xl md:text-5xl font-bold mb-6 text-text-primary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Writing
    </motion.h1>
    <div className="animate-pulse space-y-4">
      <div className="h-48 bg-gray-200 rounded-xl" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  </motion.div>
);

// Optimized error state component
const ErrorState = ({ error }: { error: Error }) => (
  <motion.div
    className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-36 pb-8 md:pb-18 max-w-5xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.h1
      className="text-3xl md:text-5xl font-bold mb-6 text-text-primary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Writing
    </motion.h1>
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <h2 className="text-red-600 font-semibold mb-2">Error Loading Articles</h2>
      <p className="text-red-500">{error.message}</p>
    </div>
  </motion.div>
);

// Memoized Hero component wrapper
const MemoizedHero = React.memo(({ 
  primaryArticle, 
  randomContent, 
  onRefresh 
}: { 
  primaryArticle: Article; 
  randomContent: Article[]; 
  onRefresh: () => void;
}) => (
  <div className="max-w-7xl mx-auto mb-12">
    <Hero
      primaryArticle={primaryArticle}
      featuredArticles={randomContent}
      onRefresh={onRefresh}
    />
  </div>
));
MemoizedHero.displayName = 'MemoizedHero';

export default function WritingPage() {
  const [allContent, setAllContent] = useState<Article[]>([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [randomContent, setRandomContent] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const featuredContent = useMemo(() => {
    const derivativesArticle = allContent.find((item) => item.slug === 'derivatives-vs-spot');
    if (derivativesArticle) {
      return [derivativesArticle];
    }
    return allContent.filter((item) => item.frontmatter?.featured);
  }, [allContent]);

  const primaryContent = useMemo(
    () => featuredContent[0] || allContent[0],
    [featuredContent, allContent]
  );

  const tags = useMemo(
    () => ['all', ...Array.from(new Set(allContent.flatMap((item) => item.tags || [])))],
    [allContent]
  );

  const handleTagChange = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  const handleRefreshRandom = useCallback(() => {
    const nonFeaturedArticles = allContent.filter((article) => !article.frontmatter?.featured);
    const shuffled = [...nonFeaturedArticles].sort(() => 0.5 - Math.random());
    setRandomContent(shuffled.slice(0, 3));
  }, [allContent]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }
        const articles = await response.json();
        setAllContent(articles);

        const nonFeaturedArticles = articles.filter(
          (article: Article) => !article.frontmatter?.featured
        );
        const shuffled = [...nonFeaturedArticles].sort(() => 0.5 - Math.random());
        setRandomContent(shuffled.slice(0, 3));
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch articles'));
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen font-mono bg-gradient-to-b from-background to-surface/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ThemeProvider>
        <div className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-36 pb-8 md:pb-18 max-w-5xl">
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-6 text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Writing
          </motion.h1>

          {/* Wrap the content in AnimatePresence but keep Hero outside */}
          {primaryContent && (
            <MemoizedHero
              primaryArticle={primaryContent}
              randomContent={randomContent}
              onRefresh={handleRefreshRandom}
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ArchiveSection
                tags={tags}
                selectedTag={selectedTag}
                onTagChange={handleTagChange}
                content={allContent}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </ThemeProvider>
    </motion.div>
  );
}
