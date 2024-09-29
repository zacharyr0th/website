'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Content {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  image?: string;
  type: 'article' | 'review' | 'interview' | 'sheet-music';
}

interface WritingPageClientProps {
  allContent: Content[];
}

const WritingPageClient: React.FC<WritingPageClientProps> = ({ allContent }) => {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredContent = useMemo(() => {
    return activeCategory === 'all'
      ? allContent
      : allContent.filter(item => item.type === activeCategory);
  }, [allContent, activeCategory]);

  if (!mounted) return null;

  return (
    <motion.div className="bg-[#121212] text-white min-h-screen">
      <HeroSection />
      <motion.main className="container mx-auto px-4">
        <FeaturedSection content={allContent} />
        <CategoryTiles />
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <ContentGrid content={filteredContent} />
        <NewsletterSignup />
      </motion.main>
    </motion.div>
  );
};

const HeroSection: React.FC = () => (
  <section className="bg-[#121212] text-white py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Writing</h1>
      <p className="text-xl mb-8">Explore articles, reviews, and interviews on tech, finance, and more.</p>
      <Link href="/writing/articles" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block">
        Start Reading
      </Link>
    </div>
  </section>
);

const FeaturedSection: React.FC<{ content: Content[] }> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredContent = useMemo(() => content.slice(0, 6), [content]);
  const totalSlides = Math.ceil(featuredContent.length / 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 10000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const changeSlide = useCallback((direction: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + direction + totalSlides) % totalSlides);
  }, [totalSlides]);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Featured</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0 flex gap-4">
                {featuredContent.slice(slideIndex * 2, slideIndex * 2 + 2).map((item) => (
                  <div key={item.id} className="w-1/2">
                    <FeaturedCard article={item} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => changeSlide(-1)}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={() => changeSlide(1)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

const FeaturedCard: React.FC<{ article: Content }> = React.memo(({ article }) => (
  <Link href={`/writing/${article.slug}`}>
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-auto max-w-2xl">
      <div className="relative h-64">
        <Image
          src={article.image || '/placeholder.jpg'}
          alt={`Cover image for ${article.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          loading="eager"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
        {article.subtitle && <p className="text-gray-400 text-lg">{article.subtitle}</p>}
      </div>
    </div>
  </Link>
));

const ArticleCard: React.FC<{ article: Content }> = React.memo(({ article }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '300px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.1 }}
      className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <Link href={`/writing/${article.slug}`}>
        <div className="relative h-48 group">
          <Image
            src={article.image || '/placeholder.jpg'}
            alt={`Cover image for ${article.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-bold">Read More</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          {article.subtitle && <p className="text-gray-400">{article.subtitle}</p>}
        </div>
      </Link>
    </motion.div>
  );
});

const CategoryTiles: React.FC = () => {
  const categories = [
    { title: 'Articles', description: 'Tech & Finance', link: '/writing/articles' },
    { title: 'Reviews', description: 'Books & Products', link: '/writing/reviews' },
    { title: 'Interviews', description: 'Founders & Builders', link: '/writing/interviews' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <Link
              href={category.link}
              className="block bg-[#1a1a1a] p-6 rounded-lg shadow-lg hover:bg-[#242424] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
              <p className="text-gray-400 text-lg mb-4">{category.description}</p>
              <span className="text-blue-400 inline-flex items-center">
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
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const Categories: React.FC<{
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}> = React.memo(({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'article', name: 'Articles' },
    { id: 'review', name: 'Reviews' },
    { id: 'interview', name: 'Interviews' },
  ];

  return (
    <section className="py-12">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
});

const ContentGrid: React.FC<{ content: Content[] }> = React.memo(({ content }) => (
  <section className="py-12">
    <AnimatePresence>
      <motion.div
        key={content.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {content.map((item) => (
          <ArticleCard key={item.id} article={item} />
        ))}
      </motion.div>
    </AnimatePresence>
  </section>
));

const NewsletterSignup: React.FC = () => (
  <section className="bg-[#1a1a1a] py-12">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
      <p className="text-xl text-gray-300 mb-8">Subscribe to my newsletter for the latest articles and insights</p>
      <form className="max-w-md mx-auto">
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-l-full bg-white text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-r-full transition duration-300"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </section>
);

FeaturedCard.displayName = 'FeaturedCard';
ArticleCard.displayName = 'ArticleCard';
Categories.displayName = 'Categories';
ContentGrid.displayName = 'ContentGrid';

export default React.memo(WritingPageClient);