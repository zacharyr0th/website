import React from 'react';

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-center sm:text-left">
        {title}
      </h1>
    </header>
  );
} 