import React from 'react';
import { motion } from 'framer-motion';
import ProfileImage from '../../components/misc/ProfileImage';
import type { SocialLink } from '../../lib/social';
import { SOCIAL_LINKS } from '../../lib/social';
import { BIO } from '../constants';

const springTransition = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

export const Hero = React.memo(() => (
  <motion.div
    className="relative flex flex-col md:flex-row gap-6 items-center rounded-xl p-6 mt-32 bg-surface/30 backdrop-blur-md border border-white/5 shadow-lg"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          ...springTransition,
          staggerChildren: 0.1
        }
      }
    }}
  >
    <motion.div
      variants={{
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
          scale: 1, 
          opacity: 1,
          transition: springTransition
        }
      }}
      className="relative w-24 md:w-28"
    >
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full blur-sm"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <ProfileImage size="sm" clickable={false} />
    </motion.div>

    <div className="flex-1 text-center md:text-left">
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: springTransition
          }
        }}
        className="text-3xl sm:text-4xl font-bold mb-1 text-text-primary"
      >
        {BIO.name}
      </motion.h1>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: springTransition
          }
        }}
        className="text-lg sm:text-xl mb-4 text-text-secondary"
      >
        {BIO.title}
      </motion.p>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
        className="flex gap-4 justify-center md:justify-start"
      >
        {Object.values(SOCIAL_LINKS).map(({ icon: Icon, url: href, label }: SocialLink) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: springTransition
              }
            }}
            whileHover={{ 
              scale: 1.1, 
              y: -2,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl text-text-secondary hover:text-accent transition-all duration-300"
            aria-label={label}
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>
    </div>
  </motion.div>
));

Hero.displayName = 'Hero';
