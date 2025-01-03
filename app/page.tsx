import React from 'react';
import { Hero, Main, Thesis, Newsletter } from './components/home-page';

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col w-full overflow-x-hidden font-mono">
        <Hero />
        <Main />
        <Thesis />
        <Newsletter />
      </main>
    </>
  );
}
