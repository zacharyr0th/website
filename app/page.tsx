import React from 'react';
import Hero from './components/home-page/Hero';
import { Main } from './components/home-page/Main';
import { ThesisBackground } from './components/home-page/backgrounds/ThesisBackground';
import { Newsletter } from './components/home-page/Newsletter';

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col w-full overflow-x-hidden font-mono">
        <Hero />
        <Main />
        <section className="relative w-full">
          <ThesisBackground />
        </section>
        <Newsletter />
      </main>
    </>
  );
}
