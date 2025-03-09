/**
 * Layout.tsx
 *
 * DEPRECATED: This file is maintained for backward compatibility only.
 * The Layout component has been moved into RootLayoutClient.tsx.
 * Please update your imports to use RootLayoutClient instead.
 */

'use client';

import { type FC, type ReactNode } from 'react';
import RootLayoutClient from './RootLayoutClient';

type ContentWidth = 'default' | 'narrow' | 'wide' | 'full';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  animate?: boolean;
  width?: ContentWidth;
  header?: ReactNode;
}

// Define the props type for RootLayoutClient
interface RootLayoutClientProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  animate?: boolean;
  width?: ContentWidth;
  pageHeader?: {
    title: string;
    subtitle?: string;
  };
  showHomeButton?: boolean;
}

/**
 * Layout component that provides a consistent structure for all pages
 * This is a wrapper around RootLayoutClient for backward compatibility
 */
const Layout: FC<LayoutProps> = ({
  children,
  className,
  contentClassName,
  animate = true,
  width = 'default',
  header,
}) => {
  // Extract title and subtitle from header if it's a Header component
  let pageHeader: { title: string; subtitle?: string } | undefined;
  if (header && typeof header === 'object' && 'props' in header && header.props) {
    const { title, subtitle } = header.props;
    if (title) {
      pageHeader = { title, subtitle };
    }
  }

  // Create props object with required and optional properties
  const props = {
    children,
    animate,
    width,
  } as RootLayoutClientProps;

  // Only add optional props if they're defined
  if (pageHeader !== undefined) props.pageHeader = pageHeader;
  if (className !== undefined) props.className = className;
  if (contentClassName !== undefined) props.contentClassName = contentClassName;

  return <RootLayoutClient {...props} />;
};

export default Layout;
