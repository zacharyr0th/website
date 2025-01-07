---
title: 'Defi'
date: '2023-12-31'
image:
  src: '/misc/placeholder.webp'
  alt: 'Defi'
description: 'Global, Permissionless Finance'
category: 'defi'
tags: ['defi', 'crypto']
takeaways:
  - "DeFi represents a fundamental shift from traditional finance's trust-based intermediaries to permissionless, decentralized systems built on smart contracts."
  - "The ecosystem is built on distinct digital assets: native blockchain coins for transaction fees and programmable tokens for specific functionalities."
  - "Stablecoins come in three main varieties (asset-backed, over-collateralized, and algorithmic) with varying risk levels and use cases."
  - "The 2020 DeFi Summer marked a pivotal moment in adoption, establishing core services like DEXs, lending protocols, and liquidity pools as essential infrastructure."
  - "Compared to traditional exchanges, DeFi platforms offer advantages in accessibility, speed, and control, though they face challenges in security and user experience."
---

<style jsx>{`
 .prose a {
    text-decoration: underline;
    color: var(--color-accent);
 }
 .prose ol {
    list-style-type: decimal;
    margin-left: 2em;
    padding-left: 0.5em;
 }
 .prose ol li {
    margin-bottom: 0.5em;
    color: var(--color-text-primary);
    line-height: 1.5;
 }
 .prose ul {
    list-style-type: disc;
    margin-left: 1.5em;
    padding-left: 0.5em;
 }
 .prose ul li {
    margin-bottom: 0.5em;
    color: var(--color-text-primary);
    line-height: 1.5;
 }
`}</style>

<div class="tldr-section">

DeFi ecosystems are not just an assortment of financial services but an interconnected web of permission-less systems. The essence of these applications is token utility and interoperability.

</div>

To start undersanding DeFi, it's essential to understand the fundamental building blocks that make these systems possible. At the core of the crypto ecosystem lies a crucial distinction between different types of digital assets, each serving unique purposes.

The distinction between coins and tokens, while not strictly technical or universally adopted, provides a helpful framework for understanding crypto assets.

| Type   | Description                                                                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Coins  | Native currencies of blockchains, used to pay transaction fees (like ETH for Ethereum, SOL for Solana, etc.)                                                                         |
| Tokens | Smart contracts deployed on top of blockchains. Can be either fungible (like ERC20 tokens) or non-fungible (NFTs), each serving different purposes through their programmable nature |

# Smart Contracts and Tokenomics

Smart contracts are self-executing programs that enable token functionality and form the backbone of DeFi applications. The economic design of these tokens, known as Tokenomics, is crucial for their sustainability. Investors analyze factors like vesting schedules and distribution mechanisms to assess token value.

# Stable Coins

Stablecoins are among the highest-priority issues in the regulatory landscape. They are intended to retain a peg to another asset, such as a USD and the biggest stablecoins in the world are USDT and USDC, amounting to roughly $100 billion in combined value.

Three variations of stablecoins have gained prominence.

| Type                | Description                                                                                                                                        | Examples               | Risk Level |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- |
| Asset-backed        | Each token is backed by $1 or $1 worth of assets in reserve                                                                                        | USDT, USDC             | Low        |
| Over-collateralized | Users deposit excess collateral (e.g., $200 worth of BTC for $100 DAI) to mint stablecoins. Collateral ratios fluctuate based on market conditions | MakerDAO's DAI         | Medium     |
| Algorithmic         | Uses smart contracts and market incentives to maintain the peg without direct collateral backing                                                   | Terra Classic (failed) | High       |

Other stablecoins are out there, but most fall into one of the above categories and are tied to 1 USD. While it's possible to peg stablecoins to other values (like 2 USD or even $3.1415926535), most stablecoins focus on maintaining a 1:1 peg with USD. There are also stablecoins pegged to other currencies like EUR and AUD, but USD-based stablecoins dominate in terms of volume and use cases.

# DeFi

In traditional finance (TradFi), they've built an entire system on layers of trust in intermediaries. The likelihood of nefarious behavior in your banking system really depends on where you live - and Defi seeks to give everyone an equal opportunity at financial sovereignty and independence.

Consider these everyday scenarios in traditional finance:

