'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowsRotate } from 'react-icons/fa6';
import { Article } from '@/app/writing/types';
import { ArticleCard } from './ArticleCard';

const ArticleImage = React.memo<{ image: Article['image']; className?: string; sizes?: string }>(
  ({ image, className, sizes }) => {
    if (!image) return null;

    return (
      <div className={`relative rounded-lg overflow-hidden ${className || ''}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
          priority
        />
      </div>
    );
  }
);

ArticleImage.displayName = 'ArticleImage';

const FeaturedArticle = React.memo<{ article: Article }>(({ article }) => (
  <Link
    href={article.link || '#'}
    className="group relative flex flex-col h-[500px] p-6 rounded-2xl bg-surface/50 hover:bg-surface transition-colors"
  >
    {article.image && <ArticleImage image={article.image} className="flex-1" />}

    <div className="flex flex-col gap-2 mt-4">
      <h2 className="text-2xl font-semibold group-hover:text-accent transition-colors">
        {article.title}
      </h2>
      {article.description && <p className="text-text-secondary">{article.description}</p>}
    </div>
  </Link>
));

FeaturedArticle.displayName = 'FeaturedArticle';

const RandomArticleItem = React.memo<{ article: Article }>(({ article }) => (
  <Link
    href={article.link || '#'}
    className="flex gap-5 p-4 rounded-2xl hover:bg-surface transition-colors group items-center"
  >
    {article.image && (
      <ArticleImage image={article.image} className="w-[84px] h-[84px] shrink-0" sizes="84px" />
    )}
    <div className="flex flex-col flex-1">
      <h3 className="text-lg font-medium leading-tight group-hover:text-accent transition-colors -mt-1">
        {article.title}
      </h3>
      {article.description && (
        <p className="text-base text-text-secondary line-clamp-2 leading-normal mt-1.5">
          {article.description}
        </p>
      )}
    </div>
  </Link>
));

RandomArticleItem.displayName = 'RandomArticleItem';

const RandomSelection = React.memo<{ articles: Article[]; onRefresh: () => void }>(
  ({ articles, onRefresh }) => {
    return (
      <div className="flex flex-col h-[500px]">
        <div className="flex items-center justify-between h-[48px] mb-8">
          <h2 className="text-3xl font-semibold">Random Selection</h2>
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg bg-surface hover:bg-surface/80 hover:text-accent transition-all"
            aria-label="Refresh random articles"
          >
            <FaArrowsRotate className="w-5 h-5" />
          </button>
        </div>
        <div className="grid gap-4 flex-1 overflow-y-auto">
          {articles.map((article) => (
            <RandomArticleItem key={article.slug} article={article} />
          ))}
        </div>
      </div>
    );
  }
);

RandomSelection.displayName = 'RandomSelection';

// Stable sort for initial render
const getInitialArticles = (articles: Article[], featured: Article, count: number) => {
  return articles.filter((article) => article.slug !== featured.slug).slice(0, count);
};

// Random sort for client-side refresh
const getRandomArticles = (articles: Article[], featured: Article, count: number) => {
  return articles
    .filter((article) => article.slug !== featured.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

export const Hero: React.FC<{ articles: Article[] }> = React.memo(({ articles }) => {
  const featured = articles[0];

  const featuredArticles = React.useMemo(
    () => articles.filter((article) => article.frontmatter.featured),
    [articles]
  );

  const [randomArticles, setRandomArticles] = useState(() =>
    featured ? getInitialArticles(articles, featured, 3) : []
  );

  const handleRefresh = useCallback(() => {
    if (featured) {
      setRandomArticles(getRandomArticles(articles, featured, 3));
    }
  }, [articles, featured]);

  if (!featured) return null;

  return (
    <>
      <section className="mt-0">
        <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr] h-[55vh]">
          <FeaturedArticle article={featured} />
          <RandomSelection articles={randomArticles} onRefresh={handleRefresh} />
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-8">Featured</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </>
  );
});

Hero.displayName = 'Hero';
