'use client';

import React, { memo } from 'react';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '../../../lib/social';
import { IconButton } from '../buttons';

const socialLinks = [
  { href: SOCIAL_LINKS.twitter.url, Icon: FaXTwitter, label: SOCIAL_LINKS.twitter.label },
  { href: SOCIAL_LINKS.linkedin.url, Icon: FaLinkedin, label: SOCIAL_LINKS.linkedin.label },
  { href: SOCIAL_LINKS.github.url, Icon: FaGithub, label: SOCIAL_LINKS.github.label },
] as const;

const SocialButton = memo<{
  href: string;
  Icon: React.ComponentType<{ size: number }>;
  label: string;
}>(({ href, Icon, label }) => (
  <IconButton
    variant="default"
    onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
    ariaLabel={label}
    className="text-text-secondary hover:text-accent"
    icon={<Icon size={32} />}
  />
));

SocialButton.displayName = 'SocialButton';

function Footer() {
  const year = new Date().getFullYear().toString();

  return (
    <footer className="bg-background text-sm py-8 px-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center space-x-4">
          {socialLinks.map((props) => (
            <SocialButton key={props.href} {...props} />
          ))}
        </div>
        <p className="text-text-secondary">&copy; {year}</p>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';

export default memo(Footer);
