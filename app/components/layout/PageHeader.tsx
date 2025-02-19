'use client';

// React and Next.js
import { type FC } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="space-y-4">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-center sm:text-left">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-[65ch] text-center sm:text-left font-light">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default PageHeader;
