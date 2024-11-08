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
    <main 
      className="flex flex-col w-full min-h-screen font-mono"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="flex-grow container mx-auto px-48 pt-36 pb-18 max-w-4xl">
        <Navigation setTheme={setTheme} />
        <h1 style={{ color: 'var(--color-text-primary)' }} className="text-5xl font-bold mb-12">Audio</h1>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
              >
                <iframe 
                  style={{ 
                    border: 0, 
                    borderRadius: 'var(--border-radius-md)',
                    boxShadow: 'var(--box-shadow)'
                  }}
                  width="100%"
                  height="392"
                  src={`https://bandcamp.com/EmbeddedPlayer/track=${
                    item === 1 ? "3262928599" : 
                    item === 2 ? "2324363469" : 
                    "752272134"
                  }/size=large/bgcol=${encodeURIComponent('var(--color-surface)')}/linkcol=${encodeURIComponent('var(--color-accent)')}/tracklist=false/transparent=true/`}
                  seamless
                  className="transition-shadow duration-300 hover:shadow-lg"
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 style={{ color: 'var(--color-text-primary)' }} className="text-3xl font-bold mb-8">Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, CONFIG.visibleProjects).map((category, index) => (
              <CategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

AudioPage.displayName = 'AudioPage';

export default AudioPage;
