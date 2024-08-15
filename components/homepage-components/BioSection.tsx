'use client';

import React, { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';

export default function BioSection() {
  const [expanded, setExpanded] = useState(false);

  const shortBio = `
    <p>Blockchain industry professional specializing in ecosystem growth, DeFi, and AI. 
    Head of Growth for DeFi & AI at Aptos Labs. Experienced in product management, 
    developer ecosystems, and financial analysis. Passionate about leveraging technology 
    for innovative solutions in decentralized finance.</p>
  `;

  const fullBio = `
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/4 relative h-48 w-48 mx-auto md:mx-0">
        <Image
          src="/placeholder.jpg"
          alt="Your Name"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="rounded-full object-cover"
        />
      </div>
      <div class="md:w-3/4">
        <h2 class="text-3xl font-bold mb-4">Your Name</h2>
        <p class="text-xl mb-4">Head of Growth for DeFi & AI at Aptos Labs</p>
        <p class="mb-6">Blockchain Industry Expert | Ecosystem Growth | DeFi | AI</p>
        
        <h3 class="text-2xl font-semibold mb-3">About</h3>
        <p class="mb-4">As a seasoned professional in the blockchain industry with a particular emphasis on ecosystem growth, DeFi, and AI, 
        I've had the pleasure of being on the ground floor of the Solana ecosystem in 2020 and the burgeoning Aptos ecosystem in 2022. 
        In both cases, the cutting-edge technological advancements inherent within the chain enabled new blockchain use cases not possible outside of these ecosystems 
        and I've been working hand in hand with some of the world's best developers, investors, and community builders.</p>
        
        <h3 class="text-2xl font-semibold mb-3">Experience</h3>
        <div class="mb-4">
          <h4 class="text-xl font-medium">Head of Growth for DeFi & AI</h4>
          <p>Aptos Labs · Full-time</p>
          <p>2022 - Present</p>
          <p>Leading strategies to expand DeFi and AI ecosystems, leveraging experience in product management, 
          developer ecosystems, and financial analysis to drive innovation in the crypto space.</p>
        </div>
        <div class="mb-4">
          <h4 class="text-xl font-medium">Product Manager</h4>
          <p>Solrise Finance · Full-time</p>
          <p>2020 - 2022</p>
          <p>Spearheaded the development of cutting-edge blockchain solutions, including 
          non-custodial fund management platforms and on-chain trading competitions.</p>
        </div>
        <div class="mb-4">
          <h4 class="text-xl font-medium">Senior Analyst</h4>
          <p>N2 Communications · Full-time</p>
          <p>2018 - 2020</p>
          <p>Contributed to raising over $2 billion for specialized private equity ventures, focusing on commodities 
          and high-performing companies in Germany's Mittelstand market.</p>
        </div>
        
        <h3 class="text-2xl font-semibold mb-3">Skills & Expertise</h3>
        <ul class="list-disc list-inside mb-4">
          <li>Blockchain Technology</li>
          <li>Decentralized Finance (DeFi)</li>
          <li>Artificial Intelligence in Blockchain</li>
          <li>Ecosystem Growth Strategies</li>
          <li>Product Management</li>
          <li>Financial Analysis</li>
          <li>Technical Documentation</li>
          <li>Educational Content Creation</li>
        </ul>
        
        <h3 class="text-2xl font-semibold mb-3">Passion and Vision</h3>
        <p>My passion lies in leveraging technology to create innovative solutions and driving growth in the decentralized finance space. 
        I'm always eager to explore new opportunities at the intersection of blockchain, AI, and traditional finance.</p>
      </div>
    </div>
  `;

  const formatContent = (content: string) => {
    return content.replace(
      /<(p|h[1-6]|ul|ol|li|blockquote)>([\s\S]*?)<\/\1>/g,
      (match, tag, text) => {
        switch (tag) {
          case 'p':
            return `<p class="mb-4 leading-relaxed">${text}</p>`;
          case 'h2':
            return `<h2 class="text-3xl font-bold text-white mb-8">${text}</h2>`;
          case 'h3':
            return `<h3 class="text-xl font-semibold mt-6 mb-3">${text}</h3>`;
          case 'ul':
            return `<ul class="list-disc list-inside space-y-2 mb-4">${text}</ul>`;
          case 'ol':
            return `<ol class="list-decimal list-inside space-y-2 mb-4">${text}</ol>`;
          case 'li':
            return `<li class="mb-1">${text}</li>`;
          case 'blockquote':
            return `<blockquote class="border-l-4 border-gray-500 pl-4 italic my-6">${text}</blockquote>`;
          default:
            return match;
        }
      }
    );
  };

  const sanitizedShortBio = DOMPurify.sanitize(formatContent(shortBio));
  const sanitizedFullBio = DOMPurify.sanitize(formatContent(fullBio));

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <section className="bio-section py-16 px-4 bg-inherit text-gray-300">
      <div className="max-w-4xl mx-auto">        
        <div className="prose prose-lg max-w-none prose-invert">
          <div 
            onClick={expanded ? toggleExpanded : undefined}
            className={expanded ? "cursor-pointer" : ""}
          >
            <div dangerouslySetInnerHTML={{ __html: sanitizedShortBio }} />
          </div>
          {expanded && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div dangerouslySetInnerHTML={{ __html: sanitizedFullBio }} />
            </div>
          )}
        </div>
        
        <button
          onClick={toggleExpanded}
          className="mt-8 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label={expanded ? 'Collapse bio' : 'Expand bio'}
        >
          {expanded ? '▲ Show Less' : '▼ View Full Biography'}
        </button>
      </div>
    </section>
  );
}