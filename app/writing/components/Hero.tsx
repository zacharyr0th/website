import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Article, HeroProps } from '../../../lib/types';
import { RefreshIcon } from '../../../lib/constants';

const ArticleTags = React.memo<{ tags: ReadonlyArray<string> | string[] | undefined }>(
  ({ tags }) => {
    if (!tags?.length) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-3" role="list" aria-label="Article tags">
        {tags.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="px-2 py-0.5 text-[12px] tracking-wide font-medium rounded-full bg-accent/10 text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }
);
ArticleTags.displayName = 'ArticleTags';

const PrimaryArticle = React.memo<{ article: Article }>(({ article }) => (
  <article className="lg:col-span-7">
    <Link
      href={article.link}
      className="block focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="mt-4 p-6 flex flex-col">
          <ArticleTags tags={article.tags} />
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{article.title}</h2>
          <p className="mt-2 text-[var(--color-text-secondary)] line-clamp-2">
            {article.description}
          </p>
        </div>
      </div>
    </Link>
  </article>
));
PrimaryArticle.displayName = 'PrimaryArticle';

const FeaturedArticle = React.memo<{ article: Article }>(({ article }) => (
  <article role="listitem" className="h-32">
    <Link href={article.link} className="flex gap-3 p-2 rounded-lg">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="80px"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-[var(--color-text-primary)] line-clamp-2">
          {article.title}
        </h3>
        <span className="mt-2 inline-flex items-center text-sm text-var(--color-accent) font-medium">
          Read more
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </span>
      </div>
    </Link>
  </article>
));
FeaturedArticle.displayName = 'FeaturedArticle';

const RandomSelection = React.memo<{ articles: Article[]; onRefresh: () => void }>(
  ({ articles, onRefresh }) => (
    <aside className="lg:col-span-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
          Random Selection
        </h2>
        <button
          onClick={onRefresh}
          className="p-2 text-accent rounded-full"
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
  )
);
RandomSelection.displayName = 'RandomSelection';

const Hero = React.memo<HeroProps>(({ primaryArticle, featuredArticles, onRefresh }) => (
  <section
    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-6 sm:pt-8"
    aria-label="Featured Articles"
  >
    <PrimaryArticle article={primaryArticle} />
    <RandomSelection articles={featuredArticles} onRefresh={onRefresh} />
  </section>
));
Hero.displayName = 'Hero';

export default Hero;
