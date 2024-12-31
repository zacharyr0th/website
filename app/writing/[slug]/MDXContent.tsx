'use client';

import React from 'react';
import Image from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { MDXComponents } from 'mdx/types';

type HeadingProps = {
  children?: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

const components: MDXComponents = {
  h1: ({ children, className, ...props }: HeadingProps) => (
    <h1 {...props} className={`text-4xl font-bold tracking-wide mt-6 mb-2 text-text-primary ${className || ''}`}>
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }: HeadingProps) => (
    <h2 {...props} className={`text-3xl font-bold tracking-wide mt-6 mb-2 text-text-primary ${className || ''}`}>
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: HeadingProps) => (
    <h3 {...props} className={`text-2xl font-bold tracking-wide mt-6 mb-2 text-text-primary ${className || ''}`}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-lg leading-relaxed mb-6 text-text-primary">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a 
      href={href} 
      className="text-accent hover:opacity-80 transition-opacity duration-300"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => {
    if (!src) return null;
    return (
      <div className="my-8 rounded-lg overflow-hidden bg-surface">
        <Image
          src={src}
          alt={alt || ''}
          width={1200}
          height={675}
          className="w-full h-auto"
          priority={true}
        />
      </div>
    );
  },
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded bg-surface text-text-primary font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="p-4 rounded-lg bg-surface text-text-primary font-mono text-sm overflow-x-auto my-4">
      {children}
    </pre>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-6 text-text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-6 text-text-primary">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="mb-2 text-text-primary">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent pl-4 italic my-6 text-text-secondary">
      {children}
    </blockquote>
  ),
};

interface MDXContentProps {
  serializedContent: MDXRemoteSerializeResult;
}

const MDXContent = ({ serializedContent }: MDXContentProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote {...serializedContent} components={components} />
    </div>
  );
};

export default MDXContent; 