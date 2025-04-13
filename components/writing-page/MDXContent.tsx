'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import Link from 'next/link';
import { cn } from '@/lib';

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const components: Components = {
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http') || false;

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }

      return href ? (
        <Link href={href} {...props}>
          {children}
        </Link>
      ) : null;
    },

    h2: ({ children, id, ...props }) => (
      <h2 id={id} className="group relative" {...props}>
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a href={`#${id}`} className="text-accent">
            #
          </a>
        </span>
        {children}
      </h2>
    ),

    table: ({ children, ...props }) => (
      <div className="table-wrapper">
        <table {...props}>{children}</table>
      </div>
    ),

    thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,

    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,

    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,

    th: ({ children, ...props }) => <th {...props}>{children}</th>,

    td: ({ children, ...props }) => <td {...props}>{children}</td>,

    code: ({ className, children, ...props }) => {
      const isCodeBlock = className?.includes('language-');

      if (isCodeBlock) {
        return (
          <div className="relative rounded-md overflow-hidden">
            <pre className={cn('p-4 overflow-x-auto', className)}>
              <code {...props} className={className}>
                {children}
              </code>
            </pre>
          </div>
        );
      }

      return (
        <code className="inline-code px-1 py-0.5 rounded bg-[rgba(255,255,255,0.1)]">
          {children}
        </code>
      );
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  );
}
