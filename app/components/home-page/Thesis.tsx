'use client';

import React, { memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThesisBackground } from './backgrounds/ThesisBackground';
import { THESIS_CONTENT, THESIS_STYLES } from './constants';

const ThesisContent = memo(() => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={THESIS_STYLES.content}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={THESIS_STYLES.textContainer}>
        <motion.h2
          className={THESIS_STYLES.label}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {THESIS_CONTENT.label}
        </motion.h2>
        <motion.h1
          className={THESIS_STYLES.title}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {THESIS_CONTENT.title}
        </motion.h1>
        <motion.p
          className={THESIS_STYLES.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {THESIS_CONTENT.subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
});

ThesisContent.displayName = 'ThesisContent';

const Thesis = memo(() => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={THESIS_STYLES.section}>
      <motion.div
        ref={ref}
        className={THESIS_STYLES.contentWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <ThesisContent />
      </motion.div>
      <div className={THESIS_STYLES.background}>
        <ThesisBackground />
      </div>
    </section>
  );
});

Thesis.displayName = 'Thesis';

export { Thesis };
