'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { Article, Theme } from '@/lib/types';
import Hero from './Hero';
import ArchiveSection from './ArchiveSection';
import WritingPageServer from './WritingPageServer';

export default function WritingPage() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [randomArticles, setRandomArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { allArticles } = await WritingPageServer();
      setAllArticles(allArticles);
      setRandomArticles(getRandomArticles(allArticles, 3));
    }
    fetchData();
  }, []);

  const featuredArticles = allArticles.filter(article => article.frontmatter.featured).slice(0, 3);
  const primaryArticle = featuredArticles[0] || allArticles[0];

  const categories = ['all', ...Array.from(
    new Set(allArticles.map((article) => article.category || 'Uncategorized'))
  )];

  const filteredArticles = selectedCategory === 'all'
    ? allArticles
    : allArticles.filter(article => article.category === selectedCategory);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleRefreshRandom = useCallback(() => {
    setRandomArticles(getRandomArticles(allArticles, 3));
  }, [allArticles]);

  return (
    <main className="flex flex-col w-full min-h-screen font-mono">
      <Navigation setTheme={setTheme} />
      <div className="flex-grow container mx-auto px-24 py-24 max-w-6xl">
        <h1 className="text-5xl font-bold mb-12 text-text-primary">
          Writing
        </h1>

        {primaryArticle && (
          <div className="max-w-7xl mx-auto mb-12">
            <Hero
              primaryArticle={primaryArticle}
              featuredArticles={randomArticles}
              onRefresh={handleRefreshRandom}
            />
          </div>
        )}

        <ArchiveSection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          articles={filteredArticles}
        />
      </div>
      <Footer />
    </main>
  );
}

function getRandomArticles(articles: Article[], count: number): Article[] {
  const shuffled = [...articles].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
