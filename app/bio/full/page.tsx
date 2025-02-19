import React from 'react';
import Link from 'next/link';
import { getBio } from '@/bio/lib/getBio';
import { processMarkdown } from '@/bio/lib/markdown';
import PageHeader from '@/components/layout/PageHeader';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib/config/metadata';
import { ui } from '@/lib';

const { jetbrainsMono } = ui;

export const metadata: Metadata = {
  title: 'Full Bio | Zachary Roth',
  description: SECTION_METADATA.bio.description,
};

export default async function FullBioPage() {
  try {
    const content = await getBio();
    const processedContent = await processMarkdown(content);

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
        <main className={`container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-16 ${jetbrainsMono.variable}`}>
          <div className="mx-auto space-y-6" style={{ maxWidth: 'var(--article-width)' }}>
            <PageHeader title="Full Bio" />

            <div className="flex justify-start">
              <Link href="/bio" className="text-accent hover:text-accent/80 transition-colors">
                ← Back to Bio
              </Link>
            </div>

            <article
              className="prose prose-invert prose-xl w-full max-w-none
                prose-headings:scroll-mt-24
                prose-headings:font-bold
                prose-h1:text-4xl prose-h1:bg-gradient-to-br prose-h1:from-white prose-h1:to-white/70 prose-h1:bg-clip-text prose-h1:text-transparent
                prose-h2:text-2xl prose-h2:text-white/90 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
                prose-h3:text-xl prose-h3:text-white/80
                prose-h4:text-lg prose-h4:text-white/70
                prose-p:text-justify
                prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent/80
                prose-img:rounded-lg
                prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
                prose-code:text-accent prose-code:before:content-none prose-code:after:content-none
                [&_h1_.heading-link]:bg-gradient-to-br [&_h1_.heading-link]:from-white [&_h1_.heading-link]:to-white/70 [&_h1_.heading-link]:bg-clip-text [&_h1_.heading-link]:text-transparent
                [&_h2_.heading-link]:text-white/90
                [&_h3_.heading-link]:text-white/80
                [&_h4_.heading-link]:text-white/70
                [&_.heading-link]:no-underline [&_.heading-link]:cursor-pointer
                hover:[&_.heading-link]:text-accent/90 hover:[&_.heading-link]:no-underline
                [&_.heading-link]:transition-colors [&_.heading-link]:duration-200
                [&_.heading-link]:block [&_.heading-link]:w-fit"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error rendering bio page:', error);
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
        <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-16">
          <div className="mx-auto space-y-6">
            <PageHeader title="Full Bio" />
            <div className="text-text-secondary">
              Failed to load bio content. Please try again later.
            </div>
          </div>
        </main>
      </div>
    );
  }
}
