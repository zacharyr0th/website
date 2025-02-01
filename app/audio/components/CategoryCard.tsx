import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export type CategoryStatus = 'coming-soon' | 'active';

export interface Category {
  title: string;
  description: string;
  slug: string;
  status: CategoryStatus;
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

// Memoize static styles
const ANIMATION_CONFIG = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 },
} as const;

// Memoize container styles
const CONTAINER_STYLES = {
  willChange: 'transform, opacity',
  contain: 'layout style paint',
} as const;

// Extract StatusBadge component for better performance
const StatusBadge = memo<{ status: CategoryStatus }>(({ status }) => (
  <AnimatePresence>
    {status === 'coming-soon' && (
      <motion.span
        {...ANIMATION_CONFIG}
        className="px-2 py-1 text-xs rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)]"
      >
        Coming Soon
      </motion.span>
    )}
  </AnimatePresence>
));

StatusBadge.displayName = 'StatusBadge';

// Extract CategoryTitle component with optimized animations
const CategoryTitle = memo<{ title: string }>(({ title }) => {
  const titleAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }), []);

  return (
    <motion.h2 
      {...titleAnimation}
      className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-primary)] group-hover:from-[var(--color-primary)] group-hover:to-accent transition-all duration-300"
    >
      {title}
    </motion.h2>
  );
});

CategoryTitle.displayName = 'CategoryTitle';

// Extract CategoryDescription component with optimized animations
const CategoryDescription = memo<{ description: string }>(({ description }) => {
  const descriptionAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.1 },
  }), []);

  return (
    <motion.p 
      {...descriptionAnimation}
      className="text-sm text-[var(--color-text-secondary)] mb-4 flex-grow"
    >
      {description}
    </motion.p>
  );
});

CategoryDescription.displayName = 'CategoryDescription';

// Extract ExploreLink component with optimized animations
const ExploreLink = memo(() => {
  const linkAnimation = useMemo(() => ({
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, delay: 0.2 },
  }), []);

  return (
    <motion.div 
      {...linkAnimation}
      className="flex items-center text-sm text-[var(--color-text-secondary)] group-hover:text-accent transition-colors duration-300"
    >
      <span className="mr-2">Explore</span>
      <svg
        className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: 'transform' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </motion.div>
  );
});

ExploreLink.displayName = 'ExploreLink';

// Extract CategoryContent component for better performance
const CategoryContent = memo<{ category: Category; index: number }>(({ category, index }) => {
  const { title, description, status } = category;

  return (
    <div className="flex h-full flex-col justify-between space-y-4">
      <div className="space-y-2">
        <motion.h3
          className="text-lg font-semibold text-[var(--color-text-primary)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm text-[var(--color-text-secondary)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.1 }}
        >
          {description}
        </motion.p>
        {status === 'coming-soon' && (
          <motion.span
            className="text-xs text-[var(--color-text-tertiary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            (Coming Soon)
          </motion.span>
        )}
      </div>
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <motion.span
          className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-text-link)]"
          whileHover={{ x: 4 }}
        >
          View
        </motion.span>
        <motion.svg
          className="h-4 w-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-text-link)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          whileHover={{ x: 4 }}
          aria-hidden="true"
          style={{ willChange: 'transform' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
});

CategoryContent.displayName = 'CategoryContent';

const CategoryCard = memo<CategoryCardProps>(({ category, index }) => {
  return (
    <Link
      href={`/audio/${category.slug}`}
      className="group relative block h-full"
      aria-label={category.title}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A]/50 to-[#2A2A2A]/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl border border-white/5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={CONTAINER_STYLES}
      >
        <CategoryContent category={category} index={index} />
      </motion.div>
    </Link>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard; 