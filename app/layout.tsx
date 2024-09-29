// app/layout.tsx
import type { Metadata } from 'next';
import ErrorBoundaryClient from '@/components/ErrorBoundaryClient';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StyledComponentsRegistry from '@/lib/registry';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Zachary Roth - Technologist, Writer, Musician',
  description:
    'Personal website of Zachary Roth - Explore my work in technology, writing, and music.',
  keywords: ['Zachary Roth', 'technologist', 'writer', 'musician', 'portfolio'],
  openGraph: {
    title: 'Zachary Roth - Technologist, Writer, Musician',
    description:
      'Personal website of Zachary Roth - Explore my work in technology, writing, and music.',
    type: 'website',
    url: 'https://www.zacharyroth.com',
    images: [
      {
        url: '/profile-picture.webp',
        width: 256,
        height: 256,
        alt: 'Zachary Roth',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-inter">
        <StyledComponentsRegistry>
          <div className="flex flex-col min-h-screen">
            <Header />
            <ErrorBoundaryClient>
              <main className="flex-grow w-full">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </ErrorBoundaryClient>
            <Footer />
          </div>
        </StyledComponentsRegistry>
        {process.env.NODE_ENV === 'production' && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
