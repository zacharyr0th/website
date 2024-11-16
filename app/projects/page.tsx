'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import { Theme } from '@/lib/types';

import Hero from '../components/page-projects/Hero';
import Footer from '../components/common/Footer';

export default function ProjectsPage() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <motion.main 
      className="flex flex-col w-full min-h-screen font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation setTheme={setTheme} />
      <motion.div 
        className="flex-grow px-2 sm:px-6 md:px-8 py-4 sm:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Hero theme={theme} setTheme={setTheme} />
      </motion.div>
      <Footer />
    </motion.main>
  );
}
