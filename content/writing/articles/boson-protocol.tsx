import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'boson-protocol',
  slug: 'boson-protocol',
  title: 'Boson Protocol',
  subtitle: 'test',
  image: '/images/articles/bp-0.webp',
  imageCaption: 'test',
  pageViews: 0,
  type: 'article',
  description:
    "An in-depth exploration of how blockchain technology and cryptocurrencies are being adopted in Africa, discussing the potential benefits, challenges, and implications for the continent's economic future.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: '',
  date: '2023-05-15',
  tags: ['Finance'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const BosonProtocol: React.FC = () => {
  return (
    <article>
      <h2>Introduction</h2>
      <p>
        Named after an elementary particle described as a force carrier that functions as the 'glue'
        holding matter together, Boson Protocol has made its mission to enable decentralized
        commerce ecosystems to 'disrupt, demonopolize, and democratize commerce.
      </p>

      <h2>What Boson Protocol Enables</h2>
      <ul>
        <li>Tokenization of digital to physical redemption using NFTs</li>
        <li>Liquid digital markets for these NFTs</li>
        <li>A robust commerce data market</li>
      </ul>

      <h2>Vision</h2>
      <blockquote>
        "To be the world's open, public infrastructure layer for commercial transactions and their
        data."
      </blockquote>
      <p>Boson is building a bridge between the Metaverse and the physical universe.</p>

      <h2>Purpose</h2>
      <blockquote>
        "Commerce is a human endeavor that should not have value captured by the few." - Justin
        Banon, Boson CEO
      </blockquote>

      <h3>The Problem with Web2 Commerce</h3>
      <ul>
        <li>Centralized scaling favors companies like Amazon & Google</li>
        <li>Monopolistic practices and data misuse</li>
        <li>Rent-seeking behavior by big companies</li>
      </ul>

      <h3>Web3 Solution</h3>
      <p>
        Web3's infrastructure - public blockchains, NFTs, digital wallets, etc. have given vendors
        an entirely new framework to operate within.
      </p>

      <h2>Key Components of Boson Protocol</h2>
      <h3>1. Commitment Tokens</h3>
      <ul>
        <li>NFT contracts serving as vouchers (NFTVs)</li>
        <li>Act as futures contracts for physical items</li>
        <li>
          Characteristics: Universal, Interoperable, Composable, Programmable, Transferable,
          Stateful
        </li>
      </ul>

      <h3>2. Thing Tokens</h3>
      <ul>
        <li>ERC20 tokens used to purchase Commitment Tokens</li>
        <li>Similar to Unisocks concept</li>
        <li>Interoperable and composable with existing DeFi infrastructure</li>
      </ul>

      <h3>3. BOSON Tokens</h3>
      <ul>
        <li>Monetary reward for ecosystem participants</li>
        <li>Incentivizes quality transactions</li>
      </ul>

      <h3>4. Gluons</h3>
      <p>Unique derivatives representing stake and associated BOSON rewards for each voucher.</p>

      <h2>Applications</h2>
      <ul>
        <li>Online Commerce</li>
        <li>Non-Monetary Vouchers</li>
        <li>M2M-commerce</li>
        <li>Loyalty & Rewards</li>
        <li>Gaming</li>
        <li>Crypto Exchanges</li>
        <li>Service Bookings</li>
        <li>Tokenized Networks</li>
      </ul>

      <h2>Governance</h2>
      <ol>
        <li>Startup Phase</li>
        <li>Network Phase</li>
        <li>Community Governance (DAO)</li>
      </ol>

      <h2>Roadmap and Progress</h2>
      <ul>
        <li>$36,000,000 raised in token sales and USD</li>
        <li>Team scaled to over 50 employees</li>
        <li>Released DEX for any Thing</li>
        <li>Launched Leptonite App</li>
        <li>Purchased $700,000 in Decentraland real estate</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Boson is pioneering a future of decentralized commerce. If successful, it could become one
        of the most important protocols in the world, potentially disrupting giants like Amazon.
      </p>

      <h2>Boson Links</h2>
      <p>
        <strong>Socials:</strong> Twitter | Medium | Telegram | YouTube | LinkedIn
        <br />
        <strong>Resources:</strong> Website | Whitepaper | Litepaper | FAQs
      </p>
    </article>
  );
};

export default BosonProtocol;
