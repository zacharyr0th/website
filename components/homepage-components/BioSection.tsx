'use client';

import React, { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';

export default function BioSection() {
  const [expanded, setExpanded] = useState(false);

  const shortBio = `
    <p>Welcome to my personal website.</p>
    
    <p>As a seasoned professional in the blockchain industry with a particular emphasis on ecosystem growth, DeFi, and AI - 
    I've had the pleasure of being on the ground floor of the Solana ecosystem in 2020 and the burgeoning Aptos ecosystem in 2022. 
    In both cases, the cutting-edge technological advancements inherent within the chain enabled new blockchain use cases not possible outside of these ecosystems 
    and I've been working hand in hand with some of the best world's best developers, investors, and community builders.</p>
    
    <p>Currently serving as the Head of Growth for DeFi & AI at Aptos Labs, I bring a wealth of experience in product management, 
    developer ecosystems, and financial analysis to drive innovation in the crypto space.</p>
  `;

  const fullBio = `
    <p>With over 5 years of experience in the blockchain and finance sectors, I've worn many hats and driven 
    significant growth across various roles. At Aptos Labs, I lead strategies to expand our DeFi and AI ecosystems. Previously, 
    as a Product Manager at Solrise Finance, I spearheaded the development of cutting-edge blockchain solutions, including 
    non-custodial fund management platforms and on-chain trading competitions.</p>

    <p>My expertise extends to bridging the gap between complex blockchain technologies and user-friendly experiences. I've 
    developed comprehensive educational content, from technical documentation to a popular 14-part course on blockchain and DeFi, 
    making these technologies accessible to audiences of all skill levels.</p>

    <p>In my role as a Senior Analyst at N2 Communications, I contributed to raising over $2 billion for specialized private equity 
    ventures, focusing on commodities and high-performing companies in Germany's Mittelstand market. I've honed my skills in 
    analyzing global regulatory landscapes, particularly in the rapidly evolving crypto sector, providing strategic guidance to 
    help firms navigate complex international financial regulations.</p>

    <p>My passion lies in leveraging technology to create innovative solutions and driving growth in the decentralized finance space. 
    I'm always eager to explore new opportunities at the intersection of blockchain, AI, and traditional finance.</p>
  `;

  const formatContent = (content: string) => {
    return content.replace(
      /<(p|h[1-6]|ul|ol|li|blockquote)>([\s\S]*?)<\/\1>/g,
      (match, tag, text) => {
        switch (tag) {
          case 'p':
            return `<p class="mb-4 leading-relaxed">${text}</p>`;
          case 'h2':
            return `<h2 class="text-2xl font-semibold mt-8 mb-4">${text}</h2>`;
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

  return (
    <div className="bio-section flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="prose prose-lg max-w-none prose-invert">
        <div dangerouslySetInnerHTML={{ __html: sanitizedShortBio }} />
        {expanded && <div dangerouslySetInnerHTML={{ __html: sanitizedFullBio }} />}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-gray-300 hover:text-gray-100 transition duration-300 mt-4"
        aria-label={expanded ? 'Collapse bio' : 'Expand bio'}
      >
        {expanded ? '▲' : '▼'}
      </button>
    </div>
  );
}
