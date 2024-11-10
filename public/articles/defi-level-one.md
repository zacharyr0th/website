---
title: 'Defi: Level One'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: Essential Defi Mechanisms for any Blockchain Ecosystem
description: 'Essential Defi Mechanisms for any Blockchain Ecosystem'
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

Now that you understand the macroeconomic context and the blockchain foundations underlying DeFi, it’s time to focus on technology.

Today’s Agenda
The DeFi Stack
Expansion Beyond Ethereum
Essential Technologies
Open Source Development
The DeFi Stack
While many of the concepts in DeFi have been discussed since the early 2010s, they were generally only actionable once DeFi Summer took place in mid-2020. During this time, you saw many open-source projects proliferate and innovate on one another’s ideas rapidly. A group of protocols such as DEXes, lending and borrowing, and yield farming became the standard stack on each new chain that DeFi was being built on.

Expansion Beyond Ethereum
Development on Ethereum skyrocketed during DeFi Summer as the number of new protocols being released into the wild was massive. A group of protocols, including DEXes, lending and borrowing, and yield farming, became the standard stack on each new chain that DeFi was being built on. Ethereum’s transaction fees, called Gas, became much higher due to demand – Ethereum can only handle about 12-20 transactions per second which led to many protocols expanding beyond Ethereum.

Some protocols exclusively remained on Ethereum, while others expanded to new layer 1s that were gaining traction. Sushi, for example, is one of the protocols that started on Ethereum and has since become available on 14 other blockchains or layer two scaling solutions (defined below). The reasons for this vary as blockchains have different spectrums of capability, interoperability, scalability, and decentralization, although many are starkly similar to Ethereum.

Essential Technologies
Layer 1
AKA the blockchain. Layer 1s are the underlying architecture that supports any blockchain activity, such as transaction settlement and application development.

Examples: Solana, Ethereum, Near

Layer 2
Layer 2s are called scaling solutions because they allow Layer 1s to operate more efficiently and thus can scale beyond what is possible when a Layer 1 is operating independently. Only some blockchains have Layer 2s.

Examples: Optimism, zkSync, Aurora

Coins
Coins are the tokens used to pay transaction fees on Layer 1. Bitcoin was the first coin, AKA cryptocurrency. This is not standard nomenclature, but it’s an excellent way to differentiate your understanding of coins vs. tokens.

Gas is another term for the transaction fees required on blockchains. Interestingly enough, this function has been used as an argument for why Ethereum is a commodity rather than a security and thus is (currently) under the purview of the CFTC (Commodity Futures Trading Commission) instead of the SEC (Securities and Exchange Commission). However, this is an unresolved issue.

Examples: SOL, ETH, NEAR

Smart Contracts
Smart contracts are programs stored on blockchains that automatically run when predefined conditions are met. They are highly modifiable, and agreements to buy or sell an asset can be written into the code. This innovation has enabled to rise of tokens, DeFi, NFTs, DAOs, Web3, etc.

It has become one of the cornerstones of modern blockchain technology.

Tokens
Tokens are customizable smart contracts built using a standard library of programs. They can be fungible or non-fungible, meaning they can be a group of the same thing (cryptocurrencies) or one-of-a-kind digital assets (NFTs).

What are SPL tokens?

When you hear about tokens, you’re most likely referring to fungible tokens, which are all the same. For example, BTC is fungible, meaning 1 BTC = 1 BTC. 1 shekel = 1 shekel.

Examples: SLRS, RAY, DOGE

Gas
Gas is another term for the transaction fees required on blockchains. Interestingly, this function has been used to argue why Ethereum is a commodity rather than a security.

Stablecoins
Specialized tokens are meant to maintain parity with another asset. Most stablecoins are USD-related, but you could program a $1,000,000 stablecoin to exist. Or a $3.1415 (pi) coin. Etc.

Examples: USDC, USDT, UST (RIP)

Swaps
Swaps refer to exchanging one token for the equivalent value of another.

