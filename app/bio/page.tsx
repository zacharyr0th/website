'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { BioFooter } from './components/BioFooter';
import Background from './components/Background';

export default function BioPage() {
  return (
    <motion.div 
      className="relative min-h-screen font-mono bg-gradient-to-b from-background/95 to-surface/95"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
          }
        }
      }}
    >
      <Background />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="mb-12"
          >
            <Hero />
          </motion.div>
          <motion.div
            className="space-y-12 md:space-y-16"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[About, Experience, Skills, BioFooter].map((Component) => (
              <motion.div 
                key={Component.displayName}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                }}
              >
                <Component />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
