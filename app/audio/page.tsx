'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AudioVisualizer from './AudioVisualizer';

const categories = [
  { title: 'Recordings', description: 'Full discography', slug: 'recordings' },
  { title: 'Compositions', description: 'Originals', slug: 'compositions' },
  { title: 'Theory', description: 'Mainly exploratory', slug: 'theory' },
  { title: 'Sheet Music', description: 'Useful notation', slug: 'sheet-music' },
  { title: 'Datasets', description: 'With many usecases', slug: 'datasets' },
  { title: 'Archive', description: 'History', slug: 'archive' },
];

const CategoryCard = memo(({
  category,
  index,
}: {
  category: { title: string; description: string; slug: string };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link href={`/audio/${category.slug}`} className="block">
      <motion.div className="bg-inherit rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:bg-[#242424]">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">{category.title}</h2>
          <p className="text-gray-400 mb-4">{category.description}</p>
          <div className="text-blue-400 hover:text-blue-300 inline-flex items-center">
            View All
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"></div>
      </motion.div>
    </Link>
  </motion.div>
));

CategoryCard.displayName = 'CategoryCard';

const MemoizedCategoryCard = memo(CategoryCard);
MemoizedCategoryCard.displayName = 'MemoizedCategoryCard';

const AudioPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-inherit text-white min-h-screen"
    >
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 mb-2 container mx-auto px-4"
      >
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold"
        >
          Audio
        </motion.h1>
      </motion.header>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <MemoizedCategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>
      </main>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Audio Visualizer</h2>
        <AudioVisualizer />
      </section>
    </motion.div>
  );
};

AudioPage.displayName = 'AudioPage';

export default AudioPage;
