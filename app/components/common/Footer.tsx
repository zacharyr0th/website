import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/lib/constants';

const socialLinks = [
  { href: SOCIAL_LINKS.twitter, Icon: FaXTwitter, label: 'X Profile' },
  { href: SOCIAL_LINKS.linkedin, Icon: FaLinkedin, label: 'LinkedIn Profile' },
  { href: SOCIAL_LINKS.github, Icon: FaGithub, label: 'GitHub Profile' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-sm py-8 px-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center space-x-4 mb-2">
          {socialLinks.map(({ href, Icon, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <Icon size={32} />
            </Link>
          ))}
        </div>
        <p className="text-text-secondary">&copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
