import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { BioData } from '../types';
import { About } from './About';

interface HeroProps {
  data: BioData['basics'];
}

export function Hero({ data }: HeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8 pt-6"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <motion.div 
          className="relative w-24 md:w-28 aspect-square rounded-full overflow-hidden ring-2 ring-zinc-800/50"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/misc/profile-picture.webp"
            alt="Profile picture of Zachary Roth"
            fill
            priority
            sizes="(max-width: 768px) 96px, 112px"
            className="object-cover"
          />
        </motion.div>

        <div className="flex-1 text-center md:text-left space-y-1">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-0"
          >
            {data.name}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary/90 font-light tracking-wide -mt-1"
          >
            {data.title}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-3 justify-center md:justify-start pt-1"
          >
            {data.socialLinks.map(({ icon: Icon, url, label }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-zinc-400 hover:text-zinc-200 transition-all duration-300"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <About data={data} />
      </motion.div>
    </motion.div>
  );
}
