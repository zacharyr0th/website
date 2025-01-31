'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Define constants for better maintainability
const ROUTES = {
  WRITING: '/writing',
  PROJECTS: '/projects',
  AUDIO: '/audio',
  BIO: '/bio',
  HOME: '/',
} as const;

type Route = typeof ROUTES[keyof typeof ROUTES];

// Define keyboard shortcut mappings
const SHORTCUTS = {
  WRITING: { key: 'w', modifiers: { metaKey: true, ctrlKey: true } },
  PROJECTS: { key: 'p', modifiers: { metaKey: true, shiftKey: true } },
  AUDIO: { key: 'a', modifiers: { metaKey: true, shiftKey: true } },
  BIO: { key: 'b', modifiers: { metaKey: true, shiftKey: true } },
  CONNECT: { key: 'c', modifiers: { metaKey: true, shiftKey: true } },
  HOME: { key: 'z', modifiers: { metaKey: true, shiftKey: true } },
} as const;

export default function KeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = useCallback((route: Route) => {
    if (route === ROUTES.HOME && pathname === ROUTES.HOME) return;
    router.push(route);
  }, [router, pathname]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default behavior for all our shortcuts
    const preventDefault = () => e.preventDefault();

    // Check for writing shortcut (special case)
    if (e.metaKey && e.ctrlKey && e.key.toLowerCase() === SHORTCUTS.WRITING.key) {
      preventDefault();
      navigateTo(ROUTES.WRITING);
      return;
    }

    // Check for other shortcuts
    if (!((e.metaKey && e.shiftKey) || (e.metaKey && e.ctrlKey))) return;

    const key = e.key.toLowerCase();
    
    switch (key) {
      case SHORTCUTS.PROJECTS.key:
        preventDefault();
        navigateTo(ROUTES.PROJECTS);
        break;
      case SHORTCUTS.AUDIO.key:
        preventDefault();
        navigateTo(ROUTES.AUDIO);
        break;
      case SHORTCUTS.BIO.key:
        preventDefault();
        navigateTo(ROUTES.BIO);
        break;
      case SHORTCUTS.CONNECT.key:
        preventDefault();
        window.dispatchEvent(new CustomEvent('openConnectModal'));
        break;
      case SHORTCUTS.HOME.key:
        preventDefault();
        navigateTo(ROUTES.HOME);
        break;
    }
  }, [navigateTo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
}
