'use client';

import React, { memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThesisBackground } from '../utils/BackgroundComponents';
import { THESIS_CONTENT, THESIS_STYLES } from '../constants/thesis';
import { SHARED_STYLES } from '../utils/styles';
import { fadeInAnimation, scaleInAnimation, DEFAULT_INVIEW_OPTIONS } from '../utils/animations';

const ThesisContent = memo(() => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, DEFAULT_INVIEW_OPTIONS);

  return (
    <motion.div
      ref={ref}
      className={`${THESIS_STYLES.content} ${THESIS_STYLES.contentWrapper}`}
      {...scaleInAnimation(0.1)}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
    >
      <div className={THESIS_STYLES.textContainer}>
        <motion.h2 className={THESIS_STYLES.label} {...fadeInAnimation(0.2)}>
          {THESIS_CONTENT.label}
        </motion.h2>
        <motion.h1 className={THESIS_STYLES.title} {...fadeInAnimation(0.3)}>
          {THESIS_CONTENT.title}
        </motion.h1>
        <motion.p className={THESIS_STYLES.subtitle} {...fadeInAnimation(0.4)}>
          {THESIS_CONTENT.subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
});

ThesisContent.displayName = 'ThesisContent';

const Thesis = memo(() => (
  <section className={SHARED_STYLES.section}>
    <ThesisContent />
    <div className={THESIS_STYLES.background}>
      <ThesisBackground />
    </div>
  </section>
));

Thesis.displayName = 'Thesis';

export { Thesis };
