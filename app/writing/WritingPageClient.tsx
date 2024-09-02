'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Content {
  id: string;
  slug: string;
  title: string;
  image?: string;
  type: 'article' | 'review' | 'interview' | 'sheet-music';
}

interface WritingPageClientProps {
  contentType?: 'article' | 'review' | 'interview' | 'sheet-music';
  allContent: Content[];
}

const ArticleCard: React.FC<{ article: Content }> = React.memo(({ article }) => {
  const imageSrc =
    article.image && (article.image.startsWith('/') || article.image.startsWith('http'))
      ? article.image
      : '/placeholder.jpg';

  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
      <Link href={`/writing/${article.slug}`}>
        <div className="relative h-full cursor-pointer">
          <Image
            src={imageSrc}
            alt={`Cover image for ${article.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg';
            }}
            priority={true}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
            <h2 className="text-2xl font-bold mb-1">{article.title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
});

ArticleCard.displayName = 'ArticleCard';

const WritingPageClient: React.FC<WritingPageClientProps> = ({ contentType, allContent }) => {
  const [mounted, setMounted] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [randomArticles, setRandomArticles] = useState<Content[]>([]);

  const { contentArray, featuredArticles } = useMemo(() => {
    const array = Array.isArray(allContent) ? allContent : [];
    return {
      contentArray: array,
      featuredArticles: array.slice(0, 3),
    };
  }, [allContent]);

  const refreshRandomArticles = React.useCallback(() => {
    const filteredContent = contentArray.filter((content) => {
      if (featuredArticles.some((featured) => featured.id === content.id)) return false;
      if (contentType && content.type !== contentType) return false;
      return true;
    });

    const shuffled = [...filteredContent].sort(() => Math.random() - 0.5);
    setRandomArticles(shuffled.slice(0, 5));
  }, [contentArray, featuredArticles, contentType]);

  useEffect(() => {
    setMounted(true);
    refreshRandomArticles();
  }, [refreshRandomArticles]);

  const handlePrevArticle = () => {
    setCurrentArticleIndex(
      (prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length
    );
  };

  const handleNextArticle = () => {
    setCurrentArticleIndex((prev) => (prev + 1) % featuredArticles.length);
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#121212] text-white min-h-screen"
    >
      {/* SubHeader */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 mb-8 container"
      >
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold"
          >
            Writing
          </motion.h1>
          <nav className="navbar-links hidden md:block">
            <ul className="flex gap-6">
              {contentType && (
                <li>
                  <Link
                    href="/writing"
                    className="text-gray-200 transition-all duration-300 focus:outline-none hover:text-gray-500"
                  >
                    All
                  </Link>
                </li>
              )}
              {['Articles', 'Reviews', 'Interviews'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/writing?type=${item.toLowerCase().slice(0, -1)}`}
                    className={`text-gray-200 text-lg transition-all duration-300 focus:outline-none ${
                      contentType === item.toLowerCase().slice(0, -1)
                        ? 'text-gray-500'
                        : 'hover:text-gray-500'
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container mb-8"
      >
        <div className="grid grid-cols-3 gap-6">
          {/* Featured Articles Section */}
          <section className="col-span-2">
            <div className="relative h-[calc(3*100px+3rem)] rounded-lg overflow-hidden">
              <ArticleCard article={featuredArticles[currentArticleIndex]} />
              <button
                onClick={handlePrevArticle}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition-all duration-300"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextArticle}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition-all duration-300"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          </section>

          {/* Random Section */}
          <aside className="col-span-1">
            <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg h-[calc(3*100px+3rem)] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Random</h2>
                <button
                  onClick={refreshRandomArticles}
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto flex-grow no-scrollbar">
                {randomArticles.length > 0 ? (
                  <ul className="space-y-4">
                    {randomArticles.map((content, index) => (
                      <li
                        key={index}
                        className="bg-[#242424] hover:bg-[#2a2a2a] transition-all duration-300 rounded-lg overflow-hidden shadow-md h-[100px]"
                      >
                        <Link href={`/writing/${content.slug}`}>
                          <div className="flex items-center p-3 h-full">
                            <div className="relative w-14 h-14 flex-shrink-0">
                              <Image
                                src={
                                  content.image &&
                                  (content.image.startsWith('/') ||
                                    content.image.startsWith('http'))
                                    ? content.image
                                    : '/placeholder.jpg'
                                }
                                alt={`Thumbnail for ${content.title}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                }}
                                priority={true}
                              />
                            </div>
                            <div className="ml-3 overflow-hidden flex-grow">
                              <h3 className="text-sm font-semibold line-clamp-2">
                                {content.title}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No content available at the moment.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </motion.main>

      {/* Archives */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="container"
      >
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: 'Articles',
              description: 'Tech & Finance',
              link: '/writing/articles',
            },
            {
              title: 'Reviews',
              description: 'Books & Products',
              link: '/writing/reviews',
            },
            {
              title: 'Interviews',
              description: 'Founders & Builders',
              link: '/writing/interviews',
            },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Link
                href={category.link}
                className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg hover:bg-[#242424] transition-all duration-300 group h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{category.description}</p>
                </div>
                <div className="text-blue-400 inline-flex items-center group-hover:underline mt-4">
                  View All
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

WritingPageClient.displayName = 'WritingPageClient';

export default React.memo(WritingPageClient);
