'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { bioData } from '../lib/data';
import { Hero } from './Hero';
import { Experience } from './Experience';
import { Skills } from './Skills';

interface BioPageClientProps {
  containerVariants: typeof import('@/lib/ui/animations').containerVariants;
}

export default function BioPageClient({ containerVariants }: BioPageClientProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <Hero data={bioData.basics} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-start -mt-4"
      >
        <Link
          href="/bio/full"
          className="group inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
        >
          View Full Bio
          <motion.svg
            className="ml-2 w-4 h-4"
            initial={false}
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </Link>
      </motion.div>
      <div className="-mt-2">
        <Experience data={bioData.experience} />
      </div>
      <div className="-mt-2">
        <Skills data={bioData.skills} />
      </div>
    </motion.div>
  );
}
