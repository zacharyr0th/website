import React from 'react';

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">{children}</div>
  );
}
