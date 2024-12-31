import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/app/lib/types/types';

export const ArticleCard = memo<{ article: Article }>(({ article }) => (
  <Link
    href={article.link || '#'}
    className="group relative flex flex-col gap-4 p-6 rounded-xl bg-surface/50 hover:bg-surface transition-colors"
  >
    {article.image && (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <Image
          src={article.image.src}
          alt={article.image.alt || ''}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>
    )}

    <div className="flex-1">
      <h2 className="text-2xl font-semibold group-hover:text-accent transition-colors">
        {article.title}
      </h2>
      {article.description && (
        <p className="mt-2 text-text-secondary line-clamp-2">{article.description}</p>
      )}
    </div>
  </Link>
));

ArticleCard.displayName = 'ArticleCard';
