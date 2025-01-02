'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePageLoadTracking } from '../lib/monitoring/performance';

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
  usePageLoadTracking();

  return (
    <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-24 sm:pt-36">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">Audio</h1>
          </header>

          <Suspense fallback={<LoadingCard />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AudioPageClient />
            </motion.div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
