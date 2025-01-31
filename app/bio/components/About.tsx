import React from 'react';
import { Section } from './Section';
import { BIO } from '../constants';

export const About = React.memo(() => (
  <Section title="">
    <p className="text-xl text-text-secondary leading-relaxed max-w-3xl">
      {BIO.intro}
    </p>
  </Section>
));

About.displayName = 'About';
