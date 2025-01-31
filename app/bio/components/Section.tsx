import React from 'react';
import clsx from 'clsx';
import type { SectionProps } from '../types';

export const Section = React.memo<SectionProps>(({ title, children, className }) => (
  <section className={clsx(title ? 'py-8' : 'py-2', className)}>
    {title && (
      <h2 className="text-2xl font-bold text-text-primary mb-6">{title}</h2>
    )}
    <div className="space-y-4">{children}</div>
  </section>
));

Section.displayName = 'Section';
