---
title: 'Defi: Level Two'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: 'Advanced DeFi Mechanisms and Emerging Technologies'
description: 'Advanced DeFi Mechanisms and Emerging Technologies'
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

Crypto and blockchain technologies operate at the cutting edge of technology, cryptography, finance, and macroeconomics. They have since crept into governance, art, publishing, science, and many other industries. Peer-to-peer transactions are crypto’s oldest use case, and DeFi is a logical extension. Regarding DeFi, constant innovations are being made that enhance previous technologies and introduce new ones.

The open-source nature of DeFi helps speed up innovations, and that opens doors to create new ideas and vulnerabilities. With the amount of money on-chain (as much as $250 billion at its peak), there are plenty of opportunities for bad actors to misbehave.

Even though some of these are not dangerous, if you use any of the following technologies, please do your research (DYOR) beyond this article before you start.

Advanced DeFi Technology
Liquid Staking
Staking is a robust field within blockchain architecture that has many use cases. Before liquid staking, one of its downsides was that a staked asset was not liquid. It could not be used as collateral or traded for something else—cue liquid staking.

Marinade Spotlight

Liquid staking is the process of obtaining a liquid I-owe-you token that is supposed to trade on parity with the underlying asset being staked. This liquid token represents the illiquid coin/token that is staked. The staking yields accrue to the liquid token and either affect the price or the number of one’s holdings – dependent on the liquid staking method involved.

Examples: Lido, Marinade

DEX Aggregator
DEXes in themselves have facilitated a paradigm shift in financial transactions. Millions of people have moved trillions of dollars worth of value through DEXes in the burgeoning digital economies developing across L1s and L2s.

Solrise’s Integration of Jupiter
DEX aggregators are protocols that connect to various DEXes and find the most liquid and highest returning swap rates possible. These can be used for cryptocurrencies and NFTs as NFT marketplaces can be aggregated in the same way fungible token DEXes can be.

Examples: Jupiter, 1inch , Gem

Yield Aggregator
Yield aggregators function in similar ways to DEX aggregators. They hunt for the best possible yields on the protocols they’ve integrated with. This saves Yield Farmers time from having to check all of these protocols individually, although it does add another layer of trust needed in the code within the smart contracts involved.

Examples: Tulip, Beefy

Launchpads
Launchpads are applications built on blockchains that allow new tokens to have an ICO (initial coin offering). ICOs are like IPOs (initial public offerings) in that they introduce a new market by providing liquidity to a new asset. Below is an example of how a launchpad may work.
A new token is launching. To participate in the ICO, investors will have to have 100 of the launchpad’s tokens staked to the platform for the three days before the launch. There may be a fixed amount of allocations, or if there is significant investor interest, then there may be a lottery function that gives tickets for a specific amount of the new token to a select number of staked ICO participants.
As with all DeFi protocols, there are many launchpads across all major blockchains, and they all vary according to how they function.

Examples: Raydium, Polka Starter

Bridges
Bridges connect one blockchain to another and let users bridge assets between the two. They are somewhat controversial because a few major hacks have occurred on bridges. After all, they are large targets. The standard bridge consists of the token being transferred from one blockchain to another, being locked up and wrapped.

Moving Ethereum tokens to the Solana blockchain, for example, requires the Ethereum tokens to be wrapped and distributed as WETH for them to function on Solana. The actual ETH is still locked up within the bridge’s smart contracts and is only released upon the relinquishment/burning of the WETH.

Arguments for bridges are primarily based on the idea that blockchains will scale if they’re interoperable together, meaning their assets can freely move between each other. Arguments against bridges, like those made by Ethereum’s founder Vitalik Buterin, are primarily based on the idea that they’re not necessary nor safe.

Examples: Portal, Swim

GameFi
GameFi is a field that has expanded rapidly over the past few years. It’s full of acclaim and criticism as it varies widely in its execution. This includes the protocols that gamify DeFi mechanisms and the videogames that include digital economies built on blockchains.
The idea makes sense. Suppose you buy a digital asset like a rifle skin in a centralized video game ecosystem like Call of Duty. Now imagine Call of Duty goes out of business or decides to remove that asset. You lose it with no way of ever recovering it. This is an argument for NFTs as much as it is GameFi.
GameFi detractors will argue that digital sweatshops are being created where the bulk of users will naturally become places where incomes are so low that the most logical way to earn a living is to spend all their workdays playing a GameFi videogame. Along with the rest of crypto, it’s a nuanced topic.

Examples: DeFi Land, Axie Infinity, Star Atlas

