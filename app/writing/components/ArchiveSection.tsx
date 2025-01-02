'use client';

import React, { memo } from 'react';
import { Article } from '@/app/writing/types';
import { ArticleCard } from './ArticleCard';

interface ArchiveSectionProps {
  articles: Article[];
}

export const ArchiveSection = memo<ArchiveSectionProps>(({ articles }) => {
  const archiveArticles = articles.slice(1);
  if (archiveArticles.length === 0) return null;

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold">Archive</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {archiveArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
});

ArchiveSection.displayName = 'ArchiveSection';
