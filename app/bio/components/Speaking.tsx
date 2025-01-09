import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { BIO } from '../constants';

const SpeakingCard = React.memo(
  ({
    title,
    event,
    date,
    link,
    index,
  }: {
    title: string;
    event: string;
    date: string;
    link: string;
    index: number;
  }) => (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ x: 10 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex items-start gap-6 p-4 rounded-lg hover:bg-surface/20 transition-all duration-300"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-text-primary group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-secondary mt-1">{event}</p>
        <p className="text-sm text-text-tertiary mt-2">{date}</p>
      </div>
      <svg
        className="w-6 h-6 text-text-tertiary group-hover:text-accent group-hover:translate-x-2 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </motion.a>
  )
);

SpeakingCard.displayName = 'SpeakingCard';

export const Speaking = React.memo(() => (
  <Section title="Speaking Engagements" delay={0.7}>
    <div className="space-y-6">
      {BIO.speakingEngagements.map((engagement, index) => (
        <SpeakingCard key={engagement.title} {...engagement} index={index} />
      ))}
    </div>
  </Section>
));

Speaking.displayName = 'Speaking';
