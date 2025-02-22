'use client';

import { type FC } from 'react';
import { cn } from '@/lib/utils';

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <div className="content-page">{children}</div>
    </div>
  );
};

export default BaseLayout;
