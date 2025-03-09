/**
 * Layout component exports
 * 
 * This file exhaustively exports all layout components, types, interfaces, and constants.
 */

// RootLayoutClient exports
export { default as RootLayoutClient } from './RootLayoutClient';
export { default as Layout } from './RootLayoutClient'; // Re-export for backward compatibility
export type { ContentWidth, PageHeaderProps, RootLayoutClientProps } from './RootLayoutClient';
export { PageHeader } from './RootLayoutClient';

// Header exports
export { default as Header } from './Header';
export type { 
  NavItem, 
  NavConfig, 
  BlurBackgroundProps,
  NavigationProps,
  NavContentProps
} from './Header';
export { 
  navConfig, 
  navItems, 
  BlurBackground, 
  HomeButton, 
  NavLink, 
  NavContent 
} from './Header';

// Footer exports
export { default as Footer } from './Footer';
export type { SocialLink } from './Footer';
