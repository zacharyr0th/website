import type { Metadata, Viewport } from 'next';
import { SITE_METADATA, SITE_VIEWPORT } from '@/app/lib/layout/metadata';
import '@/app/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import ClientWrapper from '@/app/components/layout/ClientWrapper';

export const viewport: Viewport = SITE_VIEWPORT;
export const metadata: Metadata = SITE_METADATA;

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
