'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '../components/common/Footer';
import ThemeProvider from '../components/common/ThemeProvider';

// Dynamically import Hero component
const Hero = dynamic(() => import('./Hero'), {
  loading: () => <div className="animate-pulse h-screen bg-surface/30" />
});

export default function ProjectsPage() {
  return (
    <motion.div
      className="flex flex-col w-full min-h-screen font-mono bg-gradient-to-b from-background to-surface/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <ThemeProvider>
        <Suspense fallback={<div className="animate-pulse h-screen bg-surface/30" />}>
          <Hero theme="dark" />
        </Suspense>
        <Footer />
      </ThemeProvider>
    </motion.div>
  );
}
