'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('./Hero'), {
  loading: () => <div className="animate-pulse h-screen bg-surface/30" />,
});

export default function ProjectsPage() {
  return (
    <motion.div
      className="content-page font-mono bg-gradient-to-b from-background to-surface/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <main className="container mx-auto px-6 sm:px-8">
        <Suspense
          fallback={
            <div className="animate-pulse bg-surface/30 flex items-center justify-center">
              Loading Content...
            </div>
          }
        >
          <Hero />
        </Suspense>
      </main>
    </motion.div>
  );
}
