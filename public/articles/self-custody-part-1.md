---
title: 'Self Custody: Part 2'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: Market Structure & Price Discovery
description: 'Market Structure & Price Discovery'
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

What is a Non-Custodial Wallet?
Non-custodial wallets are digital wallets that give you only access to what’s in them. They are like private bank accounts built on a blockchain, consisting of 3 primary mechanisms – public keys, private keys, and mnemonics. You can connect to crypto applications like Solrise and Magic Eden with your wallet; no intermediary is ever between you and your assets. You’re in complete control.

Benefits of Non-Custodial Wallets
The short answer:

Traditional custodial methods for asset management always require at least one counterparty, like a bank. A non-custodial wallet enables you to custody your assets without any counterparty.

The long answer:

Decentralized networks only make sense if the assets on them are also decentralized. If blockchains operated in a decentralized fashion while wallets operated using centralized counterparties, all the benefits of the blockchain would vanish, and the same problems in centralized finance would exist in decentralized finance.

Real-World Use Case
Non-custodial wallets are ground-breaking and enable digital economies to exist in ways unlike ever before. Their significance can be difficult to convey, so let’s start with a tangible real-world example.

When migrant workers acquire a visa to work in foreign countries and send back money to their families back home, they send what’s called a remittance. This is usually done through Western Union or some large bank that has branches all over the world.

Low-income country remittances amounted to $466 billion in 2017. Globally, fees averaged 7.45%, or $34.7 billion. $7.45% equates to over 27 days of an average worker’s annual income, meaning low-income migrant workers spent 27 days’ worth of their 2017 salary to send money back home. To put the absolute dollar value of these fees into perspective, the US’s non-military foreign aid budget in 2017 was $34 billion.

Non-custodial wallets present an alternative solution by enabling permissionless, global capital transfers. If blockchains or blockchain wallets were custodial, the counterparty could stop transactions from happening and require all remittances to be paid through Western Union. Foreign workers are already taking advantage of the low-cost and open nature of cryptocurrencies, and it’s one of the most influential and socially impactful use cases for the technology we’ve seen to date.

It’s complicated
Non-custodial wallets are made possible by public and private key cryptography, which is particularly complex. Like using the internet today, you won’t need to understand what’s happening under the hood to securely custody your assets.

You’ll need to understand the basics – public, private, and mnemonics.

Let’s start with public keys.

Public Keys
Public keys are wallet addresses. Think of them as your email address. You can send emails to any email address at any time. In the same way, you can send digital assets to any wallet’s address at any time – as long as the blockchain you’re on is not compromised.

A public key on Ethereum: 0x47bb4cCA98FC49B971d86c5t26562c86E6284CeD

Public keys are intimidating if you’re new to them, but you can copy and paste them when necessary. This one-time copy and pasting are recommended in crypto, as copying and pasting a private key or mnemonic can result in a hacker obtaining it. There are several operational security practices you’ll have to undertake to properly self custody your assets.

Each character of the wallet address / public key is connected to your private key, and if you send digital assets to the wrong wallet address, you will likely be unable to recover them. This issue is continually being addressed by wallet designers. If these long alphanumerics are overly intimidating, there’s always the option to utilize a custodial wallet at a centralized crypto exchange (like FTX or Coinbase) rather than a non-custodial one (like Solflare or Metamask).

Many wallets have built-in address books, so you won’t need to copy and paste a public key every time. Most mainstream crypto exchanges also support this feature.

The risk of utilizing a non-custodial wallet is either losing your private key, mnemonic/recovery phrase or stealing it. Keeping a copy of each of those written down and stored safely is crucial. Some people etch it into fireproof, “bullet-proof” steel.

Only take a video for social media and accidentally leave your phrase visible in the background. Don’t click on any suspicious-looking links – they could be phishing attempts that could drain your wallet. This happened to Seth Green, who played Dr. Evil in the movie trilogy Austin Powers.

Also, don’t take screenshots of your recovery phrase or private key. Your photos are likely automatically uploaded to iCloud or Google Photos and are subject to risk and seizure by your cloud computing service or federal authorities.

Private Keys
Private keys are a bit harder to describe than public ones. A private key is an alphanumeric string of characters that gives you access to your wallet.

Think of a private key as a randomly generated password for a specific account that you access with a master password technology like NordPass or Last Pass. The master password, in this case, would be your mnemonic phrase.

A private key on Ethereum looks like: E9883D79C6D87DC0FB6A5778633389F4253213303DA61F20BD47FC233AA332623

You won’t need to remember your private key and will likely never need to use it. It is, however, a vitally important string of characters. Access to your private key (via your recovery phrase) is necessary to access your funds.

Mnemonics / Recovery Phrases / Seed Phrases
A private key allows you to sign transactions for a single wallet account. Recovery phrases, however, give you access to an infinite number of private keys. New wallets can be added to one mnemonic’s purview by being imported or generated within the intended wallet’s user interface.

Mnemonics serve two primary purposes:

They offer a more human-readable format than a private key, making it easier for you to import a wallet account into a wallet application.
You can derive multiple private keys from a single mnemonic phrase, effectively allowing you to create various wallet accounts for different use cases.
Check out this article to learn about the different types of wallets crypto users utilize.

In short, your mnemonic gives you access to your private key, which provides you with access to your funds. From the user’s perspective, Mnemonics / Recovery Phrases / Seed Phrases are the most essential aspect of a wallet. They are the human-readable sequences of words that give you access to your private keys and, thus, your capital. The words are generally in English, although there are many languages wallet providers can choose to implement.

A public key can easily be calculated from a private key; however, computing the private key from a public key is impossible. Most people are blissfully unaware of their private key(s), which is fine … as long as they are painfully aware of their mnemonic.

A mnemonic phrase looks like this:

dog house safe board room chair table desk computer space flower rain

To be clear, a mnemonic is not a private key, although if someone were to obtain either your mnemonic or your private key, your digital assets would be compromised.

As mentioned above, think of your mnemonic as the master password to a password management system. All the passwords you are storing in the system would be your private keys in this analogy.

Passwords
Some wallets also utilize an existing password.

Passwords are not that big of a deal. They are primarily there for convenience, so you don’t have to input your mnemonic phrase whenever you want to access your funds. If you forget your password, you can just reset it with your mnemonic phrase.

No email, phone, or 2-factor authentication methods are required!

Again, phew
Well, that’s enough for today. As you can see, these topics are conceptually not too complex, and all you need to know is the tip of the iceberg. The entire iceberg is what they call the rabbit hole.

Crypto’s adoption and accessibility metrics are similar to the early internet. Initially, things were overly complicated for the average individual, and generalists ruled the land. To use the internet, you had to know what you were doing. In today’s modern internet, you barely need to see what you are doing. The barriers to entry have dropped dramatically, and specialists are now in charge.

Although the internet had massive technical learning curves at first, once protocols (like HTTP and TCP/IP mentioned earlier in the course) were standardized and the average adult understood how to operate it, it took over.

If you stick through with this course, you can count yourself a pioneer in blockchain technology. You’ll be right there with it as it continues to take over.

Ethereum has ~500,000 daily users. Every other blockchain has far less.

Twitter has ~200,000,000 daily users. Facebook has ~2,000,000,000 daily users.

We’re so early. 🤝
