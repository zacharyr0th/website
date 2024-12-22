export const CONFIG = {
    maxContentLength: 1000,
    supportedFileTypes: ['mp3', 'wav', 'ogg'] as const,
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    visibleProjects: 6,
  } as const;
  
  export const LAYOUT = {
    maxWidth: 'max-w-7xl',
    containerPadding: 'px-4 sm:px-6 lg:px-8',
    sectionSpacing: 'py-12 md:py-16 lg:py-20',
    borderRadius: {
      sm: 'var(--border-radius-sm)',
      md: 'var(--border-radius-md)',
      lg: 'var(--border-radius-lg)',
      full: 'var(--border-radius-full)',
    },
  } as const;
  
  export const MEDIA_QUERIES = {
    sm: `(min-width: ${CONFIG.breakpoints.sm}px)`,
    md: `(min-width: ${CONFIG.breakpoints.md}px)`,
    lg: `(min-width: ${CONFIG.breakpoints.lg}px)`,
    xl: `(min-width: ${CONFIG.breakpoints.xl}px)`,
  } as const;