'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/app/components/common/navigation/Navigation';
import Footer from '@/app/components/common/misc/Footer';
import ClientErrorBoundary from '@/app/components/error/ClientErrorBoundary';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ClientErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Navigation showHomeButton />
        <main>{children}</main>
        <Footer />
      </div>
    </ClientErrorBoundary>
  );
} 