'use client';

/**
 * ArticleCard component
 * Displays a preview card for a single article
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn, formatDate } from '@/lib';
import type { Article } from './types';

interface ArticleCardProps {
  article: Article;
  isFocused?: boolean;
}

export const ArticleCard = ({ article, isFocused }: ArticleCardProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.focus();
    }
  }, [isFocused]);

  return (
    <Link href={article.link} className="group relative block h-full">
      <motion.article
        ref={cardRef}
        tabIndex={0}
        className={cn(
          'relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A]/50 to-[#2A2A2A]/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl border border-white/5',
          'focus:outline-none focus:ring-2 focus:ring-accent/50'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ willChange: 'transform, opacity', contain: 'layout style paint' }}
      >
        <div className="flex h-full flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] group-hover:text-accent transition-colors">
              {article.title}
            </h2>
            <p className="text-base text-[var(--color-text-secondary)]">{article.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <time
              dateTime={article.date}
              className="text-sm font-mono text-[var(--color-text-secondary)]"
            >
              {formatDate(article.date)}
            </time>
            {article.category && (
              <span className="ml-auto inline-flex items-center px-3 py-1 text-sm font-sans text-[var(--color-text-secondary)] bg-[rgba(255,255,255,0.1)] rounded-xl">
                {article.category}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
};
