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
      className="space-y-6 sm:space-y-8 pt-12 sm:pt-16 max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-center">
        <motion.div
          className="relative w-28 sm:w-32 md:w-40 aspect-square rounded-full overflow-hidden ring-4 ring-zinc-700/50 shadow-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/misc/profile-picture.webp"
            alt="Profile picture of Zachary Roth"
            fill
            priority
            sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
            className="object-cover hover:brightness-110 transition-all duration-300"
          />
        </motion.div>

        <div className="flex-1 text-center md:text-left space-y-3 sm:space-y-4 py-2 sm:py-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-0 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent"
          >
            {data.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-secondary/90 font-light tracking-wide"
          >
            {data.title}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-4 sm:gap-6 justify-center md:justify-start pt-2 sm:pt-4"
          >
            {data.socialLinks.map(({ icon: Icon, url, label }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110"
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
