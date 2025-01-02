import type { Metadata, Viewport } from 'next';
import { SITE_METADATA, SITE_VIEWPORT } from '@lib/layout/metadata';
import '@styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import ClientWrapper from '@components/layout/ClientWrapper';

export const generateMetadata = (): Metadata => ({
  ...SITE_METADATA,
  metadataBase: new URL('http://localhost:3000'),
});

export const viewport: Viewport = SITE_VIEWPORT;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-text-primary antialiased" suppressHydrationWarning>
        <ClientWrapper>{children}</ClientWrapper>
        <Analytics />
      </body>
    </html>
  );
}
