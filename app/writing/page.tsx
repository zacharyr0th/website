'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { Theme, Article } from '@/lib/types';
import ArticleGrid from '@/components/page-writing/ArticleGrid';
import Hero from '@/components/page-writing/Hero';
import ArchiveSection from '@/components/page-writing/ArchiveSection';
import { getFeaturedArticles, getAllArticles } from '@/lib/articleUtils';

export default function WritingPage() {
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [randomArticles, setRandomArticles] = useState<Article[]>([]);

  const allArticles = useMemo(() => getAllArticles(), []);
  const featuredArticles = useMemo(() => getFeaturedArticles(), []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(allArticles.map((article) => article.category || 'Uncategorized'))
    );
    return ['all', ...uniqueCategories];
  }, [allArticles]);

  const filteredArticles = useMemo(
    () =>
      selectedCategory === 'all'
        ? allArticles
        : allArticles.filter((article) => article.category === selectedCategory),
    [selectedCategory, allArticles]
  );

  const refreshRandomSelection = useCallback(() => {
    const availableArticles = allArticles.filter(
      (article) => article.id !== featuredArticles[currentFeaturedIndex].id
    );
    const newRandomArticles = availableArticles.sort(() => 0.5 - Math.random()).slice(0, 3);
    setRandomArticles(newRandomArticles);
  }, [allArticles, featuredArticles, currentFeaturedIndex]);

  useEffect(() => {
    refreshRandomSelection();
  }, [refreshRandomSelection]);

  return (
    <main className={`flex flex-col w-full min-h-screen font-mono ${theme}`}>
      <Navigation setTheme={setTheme} />
      <div className="flex-grow container mx-auto px-24 py-24 max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-12 text-text-primary"
        >
          Writing
        </motion.h1>

        {featuredArticles.length > 0 && (
          <div className="max-w-7xl mx-auto mb-12">
            <Hero
              primaryArticle={featuredArticles[currentFeaturedIndex]}
              featuredArticles={randomArticles}
              onRefreshRandomSelection={refreshRandomSelection}
            />
            <ArchiveSection
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}

        <ArticleGrid articles={filteredArticles} />
      </div>
      <Footer />
    </main>
  );
}
