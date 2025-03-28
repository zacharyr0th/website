// React and Next.js
import { type ReactNode, Suspense } from 'react';
import { type Metadata, type Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Source_Sans_3, Fira_Code } from 'next/font/google';

// Styles and Assets
import './globals.css';
import { metadata as siteMetadata, viewport as siteViewport } from '@/lib';

// Configure fonts with optimized settings
const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fira',
  fallback: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
  preload: true,
  adjustFontFallback: true,
  style: ['normal'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-source',
  preload: true,
  adjustFontFallback: true,
  style: ['normal', 'italic'],
});

// Components
import RootLayoutClient from '@/components/layout/RootLayoutClient';

interface RootLayoutProps {
  children: ReactNode;
}

// Extend the base viewport configuration with additional settings
export const viewport: Viewport = {
  ...siteViewport,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${firaCode.variable} ${sourceSans.variable}`}>
      <body>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
