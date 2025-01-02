type LayoutConfig = {
  spacing: {
    '2xs': string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  dimensions: {
    headerHeight: string;
    footerHeight: string;
    maxContentWidth: string;
    maxReadingWidth: string;
    sidebarWidth: string;
    minTouchTarget: string;
  };
  zIndex: {
    toast: number;
    modal: number;
    overlay: number;
    dropdown: number;
    sticky: number;
    header: number;
    footer: number;
    base: number;
  };
};

export const LAYOUT: LayoutConfig = {
  spacing: {
    '2xs': '0.125rem', // 2px
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  dimensions: {
    headerHeight: 'max(64px, 5vh)',
    footerHeight: 'max(64px, 5vh)',
    maxContentWidth: 'min(1200px, 90vw)',
    maxReadingWidth: 'min(65ch, 100%)',
    sidebarWidth: '280px',
    minTouchTarget: '44px',
  },
  zIndex: {
    toast: 9000,
    modal: 8000,
    overlay: 7000,
    dropdown: 6000,
    sticky: 5000,
    header: 4000,
    footer: 3000,
    base: 1,
  },
} as const;
