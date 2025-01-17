---
title: 'DeFi Essentials'
date: '2024-10-25'
image:
  src: '/misc/placeholder.webp'
  alt: 'DeFi Essentials'
description: 'Essential Protocols for any DeFi Ecosystem'
category: 'technology'
tags: ['crypto']
takeaways:
  - "The DeFi ecosystem experienced explosive growth during 'DeFi Summer' 2020, evolving from simple experiments to complex multi-chain protocols and an agreed-upon core set of protocols."
  - 'While open-source development increases protocol resilience, the complexity of DeFi systems introduces new risks that require careful consideration.'
---

DeFi ecosystems are not just an assortment of novel financial services but an interconnected web of permissionless systems. To start understanding DeFi, it's essential to understand the fundamental building blocks that make these systems possible.

The advent of blockchains represented a fundamental shift in how financial services could be built and used, moving from centralized institutions to open, permissionless protocols. With these new systems, new opportunities are created, and new, better ways of doing things are made possible. In Balaji's words, YouTube is not TV. This transformation began with Bitcoin in 2009, but it wasn't until Ethereum introduced smart contracts in 2015 that the true potential of DeFi started to emerge.

# Coins and Tokens

While not strictly technical or universally adopted (at all), the distinction between coins and tokens provides a helpful framework for understanding crypto assets and their origins.

| Type   | Description                                                                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Coins  | Native currencies of blockchains that miners or validators earn for their participation in the network, used to pay transaction fees (like ETH for Ethereum, SOL for Solana, etc.)               |
| Tokens | Smart contracts deployed on top of blockchains. Can be either fungible (like ERC20 tokens) or non-fungible (NFTs - ERC 721s), each serving different purposes through their programmable nature. |

# DeFi Summer

The early DeFi experiments started with projects like MakerDAO (2014) and Compound (2018), but the ecosystem remained relatively small until 2020. The catalyst came during the "DeFi Summer" of 2020, when the total value locked (TVL) in DeFi protocols exploded from $1 billion to over $15 billion in just a few months. This period saw the birth of automated market makers (AMMs) like Uniswap and byproducts like yield farming and liquidity mining.

All of these protocols were built on Ethereum, and the ecosystem was built on top of the Ethereum Virtual Machine (EVM). The EVM is a Turing-complete virtual machine that allows for the execution of smart contracts, which are self-executing programs that enable token functionality and form the backbone of DeFi applications.

By 2021, DeFi had evolved beyond Ethereum to multiple blockchains, each offering their own innovations, and today's DeFi ecosystem represents an opportunity for traditional financial services to be reimagined through code and consensus. This evolution concluded with a core set of protocols enshrined as any DeFi ecosystem's foundation.

# Components

## Foundational

| Technology            | Description                                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Layer 1               | The underlying blockchain architecture supports transaction settlement and application development. Lesser L1s utilize Layer 2s to scale. |
| Coins                 | Native tokens used to pay transaction fees on Layer 1. Bitcoin was the first cryptocurrency.                                              |
| Smart Contracts       | Self-executing programs stored on blockchains that run when pre-defined conditions are met. Enable tokens, DeFi, NFTs, DAOs, and Web3.    |
| Tokens                | Customizable smart contracts that become tradable assets are built using agreed-upon standards. They can be fungible or non-fungible.     |
| Stablecoins           | Specialized tokens designed to maintain parity with another asset, typically USD.                                                         |
| NFTs                  | Non-fungible tokens that are unique and one-of-a-kind digital assets.                                                                     |
| Liquidity Pools       | Smart contracts where users deposit funds to earn yield and enable token swaps.                                                           |
| DEXes                 | Decentralized exchanges where users can trade tokens, powered by liquidity pools.                                                         |
| Blockchain Explorers  | Tools that index and display all transactions on public blockchains.                                                                      |
| Lending & Borrowing   | Protocols enabling users to lend assets or borrow against collateral.                                                                     |
| Leveraged Derivatives | Platforms for trading leveraged positions, e.g., futures or options, using coins or tokens as collateral.                                 |
| Staking               | Temporary lockup of assets for yield, used for speculation and network security.                                                          |
| Analytics             | Data platforms providing insights into DeFi activity.                                                                                     |

## Advanced

While these fundamental components form the backbone of DeFi, teams have evolved on these concepts to build more sophisticated protocols and mechanisms, some of which are listed below.

