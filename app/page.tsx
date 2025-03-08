import type { Metadata } from 'next';
import { Hero, Main, Thesis } from './components/home-page';

export const metadata: Metadata = {
  title: 'Home | Zachary Roth',
  description: 'Personal website of Zachary Roth',
};

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col w-full font-mono gap-20">
      <Hero />
      <Main />
      <Thesis />
    </div>
  );
}