<ol class="detailed-list">
    <li>
        <strong>Banking Access</strong>
        <ul>
            <li>You trust bank-displayed balances blindly</li>
            <li>
                Banks' hidden actions
                <ul>
                    <li>Lend your money without notice</li>
                    <li>Freeze your accounts</li>
                    <li>Block transactions</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>
        <strong>Trading Integrity</strong>
        <ul>
            <li>
                Required trust points in brokerage trades
                <ul>
                    <li>The broker executing the trade</li>
                    <li>The clearinghouse processing it</li>
                    <li>The custodian holding assets</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>
        <strong>Payment Processing</strong>
        <ul>
            <li>
                Trust points in card transactions
                <ul>
                    <li>The merchant's payment processor</li>
                    <li>The card network</li>
                    <li>Your bank's authorization</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>
        <strong>Financial Services</strong>
        <ul>
            <li>
                Areas of gatekeeper control
                <ul>
                    <li>Who can access financial services</li>
                    <li>What transactions are allowed</li>
                    <li>When funds can be moved</li>
                </ul>
            </li>
        </ul>
    </li>
</ol>

<div class="prose">

### The Global Trust Divide

In developed economies, trust in financial institutions is often taken for granted. However, recent history has shown that no financial system is immune to crisis:

#### Developing Economies Face:

- Hyperinflation and currency collapses (Venezuela, Zimbabwe)
- Sudden bank nationalizations
- Rampant financial corruption
- Arbitrary asset seizures and capital controls
- Limited access to basic banking services

#### Developed Economies Experience:

- Bank runs and failures (2008 Financial Crisis)
- Account freezes during political unrest
- Payment censorship
- Trading halts during market volatility
- Negative interest rates on savings accounts
</div>

<div></div>

### Price Action Preceding Innovation

Ethereum paved the way for decentralized projects to bootstrap their funding rounds by issuing tokens in their 2014 ICO (Initial Coin Offering), leading to the ICO mania in 2017. Much has been documented about this time period as it was rife with scams and bewitching celebrities attempting cash grabs while the price of Ethereum soared to nearly $1500 and Bitcoin to almost $20,000.

In the following years, Ethereum crashed to less than $100, and Bitcoin fell to $3200 during the COVID drop in March 2020. Then it was up only, down only, then up only, and yada yada.

Price movements historically drive public interest in cryptocurrency. While the 2020 DeFi Summer coincided with Bitcoin's dramatic price recovery, this correlation mainly affected user adoption. Behind the scenes, developers had been consistently building and improving DeFi infrastructure since 2017, regardless of market conditions.

# Defi Summer & The Standard Stack

As Bitcoin and Ethereum recovered during the remainder of 2020 after the COVID drop in March, something called DeFi Summer took off. This movement has been in the background since 2017. Protocols like Uniswap, MakerDAO, Curve, Yearn, and Aave took off on Ethereum, enabling the world's first decentralized lending, borrowing, and trading markets.

This period was rampant with innovation and, at the same time, speculation. Prices were rising at unsustainable rates, and some protocols were failing while their tokens were going to zero. Ecosystems have collectively evolved to establish a core set of essential financial services that are now considered fundamental building blocks.

These services typically include:

1. Decentralized Exchanges (DEX) for token swapping
2. Lending and borrowing protocols
3. Liquidity pools and yield farming
4. Stablecoin mechanisms
5. Asset bridging solutions

They form what's known as the "DeFi stack" - a foundational layer that new blockchains must implement to be considered viable for modern decentralized applications. When a new blockchain launches, developers typically prioritize building these core services first, which explains why you'll find similar protocols (like Uniswap-style DEXes or Aave-like lending platforms) replicated across different blockchain ecosystems.

# Case Study

To truly understand crypto, you need to participate in on-chain transactions.

Let's compare aspects of the trade process at ETrade, one of the world's largest centralized exchanges (CEX), vs. Jupiter Aggregator, Solana's most advanced decentralized exchange (DEX). Jupiter is not just a DEX; it is an aggregator of different DEXes.

If you submit a trade and Jupiter finds two ways to do it, you'll be presented with the option that offers the better deal.

## ETrade vs Jupiter Aggregator Comparison

| Feature          | ETrade (CEX)                                                  | Jupiter (DEX)                  |
| ---------------- | ------------------------------------------------------------- | ------------------------------ |
| Account Setup    | Complex account opening process (documentation, verification) | Simple wallet connection       |
| Trading Timeline | Multi-day waiting periods                                     | Immediate trading capability   |
| Availability     | Limited trading hours                                         | 24/7 operation                 |
| Custody          | Centralized custody and market makers                         | Non-custodial                  |
| Market Making    | Payment for order flow (PFOF) model                           | Automated market makers (AMMs) |

# Conclusion

DeFi is powerful, yet it is still only a toddler, and there are growing pains. There have been dozens, if not hundreds, of blockchain applications and exploits, and if you want to get involved, you need to know what you're doing. The remainder of this course focuses on the media's media's buzzwords – NFTs and DAOs. What is essential to consider is these sub-industries within crypto are just logical extensions of what DeFi can do.

Consensus methods are the foundation of blockchains.

Blockchains are the foundations of DeFi.

DeFi is the foundation of everything else.
