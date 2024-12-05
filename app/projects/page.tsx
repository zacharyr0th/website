'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Footer from '../components/common/Footer';
import ThemeProvider from '../components/common/ThemeProvider';

export default function ProjectsPage() {
  return (
    <motion.div
      className="flex flex-col w-full min-h-screen font-mono bg-gradient-to-b from-background to-surface/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ThemeProvider>
        <Hero theme="dark" />
        <Footer />
      </ThemeProvider>
    </motion.div>
  );
}
