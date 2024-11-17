'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/app/components/common/Footer';
import { Article } from '@/lib/types';
import Hero from './Hero';
import ArchiveSection from './ArchiveSection';

export default function WritingPage() {
  const [allContent, setAllContent] = useState<Article[]>([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [randomContent, setRandomContent] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const featuredContent = React.useMemo(() => {
    const derivativesArticle = allContent.find((item) => item.slug === 'derivatives-vs-spot');
    if (derivativesArticle) {
      return [derivativesArticle];
    }
    return allContent.filter((item) => item.frontmatter?.featured);
  }, [allContent]);

  const primaryContent = React.useMemo(
    () => featuredContent[0] || allContent[0],
    [featuredContent, allContent]
  );

  const tags = React.useMemo(
    () => ['all', ...Array.from(new Set(allContent.flatMap((item) => item.tags || [])))],
    [allContent]
  );

  const filteredContent = React.useMemo(
    () =>
      selectedTag === 'all'
        ? allContent
        : allContent.filter((item) => item.tags?.includes(selectedTag)),
    [selectedTag, allContent]
  );

  const handleTagChange = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  const handleRefreshRandom = useCallback(() => {
    const nonFeaturedArticles = allContent.filter((article) => !article.frontmatter?.featured);
    setRandomContent(getRandomContent(nonFeaturedArticles, 3));
  }, [allContent]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const articles = await response.json();
        setAllContent(articles);

        const nonFeaturedArticles = articles.filter(
          (article: Article) => !article.frontmatter?.featured
        );
        setRandomContent(getRandomContent(nonFeaturedArticles, 3));
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-36 pb-8 md:pb-18 max-w-5xl">
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-12 text-text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Writing
          </motion.h1>
          <p>Loading articles...</p>
        </div>
      );
    }

    return (
      <div className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-36 pb-8 md:pb-18 max-w-5xl">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-12 text-text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Writing
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {primaryContent && (
            <div className="max-w-7xl mx-auto mb-12">
              <Hero
                primaryArticle={primaryContent}
                featuredArticles={randomContent}
                onRefresh={handleRefreshRandom}
              />
            </div>
          )}

          <ArchiveSection
            tags={tags}
            selectedTag={selectedTag}
            onTagChange={handleTagChange}
            content={filteredContent}
          />
        </motion.div>
      </div>
    );
  };

  return (
    <motion.main
      className="flex flex-col w-full min-h-screen font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderContent()}
      <Footer />
    </motion.main>
  );
}

function getRandomContent(content: Article[], count: number): Article[] {
  if (content.length === 0) return [];
  const shuffled = [...content].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, content.length));
}
