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
    <article className="max-w-none pt-4 sm:pt-6">
      <div className="max-w-[650px] mx-auto">
        <header className="mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <div className="space-y-3">
              <h1
                className="text-[clamp(2.5rem,6vw,3.25rem)] mb-4 sm:mb-6 font-mono font-light tracking-[-0.03em] text-white"
                style={{ textShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              >
                {title}
              </h1>
              {description && (
                <p className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 tracking-wide text-white/60 font-mono font-light max-w-[45ch] mx-auto sm:mx-0">
                  {description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-6 text-sm sm:text-base text-white/60 font-mono font-light w-full overflow-x-auto no-scrollbar sm:pl-0">
              {date && (
                <time
                  dateTime={date}
                  className="flex items-center gap-1.5 whitespace-nowrap shrink-0 px-1 sm:p-0"
                >
                  <span className="i-lucide-calendar h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-70" />
                  <span className="sm:hidden font-mono">{formatDateCompact(date)}</span>
                  <span className="hidden sm:inline font-mono">{formatDate(date)}</span>
                </time>
              )}

              {category && (
                <>
                  <div className="w-[1px] h-3 bg-white/20 shrink-0 mr-2 ml-0.5 sm:ml-0" />
                  <span className="flex items-center gap-1 whitespace-nowrap shrink-0 pl-0 pr-2">
                    <span className="i-lucide-folder h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-70" />
                    <span className="capitalize font-mono">{category}</span>
                  </span>
                </>
              )}

              {tags && tags.length > 0 && (
                <>
                  <div className="w-[1px] h-3 bg-white/20 shrink-0 mx-1" />
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[0.7rem] sm:text-xs rounded-full bg-white/[0.03] whitespace-nowrap border border-white/[0.06] shrink-0 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
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
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors shadow-lg">
                <h2 className="text-2xl font-mono font-semibold mb-8 text-white/90 tracking-tight">
                  Key Takeaways
                </h2>
                <ul className="space-y-6">
                  {takeaways.map((point, index) => (
                    <li
                      key={index}
                      className="flex gap-4 text-white/70 text-lg sm:text-xl leading-normal tracking-wide font-light"
                    >
                      <span className="text-accent/80 text-2xl leading-none mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          <div
            className="prose prose-invert w-full max-w-none prose-base sm:prose-lg lg:prose-xl [&>p]:!font-sans [&>p]:!text-[clamp(1.25rem,calc(1.1rem+0.5vw),1.5rem)] [&>p]:!text-white/60 [&>p]:!leading-normal [&>p]:!tracking-wide [&>p]:!font-light [&>p]:!max-w-none"
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
