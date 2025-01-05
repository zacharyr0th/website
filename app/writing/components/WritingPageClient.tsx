'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { ArchiveSection } from './ArchiveSection';
import WritingNav from './WritingNav';

// Error State
export const ErrorState = () => (
  <div 
    className="max-w-2xl mx-auto space-y-4" 
    role="alert"
    aria-live="polite"
  >
    <h2 className="text-xl font-medium text-text-primary">Error Loading Articles</h2>
    <p className="text-text-secondary">
      There was a problem loading the articles. Please try again later.
    </p>
  </div>
);

// Empty State
const EmptyState = () => (
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

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface WritingPageClientProps {
  initialArticles: Article[];
  config: typeof import('../types').ARTICLE_CONFIG;
}

export default function WritingPageClient({ initialArticles, config }: WritingPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return initialArticles;
    return initialArticles.filter((article) => article.category === selectedCategory);
  }, [initialArticles, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (!initialArticles || initialArticles.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header className="space-y-3" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-bold">Writing</h1>
      </motion.header>

      <motion.div variants={itemVariants}>
        <WritingNav
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </motion.div>

      <motion.div variants={containerVariants}>
        <ArchiveSection 
          articles={filteredArticles.slice(0, config.pagination.defaultPageSize)} 
        />
      </motion.div>
    </motion.div>
  );
} 