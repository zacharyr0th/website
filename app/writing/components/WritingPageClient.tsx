'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Article, ArticleCategory } from '../types';
import { ArticleCard } from './ArticleCard';
import { WritingNav } from './WritingNav';
import { itemVariants, containerVariants } from '../../lib/animations';

interface WritingPageClientProps {
  initialArticles: readonly Article[];
  containerVariants: typeof containerVariants;
}

export default function WritingPageClient({ 
  initialArticles, 
  containerVariants
}: WritingPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const filteredArticles = useMemo(() => {
    const articles = !selectedCategory 
      ? [...initialArticles]
      : [...initialArticles].filter(article => article.category === selectedCategory);

    return articles.sort((a: Article, b: Article) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [selectedCategory, initialArticles]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFocusedIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        const numArticles = filteredArticles.length;
        let newIndex = focusedIndex;

        switch (e.key) {
          case 'ArrowUp':
            newIndex = focusedIndex - 1;
            break;
          case 'ArrowDown':
            newIndex = focusedIndex + 1;
            break;
        }

        if (newIndex >= 0 && newIndex < numArticles) {
          setFocusedIndex(newIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, filteredArticles.length]);

  if (!initialArticles || initialArticles.length === 0) {
    return (
      <div 
        className="max-w-2xl mx-auto space-y-4"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-xl font-medium text-text-primary">No Articles Found</h2>
        <p className="text-text-secondary">
          Articles are currently being prepared. Check back soon for updates.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <WritingNav
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="space-y-3"
      >
        {filteredArticles.map((article: Article, index: number) => (
          <motion.div 
            key={article.id} 
            variants={itemVariants}
          >
            <ArticleCard
              article={article}
              isFocused={index === focusedIndex}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
} 