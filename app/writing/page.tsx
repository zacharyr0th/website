import React, { Suspense } from 'react';
import { getArticles } from './[slug]/articles';
import { LoadingState } from '../lib/Loading';
import WritingPageClient from './components/WritingPageClient';
import { containerVariants } from '../lib/animations';
import PageHeader from '../components/PageHeader';

export const revalidate = 60; // Revalidate every minute

export default async function WritingPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-24">
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto space-y-6">
          <PageHeader title="Writing" />

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
