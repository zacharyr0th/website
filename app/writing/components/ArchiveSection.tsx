'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { ArchiveSectionProps } from './articles/types';
import ArticleCard from './articles/ArticleCard';
import clsx from 'clsx';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

export const ArchiveSection = memo<ArchiveSectionProps>(({ articles }) => {
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const articleRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  const setArticleRef = React.useCallback((element: HTMLDivElement | null, slug: string) => {
    if (element) {
      articleRefs.current.set(slug, element);
    } else {
      articleRefs.current.delete(slug);
    }
  }, []);

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
    window.scrollTo(0, 0);
    setFocusedIndex(0);
  }, [articles]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();

        const numArticles = sortedArticles.length;
        let newIndex = focusedIndex;

        switch (e.key) {
          case 'ArrowUp':
            newIndex = focusedIndex - 1;
            break;
          case 'ArrowDown':
            newIndex = focusedIndex + 1;
            break;
        }

        if (newIndex >= 0 && newIndex < numArticles) {
          setFocusedIndex(newIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, sortedArticles.length]);

  if (!articles || articles.length === 0) return null;

  return (
    <>
      {sortedArticles.map((article, index) => (
        <motion.div
          key={article.slug}
          variants={itemVariants}
          className={clsx(index !== 0 && 'border-t border-zinc-800/50')}
          ref={(el) => setArticleRef(el, article.slug)}
        >
          <ArticleCard article={article} isFocused={index === focusedIndex} />
        </motion.div>
      ))}
    </>
  );
});

ArchiveSection.displayName = 'ArchiveSection';
