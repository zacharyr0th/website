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
    initial={{ y: 20 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link href={`/music/${category.slug}`} className="block">
      <motion.div 
        className="rounded-xl overflow-hidden transition-all duration-300 border"
        style={{
          backgroundColor: 'inherit',
          borderColor: 'var(--color-text-secondary)',
          boxShadow: 'var(--box-shadow)'
        }}
      >
        <div className="p-6">
          <h2 style={{ color: 'var(--color-text-primary)' }} className="text-2xl font-semi-bold mb-2">{category.title}</h2>
          <p style={{ color: 'var(--color-text-secondary)' }} className="mb-4">{category.description}</p>
          <div style={{ color: 'var(--color-accent)' }} className="inline-flex items-center">
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
));

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;