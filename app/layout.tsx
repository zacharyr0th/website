// React and Next.js
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';

// Styles and Assets
import './globals.css';
import { firaCode, sourceSans } from '@/lib/ui/fonts';
import { metadata as siteMetadata } from '@/lib/config/metadata';

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${firaCode.variable} ${sourceSans.variable}`}
    >
      <body>
        <Suspense fallback={null}>
          <ClientAntiClickjack />
          <Analytics />
        </Suspense>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
