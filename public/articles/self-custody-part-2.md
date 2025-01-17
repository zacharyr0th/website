---
title: 'Self Custody: Part 2'
date: '2023-12-31'
image:
  src: '/misc/placeholder.webp'
  alt: 'Self Custody: Part 2'
description: 'Opportunities and Consequences'
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

</div>

# Self-Custody

Self-custody has been a fundamental feature of crypto since its inception. While it gives people more control over their finances and sovereignty than ever before, it also gives them more responsibility than they're used to - with some unintended consequences.

A massive ramp-up in education or measures to prevent large amounts of scams and lost recovery phrases must be implemented to onboard billions of users to crypto.

Most crypto users keep their funds on exchanges, transferring accountability to the exchange. Financial contagions begin when large custodians of volatile assets become insolvent. Accounts on Coinbase, for example, are subject to seizure if Coinbase becomes insolvent. In other words, if Coinbase goes bankrupt, the banks will take the money (crypto) from your account to cover their debts.

Exchanges will only sometimes act in your best interest, and a government shutdown is always possible. Below is one of the oldest adages in crypto.

Not your keys, not your crypto.

## Security Fundamentals

To safely enjoy the benefits of a decentralized web and non-custodial wallets, you must remember or retain access to your mnemonic phrase and prevent anyone from knowing it.

Since anyone with the mnemonic phrase can access the associated digital wallet, safeguarding this phrase is of the utmost importance. As mentioned in Self Custody: Part 1, you don't want to store sensitive material on a file in your Google Drive. Not only does Google have access to that, but anyone who obtains your Google password does, too.

The government could subpoena Google or any cloud provider to access your files with the mnemonic - which is how the money launderers who had $4.5 billion in stolen BTC got caught. Authorities had access to one of the launderers' cloud data providers and found private keys in a plain text file that accessed $3.6 billion of the missing BTC.

### Mnemonic Phrases Best Practices

The best practices for mnemonic phrases are physically writing them down or etching them into steel and storing them in a safe location. You can keep multiple copies on hand, but be aware of where they are. There are more than a few stories of people obtaining other people's mnemonics, and there are even stories of people forgetting their mnemonics and losing access to generational wealth.

## Digital Identity

### Pseudonymous Identification

If you're using the internet, you're doing so through a digital medium and utilizing some form of a digital identifier. Everything you do leaves a footprint that details your activity, and it is nearly impossible to evade all the essential cookies and trackers out there. The same goes for crypto, except instead of your activity, location, and behavioral data being tracked and recorded, your transactions are recorded on the blockchain.

Every transaction you participate in has an immutable digital signature when using a non-custodial wallet. This signature is publicly indexable through various blockchain explorers like Solscan or Etherscan. For every blockchain transaction, documentation of the public keys involved, the transaction hash, the transaction fee paid, and other relevant information exists. Think of each of your public keys as an extension of your digital identity.

This public information can be analyzed retrospectively to see where and how the current balances came to be. It could also be used to predict what the next activity will be done with a wallet or collection of wallets. Entire businesses, like Nansen, are being built on identifying smart money by analyzing public blockchain addresses using AI to understand their activity. What are the most profitable wallets in the world holding right now? It's publicly available information.

With a bit of digging (and machine learning), you can easily see the activity and profitability of every public key. Just copy and paste a wallet address or transaction hash into the search bar of any reputable blockchain explorer and incorporate some data analytics.

### Domain Names

Now that it's clear what public keys' utility is and how they enable users to operate pseudonymously, let's go one step further.

You can buy an NFT composed of keyboard characters representing your public key and, thus, your digital identity. Using Ethereum Name Service on Ethereum or Bonfida's name service on Solana, you can change those scary alphanumeric public keys to something more digestible like Solrise.eth, satoshi.near (on the Near blockchain), or Solflare.sol.

It can even be 💃.sol – emojis are fair game.

If your name is Seth and you like Ethereum, you can own S.eth. You get the idea. Instead of sending your friend "0x329adffe8792930782f" to pay you back for dinner, they can type in "S.eth" as the recipient address.

Domains can simplify transactions, represent digital identities, and host websites.

They are a relatively nascent field of crypto, so their integration has yet to be applied across the board, and there are some instances where they currently don't work. Most centralized exchanges, at the moment, don't enable you to send tokens to a .eth or .sol address – you'll have to send it to the public key associated with the wallet.

### Pseudonymous Economies

These pseudonymous digital identities that public addresses and domains can serve enable people to participate in pseudonymous digital economies. Pseudonyms are potent tools many utilize to evade censorship or remove prejudice. If someone's username is Aa97tuhfdfa, there is no religious, racial, nationalist, or prejudicial bias to have about them.

People can now have a real-world identity, a pseudonymous identity for communication (whistle-blowing), and a different pseudonymous identity for financial transactions.

## Risks and Challenges

Exploits are a problem... [Note: fixed typo]

### The Hard Truth

Self-custody isn't for everybody.

If you forget your bank account password, you can call your bank and have it reset. However, if you forget your mnemonic and lose access to your wallet, you won't have anybody to call.

The future of self-custody is unclear for non-power users. Non-custodial wallets will always exist, but only a portion of the population may use them unless their UX drastically changes. Unfortunately, security is often secondary to user experience, especially for demographics less impacted by the most severe drawbacks of centralized financial systems.

The custodial wallet model may grow more than the alternative, depending on how regulation develops over the next decade.

## Future Outlook

While non-custodial wallets are much more potent than custodial wallets, custodial wallets are getting better.

Some crypto exchanges are beginning to offer exposure and interoperability through DeFi products, a growing part of the industry to watch out for. This is primarily through Earn and Stake products, which generally incorporate traditional lending or sometimes modern DeFi strategies on the backend. DeFi is not allowed in the US, and BlockFi had to pay $100 million in penalties because it failed to adhere to specific compliance disclosures.

Although self-custody may not be the right choice for everybody, this course will help you understand the pros and cons of centralized systems and custodial and non-custodial wallets and choose the right option for you.
