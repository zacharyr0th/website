import React from 'react';
import { motion } from 'framer-motion';
import ProfileImage from '../../components/misc/ProfileImage';
import { BIO, SOCIAL_LINKS } from '../constants';

export const Hero = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col md:flex-row gap-8 items-center mb-12"
  >
    <ProfileImage />
    <div className="text-center md:text-left max-w-2xl">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary 
                   bg-clip-text text-transparent"
      >
        {BIO.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl mb-6 text-muted"
      >
        {BIO.title}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4 justify-center md:justify-start"
      >
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }, index) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl text-muted hover:text-accent transition-colors"
            aria-label={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>
    </div>
  </motion.div>
));

Hero.displayName = 'Hero';
