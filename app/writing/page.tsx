import React from 'react';
import WritingPageClient from './components/WritingPageClient';
import { containerVariants } from '@/lib/ui/animations';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import PageLayout from '@/components/layout/PageLayout';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib/config/metadata';
import { readArticlesFromFilesystem } from './lib/server';

export const metadata: Metadata = {
  title: SECTION_METADATA.writing.title,
  description: SECTION_METADATA.writing.description,
};

export const revalidate = 3600; // 1 hour
export const dynamic = 'force-static';
export const preferredRegion = 'auto';

const INITIAL_ARTICLES_LIMIT = 50;

export default async function WritingPage() {
  // Only fetch featured articles and a limited number of regular articles initially
  const regularArticles = await readArticlesFromFilesystem({
    excludeDrafts: true,
    featured: false,
    limit: INITIAL_ARTICLES_LIMIT,
  });

  return (
    <PageLayout>
      <PageContainer>
        <PageHeader title="Writing" />

        <section>
          <WritingPageClient
            initialArticles={regularArticles}
            containerVariants={containerVariants}
            enableLoadMore
          />
        </section>
      </PageContainer>
    </PageLayout>
  );
}
