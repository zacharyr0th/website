'use client';

import React from 'react';
import Link from 'next/link';

const VisualPage = () => {
  const categories = ['Photography', 'Design', 'Art'];

  return (
    <div className="home-container">
      {/* SubHeader */}
      <header className="py-6 mb-8">
        <div className="container flex justify-between items-center">
          <h1 className="text-4xl font-bold">Visual</h1>
          <nav className="navbar-links">
            <ul className="flex gap-4">
              <li>
                <Link href="/visual" className="nav-link active-link">
                  <span>All</span>
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Link href={`/visual?category=${category.toLowerCase()}`} className="nav-link">
                    <span>{category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container">
        <p>This is the Visual page content.</p>
        {/* Add your visual content here */}
      </main>
    </div>
  );
};

export default VisualPage;
