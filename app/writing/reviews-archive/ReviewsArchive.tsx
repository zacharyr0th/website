'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';

interface ReviewsArchiveProps {
  initialReviews: ContentItem[];
}

export default function ReviewsArchive({ initialReviews }: ReviewsArchiveProps) {
  const router = useRouter();
  const [reviews, setReviews] = useState<ContentItem[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('ReviewsArchive mounted with', reviews.length, 'reviews');
    }
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (!searchTerm) return reviews;
    const searchRegex = new RegExp(searchTerm.split('').join('.*'), 'i');
    return reviews.filter(
      (review) =>
        searchRegex.test(review.title) ||
        review.tags?.some((tag) => searchRegex.test(tag)) ||
        (review.bookAuthor && searchRegex.test(review.bookAuthor))
    );
  }, [reviews, searchTerm]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('default', { month: 'short', year: 'numeric' });
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
  }, []);

  const handleReviewClick = useCallback((slug: string) => {
    router.push(`/writing/${slug || ''}`);
  }, [router]);

  if (reviews.length === 0) {
    return <div>No reviews available. Please check the console for more information.</div>;
  }

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="relative">
            <button onClick={toggleDropdown} className="text-4xl font-bold flex items-center">
              Reviews Archive
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-800">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    href="/writing/reviews"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    role="menuitem"
                  >
                    Reviews Archive
                  </Link>
                  <Link
                    href="/writing/articles"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    role="menuitem"
                  >
                    Articles Archive
                  </Link>
                  <Link
                    href="/writing/interviews"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    role="menuitem"
                  >
                    Interviews Archive
                  </Link>
                </div>
              </div>
            )}
          </div>
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-inherit rounded-lg overflow-hidden">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Book Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Read Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredReviews.map((review) => (
                <motion.tr
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                  className="cursor-pointer"
                  onClick={() => handleReviewClick(review.slug || '')}
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <div className="w-12 h-12">
                      <Image
                        src={review.image || '/images/placeholder.webp'}
                        alt={review.title}
                        width={50}
                        height={50}
                        className="rounded-full object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 text-sm font-medium text-gray-300">{review.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{review.bookAuthor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {review.tags ? (
                        review.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No tags</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{formatDate(review.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{review.readTime} min</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
