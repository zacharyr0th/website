export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon?: string;
  readonly description?: string;
}

export type NavSection = 'main' | 'social' | 'footer';

export interface NavConfig {
  readonly main: ReadonlyArray<NavItem>;
  readonly breakpoints: {
    readonly mobile: number;
    readonly tablet: number;
    readonly desktop: number;
  };
  readonly animation: {
    readonly duration: number;
    readonly easing: string;
  };
}

export const navConfig: NavConfig = {
  main: [
    { 
      label: 'Projects', 
      href: '/projects',
      description: 'View my projects and work'
    },
    { 
      label: 'Writing', 
      href: '/writing',
      description: 'Read my articles and thoughts'
    },
    { 
      label: 'Audio', 
      href: '/audio',
      description: 'Listen to my audio content'
    },
  ],
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
  },
  animation: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const navItems = navConfig.main;
