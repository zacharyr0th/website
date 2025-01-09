'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function KeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Special case for writing page (Command+Control+W)
      if (e.metaKey && e.ctrlKey && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        router.push('/writing');
        return;
      }

      // Handle Command+Shift or Command+Control combinations for other shortcuts
      if (!((e.metaKey && e.shiftKey) || (e.metaKey && e.ctrlKey))) return;

      switch (e.key.toLowerCase()) {
        case 'p':
          e.preventDefault();
          router.push('/projects');
          break;
        case 'a':
          e.preventDefault();
          router.push('/audio');
          break;
        case 'b':
          e.preventDefault();
          router.push('/bio');
          break;
        case 'c':
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('openConnectModal'));
          break;
        case 'z':
          e.preventDefault();
          if (pathname !== '/') {
            router.push('/');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, pathname]);

  return null;
}