Non-Custodial Portfolio Management Protocols
Non-custodial portfolio management protocols are applications that let managers trade investor funds in a non-custodial fashion. Investor funds are deposited into a manager’s fund, but there is no way for the manager to withdraw them. Instead, the manager can trade them, and the investor’s balance is subject to the ups and downs of the manager’s profits or losses. So, decentralized hedge funds of any size. To learn more about how these work, check out Solrise.Finance and its Gitbook.

Examples: Solrise, dHEDGE

DeFi Insurance
DeFi insurance can protect your assets from vulnerabilities like smart contract attacks, failures, and more. There are many ways this can be configured, and it has been proven to work in many circumstances, although not all.

Examples: Nexus Mutual, Solace

Synthetics
Synthetic assets exist in traditional finance in the form of synthetic positions where traders trade multiple instruments in a specific way to mimic another financial instrument. Synthetic assets in decentralized finance vary in how they’re constructed and mimic the price action of another asset. They do so through the use of oracles which are programs that calculate and implement real-time value changes (stock prices, weather, etc.) into smart contracts.

Examples: Synthetify, Synthetix

On-chain Identity / Soulbound NFTs / NTSTs
As dramatic as the name sounds, NTST (non-transferable social tokens)’s impending impact on social networks, and blockchains are difficult to predict. While public key wallet addresses introduced financial pseudonymity and custom domain protocols like ENS and Bonfida introduced tailored financial pseudonymity – Soulbound NFTs / NTSTs have the potential to introduce another level of on-chain identity.

A wallet’s activity becomes its behavior which becomes its reputation which can become its resume. Credentialing protocols like Rabbit Hole will likely become more critical as more emerging and frontier markets are onboarded to blockchains.

Official paper: Decentralized Society: Finding Web3’s Soul

dNFTs
The d stands for dynamic. These NFTs have yet to be available, but their display will mirror the change in something else.

That’s all I can say for now.

MEV
MEV stands for miner extractable value and is the controversial practice where blockchain miners enact what are effectively loopholes to extract profits by reordering the sequence of transactions within a block. This targets unknowing users, and the problem is becoming more important in developers’ approach to blockchain and application design. If you’re a techie, this Chainlink article explains it well.

Atomic Swaps
Atomic swaps are swaps with built-in functions that ensure two sides of a trade fulfill a series of predefined conditions before the trade is completed. This often requires a hashed timelock contract (HTLC) which provides both transactions will be reversed if both parties don’t fulfill their predetermined conditions.

All of this can be done in a decentralized fashion to enable cross-chain trading without an intermediary like a bridge or an exchange needing to be involved.

Flash Loans
Flash loans hit the scene in 2020 when Aave released them with the comments that there is “no real-world analogy” and they are “an advanced concept aimed at developers.” Within a flash loan, unsecured capital is borrowed and repaid in a single transaction. This strategy can utilize multiple open-source smart contracts to extract arbitrage or profits from inefficient protocols.

Gaming the System with Non-Standard Accounting
DeFi’s interoperable nature makes it difficult to standardize. Metrics like earnings per share (EPS) exist to a certain extent. Still, they’re often opaquely derived and don’t accurately represent the financial realities taking place – which is the point of all accounting.

One metric you will see everywhere is total value locked (TVL). TVL is a good metric for certain things within certain types of applications, but the way it’s measured matters more than anything else. It can easily be gamed to show activity or liquidity that isn’t there. This CoinDesk article breaks down an example of dubious developers implementing double counting mechanisms in their TVL calculation which skewed the data to misrepresent the actual amount of capital involved. It makes you wonder how many protocols are being honest about their TVL calculations when you look at DeFi Llama’s cross-chain TVL aggregation dashboard.

More relevant metrics need to be standardized and used across similar types of applications to avoid more misleading accounting practices. Yield farming protocols have different architectures than decentralized fund management protocols and thus need different standardized metrics measuring different things. These different things are currently non-standard because they’re new and still being developed. As with any new technology, standardization will come with time.

Interoperable, Permissionless Futures
DeFi developers often refer to what they’re doing as building money legos. They’re referring to the interoperable, permissionless capabilities of the financial mechanisms they’re working with. These capabilities have been expanded to create new forms of yield generation and means of transferring value, as well as new financial techniques (flash loans and MEV).

As DeFi technology continues to progress, so too do the number of new opportunities for both good and bad actors. It’s imperative to know how these things work behind the scenes before using them to avoid being manipulated or robbed by a bad actor.

Here, I again plagiarize myself and include the tried and true meme that describes all of crypto and self-custody.

Next chapter
A Bird’s Eye View
Zachary
Zachary
27 July 2022
62 min
A Bird’s Eye View
Permissionless Money Legos

Solflare
Copyright © 2024 Solflare
Still have questions?
Want to just say hello?
