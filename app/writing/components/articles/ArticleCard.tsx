'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { formatDate } from './articles';
import type { Article } from './types';

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
      <div className="p-1.5">
        <article
          ref={cardRef}
          tabIndex={0}
          className="group relative p-6 backdrop-blur-sm rounded-2xl border border-white/5
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50
            flex flex-col gap-4 h-full bg-white/[0.02] hover:bg-white/[0.06]"
        >
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors">
                {article.title}
              </h2>
              {article.description && (
                <p className="text-zinc-400 text-base leading-relaxed mt-2">
                  {article.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                {article.date && (
                  <time className="tabular-nums" dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                )}
              </div>

              {article.tags?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-medium 
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
