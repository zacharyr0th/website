---
title: 'Self Custody: Part 1'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: More Power, More Responsibility
description: 'More Power, More Responsibility'
tags: ['Trading', 'Crypto']
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

# Introduction to Non-Custodial Wallets
Non-custodial wallets are digital wallets like private bank accounts built into a blockchain. They consist of three primary mechanisms: public keys, private keys, and mnemonics. Your wallet can connect to crypto applications like Solrise and Magic Eden. 

## Benefits of Non-Custodial Wallets
The short answer:
Traditional custodial methods for asset management require at least one counterparty, like a bank. A non-custodial wallet enables you to custody your assets without any counterparty.

The long answer:
Decentralized networks only make sense if access to their assets is also decentralized. If blockchains operated in a decentralized fashion while wallets operated using centralized counterparties, many of the benefits of using a blockchain would vanish.

## Real-World Use Case: Remittances
Non-custodial wallets enable digital economies to exist in unprecedented ways. Their significance can be difficult to convey, so let's start with a tangible, real-world example.

When migrant workers acquire a visa to work in foreign countries and send money back to their family's home, they send what's called a remittance. This is usually done through Western Union or a large bank with branches worldwide.

Low-income country remittances amounted to $466 billion in 2017. Globally, fees averaged 7.45%, or $34.7 billion. $7.45% equates to over 27 days of an average worker's annual income, meaning low-income migrant workers spent 27 days' worth of their 2017 salary to send money back home. To put the absolute dollar value of these fees into perspective, the US's non-military foreign aid budget in 2017 was $34 billion.

Non-custodial wallets present an alternative solution by enabling permissionless, global capital transfers. If blockchains or blockchain wallets were custodial, the counterparty could stop transactions from happening and require all remittances to be paid through Western Union. Foreign workers are already taking advantage of the low-cost and open nature of cryptocurrencies, and it's one of the most influential and socially impactful use cases for the technology we've seen to date.

## Understanding the Technical Components
Public and private key cryptography, which is particularly complex, makes non-custodial wallets possible. Like using the internet today, you won't need to understand what's happening under the hood to secure custody of your assets.

Account abstraction tooling is in the works but for now, you'll need to understand the basics – public, private, and mnemonics.

### Public Keys
Public keys are wallet addresses. Think of them as your email address. You can send emails to any email address at any time. In the same way, you can send digital assets to any wallet's address at any time – as long as the blockchain you're on is not compromised.

A public key on Ethereum: 0x47bb4cCA98FC49B971d86c5t26562c86E6284CeD

Public keys are intimidating if you're new to them, but you can copy and paste them when necessary. This one-time copy and pasting is recommended in crypto, as copying and pasting a private key or mnemonic can result in a hacker obtaining it. 

Each character of the wallet address, aka public key, is connected to your private key, and if you send digital assets to the wrong wallet address, you will likely be unable to recover them. Wallet designers are continually addressing this issue. If these long alphanumerics are overly intimidating, there's always the option to utilize a custodial wallet at a centralized crypto exchange (like FTX or Coinbase) rather than a non-custodial one (like Solflare or Metamask).

Many wallets have built-in address books, so you won't need to copy and paste a public key every time. Most mainstream crypto exchanges also support this feature. The primary risk of utilizing a non-custodial wallet is either losing your private key or mnemonic/recovery phrase or stealing it. It is crucial to keep a copy of each of those written down and stored safely. Some people etch it into fireproof, "bullet-proof" steel.

Don't take a video for social media and accidentally leave your phrase visible in the background. Don't click on any suspicious-looking links—they could be phishing attempts that drain your wallet. This happened to Seth Green, who played Dr. Evil's son in the Austin Powers movie trilogy.

Also, don't take screenshots of your recovery phrase or private key. Your photos are likely automatically uploaded to iCloud or Google Photos and are subject to risk and seizure by your cloud computing service or federal authorities.

### Private Keys
Private keys are more complex to describe than public ones. A private key is an alphanumeric string of characters that gives you access to your wallet.

Think of a private key as a randomly generated password for a specific account that you access with a master password technology like WordPress or Last Pass. The master password, in this case, would be your mnemonic phrase.

A private key on Ethereum looks like E9883D79C6D87DC0FB6A5778633389F4253213303DA61F20BD47FC233AA332623.

You won't need to remember your private key and will likely never need to use it directly unless you're a developer. However, access to your private key (via your recovery phrase) is necessary to access your funds.

### Mnemonics / Recovery Phrases / Seed Phrases
A private key allows you to sign transactions for a single wallet account. Recovery phrases, however, give you access to an infinite number of private keys. New wallets can be added to one mnemonic's purview by being imported or generated within the intended wallet's user interface.

Mnemonics serve two primary purposes:

They offer a more human-readable format than a private key, making importing a wallet account into a wallet application easier.
You can derive multiple private keys from a single mnemonic phrase, allowing you to create various wallet accounts for different use cases.

In short, your mnemonic gives you access to your private key, which gives you access to your funds. From the user's perspective, Mnemonics / Recovery Phrases / Seed Phrases are the most essential aspects of a wallet. They are the human-readable sequences of words that give you access to your private keys and, thus, your capital. The words are generally in English, although there are many languages wallet providers can choose to implement.

A public key can easily be calculated from a private key; however, computing the private key from a public key is impossible. Most people are blissfully unaware of their private key(s), which is fine … as long as they are painfully aware of their mnemonic.

A mnemonic phrase looks like this:

dog house safe board room chair table desk computer space flower rain

To be clear, a mnemonic is not a private key, although if someone were to obtain either your mnemonic or your private key, your digital assets would be compromised.

## The Future of Wallet Technology
Crypto's adoption and accessibility metrics are similar to those of the early internet. Initially, things were overly complicated for the average individual, and generalists ruled the land. To use the internet, you had to know what you were doing. In today's modern internet, you barely need to see what you are doing. 

Although the Internet initially had massive technical learning curves, once protocols were standardized and the average adult understood how to operate it, it took over.
