// React and Next.js
import { type ReactNode, Suspense } from 'react';
import { type Metadata, type Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Source_Sans_3, Fira_Code } from 'next/font/google';

// Styles and Assets
import './globals.css';
import { SITE_INFO, ROUTES, BOT_CONFIG } from '@/lib';

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

export const metadata: Metadata = SITE_INFO;

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
