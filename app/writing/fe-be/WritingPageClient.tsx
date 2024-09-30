'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { WritingPageClientProps, FeaturedWriting } from '@/lib/types';
import HeroSection from '../components/HeroSection';
import FeaturedSection from '../components/FeaturedSection';
import CategoryTiles from '../components/CategoryTiles';
import Categories from '../components/Categories';
import ContentGrid from '../components/ContentGrid';
import NewsletterSignup from '../components/NewsletterSignup';
import { featuredWriting } from '../components/featuredWriting';

const WritingPageClient: React.FC<WritingPageClientProps> = ({ initialContent }) => {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredContent = useMemo(() => {
    return activeCategory === 'all'
      ? initialContent
      : initialContent.filter((item) => item.type === activeCategory);
  }, [initialContent, activeCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div className="bg-[#121212] text-white min-h-screen">
      <HeroSection initialContent={[]} />
      <motion.main className="container mx-auto px-4">
        <FeaturedSection content={featuredWriting as FeaturedWriting} />
        <CategoryTiles />
        <Categories activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
        <ContentGrid content={filteredContent} />
        <NewsletterSignup />
      </motion.main>
    </motion.div>
  );
};

export default WritingPageClient;
