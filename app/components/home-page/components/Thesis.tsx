/**
 * Thesis section component - Displays the main thesis statement with animated content
 */
'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ThesisBackground } from '../utils/BackgroundComponents';
import { THESIS_CONTENT, THESIS_STYLES } from '../constants/thesis';
import { SHARED_STYLES } from '../utils/styles';
import styles from '@styles/homepage.module.css';

const Thesis = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  return (
    <section className={`${SHARED_STYLES.section} bg-background pb-14 md:pb-20`}>
      {/* Content */}
      <motion.div
        ref={ref}
        className={`${THESIS_STYLES.content} ${THESIS_STYLES.contentWrapper}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`${THESIS_STYLES.textContainer} w-full text-center`}>
          <motion.h2
            className={`${THESIS_STYLES.label} ${styles.thesisLabel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {THESIS_CONTENT.label}
          </motion.h2>

          <motion.h1
            className={`${THESIS_STYLES.title} ${styles.thesisTitle}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            {THESIS_CONTENT.title}
          </motion.h1>

          <motion.p
            className={`${THESIS_STYLES.subtitle} ${styles.thesisSubtitle} mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            {THESIS_CONTENT.subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Background */}
      <div className={THESIS_STYLES.background}>
        <ThesisBackground />
      </div>
    </section>
  );
};

export { Thesis };
