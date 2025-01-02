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
      className={`bg-surface rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <h2
        className="text-2xl font-bold mb-6 text-heading"
        style={{ color: 'var(--heading-color)' }}
      >
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </motion.section>
  )
);
