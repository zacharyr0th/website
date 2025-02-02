'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';

interface AudioPageLayoutProps {
  children: React.ReactNode;
}

export default function AudioPageLayout({ children }: AudioPageLayoutProps) {
  return (
    <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36">
        <motion.div 
          {...pageTransition}
          style={{ 
            maxWidth: 'var(--article-width)',
            willChange: 'transform',
            contain: 'layout style paint',
          }} 
          className="mx-auto space-y-12"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
} 