'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import { Theme } from '@/lib/types';
import Footer from '../components/common/Footer';
import { CONFIG } from '@/lib/constants';
import CategoryCard from './CategoryCard';

const categories = [
  { title: 'Recordings', description: 'Full discography', slug: 'recordings' },
  { title: 'Compositions', description: 'Originals', slug: 'compositions' },
  { title: 'Theory', description: 'Mainly exploratory', slug: 'theory' },
  { title: 'Sheet Music', description: 'Useful notation', slug: 'sheet-music' },
  { title: 'Datasets', description: 'With many usecases', slug: 'datasets' },
  { title: 'Archive', description: 'History', slug: 'archive' },
];

const AudioPage = () => {
  const [, setTheme] = useState<Theme>('dark');

  return (
    <motion.main
      className="flex flex-col w-full min-h-screen font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-36 pb-8 md:pb-18 max-w-5xl">
        <Navigation setTheme={setTheme} />
        <motion.h1
          style={{ color: 'var(--color-text-primary)' }}
          className="text-3xl md:text-5xl font-bold mb-12 text-text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Audio
        </motion.h1>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="w-full"
              >
                <iframe
                  style={{
                    border: 0,
                    borderRadius: '12px',
                    boxShadow: 'var(--box-shadow)',
                  }}
                  width="100%"
                  height="250"
                  src={`https://bandcamp.com/EmbeddedPlayer/track=${
                    item === 1 ? '3262928599' : item === 2 ? '2324363469' : '3766185999'
                  }/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/artwork=large/`}
                  seamless
                  className="transition-all duration-300 hover:shadow-lg"
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12 md:mb-18">
          <h2
            style={{ color: 'var(--color-text-primary)' }}
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {categories.slice(0, CONFIG.visibleProjects).map((category, index) => (
              <CategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </motion.main>
  );
};

AudioPage.displayName = 'AudioPage';

export default AudioPage;
