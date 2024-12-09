import type { Metadata, Viewport } from 'next';
import ErrorBoundaryClient from '@/app/components/common/ErrorBoundaryClient';
import ThemeProvider from '@/app/components/common/ThemeProvider';
import '@/styles/globals.css';

// Create a script that will run before other scripts and block wallet injections
const walletBlockerScript = `
  (function() {
    // Block wallet injections
    const walletProperties = ['ethereum', 'solana', 'phantom'];
    
    // Create immutable empty objects for each wallet property
    walletProperties.forEach(prop => {
      try {
        Object.defineProperty(window, prop, {
          value: {},
          configurable: false,
          writable: false,
          enumerable: false
        });
      } catch (e) {
        // If property already exists, try to freeze it
        if (window[prop]) {
          Object.freeze(window[prop]);
        }
      }
    });

    // Block common injection methods
    window.addEventListener('DOMContentLoaded', function() {
      // Prevent script injection
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(function(node) {
              if (node.tagName === 'SCRIPT' && 
                  (node.src.includes('inpage') || 
                   node.src.includes('wallet') ||
                   node.src.includes('ethereum') ||
                   node.src.includes('solana') ||
                   node.src.includes('phantom'))) {
                node.remove();
              }
            });
          }
        });
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    });
  })();
`;

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
        {/* Run wallet blocker before anything else */}
        <script dangerouslySetInnerHTML={{ __html: walletBlockerScript }} />
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
