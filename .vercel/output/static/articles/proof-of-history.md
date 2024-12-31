---
title: 'Proof of History'
date: '2024-10-25'
image:
  src: '/misc/placeholder.webp'
  alt: 'Proof of History'
subtitle: How Solana Tells Time
description: 'How Solana Tells Time'
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
To settle something on a blockchain, there must be an agreement – a consensus. This article breaks down some of the dominant consensus mechanisms decentralized networks have adopted, including Bitcoin's Proof of Work, Ethereum's Proof of Stake, and Solana's Proof of History.
</div>

Public blockchains are networks aiming to settle transactions in an uncensorable and decentralized way. Miners or validators verify transactions through various processes to prevent central entities from controlling the network.

Individuals and institutions can participate in transactions on these networks through alphanumeric characters denoting one's digital wallet address. When used effectively, these addresses become pseudonymous identities with powers never before seen - and they're only made possible with consensus methods which underly every transaction.

## Proof of Work

In 1993, Cynthia Dwork and Moni Naor developed the concept of Proof of Work (PoW) consensus to fight off denial-of-service attacks (DoS) between networks of computers. DoS attacks drain a computer's resources by infiltrating it with requests for unproductive tasks that override the system. PoW consensus required the predatory computer to provide evidence of work being done (something being computed) to submit any further request.

Taking inspiration from Dwork and Naor and Hal Finney's Hashcash, Satoshi Nakamoto, the anonymous founder of Bitcoin, adopted PoW as the foundational consensus mechanism for the Bitcoin blockchain. According to Satoshi's Bitcoin White Paper, PoW combined with a decentralized peer-to-peer network would fix the double-spend issue without relying on a centralized third party. To verify transactions, Miners use computing power to solve cryptographic computations (very complex math problems) and are rewarded with Bitcoin for solving them successfully.

Some argue that PoW consensus secures decentralized networks more than any other consensus method because of the vast amount of work required to overthrow a network, especially since the work becomes more complex as more blocks are mined. With more work needed to secure the network, only those with enormous computing resources can do so, which requires massive energy. This has become a point of contention among environmental advocates as Bitcoin's annual energy usage can be compared to that of a small nation. However, over 50% of Bitcoin's American miners use renewable energy sources.

Along with the environmental impact, the energy required to secure the Bitcoin network creates high barriers to entry that need to be addressed by the principles of decentralization. Sunny King and Scott Nadal introduced Proof of Stake in 2012 in an attempt to lower these barriers.

## Proof of Stake

Proof of Stake (PoS) protocols select validators based on the number of their cryptocurrency holdings and enable them to secure decentralized networks without needing to consume vast amounts of energy. Validators operate nodes, similar to miners, and this model replaces work with a financial stake. As more tokens are delegated to a miner who stakes them, the miner becomes more trustworthy in the eyes of the network. Variations and hybrids of PoS chains involve everything from PoW aspects to delegated and non-delegated validators.

Delegation is a powerful choice for the staker. The structure of how validators verify transactions directly impacts the staking rewards, transaction speed, fees, and throughput of a blockchain. Different blockchains have different Nakamoto Coefficients, which represent their levels of decentralization. Choosing to delegate to the most powerful or profitable validators may present a problem if they want to take control of the network.

Although PoS has presented many improvements to the PoW protocol, there are some critical drawbacks. Namely, tracking time and a validator or group of validators holding 33% or more of the delegated tokens can conspire to compromise the network.

Among seven other innovations to PoS presented by the Solana blockchain, Anatoly Yakovenko's Proof of History (PoH) concept is the solution to telling time while remaining within the confines of a decentralized network.

## Proof of History

PoH utilizes Bitcoin's SHA256 algorithm to maintain a consistent time-tracking system within the confines of the decentralized blockchain. SHA256 is a variation of SHA-2 (Secure Hash Algorithm 2), developed by the National Security Agency (NSA), and is a powerful encryption mechanism. Once data is encrypted using SHA256, the only way to obtain it is by possessing what's known as a key.

Using a high-frequency recursive verifiable delay function (VDF), PoH imprints a unique hash and count for each transaction and event to the Solana blockchain. Once you know this for a given event, you can figure out what had to occur before and after it. This VDF function enables validators to reconstruct the order of events and serves as a cryptographic timestamp while ultimately enabling unparalleled speed and throughput. VDFs and PoH help more events to happen more quickly.

### Power & Speed

Solana is the first hybrid of PoS and PoH consensus. When you look at Bitcoin, Ethereum, Cardano, Polkadot, Avalanche, Bitcoin Cash, Litecoin, etc., the numbers of transactions per second (tps) and verifiable throughput come nowhere close to Solana.

Visa and Mastercard are the preeminent leaders in centralized transactions per second. Credit card purchases can reach up to ~60,000 transactions per second during the holidays. For perspective, Bitcoin can theoretically handle about 15 tps, Ethereum 30 tps, Cardano 300 tps, Avalanche 4,500 tps, and Solana 710,000 tps.

Due to 400 millisecond block times and its unique understanding of time, the Solana blockchain can theoretically handle 710,000 tps as computing power increases. This limit has not been met as computers are not near that efficiency level, although Solana has reached upwards of 400,000 tps on a single node in a test net and regularly encounters thousands of tps on its mainnet.

> Today the @solana SLP "soft-launch" testnet went live
>
> 🌎 operated by 40+ independent #validators
> ⚡️ ~500ms breakneck speed blocktimes
> 🔥 A similar network saw Ø transaction rates of 9k TPS with max bursts up to 60k TPS
>
> Those are NOT theoretical claims but real world results 💪
>
> — Staking Facilities (@StakingFac) January 17, 2020

### Can it go faster?

Maybe.

Gigabits refer to the bandwidth an operating system can receive and transmit. According to Solana's Docs, this 710,000 tps metric is based on a standard single gigabit network. If network bandwidth rises to 10G, Solana can theoretically handle over 454 million transactions per second.

All else equal, if bandwidth reached 100G (terabits per second), Solana's tps would reach 4.5 trillion. Unfortunately, all else is not equal. Various factors impose limitations, as described by ByteSizeCapital here.

> In terms of CAP theorem, @SolanaLabs favours:
>
> 1. Short term -> Consistency over availability
> 2. Long term -> Availability over consistency.
>
> Users have time to choose the "right" partition without compromising the PoH & can be sure the network resumes sometime in the future.
>
> — NM (@ByteSizeCapital) May 5, 2018

## Potential

Given the power Solana's blockchain enables, high-frequency trading firms and marketplaces could adopt it as their fundamental foundation layer.

It's hard to say how 710,000 (or more) transactions per second will be used in the future, but you can be sure it will change things. Games like Star Atlas could then enable play to earn (P2E) metaverses with extremely high transaction volumes, decentralized investment platforms like Solrise will be able to democratize finance at scale, and messaging services like Bonfida's Jabber can decentralize and harbor virtually any amount of conversation. At the same time, DEXes like Raydium will be able to withstand more trades than any exchange ever before. Of course, the best use cases have yet to be thought of.

Validators are the primary risk to PoS networks. They are held accountable for their actions through slashing but still present a potential threat. To secure the network's future, Solana must keep propagating innovation across its ecosystem while continuing to iterate on decentralization tactics and their newfound technological breakthroughs.

There's a joke in the Solana community that a Solana Developer with substantial experience has about six months of experience building on Solana. The blockchain was conceived in 2018 and has raised hundreds of millions in funding, but its staggering growth in development and interest has only accumulated over the past year. The roadmap is to attain as much speed and throughput as possible, and the sky's the limit for its application.
