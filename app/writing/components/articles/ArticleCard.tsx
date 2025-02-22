'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { formatDate } from './articles';
import type { Article } from './types';
import { cn } from '@/lib';

interface ArticleCardProps {
  article: Article;
  isFocused?: boolean;
}

const ArticleCard = memo<ArticleCardProps>(({ article, isFocused }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.focus();
    }
  }, [isFocused]);

  return (
    <Link href={`/writing/${article.slug}`} className="block">
      <div className="p-1.5 group/card">
        <article
          ref={cardRef}
          tabIndex={0}
          className={cn(
            'group relative p-3 sm:p-4 backdrop-blur-sm rounded-2xl border border-white/5',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent/50',
            'flex flex-col justify-between',
            'bg-white/[0.02] hover:bg-white/[0.06]',
            'h-[130px] sm:h-[140px]'
          )}
        >
          <div className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-mono font-medium text-white group-hover/card:text-accent transition-colors line-clamp-1 tracking-tight">
              {article.title}
            </h2>
            {article.description && (
              <p className="text-base text-white/70 leading-normal line-clamp-2 mt-4 mb-1 font-mono">
                {article.description}
              </p>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                {article.date && (
                  <time className="tabular-nums text-sm" dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                )}
              </div>

              {article.tags?.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 text-sm font-medium 
                        bg-white/5 text-zinc-400 rounded-md transition-colors hover:bg-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
