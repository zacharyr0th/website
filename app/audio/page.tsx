import React, { Suspense } from 'react';
import { LoadingState } from 'components/common/Loading';
import AudioPageClient from '../../components/audio-page/AudioPageClient';
import { RootLayoutClient } from 'components/layout';
import type { Metadata } from 'next';
import type { Variants } from 'framer-motion';
import { DEFAULT_ANIMATION_CONFIG } from '@/lib/animations';
import { SECTION_METADATA } from '@/lib/config';

// Create variants using the animation constants from the library
// This format is required by the AudioPageClient component
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DEFAULT_ANIMATION_CONFIG.duration,
      ease: DEFAULT_ANIMATION_CONFIG.ease,
      staggerChildren: 0.1, // Important for animating children sequentially
    },
  },
};

export const metadata: Metadata = {
  title: SECTION_METADATA.audio.title,
  description: SECTION_METADATA.audio.description,
  openGraph: {
    images: [SECTION_METADATA.audio.ogImage],
  },
  keywords: Array.from(SECTION_METADATA.audio.keywords),
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
