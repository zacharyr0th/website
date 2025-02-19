export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon?: string;
  readonly description?: string;
}

export interface NavConfig {
  readonly main: ReadonlyArray<NavItem>;
}

export const navConfig: NavConfig = {
  main: [
    {
      label: 'Projects',
      href: '/projects',
      description: 'View my projects and work',
    },
    {
      label: 'Writing',
      href: '/writing',
      description: 'Read my articles and thoughts',
    },
    {
      label: 'Audio',
      href: '/audio',
      description: 'Listen to my audio content',
    },
  ],
} as const;

export const navItems = navConfig.main;
