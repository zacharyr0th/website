'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { pageTransition } from '@/lib/ui/animations';

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  maxWidth?: 'default' | 'narrow' | 'wide';
}

const maxWidthClasses = {
  default: 'max-w-[650px]',
  narrow: 'max-w-xl',
  wide: 'max-w-3xl',
} as const;

const PageContent: FC<PageContentProps> = ({
  children,
  className,
  animate = true,
  maxWidth = 'default',
}) => {
  const Container = animate ? motion.div : 'div';
  const contentClass = cn(
    'mx-auto space-y-4 sm:space-y-8 pt-4',
    maxWidth in maxWidthClasses
      ? maxWidthClasses[maxWidth as keyof typeof maxWidthClasses]
      : maxWidthClasses.default,
    className
  );

  return (
    <Container className={contentClass} {...(animate && pageTransition)}>
      {children}
    </Container>
  );
};

export default PageContent;
