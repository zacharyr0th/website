import type { Metadata, Viewport } from 'next';
import ErrorBoundaryClient from '@/app/components/common/ErrorBoundaryClient';
import ThemeProvider from '@/app/components/common/ThemeProvider';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Zachary Roth',
    template: '%s | Zachary Roth',
  },
  description: 'Personal website of Zachary Roth',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zacharyr0th.com',
    siteName: 'Zachary Roth',
    images: [
      {
        url: '/profile-picture.webp',
        width: 256,
        height: 256,
        alt: 'Zachary Roth',
        type: 'image/webp',
      },
    ],
  },
  metadataBase: new URL('https://zacharyr0th.com'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ErrorBoundaryClient>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </ErrorBoundaryClient>
      </body>
    </html>
  );
}
