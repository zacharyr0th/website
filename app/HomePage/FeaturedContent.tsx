// Server Component: FeaturedContent

import React from 'react';
import Link from 'next/link';

const featuredItems = [
  { id: 'x', title: 'X', link: '/featured/x' },
  { id: 'y', title: 'Y', link: '/featured/y' },
  { id: 'z', title: 'Z', link: '/featured/z' },
  { id: 'a', title: 'A', link: '/featured/a' },
];

const FeaturedContent = () => (
  <ul className="grid grid-cols-2 gap-4">
    {featuredItems.map((item) => (
      <li key={item.id}>
        <Link
          href={item.link}
          className={`content-item featured-item-${item.id} block p-3 rounded-lg text-center bg-gray-700 text-text-dark transition-all duration-300`}
        >
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default FeaturedContent;
