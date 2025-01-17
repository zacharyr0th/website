---
title: 'Mnemonic Phrases'
date: '2023-12-31'
image:
  src: '/misc/placeholder.webp'
  alt: 'Mnemonic Phrases'
description: 'AKA Seed Phrases'
category: 'technology'
tags: ['crypto']
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
  Mnemonic phrases are 12-24 word sequences that serve as master keys for cryptocurrency wallets, allowing users to securely access and recover their funds across multiple blockchain networks.
</div>

To comprehend the role of mnemonic phrases, it's important to understand the foundation of cryptographic keys in blockchain technology. This hierarchical structure ensures that a single mnemonic phrase can generate an extensive array of wallet accounts, always producing the same sequence when input.

1. Mnemonic Phrase: The root of the hierarchy
2. Private Keys: Derived from the mnemonic phrase
3. Public Keys: Generated from private keys
4. Wallet Addresses: Derived from public keys

## BIP: Standardizing Mnemonic Phrases

The concept of mnemonic phrases was introduced and standardized through Bitcoin Improvement Proposals (BIPs), specifically BIP39. These proposals have had a lasting impact on the cryptocurrency ecosystem, with many other blockchain networks adopting similar standards, including Ethereum and Solana.

## How Mnemonic Phrases Work

1. Generation: A wallet creates a random sequence of words from a predefined list.
2. Conversion: The phrase is converted into a binary seed through key stretching.
3. Key Derivation: The seed generates the master private and subsequent child keys.
4. Address Creation: Public keys and addresses are derived from these private keys.

- Human-Readable: Easier to record and remember than long strings of characters.
- Versatility: A single phrase can access multiple accounts across various cryptocurrencies.
- Security: Properly stored phrases provide robust protection against unauthorized access.

Physical Storage: Write the phrase on paper or engrave it on metal; avoid digital storage.
Multiple Copies: Store copies in different secure locations to prevent loss.
Confidentiality: Never share your mnemonic phrase with anyone.
Verification: Regularly verify the integrity and readability of your stored phrase.

## Key Components

### Private Keys

A private key is a unique code granting access to a digital wallet containing cryptocurrencies or NFTs. It's comparable to a safety deposit box key or email password. Access is typically through mnemonic phrases or keystore files.

### Public Keys

Public keys are associated with blockchain accounts and digital wallets. They're used as addresses for receiving tokens, similar to email addresses for receiving messages.

## Technical Implementation

### The BIP-39 Process

Entropy – or randomness, is encoded in multiples of 32 bits. A bit is a single unit of information with a value of 1 or 0. The bits are split into groups and are then encoded with a number ranging from 0-2047. These numbers are cross-referenced with a word list, and a mnemonic sentence is born. This sentence is converted into a mnemonic seed phrase using the PBKDF2 hash function, which helps reduce the effectiveness of brute-force attacks. For a more detailed explanation of this process, refer to BIP-39's documentation.

### BIP-32 & BIP-44

Using elliptic curve cryptography, one can calculate a public key without revealing the private key. The single private key can also generate a nearly infinite set of public keys, each accessible by various derivation paths required for a wallet to hold more than one token.

For most users, accessing more than a digital wallet's recommended derivation path is unnecessary. Most wallets' user interfaces either do not require a derivation specification or give users the option to choose which derivation path to access—often with the option to select a recommended path.

Each token has its derivation path. If users were required to access each asset in a multi-asset wallet individually, this could become cumbersome. Instead, BIP-32 introduced the ability of a single private key to unlock more than one public key.

BIP-44 defines the specific hierarchy to use as described by an algorithm detailed in BIP-32. This means that different derivations of a wallet will comply with the following format:

m/purpose'/coin_type'/account'/change/address_index

Hierarchical deterministic wallets are identified with the BIP-44 reference under purpose'.

For example, m/44'/60/' 0'/1’/8′ = The 9th address at change level 1 (addresses begin at 0).

## Final Thoughts

Before BIP-32, burdensome tasks and financially insecure practices regarding digital wallets and derivation paths prevented many people who needed to be computer-savvy from participating.

Once BIP-32, 39, and 44 were widely implemented, users could access nearly a limitless number of digital assets (tokens and NFTs) from one user-friendly mnemonic device. Thank BIP-32, 39, and 44.

## Further Reading

### Core BIP Documentation

- [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) - Hierarchical Deterministic Wallets
- [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#Generating_the_mnemonic) - Mnemonic code for generating deterministic keys
- [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) - Multi-Account Hierarchy for Deterministic Wallets
- [BIP-39 Word Lists](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md)
- [English Word List](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
- [Chinese Word List](https://github.com/bitcoin/bips/blob/master/bip-0039/chinese_simplified.txt)
- [From Mnemonic Phrase to Address](https://blog.mycrypto.com/the-journey-from-mnemonic-phrase-to-address)
- [PBKDF2 Hash Function](https://en.wikipedia.org/wiki/PBKDF2)
- [Brute-force Attacks](https://en.wikipedia.org/wiki/Brute-force_attack)
