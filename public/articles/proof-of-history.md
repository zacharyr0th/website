---
title: 'Solana's Proof of History'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: 
description: ""
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

Perpetual Futures Contracts are derivatives that do not expire.
Funding rates are used to peg the futures price to that of the underlying. 
You can trade on-chain futures using your Solflare wallet. 

</div

Public blockchains are fundamental layers of settling transactions

 in an uncensorable and decentralized way. Miners or validators verify transactions through various processes to prevent central entities from controlling the network. Individuals and institutions can participate in transactions, on-chain proposals, and many other activities through a sequence of 20-40 alphanumeric characters that denote one’s digital wallet address. When used effectively, these addresses become pseudonymous identities. 

To settle something on a blockchain, there needs to be an agreement – a consensus. This article breaks down some of the dominant consensus mechanisms decentralized networks have adopted, including Bitcoin’s Proof of Work, Ethereum’s Proof of Stake, and Solana’s Proof of History.

Proof of Work
In 1993, Cynthia Dwork and Moni Naor developed the concept of Proof of Work (PoW) consensus to fight off denial-of-service attacks (DoS) between networks of computers. DoS attacks drain a computer’s resources by infiltrating it with requests for unproductive tasks that override the system. To prevent a system failure, PoW consensus required the predatory computer to provide evidence of work being done (something being computed) to submit any further request.

Taking inspiration from Dwork and Naor and Hal Finney’s Hashcash, Satoshi Nakamoto, the anonymous founder of Bitcoin, adopted PoW as the foundational consensus mechanism for the Bitcoin blockchain. According to Satoshi’s Bitcoin White Paper, PoW combined with a decentralized peer-to-peer network would fix the double-spend issue without relying on a centralized third party. To verify transactions, Miners use computing power to solve cryptographic computations (very complex math problems) and are rewarded with Bitcoin for solving them successfully. Some of the primary risks associated with a decentralized network are Sybil and 51% attacks which are largely addressed with PoW. 

Many argue that PoW consensus secures decentralized networks more than any other consensus method because of the vast amount of work that would be required to overthrow a network, especially since the work becomes more complex as more blocks are mined. With more work needed to secure the network, only those with enormous computing resources will be able to do so, which in turn requires massive amounts of energy. This has become a point of contention among environmental advocates as Bitcoin’s annual energy usage can be compared to that of a small nation. However, more than 50% of Bitcoin’s American miners use renewable energy sources. This figure is projected to increase over time.

Along with the environmental impact, the energy required to secure the Bitcoin network creates high barriers to entry that need to be addressed by the principles of decentralization. 

Sunny King and Scott Nadal introduced Proof of Stake to lower these barriers in 2012.

Proof of Stake
Proof of Stake (PoS) protocols select validators based on the number of their cryptocurrency holdings and enable them to secure decentralized networks without needing to consume vast amounts of energy. Validators operate nodes, similar to miners, and this model replaces work with stake. As more tokens are delegated to a miner who stakes them, the miner becomes more trustworthy in the eyes of the network. Variations and hybrids of PoS chains involve everything from PoW aspects to delegated and non-delegated validators. 

Delegation is a powerful choice when it comes to the staker. The structure of how validators verify transactions directly impacts the staking rewards, transaction speed, fees, and throughput of a blockchain. Different blockchains have different Nakamoto Coefficients, which represent their levels of decentralization. Choosing to delegate to the most powerful or profitable validators may present a problem if they want to take control of the network. 

Although PoS has presented many improvements to the PoW protocol, there are some critical drawbacks. Namely, tracking time and a validator or group of validators holding 33% or more of the delegated tokens can conspire to compromise the network. 

Among seven other innovations to PoS presented by the Solana blockchain, Anatoly Yakovenko’s Proof of History (PoH) concept is the solution to telling time while remaining within the confines of a decentralized network.

