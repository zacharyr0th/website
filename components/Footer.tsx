import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { FooterProps } from '../lib/types';

export const Footer: React.FC<Omit<FooterProps, 'setTheme'>> = () => {
  return (
    <footer className="bg-[var(--color-surface)] text-sm py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
        <div className="flex items-center">
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
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mr-4"
            >
              <Icon size={32} />
            </Link>
          ))}
        </div>
        <p className="text-[var(--color-text-secondary)]">&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
