import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export type CategoryStatus = 'coming-soon' | 'active';

export interface Category {
  title: string;
  description: string;
  slug: string;
  status: CategoryStatus;
}

export const AUDIO_CATEGORIES: readonly Category[] = [
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

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const { title, description, status, slug } = category;

  return (
    <Link href={`/audio/${slug}`} className="group relative block h-full" aria-label={title}>
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A]/50 to-[#2A2A2A]/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl border border-white/5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="flex h-full flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
            {status === 'coming-soon' && (
              <span className="text-xs text-[var(--color-text-tertiary)]">(Coming Soon)</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-text-link)]">
              View
            </span>
            <svg
              className="h-4 w-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-text-link)] transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
