'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../lib/social';

const socialLinks = [
  { href: SOCIAL_LINKS.linkedin.url, Icon: SOCIAL_LINKS.linkedin.icon, label: SOCIAL_LINKS.linkedin.label },
  { href: SOCIAL_LINKS.twitter.url, Icon: SOCIAL_LINKS.twitter.icon, label: SOCIAL_LINKS.twitter.label },
  { href: SOCIAL_LINKS.github.url, Icon: SOCIAL_LINKS.github.icon, label: SOCIAL_LINKS.github.label },
] as const;

export const BioFooter = React.memo(() => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mt-16 rounded-xl p-6 bg-surface/30 backdrop-blur-md border border-white/5 shadow-lg"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl text-text-secondary hover:text-accent transition-all duration-300"
              aria-label={label}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
        <p className="text-sm text-text-secondary">&copy; {year}</p>
      </div>
    </motion.footer>
  );
});

BioFooter.displayName = 'BioFooter'; 