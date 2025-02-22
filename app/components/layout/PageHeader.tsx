'use client';

// React and Next.js
import { type FC } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, className }) => {
  return (
    <header className={cn('mt-2 sm:mt-4', className)}>
      <div className="space-y-2 flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="space-y-2">
          <h1
            className="text-[clamp(2rem,4.5vw,2.75rem)] sm:text-[clamp(2.5rem,5.5vw,3.25rem)] whitespace-nowrap font-mono font-light tracking-[-0.03em] text-white"
            style={{ textShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl lg:text-2xl tracking-wide text-white/60 font-mono font-light">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
