import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'boson-protocol',
  slug: 'boson-protocol',
  title: 'Boson Protocol',
  subtitle: 'test',
  image: '/placeholder.webp',
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
};

const Derivatives: React.FC = () => {
  return (
    <article>
      <p>
        DAOJ Subscribe Sign in DAOJ Discover more from DAOJ Actionable perspectives on new
        technologies and relevant financial topics Type your email... Subscribe Continue reading
        Sign in Boson Protocol Decentralized Commerce Zachary Roth Sep 06, 2021 Boson Protocol Named
        after an elementary particle described as a force carrier that functions as the 'glue'
        holding matter together, Boson Protocol has made its mission to enable decentralized
        commerce ecosystems to 'disrupt, demonopolize, and democratize commerce. Boson provides a
        toolset that introduces novel NFT contracts called Commitment Tokens. Through these
        Commitment tokens and the surrounding architecture, Boson looks to enable disparate entities
        to engage in trustless transactions of Things across space and time. Things are physical
        goods being transacted. Boson Protocol enables the following for any Thing: The tokenization
        of digital to physical redemption using NFTs structured as futures contracts encoded with
        game theory tactics that incentivize a decreasing amount of human involvement. Liquid
        digital markets for these NFTs. A robust commerce data market. The stated vision of Boson is
        'To be the world's open, public infrastructure layer for commercial transactions and their
        data. Boson is building a bridge between the Metaverse and the physical universe. Purpose
        "Commerce is a human endeavor that should not have value captured by the few." Justin Banon,
        Boson CEO When the internet began taking over, idealists viewed the future as inherently
        decentralized. As time passed, it became clear that the infrastructure built within web2 was
        exorbitantly favorable to centralized scaling by companies like Amazon & Google. Commerce is
        a multi-trillion dollar global industry constantly manipulated by these monolithic public
        companies that serve as the bridge between content and consumers. If Amazon wants to ban you
        for having too many items returned, Amazon can do that. If Amazon wants to ban you for
        returning too many things, Amazon can do that. If Amazon wants to use data from sellers on
        its platform to build competitive product offerings and place them in front of its
        competitors, it can do that. Apple can too. If Amazon wants to be a monopoly, Amazon can do
        that. You get the point. While Amazon is the main culprit here, institutions like Shopify,
        Etsy, Pinterest, Alibaba, Restoration Hardware, Home Depot, etc., have similar problems -
        they're too powerful for their own good. This centralization & rent-seeking by big companies
        is rampant across many industries, and it's become clear that it's just the way of web2.
        Web2's centralized scaling capabilities enabled the creation of multi-trillion-dollar
        monopolies. Web3 companies seek to dismantle them. Web3's infrastructure - public
        blockchains, NFTs, digital wallets, etc. have given vendors an entirely new framework to
        operate within. You no longer need to rely on these immovable marketplace intermediaries to
        perform commerce functions or stay on top of commerce data. Boson's Buyer/Seller Diagram
        There are two main issues Boson is taking head-on: 'Coordinating commercial transactions
        requires centralized intermediaries or decentralized arbitrators to manage dispute mediation
        and transaction reversal. This adds cost and trust, which limits the scope and reduces the
        efficiency of commerce.' 'Data collected from commercial transactions by centralized
        intermediaries is locked-away and used to strengthen anti-competitive market dominance which
        imperils the interests of the consumer, other firms and even governments.' Boson has taken
        inspiration from the trustless & tokenized DeFi communities built around individual
        protocols. These DeFi communities are disrupting banks with their newfound ability to
        transact and anonymously create digital value without enacting harmful rent-seeking
        practices. Boson is creating a new medium of exchange between Buyers and Sellers with a
        similar goal. There's no need to rely on antiquated Antitrust laws and shady governments to
        protect you. You can depend on the permissionless transaction mechanisms made possible by
        modern cryptography and smart contract design. Function To understand the Boson Protocol,
        you must understand Commitment Tokens, Thing Tokens, and the role of BOSON tokens.
        Commitment Tokens A Buyer commits a Seller to exchange digital value for a physical item (a
        Thing). This commitment is funded & tokenized into an escrow contract built into an NFT
        contract. The NFT serves as a voucher to buy or sell an item, so Boson refers to them as
        NFTVs. The NFT contract has an expiration date and is, in essence, acting as a futures
        contract where the Seller is obliged to deliver the said item(s) listed in the contract at
        expiration. Commitment Token holders are granted the right to transfer their token to
        another wallet or reliably and securely redeem the token for a particular Thing. The
        Commitment Tokens / NFT Voucher Tokens have the following characteristics: Universal - Can
        represent any Thing. Interoperable - Can represent a standardized version of any Thing.
        Composable - Can be assembled into composite products. Programmable - Fully customizable
        within computing limits. Transferable / Storable - Between any standard web3 wallet.
        Stateful - Appropriately change state (redeemed/canceled/failed/complained about) across the
        core exchange mechanism process. The Core Exchange Mechanism takes the governance of
        Commitment Tokens, where the programmed game theory comes into play. Buyers and Sellers
        sequentially deposit up-front funds, so there are varying levels of skin in the game on both
        sides of the transaction. The final deposit transfer process is structured to incentivize
        good behavior by both parties. Boson's Core Exchange Mechanism Diagram Using this sequential
        transaction process, Commitment Tokens can achieve a 'Subgame Perfect Equilibrium,' which
        equates to each subgame of the original game as having a Nash equilibrium. As those of you
        in the CFA curriculum know, Nash equilibrium equates to the balance between players when
        each player knows the other players' strategy and has nothing to gain by changing only their
        own strategy. The possible outcomes of the game are the triangles on the right side of the
        above diagram. CoF stands for Cancel or Fault, which is an undesirable outcome. Therefore
        the most desirable outcome of the game for all parties is 'Redemption; No Complaint; No
        CoF,' which is the 4th triangle from the top of the diagram. The purpose of this game theory
        being programmed into Commitment Tokens is to minimize the number of disputes and
        arbitration required between Buyers and Sellers. Thing Tokens Thing Tokens, which conform to
        the standard ERC20 contract, are used to purchase Commitment Tokens. Think of a Thing token
        as a 'generalized Unisock' and the Commitment Token as an add-on futures contract. Unisocks
        are a grand experiment in scarcity. There were 500 real pairs of Uniswap merchandise socks
        tokenized as SOCKs and deposited into a liquidity pool on Uniswap along with their starting
        value worth of ETH. Each SOCK token represents the redeemable ownership of 1 pair of socks
        and is minted with a bonding curve, hence the 11,048.07% increase in price from the original
        $12. You can either sell the token back to the liquidity pool or redeem it for the physical
        socks, where the Uniswap company will ship a physical pair to you anywhere in the world.
        Unisocks Exchange At the time of writing, the price of a $SOCK was $132,576.82, and 192 have
        already been redeemed. Thing tokens are similar. The interoperability and composability of
        Thing tokens enable them to be fitted or retrofitted into any existing DeFi infrastructure.
        They are tradable in the same way you can trade SOCKs between different wallets, and they
        can 'plug' into AMMs (Automated Market Makers) to create liquid digital markets. Their use
        cases within DeFi include product price discovery on DEXes, yield optimization, and the
        crowdfunding of non-existent products through ITOs (Initial Thing Offerings). BOSON Tokens
        The incentive is the invisible hand that Adam Smith was talking about. Markets love
        incentives. Just look at Carbon Credits or Tesla's profitability. Boson built reward
        mechanisms within the Thing / Commitment Token relationship to incentivize good behavior by
        both Buyers and Sellers - but that doesn't tell the whole story. The core objective of the
        Boson Protocol is to 'maximize the supply of quality redemptions.' In other words: it
        facilitates successful commerce transactions. To do so, Boson implemented the BOSON token
        (Bosons) as a monetary reward for actors within the Boson ecosystem who help the protocol
        reach its objective. Below is a high-level overview of the main stakeholders within the
        Boson Protocol. High-Level Mapping of Boson Stakeholders Gluons For each voucher, there is a
        unique derivative called a Gluon that represents the stake of the participant holding the
        voucher and the associated BOSON reward. Vouchers with higher amounts of Gluons indicate
        items that are expected to be higher quality than items with lower amounts of Gluons. Let's
        say a Seller posts a voucher believing it will deliver an item that is highly valued in a
        no-complaint transaction. The Seller would be incentivized to stake more capital than the
        minimum required to be exposed to more Gluons, increasing the chance of receiving more BOSON
        rewards. This engineering marvel incentivizes market participants to partake in high-quality
        transactions of high-quality physical goods. For a more detailed analysis of all the game
        theory involved, including math, check out the Boson Whitepaper. Applications Is your brain
        spinning? Did you think there would be such a seamless exchange of digital and physical
        value? It's just money, data, and Things. Things; Money; Data, #dCommerce Unisocks,
        unrelated to Boson, is a proof of concept for decentralized commerce of physical goods.
        While the Boson protocol is built for that, below is a list of some other potential use
        cases suggested in their white paper. Online Commerce Non-Monetary Vouchers - Think
        automated & auditable food stamps representing real food for those in need. M2M-commerce
        (Machine to Machine) - Let your autonomous car purchase new tires. Loyalty & Rewards -
        Standardized, composable, interoperable loyalty programs & credit card reward systems.
        Imagine exchanging your Southwest Airlines miles for $SOCKs on Uniswap. Games - Video games
        can grant players physical gifts for achieving certain success levels. (A REAL Mystic
        Axie??? - just kidding) Gaming - Enable blockchain games to distribute prizes as NFTVs or
        $BOSONs. Crypto Exchanges - Enable exchange tokens to be redeemed for physical rewards.
        Service Bookings - Secure bookings permissionlessly with two-sided deposits. Tokenized
        Networks - Exchange network tokens for digital/physical goods & services. Governance Boson
        enacted a 3-phase structure of decentralizing their governance and is currently in the
        Startup Phase. Startup Phase - Achieve 'protocol-market-fit' by rapid iteration through
        opinionated leadership. Network Phase - Enable minimally extractive fees for vouchers and
        ultimately incentivize market participants to contribute valuable work. Community Governance
        - 'At the time of writing, it is anticipated that the governance structure will be a
        decentralized autonomous organization (DAO), structured to ensure regulatory compliance as
        well as resist capture from centralized entities or groups.' Roadmap To scale, Boson
        estimates they will need to handle, on average, ten transactions per second, with peaks
        potentially being more than 10x that. To do so, they decided to utilize the most
        battle-tested layer 1 - Ethereum, which can generally handle dozens of transactions per
        second. Boson raised $36,000,000 in token sales and USD that funded teams across protocol
        design & and architecture, legal engineering & game theory while also scaling the employee
        count to over 50. The Boson token is #511 on CoinMarketCap, with a market value of around
        $60 million. Along with prolific hirings, Boson has released a DEX for any Thing, an app to
        reference transactions, and began a groundbreaking experiment in Decentraland. Boson's
        Leptonite App Boson purchased over $700,000 in digital real estate within Decentraland's
        Vegas City. Boson is creating Portal, the world's first lifestyle and commerce playground,
        through its collaboration with Polygonal Mind. The Portal will enable creators and brands to
        sell redeemable NFTs for real-world products and services. Boson Portal's Space Layout in
        Decentraland Now that funds have been raised, the team has been formed, and a strategy has
        been implemented - Boson is in what it calls the 'hyper blitz scale mode of development. For
        a more refined definition of the hyper-blitz scale to Boson, check out their Roadmap article
        on Medium. Commerce's Byproducts Commerce is a natural process of giving and taking. There
        are discounts and premiums on items dependent on market demand. Still, with centralized
        scaling, many companies have taken advantage of billions of consumers and millions of small
        businesses. The gatekeeping and rent-seeking of the intermediaries and arbiters involved is
        nothing new. It's just a byproduct of the fact that commerce is so resource-intensive. Only
        Kings and Parliaments had the funding to scour the globe for optimal ways to deliver goods,
        so only Kings and Parliaments were in control of the world's trade. Do you blame Amazon for
        being a monopoly? All Jeff did was to act on a future vision that turned out to be correct…
        and then he got greedy. Boson looks to flatline intermediaries like Amazon and prevents
        other Amazons from happening. Conclusion Boson is pioneering a future of decentralized
        commerce. If they pull it off, they'll become one of the most important protocols in the
        world. Their 60 million dollar market cap would be a drop in how much value would be
        accrued. Given the magnitude of the issues at hand and the ethos of decentralized
        governance, you can imagine the benefit that Boson could have on society. There are risks
        associated with decentralized commerce that could require centralized emergency maintenance.
        These include layer one failures, smart contract risk, unknown future regulations, and
        competition. Still, as they have stated - they are open to changing their settlement layers
        and are working on full-scale compliance with international law. They have progressed rather
        quickly, the protocol is transparent, the passion of the founders is focused, and the
        roadmaps are clear. Even if Boson isn’t the one to take down Amazon, perhaps they spawn the
        ideas that do so. In any case, the trend of decentralized commerce is worth watching. Boson
        Links Boson Socials: Twitter | Medium | Telegram | YouTube | LinkedIn Boson Links: Website |
        Whitepaper | Litepaper | FAQs Subscribe to DAOJ By zachary r0th · Launched 3 years ago
        Actionable perspectives on new technologies and relevant financial topics Type your email...
        Subscribe Comments Write a comment... Top Latest Discussions NounsDAO Timeless Aug 31, 2021
        • Zachary Roth 4 1 Star Atlas An Ambitious Metaverse Sep 23, 2021 • Zachary Roth 1 2 Audius
        | Royal | Catalog Audius | Royal | Catalog Sep 15, 2021 • Zachary Roth 1 See all Ready for
        more? Type your email... Subscribe © 2024 Zachary Roth Privacy ∙ Terms ∙ Collection notice
        Start Writing Get the app Substack is the home for great culture{' '}
      </p>
    </article>
  );
};

export default Derivatives;
