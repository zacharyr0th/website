import React, { Suspense } from 'react';
import { getArticles } from '../lib/articles';
import { LoadingState } from '../lib/Loading';
import WritingPageClient from './components/WritingPageClient';
import { containerVariants } from '../lib/animations';

export default async function WritingPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-24 sm:pt-36 pb-24">
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto space-y-6">
          <header>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-center sm:text-left">Writing</h1>
          </header>

          <Suspense 
            fallback={
              <LoadingState 
                label="Loading articles" 
                height="h-[600px]"
                barCount={4}
                className="max-w-3xl mx-auto" 
              />
            }
          >
            <WritingPageClient 
              initialArticles={articles} 
              containerVariants={containerVariants}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
