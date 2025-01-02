import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { BIO } from '../constants';

export const About = React.memo(() => (
  <Section title="About" delay={0.2}>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-lg text-muted leading-relaxed"
    >
      {BIO.intro}
    </motion.p>
  </Section>
));

About.displayName = 'About';
