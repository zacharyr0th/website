'use client';

import React, { Suspense, memo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { sectionTransition } from '../lib/animations';
import PageHeader from '../components/PageHeader';

// Extract loading components to a separate file
const LoadingComponents = {
  Skeleton: memo(() => (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-surface/50 rounded-lg w-3/4" />
      <div className="h-4 bg-surface/50 rounded w-1/2" />
    </div>
  )),
  AudioPlayer: memo(() => (
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
  )),
  Card: memo(() => (
    <div className="animate-pulse space-y-4">
      <div className="rounded-lg h-[120px] bg-surface/50" />
      <div className="h-4 bg-surface/50 rounded w-3/4" />
      <div className="h-4 bg-surface/50 rounded w-1/2" />
    </div>
  )),
  Grid: memo(() => (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <LoadingComponents.Card key={i} />
      ))}
    </div>
  )),
};

Object.entries(LoadingComponents).forEach(([name, component]) => {
  component.displayName = name;
});

// Dynamically import components with custom loading states
const AudioPageClient = dynamic(() => import('./AudioPageClient'), {
  ssr: true,
  loading: () => (
    <div className="space-y-12">
      <LoadingComponents.AudioPlayer />
      <LoadingComponents.Grid />
    </div>
  ),
});

// Extract container component with performance optimizations
const PageContainer = memo<{ children: React.ReactNode }>(({ children }) => (
  <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30 min-h-[100dvh]">
    <main className="container mx-auto px-4 sm:px-8 pt-16 pb-safe sm:pt-24 sm:pb-16">
      <div 
        style={{ 
          maxWidth: 'var(--article-width)',
          willChange: 'transform',
          contain: 'layout style paint',
        }} 
        className="mx-auto space-y-8 sm:space-y-12"
      >
        {children}
      </div>
    </main>
  </div>
));

PageContainer.displayName = 'PageContainer';

// Extract content component with optimized suspense boundaries
const AudioContent = memo(() => (
  <Suspense fallback={<LoadingComponents.AudioPlayer />}>
    <motion.div 
      {...sectionTransition}
      style={{ 
        willChange: 'transform, opacity',
        contain: 'layout style paint',
      }}
    >
      <AudioPageClient />
    </motion.div>
  </Suspense>
));

AudioContent.displayName = 'AudioContent';

// Optimize the main page component
const AudioPage = memo(function AudioPage() {
  return (
    <PageContainer>
      <Suspense fallback={<LoadingComponents.Skeleton />}>
        <PageHeader title="Audio" />
      </Suspense>
      <AudioContent />
    </PageContainer>
  );
});

AudioPage.displayName = 'AudioPage';

export default AudioPage;
