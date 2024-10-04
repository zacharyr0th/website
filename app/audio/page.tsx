'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const categories = [
  { title: 'Recordings', description: 'Full discography', slug: 'recordings' },
  { title: 'Compositions', description: 'Originals', slug: 'compositions' },
  { title: 'Theory', description: 'Mainly exploratory', slug: 'theory' },
  { title: 'Sheet Music', description: 'Useful notation', slug: 'sheet-music' },
  { title: 'Datasets', description: 'With many usecases', slug: 'datasets' },
  { title: 'Archive', description: 'History', slug: 'archive' },
];

const CategoryCard = memo(
  ({
    category,
    index,
  }: {
    category: { title: string; description: string; slug: string };
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/music/${category.slug}`} className="block">
        <motion.div className="bg-inherit rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:bg-[#242424]">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">{category.title}</h2>
            <p className="text-gray-400 mb-4">{category.description}</p>
            <div className="text-blue-400 hover:text-blue-300 inline-flex items-center">
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
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"></div>
        </motion.div>
      </Link>
    </motion.div>
  )
);

CategoryCard.displayName = 'CategoryCard';

const MemoizedCategoryCard = memo(CategoryCard);
MemoizedCategoryCard.displayName = 'MemoizedCategoryCard';

const AudioPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-inherit text-white min-h-screen"
    >
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 mb-8 container mx-auto px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold mb-4"
        >
          John Doe's Music Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Composer | Performer | Music Theorist
        </motion.p>
      </motion.header>

      <main className="container mx-auto px-4">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={`/placeholder-image-${item}.jpg`}
                  alt={`Featured work ${item}`}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Featured Work {item}</h3>
                  <p className="text-gray-400 mb-4">Brief description of the work...</p>
                  <Link
                    href={`/music/featured/${item}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Explore Music Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <MemoizedCategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((event) => (
              <motion.div
                key={event}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: event * 0.1 }}
                className="bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">Event {event} Title</h3>
                <p className="text-gray-400 mb-2">Date: Month Day, Year</p>
                <p className="text-gray-400 mb-4">Location: Venue Name, City</p>
                <Link href={`/music/events/${event}`} className="text-blue-400 hover:text-blue-300">
                  Event Details
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">About the Artist</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Image
                src="/artist-photo.jpg"
                alt="John Doe"
                width={200}
                height={200}
                className="rounded-full w-48 h-48 object-cover"
              />
              <div>
                <h3 className="text-2xl font-semibold mb-4">John Doe</h3>
                <p className="text-gray-300 mb-4">
                  John Doe is a versatile musician with over 15 years of experience in composition,
                  performance, and music theory. His work spans multiple genres and has been
                  featured in various international festivals and concerts.
                </p>
                <Link href="/about" className="text-blue-400 hover:text-blue-300">
                  Read Full Bio
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
};

AudioPage.displayName = 'AudioPage';

export default AudioPage;
