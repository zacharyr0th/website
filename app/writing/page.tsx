'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { ContentItem, Theme, Article } from '@/lib/types';
import Hero from './Hero';
import ArchiveSection from './ArchiveSection';
import WritingPageServer from './WritingPageServer';

export default function WritingPage() {
  const [allContent, setAllContent] = useState<Article[]>([]);
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedTag, setSelectedTag] = useState('all');
  const [randomContent, setRandomContent] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { allArticles } = await WritingPageServer();
      setAllContent(allArticles);
      setRandomContent(getRandomContent(allArticles, 3));
    }
    fetchData();
  }, []);

  const featuredContent = allContent.filter(item => item.frontmatter?.featured).slice(0, 3);
  const primaryContent = featuredContent[0] || allContent[0];

  const tags = ['all', ...Array.from(
    new Set(allContent.flatMap(item => item.tags || []))
  )];

  const filteredContent = selectedTag === 'all'
    ? allContent
    : allContent.filter(item => item.tags?.includes(selectedTag));

  const handleTagChange = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  const handleRefreshRandom = useCallback(() => {
    setRandomContent(getRandomContent(allContent, 3));
  }, [allContent]);

  return (
    <main className="flex flex-col w-full min-h-screen font-mono">
      <Navigation setTheme={setTheme} />
      <div className="flex-grow container mx-auto px-24 py-24 max-w-6xl">
        <h1 className="text-5xl font-bold mb-12 text-text-primary">
          Writing
        </h1>

        {primaryContent && (
          <div className="max-w-7xl mx-auto mb-12">
            <Hero
              primaryArticle={convertToArticle(primaryContent)}
              featuredArticles={featuredContent.map(convertToArticle)}
              onRefresh={handleRefreshRandom}
            />
          </div>
        )}

        <ArchiveSection
          tags={tags}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
          content={filteredContent.map(convertToArticle)}
        />
      </div>
      <Footer />
    </main>
  );
}

function getRandomContent(content: Article[], count: number): Article[] {
  const shuffled = [...content].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function convertToArticle(content: Article): Article {
  return content;
}
