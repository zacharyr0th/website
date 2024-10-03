'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DatasetsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-4">Audio Datasets</h1>
      <p>Access and explore our collection of audio datasets for research and analysis.</p>
      {/* Add content specific to audio datasets */}
    </motion.div>
  );
}
