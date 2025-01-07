'use client';

import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
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

interface WritingPageClientProps {
  initialArticles: readonly Article[];
  containerVariants: Variants;
}

export default function WritingPageClient({ 
  initialArticles, 
  containerVariants
}: WritingPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = useMemo(() => {
    return selectedCategory === 'all'
      ? initialArticles
      : initialArticles.filter(article => 
          article.frontmatter.category === selectedCategory
        );
  }, [initialArticles, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (!initialArticles || initialArticles.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-12"
    >
      <WritingNav 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <ArchiveSection articles={filteredArticles} />
    </motion.div>
  );
} 