'use client';

import React, { memo } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/lib';
import { Button } from '@/components/misc';

export type SocialLink = {
  href: string;
  Icon: React.ComponentType<{ size: number }>;
  label: string;
};

const ANIMATION_CONFIG = {
  DURATION: 0.8,
  EASE: [0.22, 1, 0.36, 1],
  DELAY_INCREMENT: 0.1,
  INITIAL_DELAY: 0.3,
  SCALE: 0.8,
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION_CONFIG.DURATION, ease: ANIMATION_CONFIG.EASE },
  },
};

const socialLinksContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0.2 },
  },
};

const socialLinks: readonly SocialLink[] = [
  { href: SOCIAL_LINKS.twitter.url, Icon: FaXTwitter, label: SOCIAL_LINKS.twitter.label },
  { href: SOCIAL_LINKS.linkedin.url, Icon: FaLinkedin, label: SOCIAL_LINKS.linkedin.label },
  { href: SOCIAL_LINKS.github.url, Icon: FaGithub, label: SOCIAL_LINKS.github.label },
] as const;

const SocialButton = memo<SocialLink>(({ href, Icon, label }) => (
  <Button
    variant="default"
    onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
    ariaLabel={label}
    className="text-text-secondary hover:text-accent transition-colors duration-200"
    icon={<Icon size={32} />}
  />
));

SocialButton.displayName = 'SocialButton';

export default function Footer() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const year = "2025";

  return (
    <footer className="bg-background text-sm pb-12 mt-auto">
      <motion.div
        ref={ref}
        className="container mx-auto flex flex-col items-center space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="flex items-center justify-center space-x-4"
          variants={socialLinksContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {socialLinks.map((props, index) => (
            <motion.div
              key={props.href}
              initial={{ opacity: 0, scale: ANIMATION_CONFIG.SCALE }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: ANIMATION_CONFIG.SCALE }
              }
              transition={{
                duration: 0.3,
                delay: ANIMATION_CONFIG.INITIAL_DELAY + index * ANIMATION_CONFIG.DELAY_INCREMENT,
              }}
            >
              <SocialButton {...props} />
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="text-text-secondary text-lg"
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
