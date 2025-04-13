// React and Next.js
import { type ReactNode, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font';
import { GeistMono } from 'geist/font/mono';

// Styles and Assets
import './globals.css';
import { metadata as siteMetadata } from '@/lib/config';
import { viewport } from '@/lib/config/viewport.config';
import { FONT_CONFIG } from '@/lib/config';

// Components
import RootLayoutClient from 'components/layout/RootLayoutClient';
import { ErrorBoundaryLayout } from '@/lib/errors';

interface RootLayoutProps {
  children: ReactNode;
}

// Configure fonts with display swap
const geistSansWithSwap = {
  ...GeistSans,
  display: FONT_CONFIG.display,
  preload: FONT_CONFIG.preload,
  fallback: FONT_CONFIG.fallback,
};

const geistMonoWithSwap = {
  ...GeistMono,
  display: FONT_CONFIG.display,
  preload: FONT_CONFIG.preload,
  fallback: FONT_CONFIG.fallback,
};

// Export metadata and viewport
export { viewport };
export const metadata = siteMetadata;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSansWithSwap.variable} ${geistMonoWithSwap.variable}`}>
      <body>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <ErrorBoundaryLayout>
          <RootLayoutClient>{children}</RootLayoutClient>
        </ErrorBoundaryLayout>
      </body>
    </html>
  );
}
