'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaSearch, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';

interface Recording {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  coverArt: string;
}

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Recording[]>([
    {
      id: 1,
      title: "we'll die in california",
      artist: 'X Li',
      duration: '3:45',
      genre: 'Alternative Rock',
      coverArt: '/images/california.jpg',
    },
    {
      id: 2,
      title: 'Tell Me The Truth',
      artist: 'Two Feet',
      duration: '4:12',
      genre: 'Alternative Rock',
      coverArt: '/images/truth.jpg',
    },
    {
      id: 3,
      title: 'If You Tried ft VÉRITÉ',
      artist: 'TOMI',
      duration: '3:30',
      genre: 'Alternative Rock',
      coverArt: '/images/if-you-tried.jpg',
    },
    {
      id: 4,
      title: 'Number',
      artist: 'SLOE JACK',
      duration: '3:15',
      genre: 'Alternative Rock',
      coverArt: '/images/number.jpg',
    },
    // Add more recordings as needed
  ]);

  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [genre, setGenre] = useState<string>('Alternative Rock');
  const [sort, setSort] = useState<'Volume (High to Low)' | 'Volume (Low to High)'>(
    'Volume (High to Low)'
  );

  // ... (keep the existing useEffect, togglePlay, and toggleFavorite functions)

  const filteredRecordings = recordings.filter(
    (recording) =>
      recording.genre === genre &&
      (recording.title.toLowerCase().includes(filter.toLowerCase()) ||
        recording.artist.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sounds</h1>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for anything on Sound"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full">Sign in</button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <select
                value="Availability"
                onChange={() => {}}
                className="appearance-none bg-gray-200 px-4 py-2 pr-8 rounded-md focus:outline-none"
              >
                <option>Availability</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>
            <div className="relative">
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="appearance-none bg-gray-200 px-4 py-2 pr-8 rounded-md focus:outline-none"
              >
                <option>Alternative Rock</option>
                {/* Add more genre options */}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as 'Volume (High to Low)' | 'Volume (Low to High)')
              }
              className="appearance-none bg-gray-200 px-4 py-2 pr-8 rounded-md focus:outline-none"
            >
              <option>Volume (High to Low)</option>
              <option>Volume (Low to High)</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredRecordings.map((recording) => (
              <motion.div
                key={recording.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative aspect-square">
                  <Image
                    src={recording.coverArt}
                    alt={recording.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <button
                    onClick={() => togglePlay(recording.id)}
                    className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-md"
                  >
                    {currentlyPlaying === recording.id ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate">{recording.title}</h2>
                  <p className="text-gray-600 truncate">{recording.artist}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/images/paper-cuts.jpg"
              alt="Now Playing"
              width={40}
              height={40}
              className="rounded"
            />
            <div className="ml-3">
              <p className="font-semibold">Paper Cuts</p>
              <p className="text-sm text-gray-600">Laszewo</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button>
              <FaPlay />
            </button>
            <div className="w-64 h-1 bg-gray-200 rounded-full">
              <div className="w-1/3 h-full bg-gray-600 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-600">0:02 / 3:30</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
