'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { Theme, Article } from '@/lib/types';
import ArticleGrid from '@/components/page-writing/ArticleGrid';
import FeaturedSection from '@/components/page-writing/FeaturedSection';
import CategoryFilter from '@/components/page-writing/CategoryFilter';
import { getFeaturedArticles, getAllArticles } from '@/lib/articleUtils';

export default function WritingPage() {
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [sideArticles, setSideArticles] = useState<Article[]>([]);
  const [randomArticles, setRandomArticles] = useState<Article[]>([]);

  const allArticles = useMemo(() => getAllArticles(), []);
  const featuredArticles = useMemo(() => getFeaturedArticles(), []);
  const categories = useMemo(
    () => [
      'all',
      ...Array.from(new Set(allArticles.map((article) => article.category || 'Uncategorized'))),
    ],
    [allArticles]
  );

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
    const randomArticles = availableArticles
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setRandomArticles(randomArticles);
  }, [allArticles, featuredArticles, currentFeaturedIndex]);

  const nextFeaturedArticle = useCallback(() => {
    setCurrentFeaturedIndex((prevIndex) => (prevIndex + 1) % featuredArticles.length);
    refreshRandomSelection();
  }, [featuredArticles.length, refreshRandomSelection]);

  const prevFeaturedArticle = useCallback(() => {
    setCurrentFeaturedIndex(
      (prevIndex) => (prevIndex - 1 + featuredArticles.length) % featuredArticles.length
    );
    refreshRandomSelection();
  }, [featuredArticles.length, refreshRandomSelection]);

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
          <FeaturedSection
            primaryArticle={featuredArticles[currentFeaturedIndex]}
            sideArticles={sideArticles}
            randomArticles={randomArticles}
            onRefreshRandomSelection={refreshRandomSelection}
            featuredArticles={featuredArticles}
            currentFeaturedIndex={currentFeaturedIndex}
            onNextArticle={nextFeaturedArticle}
            onPrevArticle={prevFeaturedArticle}
          />
        )}

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ArticleGrid articles={filteredArticles} />
      </div>
      <Footer />
    </main>
  );
}
