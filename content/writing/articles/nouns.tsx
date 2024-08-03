import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'nounsDAO',
  slug: 'nounsDAO',
  title: 'NounsDAO',
  subtitle: 'Time. Albeit, Nouns are more timeless.',
  image: '/placeholder.webp',
  imageCaption: 'NounsDAO logo and John Cage portrait',
  pageViews: 0,
  type: 'article',
  description: '',
  author: 'Zachary Roth',
  date: '2021-08-31',
  tags: ['Technology'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  content: '',
};

const Nouns: React.FC = () => {
  return (
    <article>
      <h1>What do NounsDAO & John Cage have in common?</h1>

      <p>Time. Albeit, Nouns are more timeless.</p>

      <p>
        In 1985, contemporary composer John Cage wrote a solo piano piece called ASLSP (As Slow as
        Possible) that can last anywhere from 20 to 70 minutes. In 1987, Cage adapted it for organ,
        and in 2001 - 9 years after Cage's passing, a small German church constructed a customized
        organ to perform this piece over the next 639 years. 639 years was chosen because that was
        the age of the aforementioned church. The most recent notes, G# & E, were on September 5,
        2020, and the following scheduled note, G#, will occur on February 5, 2022. The final note
        will occur on September 5, 2640. A new Noun will also be auctioned off that day.
      </p>

      <p>
        NounsDAO is genuinely unique. CryptoPunks are known for being one of the first generative
        NFT sets to take off (next to CryptoKitties), but their community infrastructure pales
        compared to NounsDAO...
      </p>

      <p>
        In 1985, contemporary composer John Cage wrote a solo piano piece called ASLSP (As Slow as
        Possible) that can last anywhere from 20 to 70 minutes. In 1987, Cage adapted it for organ,
        and in 2001 - 9 years after Cage's passing, a small German church constructed a customized
        organ to perform this piece over the next 639 years...
      </p>

      <p>
        NounsDAO is an NFT project built on Ethereum that harnesses time as its sole method of
        distribution and decentralization. Each Noun is a generative 32x32 pixel NFT made up of
        people, places, and things. Their features are random and are controlled by a smart contract
        that automatically places the Noun in the winning bidder's wallet while simultaneously
        creating a new Noun to be auctioned off exactly 24 hours later. 100% of the auction proceeds
        are deposited into the NounsDAO Treasury and are governed by the aggregate of Noun NFT
        holders. At the time of writing, 24 Nouns control 3260.6022 Ethereum ($11,003,847.70 at a
        current ETH price of $3,374.79).
      </p>

      <p>
        John Cage and NounsDAO are both manipulating our perception of time. When we ingest content,
        we expect there to be a beginning and an end. The end doesn't necessarily have to be a
        resolution, but it has to be there.
      </p>

      <p>
        ASLSP dabbles with the concept of timelessness, but the piece ultimately ends; the intention
        is to elongate expectations. NounsDAO, however, can potentially live perpetually.
      </p>

      <p>
        I'm sure you know, but I'll clarify: DAO = Decentralized Autonomous Organization. Many
        crypto projects are governed this way: token holders vote on how platforms operate. It is an
        attempt at a decentralized alternative to companies.
      </p>

      <p>
        NFT = Non-Fungible Token. NFTs are tokens but not the same as any other NFT. Bitcoin, for
        example, is a fungible token. Every Bitcoin is the same as every other Bitcoin.
      </p>

      <p>
        Since 100% of auction revenue is deposited into the Treasury, every 10th Noun for the first
        five years will be gifted to the founders (Nounders).
      </p>

      <h2>Function</h2>

      <p>
        DAOs have been all the rage recently. While their history is murky and their legal statuses
        are unclear, their potential is undeniable. Most active DAOs have been formed in the past
        two years and are generally based around a DeFi or NFT project.
      </p>

      <p>
        Rather than have a centralized command center (C-Suite Executives), DAOs ideally enable all
        participants to have a substantial stake and say in the trajectory of a project.
      </p>

      <p>
        I say ideally because doing this is easier said than done. To participate in the DAO of a
        project like Uniswap's, for example, you need to have a UNI token to vote on proposals. What
        if a VC funding round allowed the VCs to have 51% of the UNI tokens before they were
        available for the public? That is not the case with Uniswap, but it can easily be the case
        with other projects. There are tokenomic structures and vesting schedules for advisors &
        investors to help avoid this, but ultimately, you want the token's distribution to be
        extensive.
      </p>

      <p>
        NounsDAO is taking this framework and making one slight modification. Instead of releasing
        all the tokens that control the DAO at once, they are releasing one Noun every day. Each day
        the NounsDAO Treasury ideally gets a bit more decentralized and the previous Noun owners'
        say gets a bit more diluted.
      </p>

      <p>
        I say ideally again because you never know - maybe Softbank is buying every single Noun for
        the first year. They would have more than a consensus vote for at least another year if they
        didn't buy any more Nouns after their 365th. This would take an absurd amount of capital,
        but it's not impossible. It would also not be in Softbank's best interest as they would just
        be controlling their own money and creating another subsidiary of Softbank.
      </p>

      <h2>NounsDAO</h2>

      <p>
        As you can see, proposals to the NounsDAO require at least 5% of Nouns to be involved. This
        can be one person, or it can be a group of people who all own Nouns. With a current average
        price of 135.86 ETH ($458,493.654), you need at least 679.29 ETH ($2,292,468.27) worth of
        Noun NFTs to submit a proposal.
      </p>

      <p>
        These proposals can be anything from donating to charities (as seen in the picture above) to
        change the amount of the Nouns supply required to submit proposals.
      </p>

      <p>
        Think of everyone with a Noun as being on the Board of Directors of a company without a
        C-Suite.
      </p>

      <h2>Treasury</h2>

      <p>
        To do everything that NounsDAO is doing, you need blockchain technology. Specifically, you
        need smart contracts. The smart contract that governs the auction process deposits all of
        the auction revenue into the above contract address, which serves as the NounsDAO treasury.
        You can see every transaction made to and from this contract here.
      </p>

      <p>
        Imagine if the US government was a DAO and there was a public ledger of how they spent the
        $2 Trillion in Afghanistan.
      </p>

      <h2>Fractional Noun</h2>

      <p>
        Nouns can be fractionalized just as any other NFT can. It's the same business model as
        Masterworks.io, where you fractionalize expensive art pieces so anyone can buy pieces of
        them at lower prices.
      </p>

      <p>
        Currently, only one Noun - Noun 11 / Party Noun - is available in fractional form. Check it
        out here - one token of Noun11 is worth roughly 0.0014 ETH, and there are 118,998.81 Noun11
        tokens, so the implied valuation is 167.849 ETH ($566,455.127).
      </p>

      <p>
        Does fractionalization affect the voting power within the DAO? No. Fractional Nouns will be,
        for the time being, excluded from voting measures.
      </p>

      <h2>Vision</h2>

      <p>
        Given that this project is barely three weeks old, the community is still new, and the DAO
        has not had much time to submit and enact proposals.
      </p>

      <p>
        Although they have succeeded in doling out a total of 30 ETH ($101,243.70) to 6 different
        charities, you can see that the 30 ETH have been disbursed in the internal transactions tab
        on the NounsDAO Treasury address on Etherscan.
      </p>

      <p>
        In the Virtuous Cycle page of their documentation, the Nounders proclaim the necessary
        comingling of the art, DAO, and treasury fund features. Each new piece of art brings in
        funds from the crypto community; the DAO then governs the funds to invest them back into the
        crypto community.
      </p>

      <p>Without one of those features, the model does not work.</p>

      <p>
        While the Treasury can do whatever it wants, it seems like the goal is to ensure the
        viability of the NounsDAO community. According to the Virtuous Cycle, the vision is to turn
        Nouns into an 'internet-wide event' so projects revolving around Noun artwork and
        integrations would be prioritized.
      </p>

      <h2>Derivatives</h2>

      <p>The art is open source, so anyone can build on top of it.</p>

      <p>
        Below you can see the hand-drawn Improper Noun set. The artist is releasing a new one daily
        and can be connected with on Twitter here.
      </p>

      <p>
        Here is a set of paintings designed by the AI process known as GAN. Connect with the Noun
        GAN Study artist here.
      </p>

      <p>
        This last screenshot showing 20 more derivatives of Nouns was taken from the newly released
        website nouns.com.
      </p>

      <h2>Nouns.com</h2>

      <p>
        Nouns.com is a new nexus for the Noun community. Aside from Discord, it may become the
        central hub for all Nouns. It contains features such as NounsChat, NounsDEX, NounsBlog, and
        everything you need to operate as a Noun in the famed metaverse, CryptoVoxels.
      </p>

      <p>
        Below is a snippet of what is being built at 1 Nouns Road in Crypto Voxels. Blockchain-based
        digital worlds are still finding their place, but I find it easy to imagine dozens of Nouns
        hanging out as their avatar in this context.
      </p>

      <p>
        Not only is there all the above, but there is even a hot or not game based on Nouns called
        want2bnoun (12BNoun.eth).
      </p>

      <p>
        In case you were wondering, Noun 2 / Pineapple Noun is currently tied for 1st place with
        Noun 7 / Mirror Noun.
      </p>

      <h2>SharkDAO</h2>

      <p>No NounsDAO review would be complete without a reference to SharkDAO.</p>

      <p>SharkDAO is the infamous sub-DAO within NounsDAO.</p>

      <p>
        To be clear, NounsDAO is the primary DAO of the Nouns. It is made up only of people who own
        full Nouns. There can, however, be sub-DAOs within NounsDAO. SharkDAO is an example of a
        group of Nouns who decided to start their sub-DAO. It consists of Nouns 2 (Pineapple Noun
        👀), 5, and 15. Anyone can join their Discord as they are looking for other Nouns,
        developers, designers, and more to build their community.
      </p>

      <p>Every DAO is different, but the ethos remains the same. Decentralized governance.</p>

      <h2>Conclusion</h2>

      <p>
        Both NounsDAO and John Cage's ASLSP challenge our perception of time and art. While Cage's
        piece stretches over centuries, NounsDAO creates a new piece of art every day, potentially
        forever. These projects remind us that art and community can transcend traditional
        boundaries of time and space.
      </p>
    </article>
  );
};

export default Nouns;
