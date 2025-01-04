'use client';

import React, { memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ActionButton } from '../buttons';

export const Newsletter = memo(() => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[var(--color-background)] py-8 sm:py-16">
      <motion.div 
        ref={ref}
        className="container mx-auto px-4 sm:px-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[var(--color-text-primary)]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Subscribe for Updates
        </motion.h2>
        <motion.form 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-stretch border-b border-[var(--color-secondary)] py-2 transition-colors duration-200">
              <input
                className="w-full text-center sm:text-left bg-transparent text-[var(--color-text-primary)] mb-3 sm:mb-0 sm:mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-text-secondary/50"
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                disabled
                data-np-autofill-field-type="email"
              />
              <div className="flex justify-center sm:flex-shrink-0">
                <ActionButton
                  variant="primary"
                  disabled
                  type="submit"
                  size="sm"
                >
                  Coming Soon
                </ActionButton>
              </div>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
});

Newsletter.displayName = 'Newsletter';
