'use client';

import React, { memo, createContext, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, sectionTransition } from '../lib/animations';
import CategoryCard, { type Category } from './components/CategoryCard';
import dynamic from 'next/dynamic';

// Dynamically import AudioPlayer with custom loading state
const AudioPlayer = dynamic(() => import('./components/AudioPlayer'), {
  ssr: false, // Audio playback requires client-side only
  loading: () => (
    <div className="w-full max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-[#1A1A1A]/50 to-[#2A2A2A]/50 shadow-lg backdrop-blur-sm border border-white/5 animate-pulse">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-8 bg-surface/50 rounded-lg w-3/4" />
          <div className="h-4 bg-surface/50 rounded w-1/2" />
        </div>
        <div className="space-y-4">
          <div className="h-2 bg-surface/50 rounded-full" />
          <div className="flex justify-between">
            <div className="h-8 w-8 bg-surface/50 rounded-full" />
            <div className="h-8 w-8 bg-surface/50 rounded-full" />
            <div className="h-12 w-12 bg-surface/50 rounded-full" />
            <div className="h-8 w-8 bg-surface/50 rounded-full" />
            <div className="h-8 w-8 bg-surface/50 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  ),
});

// Extract styles to constants with performance optimizations
const STYLES = {
  grid: 'grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr',
  heading: 'text-3xl md:text-4xl font-bold mb-12 text-[var(--color-text-primary)] tracking-tight',
  container: {
    willChange: 'transform',
    contain: 'layout style paint',
  },
} as const;

// Create context for categories with memoization
const CategoriesContext = createContext<readonly Category[]>([]);

// Extract categories to a separate constant with memoization
const AUDIO_CATEGORIES = [
  {
    title: 'Recordings',
    description: 'Full discography',
    slug: 'recordings',
    status: 'coming-soon',
  },
  {
    title: 'Compositions',
    description: 'Originals',
    slug: 'compositions',
    status: 'coming-soon',
  },
  {
    title: 'Theory',
    description: 'Mainly exploratory',
    slug: 'theory',
    status: 'coming-soon',
  },
  {
    title: 'Sheet Music',
    description: 'Useful notation',
    slug: 'sheet-music',
    status: 'coming-soon',
  },
  {
    title: 'Datasets',
    description: 'With many usecases',
    slug: 'datasets',
    status: 'coming-soon',
  },
  {
    title: 'Archive',
    description: 'History',
    slug: 'archive',
    status: 'coming-soon',
  },
] as const;

// Optimize CategoryGridItem with memoization and performance attributes
const CategoryGridItem = memo<{ category: Category; index: number }>(({ category, index }) => {
  const itemTransition = useMemo(() => ({
    ...sectionTransition,
    transition: { delay: index * 0.1 },
  }), [index]);

  return (
    <motion.div 
      key={category.slug} 
      {...itemTransition}
      style={STYLES.container}
    >
      <CategoryCard category={category} index={index} />
    </motion.div>
  );
});

CategoryGridItem.displayName = 'CategoryGridItem';

// Optimize CategoryGrid with context and memoization
const CategoryGrid = memo(function CategoryGrid() {
  const categories = useContext(CategoriesContext);
  
  const gridItems = useMemo(() => 
    categories.map((category, index) => (
      <CategoryGridItem key={category.slug} category={category} index={index} />
    )),
    [categories]
  );
  
  return (
    <motion.div 
      className={STYLES.grid} 
      {...pageTransition}
      style={STYLES.container}
    >
      {gridItems}
    </motion.div>
  );
});

CategoryGrid.displayName = 'CategoryGrid';

// Optimize ExploreSection with memoization
const ExploreSection = memo(() => {
  return (
    <motion.section 
      className="py-4 sm:py-8 mb-16" 
      {...sectionTransition}
      style={STYLES.container}
      role="region"
      aria-label="explore section"
    >
      <h2 className={STYLES.heading}>Explore</h2>
      <CategoryGrid />
    </motion.section>
  );
});

ExploreSection.displayName = 'ExploreSection';

// Optimize AudioPlayerSection with memoization
const AudioPlayerSection = memo(() => (
  <motion.section 
    className="mb-14" 
    {...sectionTransition}
    style={STYLES.container}
    role="region"
    aria-label="audio player section"
  >
    <AudioPlayer />
  </motion.section>
));

AudioPlayerSection.displayName = 'AudioPlayerSection';

// Optimize the main component with context provider and memoization
const AudioPageClient = memo(function AudioPageClient() {
  // Memoize the categories value to prevent unnecessary re-renders
  const categoriesValue = useMemo(() => AUDIO_CATEGORIES, []);

  return (
    <CategoriesContext.Provider value={categoriesValue}>
      <AudioPlayerSection />
      <ExploreSection />
    </CategoriesContext.Provider>
  );
});

AudioPageClient.displayName = 'AudioPageClient';

export default AudioPageClient;
