import type { Metadata } from 'next';
import { Hero, Main, Thesis } from './components/home-page';

export const metadata: Metadata = {
  title: 'Home | Zachary Roth',
  description: 'Personal website of Zachary Roth',
};

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden font-mono">
      <Hero />
      <Main />
      <Thesis />
      <div className="mt-20" />
    </main>
  );
}
