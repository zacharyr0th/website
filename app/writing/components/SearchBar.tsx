'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import type { ContentItem } from '@/lib/types';

interface SearchBarProps {
  content: ContentItem[];
}

const SearchBar: React.FC<SearchBarProps> = ({ content }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('Content items:', content);
  }, [content]);

  const filteredContent = content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.bookAuthor && item.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleItemClick = (slug: string) => {
    router.push(`/writing/${slug || ''}`);
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full py-3 px-6 rounded-full bg-inherit/80 text-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log('Search term:', e.target.value);
          }}
          onFocus={() => {
            setIsSearchFocused(true);
            console.log('Search focused');
          }}
          onBlur={() => {
            setTimeout(() => setIsSearchFocused(false), 200);
            console.log('Search blurred');
          }}
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      {isSearchFocused && (
        <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleItemClick(item.slug)}
            >
              <p className="text-white">{item.title}</p>
              {item.bookAuthor && <p className="text-gray-400 text-sm">{item.bookAuthor}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
