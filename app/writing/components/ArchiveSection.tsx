'use client';

import React, { memo, useMemo } from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface ArchiveSectionProps {
  articles: Article[];
}

export const ArchiveSection = memo<ArchiveSectionProps>(({ articles }) => {
  const archiveArticles = useMemo(() => articles.slice(1), [articles]);
  
  if (archiveArticles.length === 0) return null;

  return (
    <section className="space-y-8" aria-labelledby="archive-heading">
      <h2 id="archive-heading" className="text-3xl font-bold">Archive</h2>
      <div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Archive articles grid"
      >
        {archiveArticles.map((article) => (
          <div key={article.slug} role="listitem">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
});

ArchiveSection.displayName = 'ArchiveSection';
