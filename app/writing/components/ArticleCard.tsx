'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import type { Article } from '../types';
import { formatDate } from '../lib/utils';

interface ArticleCardProps {
  article: Article;
  isFocused: boolean;
}

export const ArticleCard = memo<ArticleCardProps>(({ article, isFocused }) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const isFeatured = article.frontmatter.featured;

  React.useEffect(() => {
    if (isFocused && linkRef.current) {
      linkRef.current.focus();
    }
  }, [isFocused]);

  return (
    <Link
      ref={linkRef}
      href={article.link || '#'}
      className={`block transition-all duration-200 ease-in-out will-change-transform outline-none ${
        isFocused ? 'scale-[1.02]' : 'hover:scale-[1.02]'
      } ${isFeatured ? 'bg-amber-500/[0.02]' : ''}`}
      aria-label={`Read article: ${article.title || 'Untitled Article'}`}
      role="listitem"
      tabIndex={0}
    >
      <article
        className={`flex flex-col justify-between p-4 sm:p-6 group rounded-xl transition-all duration-200 ${
          isFocused ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/50 bg-inherit'
        }`}
      >
        <div className="space-y-3">
          <div>
            <h2
              className={`text-xl sm:text-2xl font-semibold transition-colors ${
                isFocused ? 'text-accent' : 'text-zinc-100 group-hover:text-accent'
              }`}
            >
              {article.title || 'Untitled Article'}
            </h2>
            {article.description && (
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mt-2 line-clamp-2">
                {article.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              {article.date && (
                <time className="tabular-nums text-sm" dateTime={article.date}>
                  {formatDate(article.date)}
                </time>
              )}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-white/5 text-zinc-400 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
});

ArticleCard.displayName = 'ArticleCard';
