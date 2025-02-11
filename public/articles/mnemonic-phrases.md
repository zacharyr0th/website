---
title: 'Mnemonic Phrases'
date: '2022-11-05'
image:
  src: '/images/entropy.webp'
  alt: 'Mnemonic Phrases'
description: 'Derived from entropy'
category: 'technology'
tags: ['crypto']
takeaways:
  - 'Mnemonic phrases are 12-24-word sequences that serve as master keys for blockchain wallets. They are the foundation of the hierarchical deterministic wallet we all know and love.'
  - 'This deterministic structure ensures that a single mnemonic phrase can generate an extensive array of wallet accounts, consistently producing the same sequence when input.'
---

To use a blockchain, you need a wallet. To use a wallet, you need a mnemonic phrase. Mnemonic phrases are the backbone of self-custody and enable what is known as the hierarchical deterministic wallet, which is comprised of a single mnemonic phrase that can generate a private key, which can then generate a public key, which can then generate an address—which serves as the account label for each wallet on a blockchain.

If you send funds to another wallet, you need the address. If you want to recover your funds, you need the mnemonic phrase or private key. Modern wallets are built on top of this concept and introduce layers of abstraction to make accessing and managing your wallet more user-friendly.

# History

The concept of mnemonic phrases was introduced and standardized through Bitcoin Improvement Proposals (BIPs), specifically BIP39.

These proposals have had a lasting impact across blockchain ecosystems, with many other networks, including Ethereum and Solana, adopting similar standards.

# How Mnemonic Phrases Work

| Process          | Description                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| Generation       | A wallet creates a random sequence of words from a predefined list.            |
| Conversion       | The phrase is converted into a binary seed through key stretching.             |
| Key Derivation   | The seed phase generates the master private key.                               |
| Address Creation | Public keys and addresses are derived from these private keys.                 |
| Versatility      | A single phrase can access multiple accounts across various cryptocurrencies.  |
| Security         | Properly stored phrases provide robust protection against unauthorized access. |

## Key Components

**Mnemonic Phrase**: The root of the hierarchy; DO NOT SHARE
**Private Keys**: Derived from the mnemonic phrase; DO NOT SHARE
**Public Keys**: Generated from private keys; can be freely shared
**Accounts**: Generated from public keys; shorter, more user-friendly

### Mnemonic Phrases

A mnemonic phrase is a 12-24 word sequence that is used to derive a private key. It is the most common way to access a wallet and has been the standard for many years. One day, it won't be the majority method, but until then, it's important to understand how it works.

![Mnemonic Phrase](/images/petra-phrase.webp)

### Private Keys

A private key is a unique code granting access to a digital wallet containing cryptocurrencies, NFTs, and other digital assets. It's comparable to a safety deposit box key or email password. Access is typically through mnemonic phrases or keystore files, although there are a handful of abstraction methods that allow for more flexibility, such as backing up your wallet to iCloud or using GMail as the login method.

![Private Key](/images/private-key.webp)

### Public Keys

Public keys are used as addresses for receiving tokens, similar to email addresses for receiving messages. Addresses are derived from public keys and are what you see as the account label for each wallet; however, the public key itself is rarely used other than to generate the address.

### Addresses

You use these account details to move assets around on the chain. It's like your email and vanity versions of addresses exist where a machine uses brute force to generate addresses until there are specific characters in a specific sequence. Some addresses serve as proxies like so users can transfer to zachtos.apt (powered by AptosNameService) instead of to the address that was derived from the private key (and then the public key) above:

![Address](/images/petra-address.webp)

## Technical Implementation

### The BIP-39 Process

Entropy – or randomness, is encoded in multiples of 32 bits. A bit is a single unit of information with a value of 1 or 0. The bits are split into groups and are then encoded with a number ranging from 0-2047. These numbers are cross-referenced with a word list, and a mnemonic sentence is born. This sentence is converted into a mnemonic seed phrase using the PBKDF2 hash function, which helps reduce the effectiveness of brute-force attacks.

### BIP-32 & BIP-44

Using elliptic curve cryptography, one can calculate a public key without revealing the private key. The single private key can also generate a nearly infinite set of public keys, each accessible by various derivation paths required for a wallet to hold more than one token.

Accessing derivation paths beyond a wallet's default settings is unnecessary for most users. Wallet interfaces typically handle path specifications automatically or offer optional customization. Managing multiple assets would be cumbersome if each token required manual derivation path input. BIP-32's hierarchical deterministic framework solves this by enabling a single master private key to derive multiple public keys, while standards like BIP-44 organize paths for multi-asset wallets.

So, a single private key can unlock infinite public keys.

# Final Thoughts

Before BIP-32 and 44, burdensome tasks and financially insecure practices regarding digital wallets and derivation paths prevented many people who needed to be computer-savvy from participating. Once BIP-32, 39, and 44 were widely implemented, users could access nearly a limitless number of digital assets (tokens and NFTs) from one user-friendly mnemonic device. 

Thank you BIP-32, 39, and 44.

## Further Reading

[BIP-32 ](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki), [BIP-39 ](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#Generating_the_mnemonic), [BIP-39 Lists ](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md), [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)

Cover Image Source: [Link](https://entropy-global.com/) 