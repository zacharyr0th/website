import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'boson-protocol',
  slug: 'boson-protocol',
  title: 'Boson Protocol',
  subtitle: 'A Protocol for Decentralized Commerce',
  image: '/images/articles/boson.webp',
  imageCaption: '',
  pageViews: 0,
  type: 'article',
  description:
    "An in-depth exploration of how blockchain technology and cryptocurrencies are being adopted in Africa, discussing the potential benefits, challenges, and implications for the continent's economic future.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: '',
  date: '2023-05-15',
  tags: ['Blockchain', 'Commerce'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const BosonProtocol: React.FC = () => {
  return (
    <article>
      <Image src="/images/articles/boson.webp" alt="Boson Protocol" />
      <p>
        Named after an elementary particle described as a force carrier that functions as the 'glue'
        holding matter together, Boson Protocol has made its mission to build a decentralized
        commerce ecosystem to disrupt global trade.
      </p>
      <p>
        Boson Protocol is a toolset that gives businesses and individuals the control to engage in
        trustless transactions of physical goods and services using Ethereum as the underlying
        settlement layer. It enables the tokenization and redemption of physical items through NFTs,
        the creation of liquid digital markets for these NFTs, and, as a biproduct, the creation of
        a robust data market.
      </p>
      <p></p>
      <blockquote>
        "Commerce is a human endeavor that should not have value captured by the few."
        <p>Justin Banon, Boson CEO</p>
      </blockquote>
      <p>
        The early Internet promised a future of fair and accessible data for all. Instead, market
        forces favored centralized infrastructure for its profitability. This trend extended to
        e-commerce, where intermediaries now dominate. These middlemen often exploit user data for
        profit or fail to utilize it effectively, hindering the potential for a more open and
        efficient online marketplace.
      </p>
      <p>
        Web3's infrastructure - public blockchains, NFTs, digital wallets, etc. — has given vendors
        a level of control that wasn't available a decade ago. You no longer need to rely on these
        intermediaries to perform commerce functions or pay an arm and a leg to keep track of
        commerce data.
      </p>
      <Image src="/images/articles/bp-1.webp" alt="Boson Protocol 1" />
      <p>
        Inspired by trustless and tokenized DeFi communities, Boson Protocol aims to reduce
        incumbent rent-seeking behavior by creating a decentralized and trustless environment for
        commerce. The functionality surrounds what are called Commitment tokens, Thing tokens, and
        the role of the BOSON token.
      </p>
      <h3>Commitment Tokens</h3>
      <p>
        A Buyer and Seller commit to exchange digital value for a physical item (a Thing). This
        commitment is funded & tokenized into an escrow contract built into an NFT. The NFT serves
        as a voucher to buy or sell an item, so Boson refers to them as NFTVs. The NFT contract has
        an expiration date and, in essence, acts as a futures contract where the Seller is obliged
        to deliver the said item(s) listed in the contract at expiration. Commitment Token holders
        are granted the right to transfer their token to another wallet or reliably and securely
        redeem the token for a particular Thing.
      </p>
      <h4>Commitment Tokens Characteristics</h4>
      <ul>
        <li>
          <strong>Universal</strong> - Can represent any Thing.
        </li>
        <li>
          <strong>Interoperable</strong> - Can represent a standardized version of any Thing.
        </li>
        <li>
          <strong>Composable</strong> - Can be assembled into composite products.
        </li>
        <li>
          <strong>Programmable</strong> - Fully customizable within computing limits.
        </li>
        <li>
          <strong>Transferable / Storable</strong> - Between any standard EVM wallet.
        </li>
        <li>
          <strong>Stateful</strong> - Appropriately change state across the core exchange mechanism
          process.
        </li>
      </ul>
      <p>
        The Core Exchange Mechanism governs Commitment Tokens, where the programmed game theory
        comes into play. Buyers and Sellers sequentially deposit up-front funds, so there are
        varying levels of skin in the game on both sides of the transaction. The final deposit
        transfer process is structured to incentivize both parties to behave well.
      </p>
      <p>
        Using this sequential transaction process, Commitment Tokens can achieve a 'Subgame Perfect
        Equilibrium,' a concept from game theory. This equilibrium ensures that each transaction
        step is balanced and fair, reducing the potential for disputes. In simpler terms, it's like
        a game where each player knows the other players' strategy and has nothing to gain by
        changing only their strategy, leading to a balanced outcome.
      </p>
      <Image src="/images/articles/bp-2.webp" alt="Boson Protocol 2" />
      <p>
        The possible game outcomes are the triangles on the right side of the above diagram. CoF
        stands for Cancel or Fault, which is an undesirable outcome. The most desirable outcome for
        all parties is 'Redemption; No Complaint; No CoF,' which is the fourth triangle from the top
        of the diagram. The purpose of programming this game theory into Commitment Tokens is to
        minimize the number of disputes and arbitration required between Buyers and Sellers, with
        the hopes of providing a smooth and efficient transaction process.
      </p>
      <h3>Thing Tokens</h3>
      <p>
        Thing Tokens, which conform to the standard ERC20 contract, are used to purchase Commitment
        Tokens. Think of a Thing token as a 'generalized Unisock' and the Commitment Token as an
        add-on futures contract. Unisocks are a grand experiment in scarcity. There were 500 real
        pairs of Uniswap merchandise socks tokenized as SOCKs and deposited into a liquidity pool on
        Uniswap along with their starting value worth of ETH.
      </p>
      <p>
        Each SOCK token represents the redeemable ownership of 1 pair of socks and is minted with a
        bonding curve, hence the 11,048.07% increase in price from the original $12. You can either
        sell the token back to the liquidity pool or redeem it for the physical socks, where the
        Uniswap company will ship a physical pair to you anywhere in the world.
      </p>
      <Image src="/images/articles/bp-3.webp" alt="Boson Protocol 3" />
      <p></p>
      <p>
        At the time of writing, the price of a $SOCK was $132,576.82, and 192 have already been
        redeemed. Thing tokens are similar. The interoperability and composability of Thing tokens
        enable them to be fitted or retrofitted into any existing DeFi infrastructure. They are
        tradable in the same way you can trade SOCKs between different wallets, and they can 'plug'
        into AMMs (Automated Market Makers) to create liquid digital markets. Their use cases within
        DeFi include product price discovery on DEXes, yield optimization, and the crowdfunding of
        non-existent products through ITOs (Initial Thing Offerings).
      </p>
      <h3>Boson Tokens</h3>
      <p>
        Incentives are the invisible hand that Adam Smith was talking about. Boson built reward
        mechanisms within the Thing / Commitment Token relationship to incentivize good behavior by
        both Buyers and Sellers - but that doesn't tell the whole story. The core objective of the
        Boson Protocol is to 'maximize the supply of quality redemptions.' In other words, it
        facilitates successful commerce transactions. To do so, Boson implemented the BOSON token
        (Bosons) as a monetary reward for actors within the Boson ecosystem who help the protocol
        reach its objective. Below is a high-level overview of the main stakeholders within the
        Protocol.
      </p>
      <Image src="/images/articles/bp-4.webp" alt="Boson Protocol 4" />
      <Image src="/images/articles/bp-5.webp" alt="Boson Protocol 5" />
      <h3>Gluons</h3>
      <p>
        There's also gluons, which act as a quality indicator, encouraging participants to stake
        more capital for higher-quality items. This system incentivizes market participants to
        engage in high-quality transactions of high-quality physical goods. Each voucher has a
        unique derivative called a Gluon that represents the stake of the participant holding the
        voucher and the associated BOSON reward. Vouchers with higher amounts of Gluons indicate
        items expected to be higher quality than items with lower amounts of Gluons.
      </p>
      <h3>Applications</h3>
      <p>
        Unisocks, unrelated to Boson, is a proof of concept for decentralized commerce of physical
        goods. While the Boson protocol is built for that, their white paper lists other potential
        use cases.
      </p>
      <table>
        <thead>
          <tr>
            <th>Application</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Online Commerce</strong>
            </td>
            <td>Decentralized e-commerce platform</td>
          </tr>
          <tr>
            <td>
              <strong>M2M-commerce</strong>
            </td>
            <td>Autonomous machine-to-machine transactions</td>
          </tr>
          <tr>
            <td>
              <strong>Loyalty & Rewards</strong>
            </td>
            <td>Interoperable, composable reward systems</td>
          </tr>
          <tr>
            <td>
              <strong>Gaming</strong>
            </td>
            <td>Physical rewards for in-game achievements</td>
          </tr>
          <tr>
            <td>
              <strong>Crypto Exchanges</strong>
            </td>
            <td>Token redemption for physical rewards</td>
          </tr>
          <tr>
            <td>
              <strong>Service Bookings</strong>
            </td>
            <td>Permissionless, two-sided deposit bookings</td>
          </tr>
          <tr>
            <td>
              <strong>Tokenized Networks</strong>
            </td>
            <td>Token exchange for goods and services</td>
          </tr>
        </tbody>
      </table>
      <h3>Governance Roadmap</h3>
      <p>
        Boson has outlined a 3-phase approach to decentralizing their governance. They are currently
        in the Startup Phase.
      </p>
      <ol>
        <li>
          <strong>Startup Phase:</strong> Achieve 'protocol-market-fit' through rapid iteration and
          strong leadership.
        </li>
        <li>
          <strong>Network Phase:</strong> Implement minimally extractive fees for vouchers and
          incentivize market participants to contribute valuable work.
        </li>
        <li>
          <strong>Community Governance:</strong> Transition to a decentralized autonomous
          organization (DAO) to ensure regulatory compliance and prevent centralization.
        </li>
      </ol>
      <h3>Stats</h3>
      <p>
        To scale, Boson estimates they will need to handle, on average, ten transactions per second,
        with peaks potentially being more than 10x that. To do so, they decided to utilize the most
        battle-tested layer 1 - Ethereum, which handles dozens of transactions per second. Boson
        raised $36,000,000 and hired teams covering protocol design & architecture, legal,
        engineering & game theory, and scaling the employee count to 50+. They purchased $700,000+
        in digital real estate within Decentraland's Vegas City with the intention of creating
        Portal, a lifestyle and commerce playground. Portal will enable creators and brands to sell
        redeemable NFTs for real-world products and services.
      </p>
      <Image src="/images/articles/bp-8.webp" alt="Boson Protocol 8" />
      <p></p>
      <p>
        Now that funds have been raised, the team assembled, and the strategy set, Boson has entered
        what it calls "hyper blitz scale mode" of development. For a detailed explanation of what
        hyper-blitz scaling means to Boson, refer to their Roadmap article on Medium. Time will tell
        if supply chains actually adopt models like this. Let's hope so.
      </p>
    </article>
  );
};

export default BosonProtocol;
