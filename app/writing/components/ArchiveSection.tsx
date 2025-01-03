'use client';

import React, { memo, useMemo } from 'react';
import { ArchiveSectionProps } from '../types';
import { ArticleCard } from './ArticleCard';

export const ArchiveSection = memo<ArchiveSectionProps>(({ articles }) => {
  const archiveArticles = useMemo(() => articles.slice(1), [articles]);
  
  if (archiveArticles.length === 0) return null;

  return (
    <section className="space-y-8" aria-labelledby="archive-heading">
      <div className="flex items-baseline justify-between">
        <h2 
          id="archive-heading" 
          className="text-3xl font-bold text-text-primary heading-responsive"
        >
          Archive
        </h2>
        <span className="text-text-secondary text-sm">
          {archiveArticles.length} articles
        </span>
      </div>
      <div 
        className="grid-responsive"
        role="list"
        aria-label="Archive articles grid"
      >
        {archiveArticles.map((article) => (
          <div 
            key={article.slug} 
            role="listitem" 
            className="transform transition-base"
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
});

ArchiveSection.displayName = 'ArchiveSection';
