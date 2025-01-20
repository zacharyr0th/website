import type { ReactNode } from 'react';
import './styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navigation from './components/navigation/Navigation';
import ConditionalFooter from './components/ConditionalFooter';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import GlobalConnectModal from './components/misc/GlobalConnectModal';
import { metadata, viewport } from './lib/metadata';
import Script from 'next/script';

export { metadata, viewport };

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: true,
  fallback: ['monospace'],
  adjustFontFallback: true,
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Analytics with improved loading */}
        <Script
          id="gtag-base"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="gtag-config" strategy="lazyOnload">
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
      <body className="bg-background text-text-primary antialiased">
        <Navigation />
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <ConditionalFooter />
        </div>
        <KeyboardShortcuts />
        <GlobalConnectModal />
        <Script
          defer
          data-domain="zacharyr0th.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
