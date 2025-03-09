import React, { Suspense } from 'react';
import { LoadingState } from '@/components/misc/Loading';
import AudioPageClient from './components/AudioPageClient';
import { RootLayoutClient } from '@/components/layout';
import type { Metadata } from 'next';

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
  title: 'Audio | Zachary Roth',
  description:
    'A collection of podcasts, music, and soundscapes exploring technology and creativity.',
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function AudioPage() {
  return (
    <RootLayoutClient width="wide">
      <h1 className="text-6xl font-light text-center sm:text-left mb-10">Audio</h1>
      <Suspense
        fallback={
          <LoadingState
            label="Loading audio content"
            height="h-[600px]"
            barCount={4}
            className="max-w-3xl mx-auto mt-8"
          />
        }
      >
        <div className="mt-8">
          <AudioPageClient containerVariants={containerVariants} />
        </div>
      </Suspense>
    </RootLayoutClient>
  );
}
