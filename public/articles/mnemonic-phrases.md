---
title: 'Mnemonic Phrases'
date: '2022-11-05'
image:
  src: '/misc/placeholder.webp'
  alt: 'Mnemonic Phrases'
description: 'Entropy is the foundation of it all'
category: 'technology'
tags: ['crypto']
takeaways:
  - 'Mnemonic phrases are 12-24 word sequences that serve as master keys for cryptocurrency wallets and are the foundation of the hierarchical deterministic wallet which we all know and love.'
  - 'This deterministic structure ensures that a single mnemonic phrase can generate an extensive array of wallet accounts, consistently producing the same sequence when input.'
---

To use a blockchain, you need a wallet. To use a wallet, you need a mnemonic phrase. Mnemonic phrases are the backbone of self custody and enable what we know as the hierarchical deterministic wallet which is comprised of a single mnemonic phrase that can generate a private key, which can then generate a public key, which can then generate an address - which is what serves as the account label for each wallet on a blockchain.

If you send funds to another wallet, you need the address. If you want to recover your funds, you need the mnemonic phrase or private key. Modern wallets are built on top of this concept and introduce further abstraction layers to make the process of accessing and managing your wallet more user-friendly.

1. Mnemonic Phrase: The root of the hierarchy
2. Private Keys: Derived from the mnemonic phrase
3. Public Keys: Generated from private keys

# History

The concept of mnemonic phrases was introduced and standardized through Bitcoin Improvement Proposals (BIPs), specifically BIP39.

These proposals have had a lasting impact on the cryptocurrency ecosystem, with many other blockchain networks adopting similar standards, including Ethereum and Solana.

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

### Private Keys

A private key is a unique code granting access to a digital wallet containing cryptocurrencies, NFTs, and other digital assets. It's comparable to a safety deposit box key or email password. Access is typically through mnemonic phrases or keystore files, although there are a handful of abstraction methods that allow for more flexibility, such as backing up your wallet to iCloud or using GMail as the login method.

### Public Keys

Public keys are associated with blockchain accounts and digital wallets. They're used as addresses for receiving tokens, similar to email addresses for receiving messages. Addresses are derived from public keys and are what you see on a blockchain as the account label for each wallet.

### Recovery Phrases

A recovery phrase is a 12-24 word sequence that's used to derive a private key. This is the most common way to access a wallet and has been the standard for many years. One day it won't be the majority method, but until then its important to understand how it works.

## Technical Implementation

### The BIP-39 Process

Entropy – or randomness, is encoded in multiples of 32 bits. A bit is a single unit of information with a value of 1 or 0. The bits are split into groups and are then encoded with a number ranging from 0-2047. These numbers are cross-referenced with a word list, and a mnemonic sentence is born. This sentence is converted into a mnemonic seed phrase using the PBKDF2 hash function, which helps reduce the effectiveness of brute-force attacks.

### BIP-32 & BIP-44

Using elliptic curve cryptography, one can calculate a public key without revealing the private key. The single private key can also generate a nearly infinite set of public keys, each accessible by various derivation paths required for a wallet to hold more than one token.

Accessing more than a digital wallet's recommended derivation path is unnecessary for most users. Most wallet user interfaces either do not require a derivation specification or give users the option to choose which derivation path to access—often. Each token has its derivation path. This could become cumbersome if users were required to access each asset in a multi-asset wallet individually. Instead, BIP-32 introduced the ability of a single private key to unlock more than one public key.

So, in theory, a single private key can unlock an infinite number of public keys.

# Final Thoughts

Before BIP-32, burdensome tasks and financially insecure practices regarding digital wallets and derivation paths prevented many people who needed to be computer-savvy from participating. Once BIP-32, 39, and 44 were widely implemented, users could access nearly a limitless number of digital assets (tokens and NFTs) from one user-friendly mnemonic device. Thank you BIP-32, 39, and 44.

## Further Reading

[BIP-32 ](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki), [BIP-39 ](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#Generating_the_mnemonic), [BIP-39 Lists ](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md), [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
