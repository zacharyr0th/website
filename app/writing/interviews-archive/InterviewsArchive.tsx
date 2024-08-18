'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';

interface InterviewsArchiveProps {
  initialInterviews: ContentItem[];
}

export default function InterviewsArchive({ initialInterviews }: InterviewsArchiveProps) {
  const router = useRouter();
  const [interviews, setInterviews] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setInterviews(initialInterviews);
    setIsClient(true);
    if (process.env.NODE_ENV !== 'production') {
      console.log('InterviewsArchive mounted with', initialInterviews.length, 'interviews');
    }
  }, [initialInterviews]);

  const filteredInterviews = useMemo(() => {
    return interviews.filter(
      (interview) =>
        interview.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        interview.bookAuthor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [interviews, searchTerm]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  if (interviews.length === 0) {
    return <div>No interviews available. Please check the console for more information.</div>;
  }

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="relative">
            <button onClick={toggleDropdown} className="text-4xl font-bold flex items-center">
              Interviews Archive
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
          {isClient && (
            <input
              type="text"
              placeholder="Search interviews..."
              className="w-1/3 px-4 py-2 rounded-full bg-inherit focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
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
                  Interviewee
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
              {filteredInterviews.map((interview) => (
                <Link
                  key={interview.id}
                  href={interview.slug ? `/writing/${interview.slug}` : '#'}
                  passHref
                  legacyBehavior
                >
                  <motion.tr
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                    className="cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="w-12 h-12">
                        <Image
                          src={interview.image || '/images/placeholder.webp'}
                          alt={interview.title}
                          width={50}
                          height={50}
                          className="rounded-full object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="ml-4 text-sm font-medium text-gray-300">
                        {interview.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{interview.bookAuthor}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {interview.tags ? (
                          interview.tags.map((tag: string, index: number) => (
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
                      <div className="text-sm text-gray-300">{formatDate(interview.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{interview.readTime} min</div>
                    </td>
                  </motion.tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
