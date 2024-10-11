import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-background)] text-sm pb-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center space-x-4 mb-2">
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
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
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
