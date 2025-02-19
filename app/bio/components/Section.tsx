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
      className={`${title ? 'py-6' : 'py-2'} ${className || ''}`}
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-text-primary mb-4"
        >
          {title}
        </motion.h2>
      )}
      <div className="space-y-3">{children}</div>
    </motion.section>
  );
}
