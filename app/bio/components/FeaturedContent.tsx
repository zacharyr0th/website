import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { BIO } from '../constants';

const ContentCard = React.memo(({ type, title, publisher, date, url, highlights, index }: {
  type: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  highlights: readonly string[];
  index: number;
}) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="block p-6 rounded-xl bg-surface/30 backdrop-blur-md border border-white/5 
               hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-4">
      <span className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent">
        {type}
      </span>
      <span className="text-sm text-text-tertiary">{date}</span>
    </div>
    
    <h3 className="text-lg font-medium text-text-primary mb-2 hover:text-accent transition-colors">
      {title}
    </h3>
    <p className="text-text-secondary mb-4">{publisher}</p>
    
    <div className="space-y-2">
      {highlights.map((highlight, i) => (
        <motion.div
          key={highlight}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + i * 0.05 }}
          className="flex items-center gap-2 text-sm text-text-tertiary"
        >
          <svg
            className="w-4 h-4 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4"
            />
          </svg>
          {highlight}
        </motion.div>
      ))}
    </div>
  </motion.a>
));

ContentCard.displayName = 'ContentCard';

export const FeaturedContent = React.memo(() => (
  <Section title="Featured Content" delay={0.8}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {BIO.featuredContent.map((content, index) => (
        <ContentCard key={content.title} {...content} index={index} />
      ))}
    </div>
  </Section>
));

FeaturedContent.displayName = 'FeaturedContent'; 