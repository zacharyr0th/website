import React, { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib';

interface CardProps {
  title: string;
  description: string;
  link: string;
  children?: React.ReactNode;
}

export const Card = memo(({ title, description, link, children }: CardProps) => (
  <Link href={link} className="block">
    <div className="p-1.5 group/card">
      <article
        className={cn(
          'group relative p-3 sm:p-4 backdrop-blur-sm rounded-2xl border border-white/5',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent/50',
          'flex flex-col justify-between',
          'bg-[#1c1c1c] hover:bg-[#232323]',
          'h-[155px] sm:h-[165px]',
          'hover:shadow-lg hover:shadow-black/20'
        )}
      >
        <div className="flex flex-col">
          <h3 className="text-xl font-mono text-white/90 group-hover/card:text-accent transition-colors line-clamp-1 tracking-tight">
            {title}
          </h3>
          <p className="font-mono text-white/60 text-base leading-relaxed line-clamp-2 mt-4 mb-2">
            {description}
          </p>
        </div>

        {children && (
          <div className="mt-auto">
            <div className="flex items-center text-sm text-accent/80 group-hover/card:text-accent">
              {children}
            </div>
          </div>
        )}
      </article>
    </div>
  </Link>
));

Card.displayName = 'Card';
