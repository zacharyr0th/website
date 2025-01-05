'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { Article } from '../types';

export const ArticleCard = memo<{ article: Article }>(({ article }) => {
  const isFeatured = article.frontmatter.featured;
  
  return (
    <Link
      href={article.link || '#'}
      className={`block px-[var(--spacing-sm)] py-[var(--spacing-md)] hover:bg-zinc-800/50 transition-all duration-[var(--transition-speed)] group ${
        isFeatured ? 'bg-amber-500/[0.02]' : ''
      }`}
      aria-label={`Read article: ${article.title || 'Untitled Article'}`}
    >
      <article>
        <header>
          <h2 className="text-sm font-medium text-[var(--color-text-secondary)] !mt-0 !mb-0">
            {article.title || 'Untitled Article'}
          </h2>
          {article.description && (
            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
              {article.description}
            </p>
          )}
        </header>

        <footer className="flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            {article.date && (
              <time 
                className="tabular-nums" 
                dateTime={article.date}
              >
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            )}
            {article.category && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-zinc-400">
                  {article.category}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isFeatured && (
              <span className="text-amber-500/90 font-medium">
                Featured
              </span>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2 text-zinc-500">
                {isFeatured && <span className="w-1 h-1 rounded-full bg-zinc-700" />}
                {article.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    <span className="text-zinc-500">
                      {tag}
                    </span>
                    {i < article.tags!.length - 1 && (
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </footer>
      </article>
    </Link>
  );
});

ArticleCard.displayName = 'ArticleCard';
