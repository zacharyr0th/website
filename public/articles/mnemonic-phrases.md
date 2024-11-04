---
title: 'Mnemonic Phrases'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: ''
description: 'What they are and why they work.'
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

Testing

</div>

Mnemonic phrases, also called recovery phrases or seed phrases, are 12-24 word sequences that enable an individual or institution to access funds in a non-custodial wallet.

This article breaks down what mnemonic phrases are and how they work but first, let’s break down the focal points of any non-custodial digital wallet – private keys and public keys.

TL;DR
A single mnemonic phrase can access a nearly infinite number of different wallet accounts.
Inputting a mnemonic phrase to access the contents of a digital wallet will always result in the same sequence of accounts being generated from it.
Mnemonic Phrases unlock private keys.
Private Keys unlock digital wallets.
Public Keys represent digital wallets.
BIP = Bitcoin Improvement Proposals. These are proposed changes to how the Bitcoin network operates. Some have had lasting effects on the standards adopted by other blockchains like Solana and Ethereum.

BIP-32: Describes how a single mnemonic can access multiple private keys.
BIP-39: Describes how mnemonic phrases are generated.
BIP-44: Describes the specific BIP-32 hierarchy to use.
Private Keys
A private key is a string of information used to access a digital wallet. Digital wallets hold digital assets such as cryptocurrencies or NFTs, and anyone with access to a private key has access to the contents of the associated digital wallet. Private keys are accessed via mnemonic phrases and keystore files. A private key can be compared to the physical key required to unlock a safety deposit box or the password to an email account.

Public Keys
When a digital wallet is generated, a new account is created for the blockchain to which the wallet is connected. When tokens are sent from one digital wallet to another, the sender must input the public key of the receiver’s wallet. A Public key can be compared to the email address associated with an email account.

A public key can be calculated from a private key very quickly; however, computing the private key from a public key is impossible. To access the private key (which enables access to funds within a digital wallet), there needs to be another sort of key or seed.

Cue recovery/seed / mnemonic phrases. They all refer to the same thing.

Mnemonic Phrases
Mnemonic phrases are word sequences that enable access to private keys.

Some wallets utilize both a mnemonic phrase and a password. In the event that the password is forgotten or misplaced, the mnemonic phrase can restore access to the wallet allowing the holder of the mnemonic phrase to set a new password if desired.

Anyone with access to the mnemonic phrase has access to the funds of an associated wallet. This is why wallet owners must document their mnemonic phrases in a secure location.

Ok, but how do mnemonic phrases work?
Most mnemonic phrases are automatically generated through Bitcoin’s BIP-39 specification.

Entropy – or randomness, is encoded in multiples of 32 bits. A bit is a single unit of information with a value of 1 or 0. The bits are split into groups and are then encoded with a number ranging from 0-2047. These numbers are cross-referenced with a word list, and a mnemonic sentence is born. This sentence is converted into a mnemonic seed phrase using the PBKDF2 hash function, which helps reduce the effectiveness of brute-force attacks. For a more detailed explanation of this process, refer to this article or BIP-39’s documentation.

Essentially, the more words in the mnemonic phrase, the higher level of security. Here are examples of word lists in English and Chinese to give an idea of what to expect. A typical 12-word mnemonic phrase in English looks like the following:

accident creek fat promote used figure world zebra abstract dilemma hawk grow

BIP-32 & BIP-44
A single key cryptographically accessing an assortment of public keys makes a wallet hierarchically deterministic.

BIP-32: Deterministic Hierarchical Wallets
BIP-32 defines the structure of hierarchical deterministic wallets.

Using elliptic curve cryptography, one can calculate a public key without revealing the private key. The single private key can also generate a nearly infinite set of public keys, each being accessible by various derivation paths required for a wallet to hold more than one token.

For most users, accessing more than the recommended derivation path of a digital wallet is not necessary. The user interface of most wallets will either not require a derivation specification or give users the option to choose which derivation path to access – often with the option to select a recommended path.

BIP 44: Derivation Paths for P2PKH
Each token has its derivation path. This could become cumbersome to the user if they were required to access each asset in a multi-asset wallet individually. Instead, BIP-32 introduced the ability of a single private key to unlock more than one public key.

BIP-44 defines the specific hierarchy to use as described by an algorithm detailed in BIP-32. This means that different derivations of a wallet will comply with the following format:

m/purpose’/coin_type’/account’/change/address_index

Hierarchical deterministic wallets are identified with the BIP-44 reference under purpose’.

For example, m/44’/60/’0’/1’/8′ = The 9th address at change level 1 (addresses begin at 0).

Final Thoughts
Technology is one of those industries where innovation is constantly iterated upon. These iterations enable higher levels of sophistication to go on behind the scenes, ultimately enabling a practical and user-friendly experience up front. Cryptography is the backbone of the crypto industry and is a prime example of this phenomenon.

As the technology behind crypto became more sophisticated, the barriers to entry lessened, and more people began participating. Before BIP-32, there were burdensome tasks and financially insecure practices in play regarding digital wallets and derivation paths that prevented many people who needed to be computer-savvy from participating. Once BIP-32,39, and 44 were widely implemented, users could access nearly a limitless number of digital assets (tokens & NFTs) from one user-friendly mnemonic device.

In regards to barriers of entry, technology is most definitely deflationary.

Similar Posts
Zeta Spotlight
Zachary
Zachary
19 January 2022
23 min
Zeta Spotlight
A mnemonic phrase, sometimes referred to as a seed phrase, is a 12-24 word sequences that enables a user to access funds in a digital wallet. This article dives deeper into their form and function.

Solflare
Copyright © 2024 Solflare
Still have questions?
Want to just say hello?
