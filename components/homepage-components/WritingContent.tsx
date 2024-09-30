import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { featuredWriting } from '../../app/writing/components/featuredWriting';
import CategoryTiles from '../../app/writing/components/CategoryTiles';

const WritingContent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(featuredWriting.length / 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 10000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const changeSlide = useCallback(
    (direction: number) => {
      setCurrentIndex((prevIndex) => (prevIndex + direction + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const slides = useMemo(() => {
    return Array.from({ length: totalSlides }).map((_, slideIndex) => (
      <div key={slideIndex} className="w-full flex-shrink-0 flex gap-4">
        {featuredWriting.slice(slideIndex * 2, slideIndex * 2 + 2).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    ));
  }, [totalSlides]);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Articles</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides}
          </motion.div>
        </div>
        <SlideButton direction="left" onClick={() => changeSlide(-1)} />
        <SlideButton direction="right" onClick={() => changeSlide(1)} />
        <SlideIndicators
          totalSlides={totalSlides}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>

      <h2 className="text-2xl font-bold mb-6 mt-12 text-center">Writing Archives</h2>
      <CategoryTiles />
    </section>
  );
};

const ArticleCard: React.FC<{ article: (typeof featuredWriting)[0] }> = ({ article }) => (
  <Link href={article.link} className="w-1/2">
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-auto max-w-2xl">
      <div className="relative h-64">
        <Image
          src={article.image}
          alt={`Cover image for ${article.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          loading="eager"
          priority
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
        {article.subtitle && <p className="text-gray-400 text-lg">{article.subtitle}</p>}
      </div>
    </div>
  </Link>
);

const SlideButton: React.FC<{ direction: 'left' | 'right'; onClick: () => void }> = ({
  direction,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 ${
      direction === 'left' ? 'left-4' : 'right-4'
    } transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  </button>
);

const SlideIndicators: React.FC<{
  totalSlides: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}> = ({ totalSlides, currentIndex, setCurrentIndex }) => (
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {Array.from({ length: totalSlides }).map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`w-3 h-3 rounded-full ${
          index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
        } transition-all duration-300`}
      />
    ))}
  </div>
);

export default WritingContent;
