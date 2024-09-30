'use client';

import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';

const Header = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header
      className={`w-full bg-[#121212] text-gray-200 shadow-none transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <nav className="flex justify-between items-center p-4">
        {/* Home Button */}
        <div className="flex items-center space-x-6">
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
                  width={40}
                  height={40}
                  className="rounded-full"
                  priority
                />
              </div>
            </Link>
          )}

          {/* Main Page Links */}
          {['projects', 'writing', 'music'].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`text-gray-200 transition-all duration-300 focus:outline-none text-xl ${
                pathname === `/${item}` ? 'text-gray-500' : 'hover:text-gray-500'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
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
              className="text-gray-200 transition-colors duration-300 focus:outline-none"
            >
              <Icon size={32} className="transition-colors duration-300 hover:text-gray-500" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
