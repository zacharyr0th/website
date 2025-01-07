'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArchiveSectionProps } from '../types';
import { ArticleCard } from './ArticleCard';
import clsx from 'clsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const ArchiveSection = memo<ArchiveSectionProps>(({ articles }) => {
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const articleRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Sort articles by date
  const sortedArticles = React.useMemo(() => {
    if (!articles || articles.length === 0) return [];
    return [...articles].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [articles]);

  React.useEffect(() => {
    setFocusedIndex(0); // Reset focus when articles change
  }, [articles]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        const numArticles = sortedArticles.length;
        let newIndex = focusedIndex;

        switch (e.key) {
          case 'ArrowUp':
            newIndex = Math.max(0, focusedIndex - 1);
            break;
          case 'ArrowDown':
            newIndex = Math.min(numArticles - 1, focusedIndex + 1);
            break;
        }

        if (newIndex !== focusedIndex) {
          setFocusedIndex(newIndex);
          // Scroll the article into view with a smooth animation
          articleRefs.current[newIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, sortedArticles.length]);

  if (sortedArticles.length === 0) return null;

  return (
    <motion.section 
      className="w-full" 
      aria-labelledby="writing-heading"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div 
        role="list"
        aria-label="Articles list"
      >
        {sortedArticles.map((article, index) => (
          <motion.div 
            key={article.slug} 
            role="listitem"
            variants={itemVariants}
            className={clsx(index !== 0 && "border-t border-zinc-800/50")}
            ref={(el) => {
              articleRefs.current[index] = el;
              return undefined;
            }}
          >
            <ArticleCard 
              article={article} 
              isFocused={index === focusedIndex}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
});

ArchiveSection.displayName = 'ArchiveSection';
