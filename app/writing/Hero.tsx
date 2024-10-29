import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

type HeroProps = {
  primaryArticle: Article;
  featuredArticles: Article[];
  onRefresh: () => void;
};

export default function Hero({ primaryArticle, featuredArticles, onRefresh }: HeroProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" aria-label="Featured Articles">
      {/* Primary Article */}
      <article className="lg:col-span-7">
        <Link 
          href={primaryArticle.link} 
          className="group block focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
        >
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={primaryArticle.image.src}
              alt={primaryArticle.image.alt}
              fill
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-2 p-4 border border-border rounded-lg">
            {primaryArticle.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3" role="list" aria-label="Article tags">
                {primaryArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h2 className="text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
              {primaryArticle.title}
            </h2>
            <p className="mt-2 text-text-secondary line-clamp-2">{primaryArticle.description}</p>
          </div>
        </Link>
      </article>

      {/* Random Selection */}
      <aside className="lg:col-span-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">Random Selection</h2>
          <button
            onClick={onRefresh}
            className="p-2 text-accent hover:text-accent-dark rounded-full hover:bg-accent/5 transition-colors focus-visible:outline-accent focus-visible:outline-2"
            aria-label="Refresh random articles"
          >
            <RefreshIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6" role="list">
          {featuredArticles.map((article) => (
            <article key={article.id} role="listitem">
              <Link
                href={article.link}
                className="group flex gap-4 p-3 rounded-lg hover:bg-surface/50 transition-colors"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                    {article.description}
                  </p>
                  <span className="mt-2 inline-flex items-center text-sm text-accent font-medium">
                    Read more
                    <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}

const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);
