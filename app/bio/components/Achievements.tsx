import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import type { Achievement } from '../types';

const achievements: Achievement[] = [
  {
    title: 'DeFi Growth Leadership',
    organization: 'Aptos Labs',
    year: '2023',
    description: 'Led ecosystem growth from $200M to $1.2B TVL',
  },
  {
    title: 'Technical Documentation',
    organization: 'Solrise Finance',
    year: '2022',
    description: 'Built comprehensive DeFi knowledge base and documentation',
  },
];

const AchievementCard = React.memo(
  ({
    title,
    organization,
    year,
    description,
    index,
  }: Achievement & { index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-xl bg-surface/30 backdrop-blur-md border border-white/5 shadow-lg
               hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <h3 className="text-lg font-semibold text-accent mb-2">{title}</h3>
      <div className="flex justify-between items-center mb-3">
        <span className="text-text-secondary">{organization}</span>
        <span className="text-sm text-text-tertiary">{year}</span>
      </div>
      <p className="text-text-secondary">{description}</p>
    </motion.div>
  )
);

AchievementCard.displayName = 'AchievementCard';

export const Achievements = () => (
  <Section title="Achievements">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievements.map((achievement, index) => (
        <AchievementCard key={achievement.title} {...achievement} index={index} />
      ))}
    </div>
  </Section>
);

Achievements.displayName = 'Achievements'; 