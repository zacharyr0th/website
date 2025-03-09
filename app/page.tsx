import type { Metadata } from 'next';
import { Hero, Main, Thesis } from './components/home-page';
import { SITE_INFO, PROFILE_IMAGE, viewport } from '@/lib';

export const metadata: Metadata = {
  title: `Home | ${SITE_INFO.name}`,
  description: SITE_INFO.description,
  openGraph: {
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    siteName: SITE_INFO.name,
    images: [
      {
        url: PROFILE_IMAGE.url,
        width: PROFILE_IMAGE.width,
        height: PROFILE_IMAGE.height,
        alt: PROFILE_IMAGE.alt,
      },
    ],
    locale: SITE_INFO.locale,
    type: SITE_INFO.siteType,
  },
  twitter: {
    card: 'summary',
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    creator: SITE_INFO.twitterHandle,
  },
  authors: [{ name: SITE_INFO.authorName }],
  keywords: SITE_INFO.keywords,
  alternates: {
    canonical: SITE_INFO.url,
  },
};

// Export the viewport configuration
export { viewport };

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col w-full font-mono">
      <Hero />
      <Main />
      <Thesis />
    </main>
  );
}
