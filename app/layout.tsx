import type { Metadata } from 'next';
import ThemeProvider from '@/app/components/common/ThemeProvider';
import { SITE_METADATA, SITE_VIEWPORT } from '@/app/lib/constants/layout';
import '@/app/styles/globals.css';

export const metadata: Metadata = SITE_METADATA;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content={`width=${SITE_VIEWPORT.width}, initial-scale=${SITE_VIEWPORT.initialScale}, maximum-scale=${SITE_VIEWPORT.maximumScale}, user-scalable=${SITE_VIEWPORT.userScalable ? 'yes' : 'no'}, theme-color=${SITE_VIEWPORT.themeColor}`} />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
