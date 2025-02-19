// React and Next.js
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';

// Styles and Assets
import './globals.css';
import { ui } from '@/lib';
import { metadata as siteMetadata } from '@/lib/config/metadata';
const { jetbrainsMono } = ui;

// Components
import RootLayoutClient from '@/components/layout/RootLayoutClient';
import { ClientAntiClickjack } from '@/components/security';

interface RootLayoutProps {
  children: ReactNode;
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  ...siteMetadata,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <ClientAntiClickjack />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
