'use client';

import { useState, useRef, useEffect, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';

const Header = () => {
  const pathname = usePathname();
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mediaItems = [
    { label: 'Audio', href: '/audio' },
    { label: 'Visuals', href: '/visuals' },
    { label: 'Minting', href: '/minting' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMediaOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMedia = () => {
    setIsMediaOpen((prevState) => !prevState);
  };

  return (
    <header className="w-full bg-[#121212] text-gray-200 shadow-none transition-colors duration-300">
      <nav className="flex justify-between items-center p-4">
        {/* Home Button */}
        <div className="flex items-center space-x-4">
          {pathname !== '/' && (
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <div
                className="rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-95"
                style={{
                  border: '2px solid #4a4a4a',
                  cursor: 'pointer',
                }}
              >
                <Image
                  src="/profile-picture.webp"
                  alt="Zachary Roth"
                  width={32}
                  height={32}
                  className="rounded-full"
                  priority
                />
              </div>
            </Link>
          )}

          {/* Media Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMedia}
              className={`text-gray-200 transition-all duration-300 focus:outline-none ${
                isMediaOpen ? 'text-gray-500' : 'hover:text-gray-500 hover:scale-105'
              }`}
            >
              Media
            </button>
            {isMediaOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-50 left-0 top-full w-48 bg-[#121212] rounded-lg shadow-lg overflow-hidden"
              >
                {mediaItems.map(({ label, href }, index) => (
                  <div key={href} className="py-2">
                    <Link
                      href={href}
                      className="text-gray-200 hover:text-gray-500 transition-all duration-300 focus:outline-none text-left whitespace-nowrap hover:scale-105 active:scale-95 px-0"
                      onClick={() => setIsMediaOpen(false)}
                    >
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Writing/Research Links */}
          {['writing', 'resume'].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`text-gray-200 transition-all duration-300 focus:outline-none ${
                pathname === `/${item}`
                  ? 'text-gray-500'
                  : 'hover:text-gray-500 hover:transform hover:scale-105'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          {[
            { href: 'https://x.com/zacharyr0th', Icon: FaXTwitter, label: 'X Profile' },
            {
              href: 'https://www.linkedin.com/in/zacharyr0th',
              Icon: FaLinkedin,
              label: 'LinkedIn Profile',
            },
            { href: 'https://www.github.com/zacharyr0th', Icon: FaGithub, label: 'GitHub Profile' },
          ].map(({ href, Icon, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-200 transition-transform duration-300 focus:outline-none hover:transform hover:scale-110 hover:text-gray-300"
            >
              <Icon size={24} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
