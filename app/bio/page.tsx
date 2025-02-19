import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { config } from '@/lib';
import BioPageClient from './components/BioPageClient';
import { LoadingState } from '@/components/misc/Loading';
import PageContainer from '@/components/layout/PageContainer';
import PageLayout from '@/components/layout/PageLayout';
import { containerVariants } from '@/lib/ui/animations';

const { SECTION_METADATA } = config;

export const metadata: Metadata = {
  title: SECTION_METADATA.bio.title,
  description: SECTION_METADATA.bio.description,
};

export default function BioPage() {
  return (
    <PageLayout>
      <PageContainer>
        <Suspense
          fallback={
            <LoadingState
              label="Loading bio content"
              height="h-[600px]"
              barCount={4}
              className="max-w-3xl mx-auto"
            />
          }
        >
          <BioPageClient containerVariants={containerVariants} />
        </Suspense>
      </PageContainer>
    </PageLayout>
  );
}
