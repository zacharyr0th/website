'use client';

import { type FC } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
  const pathname = usePathname();
  const isSpecialPage = ['/projects', '/writing', '/audio'].includes(pathname);

  return (
    <section
      className={cn(
        'w-full mx-auto px-4 sm:px-6',
        isSpecialPage ? 'lg:px-8' : '',
        'pt-[calc(var(--header-height)+2rem)] sm:pt-[calc(var(--header-height)+2.5rem)] pb-12',
        'max-w-3xl',
        className
      )}
    >
      {children}
    </section>
  );
};

export default PageLayout;
