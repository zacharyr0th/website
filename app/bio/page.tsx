import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib';
import BioPageClient from './components/BioPageClient';
import { LoadingState } from '@/components/misc/Loading';
import { RootLayoutClient } from '@/components/layout';

// Define animation variants inline
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

export const metadata: Metadata = {
  title: SECTION_METADATA.bio.title,
  description: SECTION_METADATA.bio.description,
};

export default function BioPage() {
  return (
    <RootLayoutClient width="wide" pageHeader={{ title: 'Bio' }}>
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
    </RootLayoutClient>
  );
}
