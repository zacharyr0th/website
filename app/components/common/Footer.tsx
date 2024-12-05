'use client';

import React, { memo } from 'react';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/lib/constants';

const socialLinks = [
  { href: SOCIAL_LINKS.twitter, Icon: FaXTwitter, label: 'X Profile' },
  { href: SOCIAL_LINKS.linkedin, Icon: FaLinkedin, label: 'LinkedIn Profile' },
  { href: SOCIAL_LINKS.github, Icon: FaGithub, label: 'GitHub Profile' },
] as const;

const SocialButton = memo(({ href, Icon, label }: {
  href: string;
  Icon: React.ComponentType<{ size: number }>;
  label: string;
}) => (
  <button
    onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
    aria-label={label}
    className="text-text-secondary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-full p-1"
  >
    <Icon size={32} />
  </button>
));

SocialButton.displayName = 'SocialButton';

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-sm py-8 px-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          {socialLinks.map((props) => (
            <SocialButton key={props.href} {...props} />
          ))}
        </div>
        <p className="text-text-secondary">
          &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
