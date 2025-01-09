import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { BIO } from '../constants';

const CertificationCard = React.memo(
  ({
    name,
    issuer,
    year,
    link,
    index,
  }: {
    name: string;
    issuer: string;
    year: string;
    link: string;
    index: number;
  }) => (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-4 rounded-lg bg-surface/20 backdrop-blur-sm border border-white/5 
               hover:bg-surface/30 transition-all duration-300 flex items-center gap-4"
    >
      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-text-primary">{name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-text-secondary">{issuer}</span>
          <span className="text-sm text-text-tertiary">{year}</span>
        </div>
      </div>
    </motion.a>
  )
);

CertificationCard.displayName = 'CertificationCard';

export const Certifications = React.memo(() => (
  <Section title="Certifications" delay={0.6}>
    <div className="space-y-4">
      {BIO.certifications.map((cert, index) => (
        <CertificationCard key={cert.name} {...cert} index={index} />
      ))}
    </div>
  </Section>
));

Certifications.displayName = 'Certifications';
