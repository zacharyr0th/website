'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { pageTransition, sectionTransition } from '../lib/animations';

const LoadingCard = () => (
  <div className="animate-pulse space-y-4">
    <div className="rounded-lg h-[120px] bg-surface/50" />
    <div className="h-4 bg-surface/50 rounded w-3/4" />
    <div className="h-4 bg-surface/50 rounded w-1/2" />
  </div>
);

const AudioPageClient = dynamic(() => import('./AudioPageClient'), {
  ssr: true,
  loading: () => (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  ),
});

export default function AudioPage() {
  return (
    <motion.div 
      className="content-page font-mono bg-gradient-to-b from-background to-surface/30"
      {...pageTransition}
    >
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36">
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto space-y-12">
          <motion.header className="mb-8" {...sectionTransition}>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-center sm:text-left">Audio</h1>
          </motion.header>

          <Suspense fallback={<LoadingCard />}>
            <motion.div {...sectionTransition}>
              <AudioPageClient />
            </motion.div>
          </Suspense>
        </div>
      </main>
    </motion.div>
  );
}
