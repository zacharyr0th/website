'use client';

import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowsRotate } from 'react-icons/fa6';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

// Constants
const RANDOM_ARTICLE_COUNT = {
  mobile: 2,
  desktop: 3
} as const;
const IMAGE_SIZES = {
  featured: '(max-width: 768px) 100vw, 50vw',
  thumbnail: '84px',
} as const;

// Utility functions
const shuffleAndSlice = (articles: Article[], excludeSlug: string, count: number) =>
  articles
    .filter((article) => article.slug !== excludeSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

// Components
const ArticleImage = memo<{
  image: Article['image'];
  className?: string;
  sizes?: string;
  title: string;
}>(({ image, className = '', sizes, title }) => {
  if (!image) return null;

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-article-image ${className}`}>
      <Image
        src={image.src}
        alt={image.alt || `Featured image for article: ${title}`}
        fill
        className="object-cover hover-scale"
        sizes={sizes || IMAGE_SIZES.featured}
        priority
        quality={85}
      />
    </div>
  );
});

ArticleImage.displayName = 'ArticleImage';

const FeaturedArticle = memo<{ article: Article }>(({ article }) => {
  const imageProps = useMemo(() => ({
    image: article.image,
    title: article.title,
    sizes: IMAGE_SIZES.featured
  }), [article.image, article.title]);

  return (
    <Link
      href={article.link || '#'}
      className="interactive-card group relative flex flex-col h-[300px] sm:h-[440px] p-6 rounded-xl bg-surface transition-base hover-bounce"
      aria-label={`Read featured article: ${article.title}`}
    >
      <ArticleImage {...imageProps} className="flex-1" />
      <div className="flex flex-col gap-2 mt-4">
        <h2 className="text-2xl font-semibold text-accent transition-base">
          {article.title}
        </h2>
        {article.description && (
          <p className="text-text-secondary line-clamp-2 transition-base">
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
    className="interactive-card group relative flex gap-5 p-4 rounded-xl bg-surface/50 hover:bg-surface transition-base hover-bounce"
    aria-label={`Read article: ${article.title}`}
  >
    {article.image && (
      <div className="relative w-[84px] h-[84px] shrink-0 rounded-xl overflow-hidden shadow-article-image">
        <Image
          src={article.image.src}
          alt={article.image.alt || `Featured image for article: ${article.title}`}
          fill
          sizes={IMAGE_SIZES.thumbnail}
          className="object-cover hover-scale"
          loading="lazy"
          quality={85}
        />
      </div>
    )}
    <div className="flex flex-col flex-1 h-[84px] justify-between py-1">
      <h3 className="text-lg font-medium leading-tight text-text-primary group-hover:text-accent transition-base">
        {article.title}
      </h3>
      {article.description && (
        <p className="text-text-secondary line-clamp-2 leading-normal transition-base">
          {article.description}
        </p>
      )}
    </div>
  </Link>
));

RandomArticleItem.displayName = 'RandomArticleItem';

const RandomSelection = memo<{ articles: Article[]; onRefresh: () => void }>(
  ({ articles, onRefresh }) => (
    <div className="flex flex-col h-[300px] sm:h-[440px] mb-8 sm:mb-4">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-3xl font-semibold text-text-primary">Random Selection</h2>
        <button
          onClick={onRefresh}
          className="interactive-button p-2 rounded-lg hover:bg-surface/50 transition-base"
          aria-label="Refresh random articles list"
          title="Click to get new random articles"
        >
          <FaArrowsRotate className="w-5 h-5 text-text-secondary hover:text-accent" aria-hidden="true" />
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

export const Hero = memo<{ articles: Article[] }>(({ articles }) => {
  const featured = useMemo(() => articles[0], [articles]);
  const featuredArticles = useMemo(
    () => articles.filter((article) => article.frontmatter?.featured),
    [articles]
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [randomArticles, setRandomArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (featured) {
      setRandomArticles(shuffleAndSlice(
        articles, 
        featured.slug, 
        isMobile ? RANDOM_ARTICLE_COUNT.mobile : RANDOM_ARTICLE_COUNT.desktop
      ));
    }
  }, [articles, featured, isMobile]);

  const handleRefresh = useCallback(() => {
    if (featured) {
      setRandomArticles(shuffleAndSlice(
        articles, 
        featured.slug, 
        isMobile ? RANDOM_ARTICLE_COUNT.mobile : RANDOM_ARTICLE_COUNT.desktop
      ));
    }
  }, [articles, featured, isMobile]);

  useEffect(() => {
    handleRefresh();
  }, [isMobile, handleRefresh]);

  if (!featured) return null;

  return (
    <>
      <section 
        className="mt-0 space-y-4 sm:space-y-6"
        aria-label="Featured and random articles"
      >
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.4fr,1fr] auto-rows-auto lg:h-[480px]">
          <FeaturedArticle article={featured} />
          <RandomSelection articles={randomArticles} onRefresh={handleRefresh} />
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="mt-6 space-y-8" aria-label="Featured articles">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-text-primary heading-responsive">Featured</h2>
            <span className="text-text-secondary text-sm">
              {featuredArticles.length} articles
            </span>
          </div>
          <div 
            className="grid-responsive"
            role="list"
            aria-label="Featured articles grid"
          >
            {featuredArticles.map((article) => (
              <div 
                key={article.slug} 
                role="listitem"
                className="transform transition-base hover:-translate-y-1"
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
});

Hero.displayName = 'Hero';
