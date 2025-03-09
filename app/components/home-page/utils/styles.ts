export const SHARED_STYLES = {
  section: 'relative min-h-screen',
  container: 'container mx-auto px-4 sm:px-6',
  contentWrapper: 'w-full flex flex-col relative z-20',
  heading: {
    h1: 'text-2xl sm:text-3xl font-normal leading-tight tracking-tighter text-text-primary mb-3',
    h2: 'text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-text-primary',
    h3: 'text-lg font-bold mb-3 text-text-primary',
  },
  text: {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    accent: 'text-accent',
  },
  background: {
    primary: 'bg-background',
    surface: 'bg-surface',
    transparent: 'bg-transparent',
  },
} as const;
