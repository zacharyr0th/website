import React, { Suspense } from 'react';
import { RootLayoutClient } from '@/components/layout';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib';
import { LoadingState } from '@/components/misc/Loading';
import { WritingPageClient } from './components/WritingPageClient';
import { getArticles } from './lib';

export const metadata: Metadata = {
  title: SECTION_METADATA.writing.title,
  description: SECTION_METADATA.writing.description,
};

export const revalidate = 3600; // 1 hour
export const dynamic = 'force-static';
export const preferredRegion = 'auto';

async function getInitialArticles() {
  try {
    // During build time, use direct file system access instead of API
    return await getArticles({ limit: 50 });
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return an empty array instead of throwing to prevent build failures
    return [];
  }
}

export default async function WritingPage() {
  const articles = await getInitialArticles();

  return (
    <RootLayoutClient width="wide">
      <h1 className="text-6xl font-light text-center sm:text-left mb-10">Writing</h1>
      <Suspense
        fallback={
          <LoadingState
            label="Loading articles"
            height="h-[600px]"
            barCount={4}
            className="max-w-3xl mx-auto mt-8"
          />
        }
      >
        <WritingPageClient initialArticles={articles} enableLoadMore={false} />
      </Suspense>
    </RootLayoutClient>
  );
}
