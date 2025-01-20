import type { ReactNode } from 'react';
import './styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navigation from './components/navigation/Navigation';
import ConditionalFooter from './components/ConditionalFooter';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import GlobalConnectModal from './components/misc/GlobalConnectModal';
import { metadata, viewport } from './lib/metadata';

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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-text-primary antialiased">
        <Navigation />
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <ConditionalFooter />
        </div>
        <KeyboardShortcuts />
        <GlobalConnectModal />
      </body>
    </html>
  );
}
