'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Content } from '@/lib/types';

export default function InterviewsArchive() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<Content[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch('/api/interviews');
        const items = await response.json();
        setInterviews(items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) =>
      interview.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [interviews, searchTerm]);

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="sticky top-0 z-10 bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Interviews Archive</h1>
          <input
            type="text"
            placeholder="Search interviews..."
            className="w-1/3 px-4 py-2 rounded-full bg-inherit focus:outline-none focus:ring-2 focus:ring-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-inherit rounded-lg overflow-hidden">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Read Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredInterviews.map((interview) => (
                  <motion.tr
                    key={interview.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                    className="cursor-pointer"
                    onClick={() => router.push(`/writing/${interview.slug}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="w-12 h-12">
                        <Image
                          src={interview.image}
                          alt={interview.title}
                          width={50}
                          height={50}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                      <div className="ml-4 text-sm font-medium text-gray-300">{interview.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {interview.tags ? (
                          interview.tags.map((tag, index) => (
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
                      <div className="text-sm text-gray-400">{interview.readTime} min</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}