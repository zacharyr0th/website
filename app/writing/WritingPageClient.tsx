"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Content {
  id: string;
  slug: string;
  title: string;
  image: string;
  pageViews: number;
  type: 'article' | 'review' | 'interview';
  description?: string;
}

interface WritingPageClientProps {
  initialContent: Content[];
  contentType?: 'article' | 'review' | 'interview';
}

const hardcodedFeaturedArticles: Content[] = [
  {
    id: 'forty-audiobooks',
    slug: 'forty-audiobooks',
    title: 'Forty Audiobooks',
    image: '/placeholder.jpg',
    pageViews: 1000,
    type: 'article',
  },
  {
    id: 'blockchains-in-africa',
    slug: 'blockchains-in-africa',
    title: "Blockchains in Africa",
    image: '/placeholder.jpg',
    pageViews: 1000,
    type: 'article',
  },
  {
    id: 'derivative-markets-and-spot-prices',
    slug: 'derivatives-markets-and-spot-prices',
    title: "Derivatives Markets and Spot Prices",
    image: '/placeholder.jpg',
    pageViews: 1000,
    type: 'article',
  },
];

const categoryDescriptions: { [key: string]: string } = {
  Articles: 'Technology & Finance',
  Reviews: 'Books & Products',
  Interviews: 'Founders & Builders',
};

const WritingPageClient: React.FC<WritingPageClientProps> = ({ initialContent, contentType }) => {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const filteredContent = useMemo(() => 
    contentType ? initialContent.filter(content => content.type === contentType) : initialContent,
    [initialContent, contentType]
  );

  const featuredArticles = useMemo(() => 
    contentType ? filteredContent : hardcodedFeaturedArticles,
    [contentType, filteredContent]
  );

  const popularArticles = useMemo(() => {
    if (!isClient) return [];
    let contentToShuffle = [...initialContent];
    if (contentType) {
      contentToShuffle = initialContent.filter(content => content.type === contentType);
    }
    
    // Fisher-Yates shuffle algorithm
    for (let i = contentToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [contentToShuffle[i], contentToShuffle[j]] = [contentToShuffle[j], contentToShuffle[i]];
    }
    
    return contentToShuffle.slice(0, 5);
  }, [initialContent, contentType, isClient]);

  const handleManualSwitch = useCallback((direction: 'next' | 'prev') => {
    setCurrentArticleIndex(prevIndex => 
      direction === 'next'
        ? (prevIndex + 1) % featuredArticles.length
        : (prevIndex - 1 + featuredArticles.length) % featuredArticles.length
    );
  }, [featuredArticles.length]);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => handleManualSwitch('next'), 10000);
    return () => clearInterval(interval);
  }, [handleManualSwitch]);

  const ArticleCard: React.FC<{ article: Content }> = ({ article }) => {
    const imageSrc = article.image.startsWith('/') || article.image.startsWith('http') ? article.image : '/placeholder.jpg';

    return (
      <motion.div
        key={article.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]"
      >
        <Link href={`/writing/${article.slug}`}>
          <div className="relative h-full cursor-pointer">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
                priority
              />
            )}
            <div className={`absolute bottom-0 left-0 right-0 p-4 ${article.image ? 'bg-gradient-to-t from-black via-black/80 to-transparent' : ''}`}>
              <h2 className="text-2xl font-bold mb-1">{article.title}</h2>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="writing-container">
      {/* SubHeader */}
      <header className="writing-header">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Writing</h1>
          <nav className="writing-nav">
            <ul className="flex space-x-6">
              {contentType && (
                <li>
                  <Link href="/writing" className="nav-item">
                    All
                  </Link>
                </li>
              )}
              {['Articles', 'Reviews', 'Interviews'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/writing?type=${item.toLowerCase().slice(0, -1)}`}
                    className={`nav-item ${contentType === item.toLowerCase().slice(0, -1) ? 'active' : ''}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Featured Articles Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-2/3">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                {featuredArticles.map((article, index) => (
                  index === currentArticleIndex && <ArticleCard key={article.id} article={article} />
                ))}
              </AnimatePresence>
              <button
                onClick={() => handleManualSwitch('prev')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-all duration-300"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleManualSwitch('next')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-all duration-300"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </section>

          {/* Random Section */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg h-[400px] flex flex-col">
              <h2 className="text-xl font-bold mb-3">Random</h2>
              <div className="overflow-y-auto flex-grow">
                {popularArticles.length > 0 ? (
                  <ul className="space-y-4">
                    {popularArticles.map((content) => (
                      <li key={content.id} className="bg-[#242424] hover:bg-[#2a2a2a] transition-all duration-300 rounded-lg overflow-hidden shadow-md">
                        <Link href={`/writing/${content.slug}`}>
                          <div className="flex items-center p-3">
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={content.image.startsWith('/') || content.image.startsWith('http') ? content.image : '/placeholder.jpg'}
                                alt={content.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
                              />
                            </div>
                            <div className="ml-3 overflow-hidden">
                              <h3 className="text-sm font-semibold line-clamp-2">{content.title}</h3>
                              <p className="text-xs text-gray-400 mt-1">{content.type.charAt(0).toUpperCase() + content.type.slice(1)}</p>
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
      <section className="container mx-auto px-4 my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Articles', 'Reviews', 'Interviews'].map((category) => (
            <div key={category} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg hover:bg-[#242424] transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <p className="text-gray-400 mb-4">{categoryDescriptions[category]}</p>
              <Link 
                href={`/writing/${category.toLowerCase()}`} 
                className="text-blue-400 hover:text-blue-300 inline-flex items-center"
              >
                View All 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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