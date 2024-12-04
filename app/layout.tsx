import type { Metadata } from 'next';
import ErrorBoundaryClient from '@/app/components/common/ErrorBoundaryClient';
import ThemeProvider from '@/app/components/common/ThemeProvider';
import '@/styles/globals.css';
import '@/styles/article.css';

export const metadata: Metadata = {
  title: 'Zachary Roth',
  description: 'Personal website of Zachary Roth',
  openGraph: {
    images: [{ url: '/profile-picture.webp', width: 256, height: 256, alt: 'Zachary Roth' }],
  },
  metadataBase: new URL('https://zacharyr0th.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
