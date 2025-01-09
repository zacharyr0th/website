'use client';

import React, { memo } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '../lib/social';
import { IconButton } from './buttons';

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

export default function ConditionalFooter() {
  const pathname = usePathname();
  const showFooter = pathname !== '/bio';

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const year = new Date().getFullYear().toString();

  if (!showFooter) return null;

  return (
    <footer className="bg-background text-sm pb-12 mt-auto">
      <motion.div
        ref={ref}
        className="container mx-auto flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex items-center justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {socialLinks.map((props, index) => (
            <motion.div
              key={props.href}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <SocialButton {...props} />
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="text-text-secondary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          &copy; {year}
        </motion.p>
      </motion.div>
    </footer>
  );
}
