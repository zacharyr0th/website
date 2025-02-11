import type { ReactNode } from 'react';
import { Suspense } from 'react';
import './globals.css';
import { metadata } from './lib/metadata';
import { Analytics } from '@vercel/analytics/react';
import { jetbrainsMono } from './lib/fonts';
import RootLayoutClient from './components/RootLayoutClient';

export { metadata };

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Performance optimizations */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Cache Control */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </head>
      <body className="antialiased">
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
