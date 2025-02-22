import React, { Suspense } from 'react';
import { LoadingState } from '@/components/misc/Loading';
import AudioPageClient from './components/AudioPageClient';
import { containerVariants } from '@/lib/ui/animations';
import PageContent from '@/components/layout/PageContent';
import PageHeader from '@/components/layout/PageHeader';
import PageLayout from '@/components/layout/PageLayout';
import BaseLayout from '@/components/layout/BaseLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audio | Zachary Roth',
  description:
    'A collection of podcasts, music, and soundscapes exploring technology and creativity.',
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function AudioPage() {
  return (
    <BaseLayout>
      <PageLayout>
        <PageContent maxWidth="wide">
          <Suspense fallback={<LoadingState label="Loading title" height="h-12" barCount={1} />}>
            <PageHeader title="Audio" />
          </Suspense>
          <Suspense
            fallback={
              <LoadingState
                label="Loading audio content"
                height="h-[600px]"
                barCount={4}
                className="max-w-3xl mx-auto"
              />
            }
          >
            <AudioPageClient containerVariants={containerVariants} />
          </Suspense>
        </PageContent>
      </PageLayout>
    </BaseLayout>
  );
}
