/**
 * RootLayoutClient.tsx
 * A comprehensive layout component that combines the functionality of RootLayoutClient, Layout, and Header.
 * This component provides a flexible layout structure for all pages with header, content, and footer sections.
 * The homepage has its own special layout separate from other pages.
 */

'use client';

import { type FC, type ReactNode, createContext, useContext, memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { cn } from '@/lib';
import Footer from './Footer';
import KeyboardShortcuts from '../misc/KeyboardShortcuts';
import { GlobalConnectModal } from '../home-page/components/ConnectModal';
import ErrorBoundary from '../misc/ErrorBoundary';
import Header from './Header';

// Create a context to track nested RootLayoutClient components
const RootLayoutContext = createContext(false);

// Animation configuration - memoized to prevent recreation
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

// Content width options
export type ContentWidth = 'default' | 'narrow' | 'wide' | 'full';

const widthClasses: Record<ContentWidth, string> = {
  default: 'max-w-[650px]',
  narrow: 'max-w-xl',
  wide: 'max-w-3xl',
  full: 'max-w-none'
};

// Header component from Header.tsx - memoized to prevent unnecessary re-renders
export interface PageHeaderProps {
  title: string;
  subtitle?: string | undefined;
  className?: string;
}

export const PageHeader: FC<PageHeaderProps> = memo(({ title, subtitle, className }) => {
  return (
    <div className={cn('space-y-2 flex flex-col items-start text-left mb-8', className)}>
      <h1
        className="text-[clamp(2.5rem,5.5vw,3.5rem)] font-mono font-light tracking-[-0.03em] text-black dark:text-white"
        style={{ textShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg sm:text-xl lg:text-2xl tracking-wide text-black/80 dark:text-white/80 font-mono font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
});

PageHeader.displayName = 'PageHeader';

// Combined layout props
export interface RootLayoutClientProps {
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

const RootLayoutClient = ({
  children,
  className,
  contentClassName,
  animate = true,
  width = 'default',
  pageHeader,
  showHomeButton = true
}: RootLayoutClientProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isSpecialPage = ['/projects', '/writing', '/audio'].includes(pathname);
  
  // Check if this component is nested inside another RootLayoutClient
  const isNested = useContext(RootLayoutContext);
  
  // Memoize the width class to prevent recalculation
  const widthClass = useMemo(() => widthClasses[width], [width]);
  
  // Only load motion when needed
  if (!animate) {
    return (
      <RootLayoutContext.Provider value={true}>
        <ErrorBoundary>
          {!isNested && <Header showHomeButton={showHomeButton} />}
          
          {isHomePage ? (
            // Homepage layout - simple and direct
            <main className={cn('min-h-screen', className)}>
              {children}
            </main>
          ) : (
            // Standard layout for all other pages
            <div className={cn('min-h-screen bg-background', className)}>
              <section
                className={cn(
                  'w-full mx-auto px-4 sm:px-6',
                  isSpecialPage ? 'lg:px-8' : '',
                  'pt-[calc(var(--header-height)+1rem)] sm:pt-[calc(var(--header-height)+1rem)] pb-12'
                )}
              >
                {pageHeader && !isNested && (
                  <header className="mt-0 mb-8 w-full">
                    <PageHeader 
                      title={pageHeader.title} 
                      subtitle={pageHeader.subtitle} 
                      className="w-full"
                    />
                  </header>
                )}
                
                <div
                  className={cn(
                    'mx-auto space-y-4 sm:space-y-8',
                    widthClass,
                    contentClassName
                  )}
                >
                  <main>{children}</main>
                </div>
              </section>
            </div>
          )}
          
          {!isNested && <Footer />}
          {!isNested && <KeyboardShortcuts />}
          {!isNested && <GlobalConnectModal />}
        </ErrorBoundary>
      </RootLayoutContext.Provider>
    );
  }
  
  // With animations
  return (
    <RootLayoutContext.Provider value={true}>
      <ErrorBoundary>
        {!isNested && <Header showHomeButton={showHomeButton} />}
        
        {isHomePage ? (
          // Homepage layout - simple and direct
          <main className={cn('min-h-screen', className)}>
            {children}
          </main>
        ) : (
          // Standard layout for all other pages
          <div className={cn('min-h-screen bg-background', className)}>
            <section
              className={cn(
                'w-full mx-auto px-4 sm:px-6',
                isSpecialPage ? 'lg:px-8' : '',
                'pt-[calc(var(--header-height)+1rem)] sm:pt-[calc(var(--header-height)+1rem)] pb-12'
              )}
            >
              {pageHeader && !isNested && (
                <header className="mt-0 mb-8 w-full">
                  <PageHeader 
                    title={pageHeader.title} 
                    subtitle={pageHeader.subtitle} 
                    className="w-full"
                  />
                </header>
              )}
              
              <LazyMotion features={domAnimation}>
                <motion.div
                  className={cn(
                    'mx-auto space-y-4 sm:space-y-8',
                    widthClass,
                    contentClassName
                  )}
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  transition={pageTransition.transition}
                >
                  <main>{children}</main>
                </motion.div>
              </LazyMotion>
            </section>
          </div>
        )}
        
        {!isNested && <Footer />}
        {!isNested && <KeyboardShortcuts />}
        {!isNested && <GlobalConnectModal />}
      </ErrorBoundary>
    </RootLayoutContext.Provider>
  );
};

RootLayoutClient.displayName = 'RootLayoutClient';

export default memo(RootLayoutClient);
