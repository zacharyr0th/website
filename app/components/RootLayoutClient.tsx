'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './navigation/Navigation';
import ConditionalFooter from './Footer';
import KeyboardShortcuts from './KeyboardShortcuts';
import GlobalConnectModal from './misc/GlobalConnectModal';
import ErrorBoundary from './ErrorBoundary';
import { initializeApp } from '../lib/init';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: true,
  fallback: ['monospace'],
});

interface RootLayoutClientProps {
  children: ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className={`${inter.variable} ${mono.variable}`}>
      <Analytics />
      <Script
        id="gtag-base"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        nonce="analytics"
      />
      <Script id="gtag-config" strategy="lazyOnload" nonce="analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
            transport_type: 'beacon',
            anonymize_ip: true,
            cookie_flags: 'SameSite=Strict;Secure'
          });
        `}
      </Script>
      <div className="min-h-screen bg-background antialiased overflow-x-hidden selection:bg-accent/10">
        <ErrorBoundary>
          <KeyboardShortcuts />
          <GlobalConnectModal />
          <Navigation showHomeButton />
          <main className="relative flex min-h-screen flex-col max-w-[100vw] overflow-x-hidden">
            {children}
          </main>
          <ConditionalFooter />
        </ErrorBoundary>
      </div>
    </div>
  );
} 