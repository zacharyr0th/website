'use client';

import React, { useState, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Skill {
  name: string;
  level: number;
}

const experiences: Experience[] = [
  {
    title: 'Head of Growth for DeFi & AI',
    company: 'Aptos Labs',
    period: '2022 - Present',
    description:
      'Leading strategies to expand DeFi and AI ecosystems, leveraging extensive experience in product management, developer ecosystems, and financial analysis to drive innovation in the crypto space.',
  },
  {
    title: 'Product Manager',
    company: 'Solrise Finance',
    period: '2020 - 2022',
    description:
      'Spearheaded the development of advanced blockchain solutions, including non-custodial fund management platforms and on-chain trading competitions.',
  },
  {
    title: 'Senior Analyst',
    company: 'N2 Communications',
    period: '2018 - 2020',
    description:
      "Contributed to raising over $2 billion for specialized private equity ventures, focusing on commodities and high-performing companies in Germany's Mittelstand market.",
  },
];

const skills: Skill[] = [
  { name: 'Blockchain Technology', level: 95 },
  { name: 'Decentralized Finance (DeFi)', level: 90 },
  { name: 'Artificial Intelligence in Blockchain', level: 85 },
  { name: 'Ecosystem Growth Strategies', level: 92 },
  { name: 'Product Management', level: 88 },
  { name: 'Financial Analysis', level: 85 },
];

export default function BioSection() {
  const [expanded, setExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const shortBio = `

  `;

  const sanitizedShortBio = DOMPurify.sanitize(shortBio);

  return (
    <React.Fragment>
      <section className="bio-section py-16 px-4 bg-inherit text-gray-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className=" relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden shadow-lg">
              <Image
                src="/placeholder.jpg"
                alt="Your Name"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl text-gray-400 mb-4 text-left">
                Head of Growth for DeFi & AI at Aptos Labs
              </h2>
              <p className="text-gray-400 mb-4 text-left">
                A dedicated blockchain professional with experience across multiple non-EVM
                ecosystems specializing in ecosystem growth, DeFi, and AI.
              </p>
              <div
                className="prose prose-lg max-w-none prose-invert mb-6 text-left"
                dangerouslySetInnerHTML={{ __html: sanitizedShortBio }}
              />
              <button
                onClick={toggleExpanded}
                className="flex items-center px-6 py-2 bg-inherit hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="mr-2" />
                    View Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2" />
                    View More
                  </>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {expanded && isClient && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 pt-8 border-t border-gray-700 text-left"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">Experience</h3>
                    {experiences.map((exp, index) => (
                      <div key={index} className="mb-8">
                        <h4 className="text-xl font-medium text-blue-400">{exp.title}</h4>
                        <p className="text-gray-400">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                        <p className="text-gray-300">{exp.description}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">Skills & Expertise</h3>
                    {skills.map((skill, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>

                        <div className="w-full bg-inherit rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </React.Fragment>
  );
}
