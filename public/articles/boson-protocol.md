---
title: 'Boson Protocol'
date: '2021-08-21'
image:
  src: '/images/boson.webp'
  alt: 'Boson Protocol'
description: 'Tackling dEcommerce'
category: 'technology'
tags: ['crypto']
takeaways:
  - 'Boson aims to disrupt e-commerce by creating a decentralized ecosystem for trustless transactions of physical goods using Ethereum.'
  - 'Boson enables various applications beyond e-commerce, including machine-to-machine commerce, loyalty programs, and gaming rewards.'
---

Named after an elementary particle described as a force carrier that functions as the 'glue' holding matter together, Boson Protocol has made its mission to build a decentralized commerce ecosystem to disrupt global trade.

Boson Protocol is a toolset that gives businesses and individuals the control to engage in trustless transactions of physical goods and services using Ethereum as the underlying settlement layer. It enables the tokenization and redemption of physical items through NFTs, the creation of liquid digital markets for these NFTs, and, as a byproduct, the creation of a robust data market.

> "Commerce is a human endeavor that should not have its value captured by the few."
>
> — Justin Banon, Boson CEO

The early Internet promised a future of fair and accessible data for all. Instead, market forces favored centralized infrastructure for its profitability. This trend extended to e-commerce, where intermediaries now dominate. These middlemen exploit user data for profit or fail to utilize it effectively. Crypto infrastructure - public blockchains, NFTs, digital wallets, etc. — has given vendors a level of control that wasn't available a decade ago. You no longer need to rely on these intermediaries to perform commerce functions or pay an arm and a leg to keep track of commerce data.

![Boson Protocol 1](/images/bp-1.webp)

Inspired by trustless and tokenized DeFi communities, Boson Protocol aims to reduce incumbent rent-seeking behavior by creating a decentralized and trustless environment for commerce. The functionality surrounds what are called Commitment tokens, Thing tokens, and the role of the BOSON token.

# Components

## Commitment Tokens

A Buyer and Seller commit to exchange digital value for a physical item (a Thing). This commitment is funded & tokenized into an escrow contract built into an NFT. The NFT serves as a voucher to buy or sell an item, so Boson refers to them as NFTVs. The NFT contract has an expiration date and, in essence, acts as a futures contract where the Seller is obliged to deliver the said item(s) listed in the contract at expiration. Commitment Token holders are granted the right to transfer their token to another wallet or reliably and securely redeem the token for a particular Thing.

#### Commitment Tokens Characteristics

| Characteristic              | Description                                               |
| --------------------------- | --------------------------------------------------------- |
| **Universal**               | Can represent any Thing.                                  |
| **Interoperable**           | Can represent a standardized version of any Thing.        |
| **Composable**              | Can be assembled into composite products.                 |
| **Programmable**            | Fully customizable.                                       |
| **Transferable / Storable** | Between any standard EVM wallet.                          |
| **Stateful**                | Changes state across the core exchange mechanism process. |

The Core Exchange Mechanism governs Commitment Tokens, where the programmed game theory comes into play. Buyers and Sellers sequentially deposit up-front funds, so there are varying levels of skin in the game on both sides of the transaction. The final deposit transfer process is structured to incentivize both parties to behave well.

Using this sequential transaction process, Commitment Tokens can achieve a 'Subgame Perfect Equilibrium,' a concept from game theory. This equilibrium ensures that each transaction step is balanced and fair, reducing the potential for disputes. In simpler terms, it's a game where each player knows the other players' strategy and has nothing to gain by changing only their strategy, leading to a balanced outcome.

![Boson Protocol 2](/images/bp-2.webp)

The possible game outcomes are the triangles on the right side of the above diagram. CoF stands for Cancel or Fault, which is an undesirable outcome. The most desirable outcome for all parties is 'Redemption; No Complaint; No CoF,' which is the fourth triangle from the top of the diagram. The purpose of programming this game theory into Commitment Tokens is to minimize the number of disputes and arbitration required between Buyers and Sellers, hoping to provide a smooth and efficient transaction process.

