import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Article, HeroProps } from '../../lib/types';
import { RefreshIcon } from '../../lib/constants';

const Hero: React.FC<HeroProps> = React.memo(({ primaryArticle, featuredArticles, onRefresh }) => (
  <section
    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
    aria-label="Featured Articles"
  >
    <PrimaryArticle article={primaryArticle} />
    <RandomSelection articles={featuredArticles} onRefresh={onRefresh} />
  </section>
));

Hero.displayName = 'Hero';

const PrimaryArticle: React.FC<{ article: Article }> = React.memo(({ article }) => {
  const tagElements = useMemo(() => {
    if (!article.tags || article.tags.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1.5 mb-2" role="list" aria-label="Article tags">
        {article.tags.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="px-1.5 py-0.5 text-sm font-medium rounded-full bg-accent/10 text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }, [article.tags]);

  return (
    <article className="lg:col-span-7">
      <Link
        href={article.link}
        className="group block focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
      >
        <div
          className="rounded-xl overflow-hidden shadow-xl border-l-4"
          style={{ borderColor: 'var(--color-white)' }}
        >
          <div className="relative aspect-[16/9]">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="mt-4 p-6">
            {tagElements}
            <h2 className="text-2xl font-bold text-var(--color-text-primary) group-hover:text-var(--color-accent) transition-colors">
              {article.title}
            </h2>
            <p className="mt-2 text-var(--color-text-secondary) line-clamp-2">
              {article.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
});

PrimaryArticle.displayName = 'PrimaryArticle';

const RandomSelection: React.FC<{
  articles: Article[];
  onRefresh: () => void;
}> = React.memo(({ articles, onRefresh }) => (
  <aside className="lg:col-span-5">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-var(--color-text-primary)">Random Selection</h2>
      <button
        onClick={onRefresh}
        className="p-2 text-accent hover:text-accent-dark rounded-full hover:bg-accent/5 transition-colors focus-visible:outline-accent focus-visible:outline-2"
        aria-label="Refresh random articles"
      >
        <RefreshIcon className="w-8 h-8" />
      </button>
    </div>
    <div className="space-y-4" role="list">
      {articles.map((article) => (
        <FeaturedArticle key={article.id} article={article} />
      ))}
    </div>
  </aside>
));

RandomSelection.displayName = 'RandomSelection';

const FeaturedArticle: React.FC<{ article: Article }> = React.memo(({ article }) => {
  return (
    <article role="listitem" className="h-32">
      <Link
        href={article.link}
        className="group flex gap-3 p-2 rounded-lg hover:bg-surface/50 transition-colors"
      >
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image src={article.image.src} alt={article.image.alt} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary transition-colors line-clamp-2 group-hover:text-accent">
            {article.title}
          </h3>
          <span className="mt-2 inline-flex items-center text-sm text-var(--color-accent) font-medium transition-colors hover:text-accent">
            Read more
            <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
});

FeaturedArticle.displayName = 'FeaturedArticle';

export default Hero;