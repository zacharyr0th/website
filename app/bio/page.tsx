'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';

export default function BioPage() {
  return (
    <div className="content-page font-mono min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto">
          <Hero />
          <motion.div
            className="space-y-8 md:space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <About />
            <Experience />
            <Skills />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
