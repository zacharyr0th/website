import type { Metadata, Viewport } from 'next';
import ThemeProvider from '@/app/components/common/ThemeProvider';
import { SITE_METADATA, SITE_VIEWPORT } from '@/app/lib/constants/layout';
import '@/app/styles/globals.css';

export const viewport: Viewport = SITE_VIEWPORT;
export const metadata: Metadata = SITE_METADATA;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
