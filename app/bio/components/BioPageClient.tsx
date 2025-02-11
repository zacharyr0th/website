'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { bioData } from '../lib/data';
import { Hero } from './Hero';
import { Experience } from './Experience';
import { Skills } from './Skills';
import styles from './BioPageClient.module.css';

export default function BioPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-16">
        <div 
          className={`mx-auto space-y-6 ${styles.fadeIn}`}
          style={{ maxWidth: 'var(--article-width)' }}
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
        </div>
      </main>
    </div>
  );
} 