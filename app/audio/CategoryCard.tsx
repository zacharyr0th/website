import { memo, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
  const variants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }), []);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-full h-full"
      layout
    >
      <Link href={`/audio/${category.slug}`} className="block h-full" aria-label={category.title}>
        <motion.div
          className="rounded-lg overflow-hidden transition-all duration-300 border relative group hover:bg-[var(--color-primary)] min-h-[140px] sm:h-[160px] w-full"
          style={{
            backgroundColor: 'var(--color-background)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-4 sm:p-6 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-medium text-[var(--color-text-primary)] group-hover:text-accent transition-colors">
                {category.title}
              </h2>
              <AnimatePresence>
                {category.status === 'coming-soon' && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs sm:text-sm text-[var(--color-text-secondary)]"
                  >
                    (Coming Soon)
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">{category.description}</p>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div 
            className="absolute inset-x-0 bottom-0 h-1.5 sm:h-2.5 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-b-lg" 
            style={{ 
              marginTop: '-1px',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
