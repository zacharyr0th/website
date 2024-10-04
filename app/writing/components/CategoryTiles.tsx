import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define the category type
type Category = {
  title: string;
  description: string;
  link: string;
};

// Move categories outside the component to avoid re-creation on each render
const categories: Category[] = [
  { title: 'Articles', description: 'Tech & Finance', link: '/writing/articles' },
  { title: 'Reviews', description: 'Books & Products', link: '/writing/reviews' },
  { title: 'Interviews', description: 'Founders & Builders', link: '/writing/interviews' },
];

// Separate animation variants for better reusability
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.5 + i * 0.1 },
  }),
};

const CategoryTiles: React.FC = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.4 }}
      className="py-4 pb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href={category.link}
              className="block bg-[#1a1a1a] p-8 rounded-lg shadow-lg hover:bg-[#242424] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
              <p className="text-gray-400 text-lg mb-4">{category.description}</p>
              <span className="text-blue-400 inline-flex items-center">
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
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default CategoryTiles;
