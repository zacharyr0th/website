import React from 'react';
import Link from 'next/link';
import { getBio } from '@/bio/lib/data';
import { processMarkdown } from '@/bio/lib/markdown';
import PageHeader from '@/components/layout/PageHeader';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: 'Full Bio | Zachary Roth',
  description: SECTION_METADATA.bio.description,
};

export default async function FullBioPage() {
  const content = await getBio();
  const processedContent = await processMarkdown(JSON.stringify(content));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-16">
        <div className="mx-auto space-y-6" style={{ maxWidth: 'var(--article-width)' }}>
          <PageHeader title="Full Bio" />

          <div className="flex justify-start">
            <Link href="/bio" className="text-accent hover:text-accent/80 transition-colors">
              ← Back to Bio
            </Link>
          </div>

          <div
            className="prose prose-lg prose-invert max-w-none text-text-secondary
              prose-headings:text-text-primary prose-headings:font-mono
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-p:text-text-secondary prose-p:leading-relaxed
              prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent/80
              prose-strong:text-text-primary prose-strong:font-medium
              prose-ul:text-text-secondary prose-li:my-1"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
      </main>
    </div>
  );
}