Proof of History
PoH utilizes Bitcoin’s SHA256 algorithm to maintain a consistent time-tracking system within the confines of the decentralized blockchain. SHA256 is a variation of SHA-2 (Secure Hash Algorithm 2), which was developed by the National Security Agency (NSA) and is a powerful encryption mechanism. Once data is encrypted using SHA256, the only way to obtain it is by possessing what’s known as a key.

Using a high-frequency recursive verifiable delay function (VDF), PoH imprints a unique hash and count for each transaction and event to the Solana blockchain. Once you know this for a given event, you can figure out what had to occur before and after it. This VDF function enables validators to reconstruct the order of events and serves as a cryptographic timestamp while ultimately enabling unparalleled speed and throughput. Essentially, VDFs and PoH help more events to happen more quickly.

Power & Speed
Solana is a hybrid of PoS and PoH consensus. This is the first of its kind. When you look at Bitcoin, Ethereum, Cardano, Polkadot, Avalanche, Bitcoin Cash, Litecoin, etc., the numbers of transactions per second (tps) and verifiable throughput come nowhere close to Solana. 

Visa and Mastercard are the preeminent leaders in centralized transactions per second. During the holidays, credit card purchases can reach up to ~60,000 tps. For perspective, Bitcoin can handle about 15 tps, Ethereum 30 tps, Cardano 300 tps, Avalanche 4,500 tps, and Solana 710,000 tps (eventually).

What!?

Yes.

Due to 400 millisecond block times and its unique understanding of time, the Solana blockchain can theoretically handle 710,000 tps as computing power increases. This limit has not been met as computers are not near that level of efficiency, although Solana has reached upwards of 400,000 tps on a single node in a test net and regularly encounters thousands of tps on its mainnet. 


Can it go … faster?
Short answer: maybe.

Gigabits refer to the amount of bandwidth that can be received and transmitted by an operating system. According to Solana’s Docs, this 710,000 tps metric is based on a standard single gigabit network. If network bandwidth rises to the level of 10G, Solana will be able to handle over 454 million tps according to these calculations.

All else equal, if bandwidth were to reach 100G (terabits per second), Solana’s tps would reach… 4.5 trillion. Unfortunately, all else is not equal. There are limitations imposed by various factors as described by ByteSizeCapital below.

What are the theoretical performance constraints of Solana?

1) Network -> 710K TPS
2) Computation -> 900K TPS
3) Memory -> 2.75M TPS.

Thus, @SolanaLabs is theoretically capable of 710K TPS.

The current "single-node TestNet" is running at 250K TPS with a peak of 400K TPS. pic.twitter.com/26ahswzlXh

— NM (@ByteSizeCapital) May 5, 2018
Potential
Given the level of power Solana’s blockchain enables, there are opportunities for high-frequency trading firms and marketplaces will adopt it as their fundamental foundation layer. 

It’s hard to say how 710,000 (or more) tps will be used in the future, but you can be sure it will change things. Games like Star Atlas could then enable play to earn (P2E) metaverses with extremely high transaction volumes, decentralized investment platforms like Solrise will be able to democratize finance at scale, and messaging services like Bonfida’s Jabber can decentralize and harbor virtually any amount of conversation. At the same time, DEXes like Raydium will be able to withstand more trades than any exchange ever before. Of course, the best use cases have yet to be thought of.

Risks
Ensuring that each transaction on Solana is valid is of paramount importance. 

Validators are the primary risk to PoS networks. They are held accountable for their actions through slashing but still present a potential threat. To secure the future of the network, Solana needs to keep propagating innovation across its ecosystem while continuing to iterate on decentralization tactics and their newfound technological breakthroughs. 

Final Thoughts
There’s a joke in the Solana community that a Solana Developer with substantial experience has about six months of experience building on Solana. The blockchain was conceived in 2018 and has raised hundreds of millions in funding, but it has only accumulated its staggering growth in development and interest over the past year. The roadmap is to attain as much speed, and throughput as possible, and the sky’s the limit for its application.

https://medium.com/solana-labs/proof-of-history-a-clock-for-blockchain-cf47a61a9274

https://x.com/StakingFac/status/1218140810757181445