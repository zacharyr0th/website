import React, { Suspense } from 'react';
import { getArticles } from './articles';
import { Hero } from './components/Hero';
import { ArchiveSection } from './components/ArchiveSection';
import { LoadingState } from '../components/misc/LoadingState';
import { cache } from 'react';

// Constants
const PAGE_SIZE = 20;

// Error State
const ErrorState = () => (
  <div 
    className="bg-surface/50 rounded-xl p-8 space-y-4 shadow-article-image" 
    role="alert"
    aria-live="polite"
  >
    <h2 className="text-2xl font-semibold text-text-primary">Error Loading Articles</h2>
    <p className="text-text-secondary leading-relaxed">
      There was a problem loading the articles. Please try again later.
    </p>
  </div>
);

// Empty State
const EmptyState = () => (
  <div 
    className="bg-surface/50 rounded-xl p-8 space-y-4 shadow-article-image"
    role="status"
    aria-live="polite"
  >
    <h2 className="text-2xl font-semibold text-text-primary">No Articles Found</h2>
    <p className="text-text-secondary leading-relaxed">
      Articles are currently being prepared. Check back soon for updates.
    </p>
  </div>
);

// Cached article fetching with better error handling
const getArticlesWithCache = cache(async () => {
  try {
    const articles = await getArticles();
    console.log('Fetched articles:', articles.length); // Debug log
    return {
      articles,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      articles: [],
      error: error instanceof Error ? error : new Error('Failed to load articles'),
    };
  }
});

export default async function WritingPage() {
  const { articles, error } = await getArticlesWithCache();

  return (
    <div 
      className="content-page font-mono bg-gradient-to-b from-background to-surface/30 min-h-screen pb-24"
      role="main"
    >
      <main className="container-responsive pt-24 sm:pt-36">
        <div className="mx-auto" style={{ maxWidth: 'var(--article-width)' }}>
          <header className="mb-12">
            <h1 
              className="text-4xl md:text-5xl font-bold text-text-primary heading-responsive"
              id="writing-header"
            >
              Writing
            </h1>
          </header>

          {error ? (
            <ErrorState />
          ) : !articles || articles.length === 0 ? (
            <EmptyState />
          ) : (
            <div 
              className="flex flex-col gap-4 sm:gap-8"
              aria-labelledby="writing-header"
            >
              <Suspense fallback={
                <LoadingState 
                  label="Loading featured articles" 
                  height="h-[500px]" 
                  barCount={3}
                  className="rounded-xl shadow-article-image" 
                />
              }>
                <Hero articles={articles.slice(0, PAGE_SIZE)} />
              </Suspense>
              <Suspense fallback={
                <LoadingState 
                  label="Loading article archive" 
                  height="h-96" 
                  barCount={4}
                  className="rounded-xl shadow-article-image" 
                />
              }>
                <ArchiveSection articles={articles.slice(0, PAGE_SIZE)} />
              </Suspense>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
