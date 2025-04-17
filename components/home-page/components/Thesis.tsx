/**
 * Thesis section component - Displays the main thesis statement with animated content
 */
'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ThesisBackground } from '../utils/BackgroundComponents';
import styles from '../homepage.module.css';

const THESIS_CONTENT = {
  label: 'THESIS',
  title: 'The world needs permissionless markets',
  subtitle: 'and blockchains put everyone on the same page.',
} as const;

const THESIS_STYLES = {
  section: 'relative min-h-screen',
  contentWrapper: 'w-full flex flex-col relative z-20',
  content: 'relative z-10 flex flex-col justify-center items-center min-h-[100vh] p-8',
  textContainer: 'max-w-5xl w-full mx-auto text-center',
  label: 'text-lg sm:text-xl uppercase tracking-wider mb-3 text-accent',
  title: 'text-2xl sm:text-3xl font-mono mb-4 sm:mb-6 text-white',
  subtitle: 'text-xl sm:text-2xl font-mono text-white/80 mx-auto text-center max-w-3xl',
  background: 'absolute top-0 inset-x-0 w-full h-[100vh]',
} as const;

const Thesis = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  return (
    <section className={`${styles.section} bg-background pb-14 md:pb-20`}>
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
            className={`${THESIS_STYLES.label}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {THESIS_CONTENT.label}
          </motion.h2>

          <motion.h1
            className={`${THESIS_STYLES.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            {THESIS_CONTENT.title}
          </motion.h1>

          <motion.p
            className={`${THESIS_STYLES.subtitle} mx-auto`}
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
