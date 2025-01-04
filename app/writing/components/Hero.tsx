'use client';

import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowsRotate } from 'react-icons/fa6';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';
import debounce from 'lodash/debounce';

// Constants
const BREAKPOINT_MOBILE = 640;
const RANDOM_ARTICLE_COUNT = {
  mobile: 2,
  desktop: 3
} as const;

// Consolidated image sizes
const IMAGE_SIZES = {
  featured: '(max-width: 768px) 100vw, 50vw',
  thumbnail: '84px',
  card: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
} as const;

// Move utility functions to a separate utils file
const shuffleAndSlice = (articles: Article[], excludeSlug: string, count: number) => {
  const filtered = articles.filter(article => article.slug !== excludeSlug);
  const result = [...filtered];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i]!;
    result[i] = result[j]!;
    result[j] = temp;
  }
  return result.slice(0, count);
};

// Components
const ArticleImage = memo<{
  image: Article['image'];
  className?: string;
  sizes?: string;
  title: string;
}>(({ image, className = '', sizes, title }) => {
  if (!image) return null;

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-article-image ${className}`}>
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
      className="interactive-card group relative flex flex-col h-[250px] sm:h-[300px] md:h-[440px] p-4 sm:p-6 rounded-xl bg-surface transition-base transform hover:-translate-y-2 origin-bottom"
      aria-label={`Read featured article: ${article.title}`}
    >
      <ArticleImage {...imageProps} className="flex-1" />
      <div className="flex flex-col gap-1 sm:gap-2 mt-3 sm:mt-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-accent transition-base">
          {article.title}
        </h2>
        {article.description && (
          <p className="text-sm sm:text-base text-text-secondary line-clamp-2 transition-base">
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
    className="interactive-card group relative flex gap-3 sm:gap-5 p-3 sm:p-4 rounded-xl bg-surface/50 hover:bg-surface transition-base hover-bounce"
    aria-label={`Read article: ${article.title}`}
  >
    {article.image && (
      <div className="relative w-[70px] h-[70px] sm:w-[84px] sm:h-[84px] shrink-0 rounded-xl overflow-hidden shadow-article-image">
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
    <div className="flex flex-col flex-1 h-[70px] sm:h-[84px] justify-between py-0.5 sm:py-1 min-w-0">
      <h3 className="text-base sm:text-lg font-medium leading-tight text-text-primary group-hover:text-accent transition-base truncate">
        {article.title}
      </h3>
      {article.description && (
        <p className="text-sm text-text-secondary line-clamp-2 leading-normal transition-base break-words">
          {article.description}
        </p>
      )}
    </div>
  </Link>
));

RandomArticleItem.displayName = 'RandomArticleItem';

const RandomSelection = memo<{ articles: Article[]; onRefresh: () => void }>(
  ({ articles, onRefresh }) => (
    <div className="flex flex-col h-[250px] sm:h-[300px] md:h-[440px] mb-4">
      <div className="flex items-baseline justify-between mb-2 sm:mb-3">
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">Random Selection</h2>
        <button
          onClick={onRefresh}
          className="interactive-button p-1.5 sm:p-2 rounded-lg hover:bg-surface/50 transition-base"
          aria-label="Refresh random articles list"
          title="Click to get new random articles"
        >
          <FaArrowsRotate className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary hover:text-accent" aria-hidden="true" />
        </button>
      </div>
      <div 
        className="grid gap-2 sm:gap-3"
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
  // Memoize more values
  const featured = useMemo(() => articles.length > 0 ? articles[0] : null, [articles]);
  const featuredArticles = useMemo(
    () => articles.filter((article): article is Article => 
      article !== undefined && article.frontmatter?.featured === true
    ),
    [articles]
  );

  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < BREAKPOINT_MOBILE : false
  );

  const [randomArticles, setRandomArticles] = useState<Article[]>([]);

  // Optimize resize handler with debounce
  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < BREAKPOINT_MOBILE);
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Combine random articles logic
  const handleRefresh = useCallback(() => {
    if (featured) {
      const count = isMobile ? RANDOM_ARTICLE_COUNT.mobile : RANDOM_ARTICLE_COUNT.desktop;
      setRandomArticles(shuffleAndSlice(articles, featured.slug, count));
    }
  }, [articles, featured, isMobile]);

  // Single effect for random articles
  useEffect(() => {
    handleRefresh();
  }, [isMobile, handleRefresh]);

  if (!featured) return null;

  return (
    <>
      <section 
        className="mt-0 space-y-3 sm:space-y-4 md:space-y-6"
        aria-label="Featured and random articles"
      >
        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-[60fr,40fr] auto-rows-fr">
          <FeaturedArticle article={featured as Article} />
          <RandomSelection articles={randomArticles} onRefresh={handleRefresh} />
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="mt-4 sm:mt-6 space-y-6 sm:space-y-8" aria-label="Featured articles">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary heading-responsive">Featured</h2>
            <span className="text-text-secondary text-xs sm:text-sm">
              {featuredArticles.length} articles
            </span>
          </div>
          <div 
            className="grid-responsive gap-3 sm:gap-4"
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