Read more about them in Solflare’s Knowledge base here.

What are Swaps?

You can watch a video below showing how smooth Solflare’s swap interface is.

NFTs
NFTs are non-fungible tokens, meaning they are 1 of a kind. No NFT is exactly the same (1 NFT ≠ , any other NFT), although any NFT can be programmed just like a fungible token can.

Examples: Degen Apes, NounsDAO, DeGods

Liquidity Pools
Liquidity pools are smart contracts in which liquidity providers can deposit funds to earn a yield, and traders can use them to swap assets. Liquidity mining is the function that liquidity providers (LPs) do. LPs will deposit their holdings into a liquidity pool and earn a share of trading fees, incentivized rewards, or both.

Liquidity Pools

Examples: Raydium, Uniswap

DEXes
DEXes are decentralized exchanges, unlike centralized exchanges like Robinhood or TD Ameritrade. They are applications built atop Layer 1 or Layer 2. Below is a spotlight article from the Knowledge Base highlighting Orca, one of Solana’s most popular DEXes. They’re made possible because of the liquidity pools described above.

Orca Spotlight

All of the above has been about decentralized exchanges and permissionless liquidity pools. It’s also worth knowing that there are permissioned liquidity pools that facilitate permissioned decentralized exchanges (pDEXes), which have massive potential for institutional trading purposes.

https://academy.solflare.com/potential-of-permissioned-dexes/
Examples: Raydium, Orca

Blockchain Explorers
Chain Explorers index every single transaction on public blockchains. As each new transaction is made, they immediately become part of the public record and are indexable with chain explorers.

Examples: Solscan, Ethersan

On-Chain Lending & Borrowing
On-chain lending and borrowing protocols enable traders to lend their digital assets or borrow against them. Interest rates are mechanistically set and vary depending on supply and demand.

Examples: Solend, Aave, Compound

On-Chain Leveraged Derivatives
Collateral is used to open leveraged derivatives positions on-chain. If prices go against a trader to a certain predefined extent, that collateral will be liquidated. On-chain leverage opens the door to endless possibilities using futures and options contracts.

Mango Markets is the derivatives platform integrated within Solflare. Here is the press release explaining this significance and a link to a guide on how to trade derivatives using Mango. For more information on how to use Mango as a Solrise Fund Manager, refer to Solrise’s Gitbook.

How to Trade Perps on Mango

Be sure to also bookmark or check out Zeta’s spotlight article and guide in the Knowledge Base.

Zeta Spotlight

How to Trade On-Chain Options Using Zeta Markets

Examples: Zeta Markets, Mango Markets, Drift

Staking
Staking is a temporary lockup of a digital asset in return for a yield. It’s used for everything from speculatively generating a yield on NFTs to securing Proof of Stake blockchains at a fundamental level.

What is SOL Staking?

Blockchains often utilize the Proof of Stake consensus method, which requires validators to obtain a certain amount of delegated stake. This proves that the validators have a stake in the network through financial position or reputation and, therefore, would want to operate in ways that sustain the network.

Examples: SOL staking, ETH staking

Analytics
Analytics within crypto requires a lot of data. Fortunately, some companies supply much of the data for free, although the highest quality information has a paywall.
Free examples: DeFi Llama, Coinwatch, Cryptometer, Dune
Paid examples: Nansen, Messari

Open Source Development
The open-source nature of DeFi development is a two-edged sword. It allows developers to fork projects and then iterate atop them, which causes innovation to take place rapidly, but it also gives hackers opportunities to exploit vulnerable code. Check out rekt for reference.

DeFi has dramatically evolved from both a functionality and UI/UX standpoint since DeFi summer. Many glitches and security concerns back then have been resolved, although there is still plenty of work and other security concerns to consider.

Essential & Advanced
That’s a wrap on the essential DeFi technology. The next chapter will focus on more advanced examples that give you a better idea of what’s out there and what the most sophisticated market participants are using.
