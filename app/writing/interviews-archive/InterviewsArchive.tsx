'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';

interface ReviewsArchiveProps {
  initialReviews: ContentItem[];
}

export default function ReviewsArchive({ initialReviews }: ReviewsArchiveProps) {
  const [reviews, setReviews] = useState<ContentItem[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) =>
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      review.bookAuthor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reviews, searchTerm]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('ReviewsArchive mounted with', reviews.length, 'reviews');
    }
  }, [reviews]);

  if (reviews.length === 0) {
    return <div>No reviews available. Please check the console for more information.</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="sticky top-0 z-10 bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Reviews Archive</h1>
          <input
            type="text"
            placeholder="Search reviews..."
            className="w-1/3 px-4 py-2 rounded-full bg-inherit focus:outline-none focus:ring-2 focus:ring-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={review.image || '/images/placeholder.webp'}
                alt={review.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{review.title}</h2>
                <p className="text-gray-400 mb-4">{review.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 mr-2">By {review.bookAuthor}</span>
                  <span className="text-gray-400">{formatDate(review.date)}</span>
                </div>
                <Link href={`/writing/${review.slug}`} passHref>
                  <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Read More
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}