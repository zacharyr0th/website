'use client';

import React, { memo } from 'react';
import { ArchiveSectionProps } from '../types';
import { ArticleCard } from './ArticleCard';

export const ArchiveSection = memo<ArchiveSectionProps>(({ articles }) => {
  // Sort articles by date
  const sortedArticles = React.useMemo(() => {
    if (!articles || articles.length === 0) return [];
    return [...articles].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [articles]);

  if (sortedArticles.length === 0) return null;

  return (
    <section 
      className="max-w-3xl mx-auto" 
      aria-labelledby="writing-heading"
    >
      <div 
        className="divide-y divide-[var(--color-surface)]"
        role="list"
        aria-label="Articles list"
      >
        {sortedArticles.map((article) => (
          <div 
            key={article.slug} 
            role="listitem"
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
});

ArchiveSection.displayName = 'ArchiveSection';
