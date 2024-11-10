---
title: 'Defi'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: Understanding the Building Blocks of Decentralized Finance
description: 'Understanding the Building Blocks of Decentralized Finance'
tags: ['Crypto']
---

<style jsx>{`
 .prose a {
    text-decoration: underline;
    color: var(--color-accent);
 }
 .prose ol {
    list-style-type: decimal;
    margin-left: 2em; /* Adjust as needed for indentation */
    padding-left: 0.5em; /* Add padding if needed */
 }
 .prose ol li {
    margin-bottom: 0.5em;
    color: var(--color-text-primary);
    line-height: 1.5; /* Adjust line height for better readability */
 }
`}</style>

<div class="tldr-section">

</div>

DeFi ecosystems are not just an assortment of financial services but an interconnected web of permission-less systems. The essence of these applications is token utility and interoperability, which we'll focus on in this chapter.

# Coins and Tokens

Coins are the native currencies of blockchains, used to pay transaction fees (like ETH for Ethereum, SOL for Solana, etc.). Tokens, on the other hand, are smart contracts deployed on top of these blockchains. They can be either fungible (like ERC20 tokens) or non-fungible (NFTs), each serving different purposes through their programmable nature.

# Smart Contracts and Tokenomics

Smart contracts are self-executing programs that enable token functionality and form the backbone of DeFi applications. The economic design of these tokens, known as Tokenomics, is crucial for their sustainability. Investors analyze factors like vesting schedules and distribution mechanisms to assess token value.

# Stable Coins

Stablecoins are among the highest-priority issues in the regulatory landscape. They are intended to retain a peg to another asset, such as a USD. The biggest stablecoins in the world are USDT and USDC, amounting to roughly $100 billion in combined value. Each of these coins is intended to be worth $1 at all times and enable all the benefits blockchains offer.

There are three primary types of stablecoins.

Asset-backed—USDT and USDC are examples of asset-backed stablecoins, where a supposed $1 or $1 worth of assets backs every stablecoin.
Over-collateralized – MakerDAO's DAI is an example of an over-collateralized stablecoin. Users can deposit volatile collateral like BTC on the Maker platform and receive DAI in return. To receive $100 worth of DAI, for example, a user will need to deposit $200 worth of BTC (assuming that the loan-to-value ratio is 2:1). If BTC drops in value to the point where you are unable to trade it back for your DAI (LTV ratios fluctuate based on market supply and demand dynamics so this liquidation point can change).
Algorithmic—Algorithmic coins are inherently more risky than the above stablecoins, but there are a few out there that seem to work. It is still being determined if this model is scalable. Terra Classic was a $60 billion example of an algorithmic stablecoin that did not work and was a predictable culprit in an algorithmic stablecoin death spiral.
Other stablecoins are out there, but most fall into one of the above categories and are tied to 1 USD. Sure, you could tie a stablecoin to 2 USD or 1,000,000 USD. You could make a new cryptocurrency, call it PIE, and peg it to $3.1415926535 – although the ticker PIE has already been taken.

There are stable coins pegged to the EUR, AUD, etc., but most of the volume and use cases involve USD-based stablecoins.

# DeFi

Decentralized Finance (DeFi) highlights the difference between owning and possessing something. In traditional finance (TradFi), you trust intermediaries to do things right for you every step of the way.

Here are some examples of that:

Every time you log into your account, you trust your bank to tell you your accurate balance and give you access. However, the bank can also do whatever it wants with your money without telling you.
With every trade you make on a brokerage, you trust that you're getting the right price and that the exchange you're trading with is not front-running you.
Every time you buy something with a funded debit or credit card, you trust that the bank will transfer the money from your account to the vendor's account accordingly and that the vendor will accept the transfer.
Whenever you attempt to open an account for any financial product or service, you ask permission to do so.
In most parts of the world, this trust is taken for granted. This level of trust is too high in other parts of the world that have experienced currency failures, uncapped businesses, and banking corruption. Even in developed financial economies, this trust becomes a liability. If dirt hits the fan, do you trust your exchange to let you withdraw your money?

DeFi has a tumultuous and weathered history but is now a massive hundred-billion-dollar market with room to grow. TradFi markets are worth hundreds of trillions.

# Price Action

Crypto began as a single blockchain and a single currency. As several projects like MasterCoin and ColoredCoins popped up, Ethereum became the only one with staying power.

Ethereum paved the way for decentralized projects to bootstrap their funding rounds by issuing tokens in their 2014 ICO (Initial Coin Offering), leading to the ICO mania in 2017. Much has been documented about this time period as it was rife with scams and bewitching celebrities attempting cash grabs while the price of Ethereum soared to nearly $1500 and Bitcoin to almost $20,000.

In the following years, Ethereum crashed to less than $100, and Bitcoin fell to $3200 during the COVID drop in March 2020. Then it was up only, down only, then up only, and now down only again.

The macroeconomic environment is continually finding itself in unprecedented territory, so it will be interesting to see how Bitcoin's price and the cryptocurrency market react in the upcoming decades. Again, crypto is barely a teenager and has many uphill battles.

# DeFi Summer & The Standard Stack

As Bitcoin and Ethereum recovered during the remainder of 2020 after the COVID drop in March, something called DeFi Summer took off. This movement has been in the background since 2017. Protocols like Uniswap, MakerDAO, Curve, Yearn, and Aave took off on Ethereum, enabling the world's first decentralized lending, borrowing, and trading markets.

Millions and billions of dollars poured into these protocols and other applications.

This period was rampant with innovation and, at the same time, speculation. Prices were rising at unsustainable rates, and some protocols were failing while their tokens were going to zero. DeFi protocols like the ones listed above – with some staying power – have inspired thousands of blockchain applications to be built across dozens of blockchains.

There is a group of financial services that DeFi protocols inhabit that are mirrored on one new blockchain after the next. They have become the standard stack. Without the basic DeFi layer, blockchains are considered to be lacking. This is why you'll see so many protocols that do the same thing on different blockchains.

Oddly enough, Bitcoin does not have a developed DeFi network. Although possible, the code is not built to foster DeFi, and the development community surrounding Bitcoin is not keen on enabling it.

# Case Study

To truly understand crypto, you need to participate in on-chain transactions.

Let's compare aspects of the trade process at ETrade, one of the world's largest centralized exchanges (CEX), vs. Jupiter Aggregator, Solana's most advanced decentralized exchange (DEX). Jupiter is not just a DEX; it is an aggregator of different DEXes.

If you submit a trade and Jupiter finds two ways to do it, you'll be presented with the option that offers the better deal.

## ETrade vs Jupiter Aggregator Comparison

ETrade (CEX):
- Complex account opening process (documentation, verification)
- Multi-day waiting periods
- Limited trading hours
- Centralized custody and market makers
- Payment for order flow (PFOF) model

Jupiter (DEX):
- Simple wallet connection
- Immediate trading capability
- 24/7 operation
- Non-custodial
- Automated market makers (AMMs)

# Conclusion

DeFi is powerful, yet it is still only a toddler, and there are growing pains. There have been dozens, if not hundreds, of blockchain applications and exploits, and if you want to get involved, you need to know what you're doing. The remainder of this course focuses on the media's media's buzzwords – NFTs and DAOs. What is essential to consider is these sub-industries within crypto are just logical extensions of what DeFi can do.

Just remember:

Consensus methods are the foundation of blockchains.
Blockchains are the foundations of DeFi.
DeFi is the foundation of NFTs and DAOs.