## Thing Tokens

Thing Tokens, which conform to the ERC20 contract standard for creating fungible tokens, are used to purchase Commitment Tokens. Think of a Thing token as a 'generalized Unisock' and the Commitment Token as an add-on futures contract. Unisocks are a grand experiment in scarcity. There were 500 real pairs of Uniswap merchandise socks tokenized as SOCKs and deposited into a liquidity pool on Uniswap along with their starting value worth of ETH.

### Unisocks

Each SOCK token represents the redeemable ownership of 1 pair of socks and is minted with a bonding curve, hence the 11,048.07% increase in price from the original $12. You can either sell the token back to the liquidity pool or redeem it for the physical socks, where the Uniswap company will ship a physical pair to you anywhere in the world.

![Boson Protocol 3](/images/bp-3.webp)

For whatever reason, the price of a single $SOCK token has gone well above $100,000, and 192 have already been redeemed. Thing tokens are similar. The interoperability and composability of Thing tokens enable them to be fitted or retrofitted into any existing DeFi infrastructure. They are tradable in the same way you can trade SOCKs between different wallets, and they can 'plug' into AMMs (Automated Market Makers) to create liquid digital markets. Their use cases within DeFi include product price discovery on DEXes, yield optimization, and the crowdfunding of non-existent products through ITOs (Initial Thing Offerings).

## Boson Tokens

Incentives are the invisible hand that Adam Smith was talking about. Boson built reward mechanisms within the Thing-Commitment Token relationship to incentivize good behavior by both Buyers and Sellers, but that doesn't tell the whole story. The core objective of the Boson Protocol is to 'maximize the supply of quality redemptions.' In other words, it facilitates successful commerce transactions. To do so, Boson implemented the BOSON token (Bosons) as a monetary reward for actors within the Boson ecosystem who help the protocol reach its objective.

A high-level overview of the main stakeholders within the Protocol:

![Boson Protocol 4](/images/bp-4.webp)
![Boson Protocol 5](/images/bp-5.webp)

## Gluons

There are also gluons, which act as quality indicators, encouraging participants to stake more capital for higher-quality items. This system incentivizes market participants to engage in high-quality transactions of high-quality physical goods. Each voucher has a unique derivative called a Gluon that represents the stake of the participant holding the voucher and the associated BOSON reward. Vouchers with higher amounts of Gluons indicate items expected to be higher quality than items with lower amounts of Gluons.

# Applications

| Vertical              | Description                                |
| --------------------- | ------------------------------------------ |
| **Online Commerce**   | Decentralized e-commerce platform          |
| **M2M-commerce**      | Autonomous machine-to-machine transactions |
| **Loyalty & Rewards** | Interoperable, composable reward systems   |
| **Gaming**            | Physical rewards for in-game achievements  |
| **Service Bookings**  | Permissionless, two-sided deposit bookings |

# Scaling

To scale, Boson estimates they will need to handle, on average, ten transactions per second, with peaks potentially being more than 10x that. To do so, they decided to utilize the most battle-tested layer 1 - Ethereum, which handles dozens of transactions per second. Boson raised $36,000,000 and hired teams covering protocol design, architecture, legal, engineering, and game theory. After scaling their team to 50+, Boson purchased $700,000+ in digital real estate within Decentraland's Vegas City to create Portal, a lifestyle and commerce playground. Portal will enable creators and brands to sell redeemable NFTs for real-world products and services.

![Boson Protocol 8](/images/bp-8.webp)

Now that funds have been raised, the team assembled, and the strategy set, Boson has entered what it calls "hyper blitz scale mode" of development. For a detailed explanation of what hyper-blitz scaling means to Boson, refer to their Roadmap article on Medium. Time will tell if supply chains adopt models like this.

Let's hope so.
