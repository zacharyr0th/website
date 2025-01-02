import type { Metadata } from 'next';
import './styles/globals.css';
import Navigation from './components/common/navigation/Navigation';
import Footer from './components/common/misc/Footer';

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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navigation showHomeButton />
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}