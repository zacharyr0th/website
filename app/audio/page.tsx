'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  { title: 'Recordings', description: 'Full discography', slug: 'recordings' },
  { title: 'Compositions', description: 'Originals', slug: 'compositions' },
  { title: 'Theory', description: 'Mainly exploratory', slug: 'theory' },
  { title: 'Sheet Music', description: 'Useful notation', slug: 'sheet-music' },
  { title: 'Datasets', description: 'With many usecases', slug: 'datasets' },
  { title: 'Archive', description: 'History', slug: 'archive' },
];

const AudioPage = () => {
  return (
    <div className="home-container bg-[#121212] text-white min-h-screen">
      <style jsx global>{`
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        .nav-link span {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .nav-link:hover span {
          transform: scale(1.1);
        }
        .active-link span {
          font-weight: base;
        }
      `}</style>

      {/* SubHeader */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 mb-2"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold"
          >
            Audio
          </motion.h1>
        </div>
      </motion.header>

      <main className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="rounded-lg shadow-lg">
                <Image
                  src="/placeholder.webp"
                  alt="Description of the image"
                  width={1400}
                  height={1000}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-300 leading-relaxed p-4 rounded-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
                vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Curabitur a
                est vel leo fermentum consequat. Donec vel turpis nec sapien bibendum bibendum.
                Aliquam erat volutpat. Integer ut nulla ac erat suscipit suscipit. Nulla ut augue ac
                orci auctor fermentum.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/audio/${category.slug}`} className="block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-inherit rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700"
                >
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default AudioPage;
