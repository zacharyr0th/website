export const SHARED_STYLES = {
  section: 'relative min-h-screen',
  container: 'container mx-auto px-4 sm:px-6',
  contentWrapper: 'w-full flex flex-col relative z-20',
  heading: {
    h1: 'text-4xl sm:text-6xl font-normal leading-tight tracking-tighter text-text-primary mb-4',
    h2: 'text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 text-text-primary',
    h3: 'text-xl font-bold mb-4 text-text-primary',
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
