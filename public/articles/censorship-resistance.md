---
title: 'Censorship Resistance'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle:
description: 'In an ideal world.'
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

Censorship Resistance has long been espoused as one of blockchain technology’s most powerful attributes. This resistance is made possible by the level of a public blockchain’s permissionless immutability.

When deployed amongst a decentralized network, this unchangeability lends itself to the idea of shared truth. Think of a blockchain as a distributed collection of network participants who validate what is true regarding a transaction. Truth is only valid once the entire network reaches a consensus on it. If only one network participant decided what was true, that network would be considered authoritarian.

Blockchain consensus mechanisms are disrupting traditional payment rails and power hierarchies by enabling users to transact in an uncensored, permissionless, and immutable fashion. Proof of Work (PoW) and Proof of Stake (PoS) are two popular forms of blockchain consensus that a decentralized network can reach, and they each aim to combat authoritarian truths. However, they are still subject to vulnerabilities.

Permissionless Networks
Blockchains like Bitcoin, Ethereum, and Solana are permissionless networks.

To open a bank account, you have to ask for permission to do so. This permission effectively enables the bank to become the arbiter of your assets. After making an initial deposit, you trust that the bank will maintain access to your funds and agree with you on how many funds are in your account. To access these funds, you will again need the bank’s permission, and often the bank requires the government’s permission.

When you deposit capital into a non-custodial blockchain wallet like Solflare, you trust modern cryptography and mathematics to grant you access and prove how much money you have. You did not need to meet any specific criteria to generate the wallet and have no intermediary between you and what’s in the wallet.

Permissionless systems may seem unnecessary to people who consider themselves upstanding citizens. If I’m not breaking any laws, why would I have to worry about asking for permission to access my bank account? Unfortunately, this is a naive perspective. Banks and centralized intermediaries can prevent you from accessing your capital for any reason they deem plausible.

For instance, China recently banned and criminalized ​​all cryptocurrency transactions and financial holdings. Many suspect this to be a preliminary measure to set the stage for their digital Yuan, which is expected to be the pinnacle of economic centralization, enabling unprecedented levels of censorship.

China
When China’s CBDC (central bank digital currency) rolls out, the implications are grim.

Since 2017, China has enforced jay-walking laws using facial recognition technology to send fine notices through text messages as soon as the jaywalker is on the other side of the street. It is not far-fetched to conceive of a future where, instead of a text message alerting you of your fine, the fine will immediately be taken out of your bank account.

How will China build its CBDC? Not on a blockchain. Although their prototype was built using a distributed ledger, they deemed it unfit for their goals. Everything will be off-chain and private.

Alongside China’s social credit system and content censorship, the government will soon be the custodian of its citizens’ bank accounts. This opens a pandora’s box of new threats to the individual in the long run. “Such tools present tantalizing opportunities for authoritarian states, financial institutions, and corporations in the absence of effective controls.” – Source: ASPI.org

It’s not just China censoring its citizens. It’s Belarus, Russia, Brazil, Indonesia, Venezuela – the list goes on.

Solana & Anti-Censorship
In 2017, Balaji Srinivasan and Leland Lee published a proposal for a metric known as the Nakamoto Coefficient to quantify a distributed network’s level of decentralization, and Solana’s developers have taken heed. The Nakamoto Coefficient, aptly named after the pseudonymous Bitcoin founder – Satoshi Nakamoto, determines the minimum number of entities required to compromise a decentralized system.

Solana’s co-founder and CEO, Anatoly Yakovenko, said, “If you don’t maximize the Nakamoto Coefficient, then you’re not building decentralization.”

Source
Although Solana’s level of decentralization is not ideal at the moment, its hybrid Proof of History (PoH) and PoS protocol, along with its predetermined leadership schedule, enables additional security layers not found elsewhere.

Transactions on Solana are verified by a network of validators whose slot distribution is determined by their stake weight. A slot is a period of time that each leader can ingest transactions and produce a block’ and stake weight refers to the amount of SOL that has been delegated to said validators. PoH requires the validators to prove they computed enough transactions during their allotted slot and prevents previous blocks from being overwritten – effectively censoring validators from censoring other validators.

These methods of decentralization and Solana’s impetus to improve its Nakamoto Coefficient make it a sustainable and secure network for facilitating all sorts of applications.

Myths of Nefarious Activity
Due to the uncensored, permissionless, and immutable transactions made possible by Blockchain technology, regulators have theorized all sorts of estimates of nefarious activities that are continually proven to be overinflated.

In 2019, just 2.1% of all cryptocurrency transactions represented illegal activity. In 2020, that number fell to 0.34%. Meanwhile, in 2019, the US Justice Department described Chase bank’s Metal trading desk as a criminal enterprise. Chase has accumulated over $31,000,000,000 in fines for various offenses. Yet, the crypto industry is still described as a haven for “criminal activity and terrorist financing” by the Secretary of the US Treasury’s very own Janet Yellen. Chase has been cited for criminal activity and terrorist financing also.

It’s not just Chase. It’s HSBC, Credit Suisse, Swiss banks, Wells Fargo, Goldman Sachs – this list goes on too.

The first step to becoming uncensorable is to self custody your capital with a non-custodial wallet.
