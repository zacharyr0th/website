'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowsRotate } from 'react-icons/fa6';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

// Constants
const RANDOM_ARTICLE_COUNT = 3;
const IMAGE_SIZES = {
  featured: '(max-width: 768px) 100vw, 50vw',
  thumbnail: '84px',
} as const;

const TRANSITION_CLASSES = {
  image: 'transition-transform duration-300 group-hover:scale-105',
  text: 'transition-colors duration-300',
  card: 'transition-colors duration-300',
} as const;

// Utility functions
const shuffleAndSlice = (articles: Article[], excludeSlug: string, count: number) =>
  articles
    .filter((article) => article.slug !== excludeSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

// Components
const ArticleImage = React.memo<{
  image: Article['image'];
  className?: string;
  sizes?: string;
  title: string;
}>(({ image, className = '', sizes, title }) => {
  if (!image) return null;

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={image.alt || `Featured image for article: ${title}`}
        fill
        className={TRANSITION_CLASSES.image}
        sizes={sizes || IMAGE_SIZES.featured}
        priority
        quality={85}
      />
    </div>
  );
});

ArticleImage.displayName = 'ArticleImage';

const FeaturedArticle = React.memo<{ article: Article }>(({ article }) => {
  const imageProps = useMemo(() => ({
    image: article.image,
    title: article.title,
    sizes: IMAGE_SIZES.featured
  }), [article.image, article.title]);

  return (
    <Link
      href={article.link || '#'}
      className={`interactive-card group relative flex flex-col h-[500px] p-6 rounded-2xl bg-surface peer ${TRANSITION_CLASSES.card}`}
      aria-label={`Read featured article: ${article.title}`}
    >
      <ArticleImage {...imageProps} className="flex-1" />
      <div className="flex flex-col gap-2 mt-4">
        <h2 className={`text-2xl font-semibold text-accent ${TRANSITION_CLASSES.text} group-hover:text-accent peer-hover:text-text`}>
          {article.title}
        </h2>
        {article.description && (
          <p className={`text-text-secondary line-clamp-2 ${TRANSITION_CLASSES.text}`}>
            {article.description}
          </p>
        )}
      </div>
    </Link>
  );
});

FeaturedArticle.displayName = 'FeaturedArticle';

const RandomArticleItem = memo<{ article: Article }>(({ article }) => (
  <Link
    href={article.link || '#'}
    className={`interactive-card group relative flex gap-5 p-4 rounded-2xl items-center ${TRANSITION_CLASSES.card}`}
    aria-label={`Read article: ${article.title}`}
  >
    {article.image && (
      <div className="relative w-[84px] h-[84px] shrink-0 rounded-lg overflow-hidden my-auto">
        <Image
          src={article.image.src}
          alt={article.image.alt || `Featured image for article: ${article.title}`}
          fill
          sizes={IMAGE_SIZES.thumbnail}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          quality={85}
        />
      </div>
    )}
    <div className="flex flex-col flex-1 h-[84px] justify-between py-1 my-auto">
      <h3 className={`text-lg font-medium leading-tight ${TRANSITION_CLASSES.text} group-hover:text-accent`}>
        {article.title}
      </h3>
      {article.description && (
        <p className={`text-base text-text-secondary line-clamp-2 leading-normal ${TRANSITION_CLASSES.text}`}>
          {article.description}
        </p>
      )}
    </div>
  </Link>
));

RandomArticleItem.displayName = 'RandomArticleItem';

const RandomSelection = React.memo<{ articles: Article[]; onRefresh: () => void }>(
  ({ articles, onRefresh }) => (
    <div className="flex flex-col h-[500px]">
      <div className="flex items-baseline gap-3 mt-3">
        <h2 className="text-3xl font-semibold">Random Selection</h2>
        <button
          onClick={onRefresh}
          className="interactive-button mx-auto rounded-lg hover:bg-surface/50 transition-colors"
          aria-label="Refresh random articles list"
          title="Click to get new random articles"
        >
          <FaArrowsRotate className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div 
        className="grid gap-3 flex-1 overflow-y-auto scrollbar-hide"
        role="list"
        aria-label="Random articles list"
      >
        {articles.map((article) => (
          <RandomArticleItem key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
);

RandomSelection.displayName = 'RandomSelection';

export const Hero = React.memo<{ articles: Article[] }>(({ articles }) => {
  const featured = useMemo(() => articles[0], [articles]);
  const featuredArticles = useMemo(
    () => articles.filter((article) => article.frontmatter?.featured),
    [articles]
  );

  const [randomArticles, setRandomArticles] = useState(() =>
    featured ? shuffleAndSlice(articles, featured.slug, RANDOM_ARTICLE_COUNT) : []
  );

  const handleRefresh = useCallback(() => {
    if (featured) {
      setRandomArticles(shuffleAndSlice(articles, featured.slug, RANDOM_ARTICLE_COUNT));
    }
  }, [articles, featured]);

  if (!featured) return null;

  return (
    <>
      <section 
        className="mt-0 [&_article:hover~article_.text-accent]:text-text [&_article:hover~article]:bg-surface/50" 
        aria-label="Featured and random articles"
      >
        <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr] h-[55vh]">
          <FeaturedArticle article={featured} />
          <RandomSelection articles={randomArticles} onRefresh={handleRefresh} />
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="mt-12" aria-label="Featured articles">
          <h2 className="text-3xl font-bold mb-8">Featured</h2>
          <div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Featured articles grid"
          >
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </>
  );
});

Hero.displayName = 'Hero';
