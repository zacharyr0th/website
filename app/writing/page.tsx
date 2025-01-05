import React, { Suspense } from 'react';
import { getArticles } from '../lib/articles';
import { LoadingState } from '../lib/Loading';
import { ARTICLE_CONFIG } from './types';
import WritingPageClient from './components/WritingPageClient';

export default async function WritingPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-24">
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto">
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
              config={ARTICLE_CONFIG}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
