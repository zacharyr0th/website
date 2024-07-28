'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../styles/pages/WritingPage.module.css';

interface Content {
  id: string;
  slug: string;
  title: string;
  image?: string;
  type: 'article' | 'review' | 'interview';
}

interface WritingPageClientProps {
  contentType?: 'article' | 'review' | 'interview';
  allContent: Content[];
}

const WritingPageClient: React.FC<WritingPageClientProps> = ({ contentType, allContent }) => {
  const [mounted, setMounted] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [randomizedContent, setRandomizedContent] = useState<Content[]>([]);

  useEffect(() => {
    setMounted(true);
    // Ensure allContent is an array before sorting and slicing
    const contentArray = Array.isArray(allContent) ? allContent : [];
    setRandomizedContent(contentArray.sort(() => Math.random() - 0.5).slice(0, 5));
  }, [allContent]);

  // Ensure allContent is an array
  const contentArray = Array.isArray(allContent) ? allContent : [];

  const featuredArticles = contentArray.slice(0, 3);
  const popularArticles = mounted ? randomizedContent : contentArray.slice(0, 5);

  const categoryDescriptions: Record<string, string> = {
    Articles: 'Technology & Finance',
    Reviews: 'Books & Products',
    Interviews: 'Founders & Builders',
  };

  const ArticleCard: React.FC<{ article: Content }> = ({ article }) => {
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
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h2 className="text-2xl font-bold mb-1">{article.title}</h2>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const handlePrevArticle = () => {
    setCurrentArticleIndex(
      (prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length
    );
  };

  const handleNextArticle = () => {
    setCurrentArticleIndex((prev) => (prev + 1) % featuredArticles.length);
  };

  if (!mounted) {
    return null; // Return null on server-side and first client-side render
  }

  return (
    <div className="home-container">
      {/* SubHeader */}
      <header className="py-6 mb-8">
        <div className="container flex justify-between items-center">
          <h1 className="text-4xl font-bold">Writing</h1>
          <nav className="navbar-links">
            <ul className="flex gap-4">
              {contentType && (
                <li>
                  <Link href="/writing" className="nav-link">
                    <span>All</span>
                  </Link>
                </li>
              )}
              {['Articles', 'Reviews', 'Interviews'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/writing?type=${item.toLowerCase().slice(0, -1)}`}
                    className={`nav-link ${
                      contentType === item.toLowerCase().slice(0, -1) ? 'active-link' : ''
                    }`}
                  >
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container">
        {/* Featured Articles Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <section className="w-full lg:w-2/3">
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
          <aside className="w-full lg:w-1/3">
            <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg h-[calc(3*100px+3rem)] flex flex-col">
              <h2 className="text-xl font-bold mb-3">Random</h2>
              <div className="overflow-y-auto flex-grow popular-articles hover-scroll">
                {popularArticles.length > 0 ? (
                  <ul className="space-y-3 pr-2">
                    {popularArticles.map((content) => (
                      <li
                        key={content.id}
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
      </main>

      {/* Archives */}
      <section className="container my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Articles', 'Reviews', 'Interviews'].map((category) => (
            <div
              key={category}
              className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg hover:bg-[#242424] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <p className="text-gray-400 mb-4">{categoryDescriptions[category]}</p>
              <Link
                href={`/writing/${category.toLowerCase()}`}
                className="text-blue-400 hover:text-blue-300 inline-flex items-center"
              >
                View All
                <svg
                  className="w-4 h-4 ml-2"
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
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WritingPageClient;