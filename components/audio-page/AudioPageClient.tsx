'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import TrackPlayer from './audio-player/TrackPlayer';
import CategoryCard, { AUDIO_CATEGORIES } from './CategoryCard';

interface AudioPageClientProps {
  readonly containerVariants: Variants;
}

export default function AudioPageClient({ containerVariants }: AudioPageClientProps) {
  return (
    <motion.div variants={containerVariants}>
      <div className="mb-16 sm:mb-24">
        <TrackPlayer />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AUDIO_CATEGORIES.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
