import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Section = React.memo<SectionProps>(
  ({ title, children, className = '', delay = 0 }) => (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <div className="absolute inset-0 bg-surface/30 backdrop-blur-md border border-white/5" />
      <div className="relative p-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
          className="text-2xl font-bold mb-8 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>
        <div className="space-y-6">{children}</div>
      </div>
    </motion.section>
  )
);

Section.displayName = 'Section';
