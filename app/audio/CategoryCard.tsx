import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: {
    title: string;
    description: string;
    slug: string;
    status: 'coming-soon';
  };
  index: number;
}

const CategoryCard = memo(({ category, index }: CategoryCardProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-full h-full"
    >
      <Link href={`/audio/${category.slug}`} className="block h-full" aria-label={category.title}>
        <motion.div
          className="rounded-lg overflow-hidden transition-all duration-300 border relative group hover:bg-[var(--color-primary)] min-h-[140px] sm:h-[160px] w-full"
          style={{
            backgroundColor: 'var(--color-background)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="p-4 sm:p-6 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-medium text-[var(--color-text-primary)] group-hover:text-accent transition-colors">
                {category.title}
              </h2>
              {category.status === 'coming-soon' && (
                <span className="text-xs sm:text-sm text-[var(--color-text-secondary)]">(Coming Soon)</span>
              )}
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {category.description}
            </p>
            <div className="inline-flex items-center text-accent/40 text-sm mb-4">
              Work in Progress
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300" />
        </motion.div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
