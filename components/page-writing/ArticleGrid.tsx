import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-text-secondary"
      >
        No articles found.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/writing/${article.slug}`}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-surface rounded-lg shadow-md p-6 h-full flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-text-secondary mb-4 flex-grow">{article.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-accent">{article.category}</span>
                <span className="text-sm text-text-secondary">{article.date}</span>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ArticleGrid;
