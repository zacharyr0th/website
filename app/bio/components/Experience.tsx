import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { BIO } from '../constants';

interface TimelineItemProps {
  date: string;
  title: string;
  company?: string;
  description: readonly string[];
  index: number;
}

const TimelineItem = React.memo<TimelineItemProps>(
  ({ date, title, company, description, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={`flex flex-col gap-2 ${index > 0 ? 'mt-8' : ''} relative pl-6`}
    >
      <div className="absolute left-0 top-2 w-3 h-3 bg-accent rounded-full" />
      <div className="text-sm text-muted">{date}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {company && <div className="text-accent">{company}</div>}
      <ul className="list-none space-y-2">
        {description.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + i * 0.1 }}
            className="text-muted before:content-['•'] before:mr-2 before:text-accent"
          >
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
);

TimelineItem.displayName = 'TimelineItem';

export const Experience = React.memo(() => (
  <Section title="Experience" delay={0.3}>
    <div className="relative space-y-8">
      <div
        className="absolute left-[5px] top-2 h-full w-0.5 bg-gradient-to-b from-accent to-accent/20"
        aria-hidden="true"
      />
      {BIO.experience.map((item, index) => (
        <TimelineItem key={item.title} {...item} index={index} />
      ))}
    </div>
  </Section>
));

Experience.displayName = 'Experience';
