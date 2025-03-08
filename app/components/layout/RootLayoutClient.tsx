'use client';

import type { ReactNode } from 'react';
import Footer from './Footer';
import KeyboardShortcuts from '../KeyboardShortcuts';
import { GlobalConnectModal } from '../misc/ConnectModal';
import ErrorBoundary from '../ErrorBoundary';
import Navigation from '../navigation/Navigation';

interface RootLayoutClientProps {
  children: ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <>
      <ErrorBoundary>
        <Navigation showHomeButton={true} />
        <main>{children}</main>
        <Footer />
        <KeyboardShortcuts />
        <GlobalConnectModal />
      </ErrorBoundary>
    </>
  );
}
