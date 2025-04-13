import React from 'react';
import { motion } from 'framer-motion';
import type { SectionProps } from '../types';

export function Section({ title, children, className }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`${title ? 'py-4 sm:py-6' : ''} ${className || ''}`}
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-8"
        >
          {title}
        </motion.h2>
      )}
      <div className="space-y-4 sm:space-y-6">{children}</div>
    </motion.section>
  );
}
