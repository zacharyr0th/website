'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '../constants';

const socialLinks = [
  { href: SOCIAL_LINKS[1].href, Icon: FaLinkedin, label: 'LinkedIn' },
  { href: SOCIAL_LINKS[2].href, Icon: FaXTwitter, label: 'Twitter' },
  { href: SOCIAL_LINKS[0].href, Icon: FaGithub, label: 'GitHub' },
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