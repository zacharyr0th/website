'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import { Theme } from '@/lib/types';
import Footer from '../components/common/Footer';
import { VISIBLE_PROJECTS } from '@/lib/constants';

const categories = [
  { title: 'Recordings', description: 'Full discography', slug: 'recordings' },
  { title: 'Compositions', description: 'Originals', slug: 'compositions' },
  { title: 'Theory', description: 'Mainly exploratory', slug: 'theory' },
  { title: 'Sheet Music', description: 'Useful notation', slug: 'sheet-music' },
  { title: 'Datasets', description: 'With many usecases', slug: 'datasets' },
  { title: 'Archive', description: 'History', slug: 'archive' },
];

const CategoryCard = memo(
  ({
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
      <Link href={`/music/${category.slug}`} className="block">
        <motion.div className="bg-inherit rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:bg-[#242424]">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">{category.title}</h2>
            <p className="text-text-secondary mb-4">{category.description}</p>
            <div className="text-accent hover:text-accent/80 inline-flex items-center">
              View All
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"></div>
        </motion.div>
      </Link>
    </motion.div>
  )
);

CategoryCard.displayName = 'CategoryCard';

const MemoizedCategoryCard = memo(CategoryCard);
MemoizedCategoryCard.displayName = 'MemoizedCategoryCard';

const AudioPage = () => {
  const [, setTheme] = useState<Theme>('dark');

  return (
    <main className="flex flex-col w-full min-h-screen font-mono">
      <div className="flex-grow container mx-auto px-48 pt-36 pb-18 max-w-6xl">
        <Navigation setTheme={setTheme} />
        <h1 className="text-5xl font-bold mb-12 text-text-primary">Audio</h1>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
              >
                <iframe 
                  style={{ border: 0, borderRadius: '0.375rem' }}
                  width="100%"
                  height={item === 3 ? "470" : "442"}
                  src={
                    item === 1
                      ? "https://bandcamp.com/EmbeddedPlayer/track=3262928599/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
                      : item === 2
                      ? "https://bandcamp.com/EmbeddedPlayer/track=2324363469/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
                      : "https://bandcamp.com/EmbeddedPlayer/track=752272134/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
                  }
                  seamless
                  className="shadow-md hover:shadow-lg transition-shadow duration-300"
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-text-primary">Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, VISIBLE_PROJECTS).map((category, index) => (
              <MemoizedCategoryCard key={category.slug} category={category} index={index} />
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
