'use client';

import type { ReactNode } from 'react';
import ConditionalFooter from '../Footer';
import KeyboardShortcuts from '../KeyboardShortcuts';
import GlobalConnectModal from '../misc/GlobalConnectModal';
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
        <ConditionalFooter />
        <KeyboardShortcuts />
        <GlobalConnectModal />
      </ErrorBoundary>
    </>
  );
}
