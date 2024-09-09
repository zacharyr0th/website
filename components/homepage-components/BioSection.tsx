import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BioSection() {
  const highlights = [
    {
      title: 'DeFi and AI Innovation',
      description:
        "Leading growth initiatives on Aptos, the world's highest-performance blockchain.",
    },
    {
      title: 'Product Leadership',
      description:
        'Led product at Solflare/Solrise on Solana and provided institutional market research on EVM ecosystems.',
    },
    {
      title: 'On-Chain Expertise',
      description:
        'Strong understanding of on-chain product-market fit, honed through years of observing what works.',
    },
  ];

  const logos = [
    { src: '/images/logos/aptos-logo.webp', alt: 'Aptos' },
    { src: '/images/logos/solana-logo.webp', alt: 'Solana' },
    { src: '/images/logos/ethereum-logo.webp', alt: 'Ethereum' },
  ];

  return (
    <section className="bio-section py-4 px-4 sm:px-6 lg:px-8 bg-inherit text-gray-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            Thought Leader in Blockchain Innovation
          </h2>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-200">
              Experienced across multiple hyper-growth ecosystems
            </p>
            <p className="text-md text-gray-400">Specializing in identifying product-market fit</p>
            <p className="text-md text-gray-400">
              Advising on leveraging on-chain technology for superior products and services
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-gray-800/30 rounded-lg p-6 hover:bg-gray-700/40 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-white">{highlight.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center space-x-6 mb-8">
          {logos.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={72}
              height={72}
              className="rounded-full"
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/resume" passHref>
            <motion.span
              className="px-4 py-2 inline-flex items-center text-base font-medium text-[#9ca3af] hover:text-[var(--color-secondary)] transition-colors duration-200 focus:outline-none cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Bio
              <ChevronRight className="w-4 h-4 ml-1" />
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
