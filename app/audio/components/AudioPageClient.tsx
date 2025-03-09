'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import AudioPlayer from './audio-player/AudioPlayer';
import AudioGrid from './AudioGrid';
import { type Category } from './CategoryCard';

interface AudioPageClientProps {
  readonly containerVariants: Variants;
}

const AUDIO_CATEGORIES: readonly Category[] = [
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

export default function AudioPageClient({ containerVariants }: AudioPageClientProps) {
  return (
    <motion.div variants={containerVariants}>
      <div className="mb-16 sm:mb-24">
        <AudioPlayer />
      </div>
      <AudioGrid categories={AUDIO_CATEGORIES} />
    </motion.div>
  );
}
