'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';

const AUDIO_CATEGORIES = [
  {
    title: 'Recordings',
    description: 'Full discography',
    slug: 'recordings',
    status: 'coming-soon',
  },
  {
    title: 'Compositions',
    description: 'Originals',
    slug: 'compositions',
    status: 'coming-soon',
  },
  {
    title: 'Theory',
    description: 'Mainly exploratory',
    slug: 'theory',
    status: 'coming-soon',
  },
  {
    title: 'Sheet Music',
    description: 'Useful notation',
    slug: 'sheet-music',
    status: 'coming-soon',
  },
  {
    title: 'Datasets',
    description: 'With many usecases',
    slug: 'datasets',
    status: 'coming-soon',
  },
  {
    title: 'Archive',
    description: 'History',
    slug: 'archive',
    status: 'coming-soon',
  },
] as const;

const BANDCAMP_TRACKS = [{ id: '3262928599' }, { id: '2324363469' }, { id: '3766185999' }];

export default function AudioPageClient() {
  return (
    <>
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {BANDCAMP_TRACKS.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <iframe
                style={{
                  border: 0,
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-sm)',
                }}
                width="100%"
                height="250"
                src={`https://bandcamp.com/EmbeddedPlayer/track=${track.id}/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/artwork=large/`}
                seamless
                className="transition-all duration-300 hover:shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-4 sm:py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--color-text-primary)]">
          Explore
        </h2>
        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {AUDIO_CATEGORIES.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
