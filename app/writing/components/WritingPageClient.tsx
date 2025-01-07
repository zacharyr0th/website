'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Article } from '../types';
import { ArchiveSection } from './ArchiveSection';
import WritingNav from './WritingNav';
import { itemVariants } from '../../lib/animations';

interface WritingPageClientProps {
  initialArticles: readonly Article[];
  containerVariants: typeof itemVariants;
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
          article.category === selectedCategory
        );
  }, [selectedCategory, initialArticles]);

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
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <WritingNav
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </motion.div>

      <div className="grid grid-cols-1">
        <ArchiveSection articles={filteredArticles} />
      </div>
    </motion.div>
  );
} 