| Technology           | Description                                                                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Liquid Staking       | Tradeable tokens representing staked assets that still maintain the price and yield exposure, allowing users to optimize yield and use assets as collateral while staking effectively, increasing the velocity of capital on the network. |
| DEX Aggregators      | Smart contracts that route trades through multiple DEXes to find the best prices.                                                                                                                                                         |
| Yield Aggregators    | Protocols that automatically optimize yield farming across multiple platforms.                                                                                                                                                            |
| Launchpads           | Platforms for launching new tokens and NFT projects.                                                                                                                                                                                      |
| Bridges              | Infrastructure connecting different blockchains to enable cross-chain asset transfers.                                                                                                                                                    |
| GameFi               | Gaming platforms incorporating DeFi mechanics and blockchain-based economies.                                                                                                                                                             |
| Portfolio Management | Non-custodial protocols enabling managed trading of investor funds where the investor retains full control of their assets and maintains exposure to the potential upside derived from the portfolio manager's strategies.                |
| DeFi Insurance       | Protocols providing coverage and backstops against smart contract risks and failures.                                                                                                                                                     |
| Synthetics           | Assets that track the price of other assets using oracle data. These can bring all asset markets on-chain, pretty easily.                                                                                                                 |
| Flash Loans          | Uncollateralized loans that must be borrowed and repaid within a single transaction.                                                                                                                                                      |

# Stablecoins

Stablecoins are among the highest-priority issues in the regulatory landscape. They are intended to retain a peg to another asset, such as a USD and the biggest stablecoins in the world are USDT and USDC, amounting to roughly $100 billion in combined value.

Three variations of stablecoins have gained prominence.

| Type                | Description                                                                                                                                        | Examples               | Risk Level |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- |
| Asset-backed        | Each token is backed by $1 or $1 worth of assets in reserve                                                                                        | USDT, USDC             | Low        |
| Over-collateralized | Users deposit excess collateral (e.g., $200 worth of BTC for $100 DAI) to mint stablecoins. Collateral ratios fluctuate based on market conditions | MakerDAO's DAI         | Medium     |
| Algorithmic         | Uses smart contracts and market incentives to maintain the peg without direct collateral backing                                                   | Terra Classic (failed) | High       |

Other stablecoins are out there, but most fall into one of the above categories and are tied to 1 USD. While it's possible to peg stablecoins to other values (like 2 USD or even $3.1415926535), most stablecoins focus on maintaining a 1:1 peg with USD. There are also stablecoins pegged to currencies like EUR and AUD, but USD-based stablecoins dominate in volume and use cases.

# Trust

It may sound counterintuitive, but it would be ideal not have to trust that a financial institution will honor your balance or provide adequate services. Ideally, a decentralized blockchain backed by cryptographic certainty would serve as the medium for applications to operate trustlessly and permissionlessly.

In developed economies, trust in financial institutions is often taken for granted and recent history has shown that no financial system is immune to crisis:

#### Developing Economies Face:

- Hyperinflation and currency collapse (Venezuela, Zimbabwe)
- Sudden bank nationalizations by governments
- Rampant financial corruption and fraud
- Arbitrary asset seizures and capital controls
- Limited access to essential banking services

#### Developed Economies Experience:

- Bank runs, failures, and bailouts
- Payment censorship, freezing, and seizures
- Delayed settlement times and opaque processes
- Trading halts during market volatility
- Negative interest rates on savings accounts

# Brokerages vs DEXes

Brokerages and Decentralized Exchanges (DEXes) are two different ways of trading assets. Brokerages are custodial, create barriers to entry, and prevent global markets from being accessible, while DEXes are permissionless and can be built or used on any blockchain that enables smart contracts.

For a more detailed comparison, see the table below:

| Feature          | Brokerage                                                     | DEX                                            |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------------- |
| Account Setup    | Complex account opening process (documentation, verification) | Simple wallet connection                       |
| Trading Timeline | Multi-day waiting periods                                     | Immediate trading capability                   |
| Availability     | Limited trading hours                                         | 24/7 operation                                 |
| Custody          | Centralized custody and market making                         | Non-custodial and open access to market making |
| Market Making    | Payment for order flow (PFOF)                                 | Automated market makers (AMMs)                 |

# Risk? DYOR

DeFi is powerful, yet it's still only a toddler, and there are growing pains out of the scope of this article. The rapid evolution of these technologies since 2020's DeFi Summer demonstrates the potential of open-source, permissionless financial systems built on blockchains. However, a non-trivial amount of these experiments are not well documented, and there's never no risk, so DoYourOwnResearch.
