import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getBio } from '../lib/data';
import { processMarkdown } from '@/lib/markdown';
import { RootLayoutClient } from '@/components/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Bio | Zachary Roth',
  description: 'Detailed biography and professional background of Zachary Roth.',
};

export default async function FullBioPage() {
  try {
    const content = await getBio();
    const processedContent = await processMarkdown(content);

    return (
      <RootLayoutClient 
        width="default"
        pageHeader={{ title: "Full Bio" }}
      >
        <article className="pt-4 sm:pt-6">
          <Link
            href="/bio"
            className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bio
          </Link>
          <div
            className="prose prose-invert prose-zinc max-w-none"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </article>
      </RootLayoutClient>
    );
  } catch (error) {
    console.error('Error in FullBioPage:', error);
    return (
      <RootLayoutClient 
        width="default"
        pageHeader={{ title: "Full Bio" }}
      >
        <div className="py-12 text-center">
          <p className="text-zinc-400">
            Sorry, there was an error loading the bio content. Please try again later.
          </p>
          <Link
            href="/bio"
            className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors mt-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bio
          </Link>
        </div>
      </RootLayoutClient>
    );
  }
}
