import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: {
    title: string;
    description: string;
    slug: string;
  };
  index: number;
}

const CategoryCard = memo(({ category, index }: CategoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="w-full h-full"
  >
    <Link href={`/music/${category.slug}`} className="block h-full">
      <motion.div
        className="rounded-lg overflow-hidden transition-all duration-300 border relative group hover:bg-[var(--color-primary)] h-[120px] w-full"
        style={{
          backgroundColor: 'var(--color-background)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-baseline mb-2">
            <h2 className="text-xl font-medium text-[var(--color-text-primary)] group-hover:text-accent transition-colors">
              {category.title}
            </h2>
            <span className="ml-2 text-sm text-[var(--color-text-secondary)]">(Coming Soon)</span>
          </div>
          <p className="mb-auto text-[var(--color-text-secondary)] text-sm">{category.description}</p>
          <div className="inline-flex items-center text-accent opacity-60 cursor-not-allowed">
            Work in Progress
            <svg
              className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"></div>
      </motion.div>
    </Link>
  </motion.div>
));

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
