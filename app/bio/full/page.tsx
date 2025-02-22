import React from 'react';
import Link from 'next/link';
import { getBio } from '@/bio/lib/getBio';
import { processMarkdown } from '@/bio/lib/markdown';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib/config/metadata';
import PageLayout from '@/components/layout/PageLayout';
import AnimatedContent from './AnimatedContent';

export const metadata: Metadata = {
  title: 'Full Bio | Zachary Roth',
  description: SECTION_METADATA.bio.description,
};

export default async function FullBioPage() {
  try {
    const content = await getBio();
    const processedContent = await processMarkdown(content);

    return (
      <PageLayout>
        <article className="max-w-none pt-4 sm:pt-6">
          <div className="max-w-[650px] mx-auto">
            <header className="mb-6 sm:mb-8">
              <div className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="space-y-3">
                  <h1 className="text-[clamp(2.5rem,6vw,3.25rem)] mb-4 sm:mb-6 font-mono font-light tracking-[-0.03em] text-white">
                    Full Bio
                  </h1>
                </div>
                <Link
                  href="/bio"
                  className="group text-[#4B96F8] hover:text-[#4B96F8]/80 transition-colors font-mono text-lg flex items-center gap-2"
                >
                  Back to Bio
                  <span className="i-lucide-arrow-left transform -translate-x-1 group-hover:-translate-x-2 transition-transform" />
                </Link>
              </div>
            </header>

            <AnimatedContent
              className="relative prose prose-invert w-full max-w-none prose-base sm:prose-lg lg:prose-xl 
                [&>p]:!font-sans [&>p]:!text-[clamp(1.25rem,calc(1.1rem+0.5vw),1.5rem)] [&>p]:!text-white/60 
                [&>p]:!leading-normal [&>p]:!tracking-wide [&>p]:!font-light [&>p]:!max-w-none
                [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:text-6xl 
                [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:font-normal
                [&>p:first-of-type]:first-letter:text-white [&>p:first-of-type]:first-letter:leading-[0.8]
                [&>p:first-of-type]:first-letter:mt-1
                prose-headings:font-bold prose-headings:text-white/90
                prose-h2:text-3xl prose-h2:font-mono prose-h2:tracking-tight prose-h2:mb-8
                prose-h3:text-xl
                prose-h4:text-lg
                prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent/80
                prose-img:rounded-lg
                prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
                prose-code:text-accent prose-code:before:content-none prose-code:after:content-none
                [&_.key-takeaways]:sm:float-right [&_.key-takeaways]:sm:w-[300px] [&_.key-takeaways]:w-full 
                [&_.key-takeaways]:sm:ml-8 [&_.key-takeaways]:mb-8 [&_.key-takeaways]:p-6 [&_.key-takeaways]:sm:p-8 
                [&_.key-takeaways]:rounded-2xl [&_.key-takeaways]:bg-white/[0.02] [&_.key-takeaways]:border 
                [&_.key-takeaways]:border-white/5 [&_.key-takeaways]:backdrop-blur-sm 
                hover:[&_.key-takeaways]:bg-white/[0.04] [&_.key-takeaways]:transition-colors [&_.key-takeaways]:shadow-lg
                [&_.key-takeaways_h2]:text-2xl [&_.key-takeaways_h2]:font-mono [&_.key-takeaways_h2]:font-semibold 
                [&_.key-takeaways_h2]:mb-8 [&_.key-takeaways_h2]:text-white/90 [&_.key-takeaways_h2]:tracking-tight
                [&_.key-takeaways_ul]:space-y-6
                [&_.key-takeaways_li]:flex [&_.key-takeaways_li]:gap-4 [&_.key-takeaways_li]:text-white/70 
                [&_.key-takeaways_li]:text-lg [&_.key-takeaways_li]:sm:text-xl [&_.key-takeaways_li]:leading-normal 
                [&_.key-takeaways_li]:tracking-wide [&_.key-takeaways_li]:font-light
                [&_.key-takeaways_li]:before:content-['\2022'] [&_.key-takeaways_li]:before:text-accent/80 
                [&_.key-takeaways_li]:before:text-2xl [&_.key-takeaways_li]:before:leading-none [&_.key-takeaways_li]:before:mt-1"
              content={processedContent}
            />
          </div>
        </article>
      </PageLayout>
    );
  } catch (error) {
    console.error('Error rendering bio page:', error);
    return (
      <PageLayout>
        <article className="max-w-[650px] mx-auto">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-[clamp(2.5rem,6vw,3.25rem)] mb-4 sm:mb-6 font-mono font-light tracking-[-0.03em] text-white">
              Full Bio
            </h1>
          </header>
          <div className="text-white/60 font-mono">
            Failed to load bio content. Please try again later.
          </div>
        </article>
      </PageLayout>
    );
  }
}
