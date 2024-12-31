import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getArticles } from '@/app/lib/core/getArticles';
import { Hero } from './components/Hero';
import { ArchiveSection } from './components/ArchiveSection';

export const metadata: Metadata = {
  title: 'Writing | Zachary Roth',
  description: 'Articles and thoughts on technology, development, and blockchain.',
};

const LoadingState = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-64 bg-surface/50 rounded-xl" />
    <div className="space-y-4">
      <div className="h-8 bg-surface/50 rounded w-1/3" />
      <div className="h-4 bg-surface/50 rounded w-2/3" />
    </div>
  </div>
);

export default async function WritingPage() {
  const articles = await getArticles();

  return (
    <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30 min-h-screen pb-24">
      <main className="container mx-auto px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">Writing</h1>
          </header>

          {!articles || articles.length === 0 ? (
            <div className="bg-surface/50 rounded-xl p-8 space-y-4">
              <h2 className="text-2xl font-semibold text-text-primary">No Articles Found</h2>
              <p className="text-text-secondary leading-relaxed">
                Articles are currently being prepared. Check back soon for updates.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-32">
              <Suspense fallback={<LoadingState />}>
                <Hero articles={articles} />
              </Suspense>
              <Suspense fallback={<LoadingState />}>
                <ArchiveSection articles={articles} />
              </Suspense>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
