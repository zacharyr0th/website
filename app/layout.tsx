import type { ReactNode } from 'react';
import './styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navigation from './components/navigation/Navigation';
import ConditionalFooter from './components/ConditionalFooter';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import GlobalConnectModal from './components/misc/GlobalConnectModal';
import { metadata } from './lib/metadata';
import Script from 'next/script';

export { metadata };

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

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${inter.variable} ${mono.variable} scroll-smooth`}
    >
      <head>
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Analytics with improved loading */}
        <Script
          id="gtag-base"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          nonce="analytics"
        />
        <Script
          id="gtag-config"
          strategy="lazyOnload"
          nonce="analytics"
        >
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
      </head>
      <body className="min-h-screen bg-background antialiased overflow-x-hidden selection:bg-accent/10">
        <KeyboardShortcuts />
        <GlobalConnectModal />
        <Navigation showHomeButton />
        <main className="relative flex min-h-screen flex-col max-w-[100vw] overflow-x-hidden">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}