import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Content, FeaturedSectionProps } from '@/lib/types';
import FeaturedCard from './FeaturedCard';

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredContent = useMemo(() => content?.slice(0, 6) || [], [content]);
  const totalSlides = Math.ceil(featuredContent.length / 2);

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

  if (featuredContent.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0 flex gap-4">
                {featuredContent.slice(slideIndex * 2, slideIndex * 2 + 2).map((item, index) => (
                  <div key={item.id} className="w-1/2">
                    <FeaturedCard 
                      article={item} 
                      priority={slideIndex === 0 && index === 0} 
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => changeSlide(-1)}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => changeSlide(1)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
      </div>
    </section>
  );
};

export default FeaturedSection;
