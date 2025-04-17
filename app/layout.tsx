// React and Next.js
import { type ReactNode, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

// Styles and Assets
import './globals.css';
import { metadata as siteMetadata, STRUCTURED_DATA, WEBSITE_STRUCTURED_DATA } from '@/lib/config';
import { viewport } from '@/lib/config/viewport.config';
import { fonts } from '@/lib/config/fonts.config';
import { SITE_INFO } from '@/lib/config/site.config';

// Components
import { RootLayoutClient } from 'components/layout';
import { ErrorBoundaryLayout } from '@/lib/errors';
import { LoadingSpinner } from 'components/common/Loading';

// Export metadata and viewport
export { viewport };
export const metadata = { ...siteMetadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  // Defensive font class construction
  const fontClasses = [fonts?.sans?.variable ?? '', fonts?.mono?.variable ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <html lang={SITE_INFO.defaultLanguage} className={fontClasses}>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [STRUCTURED_DATA, WEBSITE_STRUCTURED_DATA].filter(Boolean),
            }),
          }}
        />
        <ErrorBoundaryLayout>
          <RootLayoutClient>
            {children}
            <Suspense fallback={<LoadingSpinner />}>
              <Analytics />
            </Suspense>
          </RootLayoutClient>
        </ErrorBoundaryLayout>
      </body>
    </html>
  );
}
