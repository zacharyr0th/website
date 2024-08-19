'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TheoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-4">Music Theory</h1>
      <p>
        Welcome to the Music Theory section. Here you can find resources and information about music
        theory.
      </p>
      {/* Add more content specific to music theory */}
    </motion.div>
  );
}
