import type { Metadata } from 'next';
import { Hero, Main, Thesis, Newsletter } from './components/home-page';

export const metadata: Metadata = {
  title: 'Home | Zachary Tyler Roth',
  description: 'Personal website and blog of Zachary Tyler Roth',
};

export const runtime = 'edge';
export const preferredRegion = 'auto';
export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden font-mono">
      <Hero />
      <Main />
      <Thesis />
      <Newsletter />
    </main>
  );
}
