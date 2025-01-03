'use client';

import React, { memo } from 'react';
import { ThesisBackground } from './backgrounds/ThesisBackground';
import { THESIS_CONTENT, THESIS_STYLES } from './constants';

const ThesisContent = memo(() => (
  <div className={THESIS_STYLES.content}>
    <div className={THESIS_STYLES.textContainer}>
      <h2 className={THESIS_STYLES.label}>{THESIS_CONTENT.label}</h2>
      <h1 className={THESIS_STYLES.title}>{THESIS_CONTENT.title}</h1>
      <p className={THESIS_STYLES.subtitle}>{THESIS_CONTENT.subtitle}</p>
    </div>
  </div>
));

ThesisContent.displayName = 'ThesisContent';

const Thesis = memo(() => (
  <section className={THESIS_STYLES.section}>
    <div className={THESIS_STYLES.contentWrapper}>
      <ThesisContent />
    </div>
    <div className={THESIS_STYLES.background}>
      <ThesisBackground />
    </div>
  </section>
));

Thesis.displayName = 'Thesis';

export { Thesis }; 