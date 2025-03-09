import React, { memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInAnimation, fadeInUpAnimation } from '../utils/animations';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id: string;
  className?: string;
}

const DEFAULT_INVIEW_OPTIONS = { once: true, amount: 0.3 };

export const Section = memo(({ title, children, id, className = '' }: SectionProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, DEFAULT_INVIEW_OPTIONS);

  return (
    <motion.section ref={ref} id={id} className={className} {...fadeInUpAnimation()}>
      <div className="w-full px-4">
        <div className="mx-0 sm:mx-24 lg:mx-32">
          <motion.h2
            className="text-2xl sm:text-3xl font-mono mb-6 sm:mb-8 text-center sm:text-left whitespace-nowrap font-medium tracking-tight text-white"
            {...fadeInAnimation(0.2)}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
});

Section.displayName = 'Section';
