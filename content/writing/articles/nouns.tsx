import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'nounsDAO',
  slug: 'nounsDAO',
  title: 'NounsDAO',
  subtitle: 'Time. Albeit, Nouns are more timeless.',
  image: '/images/articles/nouns-0.webp',
  imageCaption: 'NounsDAO logo and John Cage portrait',
  pageViews: 0,
  type: 'article',
  description: '',
  author: 'Zachary Roth',
  date: '2021-08-31',
  tags: ['Blockchain','NFTs'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  content: '',
  language: 'en',
};

const Nouns: React.FC = () => {
  return (
    <article>
      <Image src="/images/articles/nouns-0.webp" alt="NounsDAO" width={1000} height={1000} />
      <p>What do NounsDAO & John Cage have in common?</p>
      <p>
        In 1985, contemporary composer John Cage wrote a solo piano piece called ASLSP (As Slow as
        Possible) that can last anywhere from 20 to 70 minutes. In 1987, Cage adapted it for organ,
        and in 2001 - 9 years after Cage's passing, a small German church constructed a customized
        organ to perform this piece over the next 639 years. The organizers chose this duration as
        that was the age of the church in question. The most recent notes, G# & E, were on September
        5, 2020, and the next note, G#, will occur on February 5, 2022. The final note will take
        place on September 5, 2640. There will also be a new Noun auctioned off that day.
      </p>
      <p>
        NounsDAO is an NFT project built on Ethereum that harnesses time as a method of distribution
        and decentralization. Each Noun is a generative 32x32 pixel NFT comprising people, places,
        and things. Their features are random and controlled by a smart contract that transfers the
        Noun to the winning bidder's wallet while simultaneously creating a new Noun for auction 24
        hours later. 100% of the auction proceeds are deposited into the NounsDAO Treasury and
        governed by Noun NFT holders. At the time of writing, 24 Nouns control 3260.6022 Ethereum
        ($11,003,847.70 at a current ETH price of $3,374.79).
      </p>
      <p>
        Since 100% of auction revenue gets deposited into the Treasury, the founders (Nounders) will
        be gifted every 10th Noun for the first five years.
      </p>
      <p>
        Rather than having a centralized command center, NounsDAO intends to enable all participants
        to have a substantial stake and say in the trajectory of a project. With each passing day,
        the NounsDAO Treasury gets slightly more decentralized and the previous Noun owners' say
        gets slightly more diluted.
      </p>
      <h2>On-Chain Features</h2>
      <p>
        To do everything that NounsDAO is doing, you need blockchain technology. Smart contracts
        govern the distribution and governance of the protocol and proposals to the NounsDAO, which
        require at least 5% of Nouns to be involved. Proposers can be one person, or it can be a
        group of people who all own Nouns. With a current average price of 135.86 ETH
        ($458,493.654), you need at least 679.29 ETH ($2,292,468.27) worth of Noun NFTs to submit a
        proposal.
      </p>
      <p>
        These proposals can be anything from donating to charities to changing the amount of Nouns
        supply required to submit proposals.
      </p>
      <p>
        Given that this project is barely three weeks old, the community is still new, and the DAO
        has not had much time to submit and enact proposals.
      </p>
      <p>
        Although they have succeeded in doling out a total of 30 ETH ($101,243.70) to 6 different
        charities, and you can see that the 30 ETH have been disbursed in the internal transactions
        tab on the NounsDAO Treasury address on Etherscan. It's too bad governments don't have a
        public ledger for spending our money.
      </p>
      <p>
        While the Treasury can do whatever it wants, it seems like the goal is to ensure the
        viability of the NounsDAO community.
      </p>
      <h2>Derivatives</h2>
      <p>The images are open source so anyone can build with them.</p>
      <p>
        Below, you can see the hand-drawn Improper Noun set. The artist is releasing a new one daily
        and can be connected with on Twitter here.
      </p>
      <p>
        Here is a set of paintings designed using the AI process known as GAN. Connect with the Noun
        GAN Study artist here.
      </p>
      <h2>The Perception of Time</h2>
      <p>
        NounsDAO and John Cage's ASLSP challenge our perception of time. While Cage's piece
        stretches over centuries, NounsDAO creates a new image every day, potentially forever if
        they add in new traits.
      </p>
      <p>
        John Cage and NounsDAO both manipulate our perception of time. When we ingest content, we
        expect a beginning and an end. ASLSP dabbles with the concept of timelessness, but the piece
        ultimately ends. The intention was to elongate expectations. NounsDAO, on the other hand,
        can exist forever 😆.
      </p>
    </article>
  );
};

export default Nouns;
