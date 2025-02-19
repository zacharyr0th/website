'use client';

import { type FC } from 'react';
import { cn } from '@/lib';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'default' | 'narrow' | 'wide';
}

const maxWidthClasses = {
  default: 'max-w-5xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-6xl',
} as const;

const PageLayout: FC<PageLayoutProps> = ({ children, className, maxWidth = 'default' }) => {
  return (
    <section
      className={cn(
        'w-full mx-auto px-6 sm:px-8 py-8 sm:py-12',
        maxWidth in maxWidthClasses
          ? maxWidthClasses[maxWidth as keyof typeof maxWidthClasses]
          : maxWidthClasses.default,
        className
      )}
    >
      {children}
    </section>
  );
};

export default PageLayout;
