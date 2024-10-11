import type { Metadata } from 'next';
import ErrorBoundaryClient from '@/app/components/common/ErrorBoundaryClient';
import StyledComponentsRegistry from '@/lib/registry';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Zachary Roth - Technologist, Writer, Musician',
  description: 'Personal website of Zachary Roth',
  openGraph: {
    images: [{ url: '/profile-picture.webp', width: 256, height: 256, alt: 'Zachary Roth' }],
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ErrorBoundaryClient>
            <main>{children}</main>
          </ErrorBoundaryClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
