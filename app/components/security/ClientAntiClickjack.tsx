'use client';

import dynamic from 'next/dynamic';

// Dynamically import AntiClickjack with no SSR
const AntiClickjack = dynamic(() => import('./AntiClickjack'), { ssr: false });

export default function ClientAntiClickjack() {
  return <AntiClickjack />;
}
