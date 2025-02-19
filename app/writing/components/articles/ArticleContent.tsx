'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDate, formatDateCompact } from './utils/date';
import type { ArticleProps } from './types';
import styles from './styles/media.module.css';

const ArticleContent = memo<ArticleProps>(({ article, contentHtml, nextArticle, prevArticle }) => {
  const { title, description, date, image, takeaways, category, tags } = article;

  return (
    <article className="max-w-none pt-36">
      <div className="max-w-[650px] mx-auto">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
            {description && <p className="text-xl sm:text-2xl text-zinc-400">{description}</p>}

            <div className="flex items-start gap-2 text-sm text-zinc-500 overflow-x-auto no-scrollbar">
              {date && (
                <time dateTime={date} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="i-lucide-calendar h-4" />
                  <span className="sm:hidden">{formatDateCompact(date)}</span>
                  <span className="hidden sm:inline">{formatDate(date)}</span>
                </time>
              )}

              <div className="w-[1px] h-4 bg-zinc-800" />

              {category && (
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="i-lucide-folder h-4 w-4" />
                  <span className="capitalize">{category}</span>
                </span>
              )}

              <div className="w-[1px] h-4 bg-zinc-800 mx-3" />

              {tags && tags.length > 0 && (
                <div className="flex items-start">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-zinc-800 text-zinc-400 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </header>

        {image && (
          <motion.figure
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.featuredImage}
          >
            <Image
              src={image.src}
              alt={image.alt || `Featured image for ${title}`}
              width={1200}
              height={675}
              quality={95}
              priority
              className={styles.featuredImageInner}
              sizes="(max-width: 640px) 100vw, 650px"
            />
          </motion.figure>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          {takeaways && takeaways.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:float-right sm:w-[300px] w-full sm:ml-8 mb-8"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                <h2 className="text-xl font-semibold mb-6 text-white/90">Key Takeaways</h2>
                <ul className="space-y-4">
                  {takeaways.map((point, index) => (
                    <li key={index} className="flex gap-3 text-white/70 text-base leading-relaxed">
                      <span className="text-accent/80">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          <div
            className="prose prose-invert prose-xl w-full max-w-none
              prose-headings:scroll-mt-24
              prose-headings:font-bold
              prose-h1:text-4xl prose-h1:bg-gradient-to-br prose-h1:from-white prose-h1:to-white/70 prose-h1:bg-clip-text prose-h1:text-transparent
              prose-h2:text-2xl prose-h2:text-white/90 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
              prose-h3:text-xl prose-h3:text-white/80
              prose-h4:text-lg prose-h4:text-white/70
              prose-p:text-justify
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg
              prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
              prose-code:text-blue-400 prose-code:before:content-none prose-code:after:content-none
              [&_h1_.heading-link]:bg-gradient-to-br [&_h1_.heading-link]:from-white [&_h1_.heading-link]:to-white/70 [&_h1_.heading-link]:bg-clip-text [&_h1_.heading-link]:text-transparent
              [&_h2_.heading-link]:text-white/90
              [&_h3_.heading-link]:text-white/80
              [&_h4_.heading-link]:text-white/70
              [&_.heading-link]:no-underline [&_.heading-link]:cursor-pointer
              hover:[&_.heading-link]:text-accent/90 hover:[&_.heading-link]:no-underline
              [&_.heading-link]:transition-colors [&_.heading-link]:duration-200
              [&_.heading-link]:block [&_.heading-link]:w-fit"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </motion.div>

        {(nextArticle || prevArticle) && (
          <nav className="mt-12 pt-12 border-t border-zinc-800 w-full">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              {prevArticle && (
                <Link href={prevArticle.link || '#'} className="block flex-1">
                  <motion.div
                    className="p-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <article
                      className="group relative p-4 pt-6 backdrop-blur-sm rounded-xl border border-white/5
                      transition-all duration-200 flex flex-col bg-white/[0.02] hover:bg-white/[0.06]"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                          <span className="i-lucide-arrow-left h-3 w-3" />
                          Previous Article
                        </span>
                        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-accent transition-colors ml-[18px]">
                          {prevArticle.title}
                        </h3>
                      </div>
                    </article>
                  </motion.div>
                </Link>
              )}

              {nextArticle && (
                <Link href={nextArticle.link || '#'} className="block flex-1">
                  <motion.div
                    className="p-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <article
                      className="group relative p-4 pt-6 backdrop-blur-sm rounded-xl border border-white/5
                      transition-all duration-200 flex flex-col bg-white/[0.02] hover:bg-white/[0.06]"
                    >
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                          Next Article
                          <span className="i-lucide-arrow-right h-3 w-3" />
                        </span>
                        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-accent transition-colors mr-[18px]">
                          {nextArticle.title}
                        </h3>
                      </div>
                    </article>
                  </motion.div>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </article>
  );
});

ArticleContent.displayName = 'ArticleContent';

export default ArticleContent;
