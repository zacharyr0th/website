'use client';

import React from 'react';
import { RootLayoutClient } from '@/components/layout';

interface AudioPageLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
}

export default function AudioPageLayout({
  children,
  pageTitle = 'Audio Recordings',
  pageSubtitle,
}: AudioPageLayoutProps) {
  return (
    <RootLayoutClient
      width="default"
      className="font-mono bg-gradient-to-b from-background to-surface/30"
      contentClassName="mx-auto space-y-12"
      pageHeader={{
        title: pageTitle,
        ...(pageSubtitle ? { subtitle: pageSubtitle } : {}),
      }}
    >
      {children}
    </RootLayoutClient>
  );
}
