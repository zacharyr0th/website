'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Footer from '@/app/components/common/Footer';
import { Article } from '@/lib/types';

const ArticleContent = memo(({ article }: { article: Article }) => (
  <main
    className="flex flex-col w-full min-h-screen font-mono"
    style={{
      backgroundColor: 'var(--color-background)',
      padding: 'var(--spacing-lg)',
      fontFamily: 'var(--font-family-base)',
    }}
  >
    <article className="flex-grow container mx-auto px-48 pt-16 pb-8 max-w-5xl prose">
      <header className="mb-12">
        <h1 className="text-5xl mb-4" style={{ color: 'var(--color-text-primary)' }}>
          {article.title}
        </h1>
        {article.subtitle && (
          <h2 className="text-3xl font-thin mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            {article.subtitle}
          </h2>
        )}
        <div className="flex items-center">
          <p style={{ color: 'var(--color-text-secondary)' }}>{article.date}</p>
          {article.tags && (
            <ul className="flex space-x-2 ml-4">
              {article.tags.map((tag, index) => (
                <li
                  key={index}
                  className="text-sm bg-gray-200 rounded-full px-3 py-1"
                  style={{
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-surface)',
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      {article.image && (
        <figure className="mb-12 flex justify-center">
          <Image
            src={article.image.src}
            alt={article.image.alt || 'Article image'}
            width={1200}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-xl shadow-lg"
          />
        </figure>
      )}
      <div className="bg-background rounded-xl overflow-hidden">
        <div
          className="prose prose-lg max-w-none"
          style={{
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--line-height-base)',
            marginBottom: '0',
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
    <Footer />
    <style jsx global>{`
      .prose a {
        text-decoration: underline;
        color: var(--color-accent);
      }
      .prose img {
        margin-left: auto;
        margin-right: auto;
      }
      .prose ol {
        list-style-type: decimal;
        margin-left: 2em;
        padding-left: 0.5em;
      }
      .prose ol li {
        margin-bottom: 0.5em;
        color: var(--color-text-primary);
        line-height: 1.5;
      }
    `}</style>
  </main>
));

ArticleContent.displayName = 'ArticleContent';

export default ArticleContent;
