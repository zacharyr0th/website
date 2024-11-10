---
title: 'Self Custody: Part 1'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: Understanding the Building Blocks of Decentralized Finance
description: 'Understanding the Building Blocks of Decentralized Finance'
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

The last chapter was full of technical knowledge. Now let’s get to a more conceptual understanding of non-custodial wallets and self-custody. Self Custody has been a fundamental feature of crypto since its inception. While it’s giving people more control over their finances and sovereignty than ever before, it is also giving people more responsibility than ever before.

Power, responsibility, spider-man … you get it.

Today’s Agenda
Keys & Coins
Security
Pseudonymous Identification
The Dark Side
Rugpulls
Hacks
Domains
The Hard Truth
Custodial Wallets
Conclusion
Keys & Coins
To onboard billions of users to crypto, there needs to either be a massive ramp-up in education or measures to be put in place to prevent large amounts of scams and lost recovery phrases.

Most crypto users keep their funds on exchanges, which means accountability is transferred to the exchange. Financial contagions begin when large custodians of volatile assets become insolvent. Accounts on Coinbase, for example, are subject to seizure if Coinbase becomes insolvent. In other words, if Coinbase goes bankrupt – the banks will take the money (crypto) in your account to cover their debts.

When it comes to people’s livelihood, self-custody quickly becomes a serious issue. Exchanges will only sometimes act in your best interest, and there’s always the possibility of a government shutting down the exchange. Below is one of the oldest adages in crypto.

Not your keys, not your coins.

For those interested in the tenets of self-custody, it’s important to understand not only the technology but also the context to take advantage of all its capabilities.

Security
To safely enjoy the benefits of a decentralized web and non-custodial wallets, you must remember or retain access to your mnemonic phrase and prevent anyone else from knowing it.

Since anyone with the mnemonic phrase can access the associated digital wallet, safeguarding this phrase is of the utmost importance. As mentioned in Self Custody: Part 1, you don’t want to store sensitive material on a file in your Google Drive. Not only does Google have access to that, but anyone who obtains your Google password does too.

The government could subpoena Google for access to your Drive. This is partly how the money launderers who had $4.5 billion in stolen BTC got caught. Authorities had access to the cloud data provider for one of the launderers and found private keys in a plain text file that accessed $3.6 billion of the missing BTC.

The accused launders Ilya Lichtenstein & Heather “Razzlekhan” Morgan holding a frog.
The best practices for mnemonic phrases are physically writing them down or etching them into steel and storing them in a safe location. You can keep multiple copies on hand, but be aware of where they are. There are more than a few stories of people obtaining other people’s mnemonics, and there are even stories of people forgetting their mnemonics and losing access to generational wealth.

Pseudonymous Digital Identification
If you’re using the internet, you’re doing so through a digital medium and utilizing some form of a digital identifier. Everything you do leaves a footprint that details your activity, and it is nearly impossible to evade all the essential cookies and trackers out there. The same goes for crypto, except instead of your activity, location, and behavioral data being tracked and recorded, your transactions are

When using a non-custodial wallet, every transaction you participate in has an immutable digital signature. This signature is publicly indexable through various blockchain explorers like Solscan or Etherscan. For every blockchain transaction, documentation of the public keys involved, the transaction hash, the transaction fee paid, and other tidbits of relevant information exist.

Think of each of your public keys as an extension of your digital identity.

This public information can be analyzed retrospectively to see where and how the current balances came to be. It could also be used to predict what the next activity will be done with a wallet or collection of wallets. Entire businesses, like Nansen, are being built on the idea of identifying smart money by analyzing public blockchain addresses using AI to understand their activity. What are the most profitable wallets in the world holding right now? It’s publicly available information.

With a bit of digging (and machine learning), you can easily see the activity and profitability of every public key. Just copy and paste a wallet address or transaction hash into the search bar of any reputable blockchain explorer and incorporate some data analytics.

Domains
Now that it’s clear what public keys’ utility is and how they enable users to operate pseudonymously let’s go one step further.

You can buy an NFT composed of keyboard characters representing your public key and, thus, your digital identity. Using Ethereum Name Service on Ethereum or Bonfida’s name service on Solana, you can change those scary alphanumeric public keys to something a little more digestible like Solrise.eth, satoshi.near (on the Near blockchain), or Solflare.sol.

It can even be 💃.sol – emojis are fair game.

If your name is Seth and you like Ethereum, you can own S.eth. You get the idea. Instead of sending your friend “0x329adffe8792930782f” to pay you back for dinner, they can type in “S.eth” as the recipient address.

Domains can simplify transactions, represent digital identities, and host websites.

They are a relatively nascent field of crypto, so their integration has yet to be applied across the board, and there are some instances where they currently don’t work. Most centralized exchanges, at the moment, don’t enable you to send tokens to a .eth or .sol address – you’ll have to send it to the public key associated with the wallet.

FYI, Solflare has enabled the Bonfida naming service, so you can send digital assets to any .sol address or put the .sol address into your address book. Solflare also lets you know when you’re trying to send to an invalid domain to help you avoid mistakes.

Pseudonymous Economies
These pseudonymous digital identities that public addresses and domains can serve enable people to participate in pseudonymous digital economies. Pseudonyms are potent tools many utilize to evade censorship or remove prejudice. If someone’s username is Aa97tuhfdfa, there is no religious, racial, nationalist, or prejudicial bias to have about them.

People can now have a real-world identity, a pseudonymous identity for communication (whistle-blowing), and a different pseudonymous identity for financial transactions. Balaji Srinivasin eloquently describes the nuances of this triangular dynamic in the following video.

The Dark Side
Where there is money, there are snake-oil salesmen.

Cryptocurrencies and blockchains can change the world for the better, but plenty of by-products need to be dealt with. Due to the amount of money involved, there is a massive incentive for bad behavior.

Source
The range of bad actors in crypto is far and wide, and cyber attacks involving crypto can be highly profitable. Scam artists are everywhere, from state-funded ransomware attackers that go after hospitals and pipelines to young grifters who build NFT or DeFi projects with the explicit purpose of rug pulling.

Rugpulls
Rugpulls are becoming a part of global vernacular due to their frequent occurrence. When a product is falsely marketed to raise money, and the developers decide to leave with the money without delivering on their promises, that is a rugpull.

What remains is a pool of investors who are now bagholders.

Fortunately, there are people taking notice.

Rekt is an excellent resource for recaps of previous exploits. If you subscribe to their newsletter, you’ll receive a new issue whenever a major exploit occurs. They have documented over 70 exploits since 2020 that have amounted to billions in investor losses.

Many Twitter pages are dedicated to exposing these fraudsters and are worth looking into to build an understanding of the levels of grift within crypto. The best way to defend yourself is to become more knowledgeable about both the light and dark sides.

Know what is possible and how things work, and you will be fine.

Hacks
The fact that everything is open source makes this issue even more difficult for the good guys. Try to think of it from the hacker or grifter’s perspective. For example, say you were perusing the code of Polygon’s bridge and saw a $600 million vulnerability that you knew how to take advantage of. Would you act on it? This course is not a philosophical analysis of grift, but it’s safe to say that someone probably would.

Actually, someone did. Curiously enough, they returned the funds but not without having some fun. Below is an image of the smart contract the hacker used to communicate with the Polygon team.

The Hard Truth
Self-custody isn’t for everybody.

If you forget your password to your bank account, you can call your bank and figure it out. If you lose access to your wallet by forgetting your mnemonic, you won’t have anybody to call.
The future of self-custody is unclear. There will always be non-custodial wallets, but there may only a portion of the population chooses to use them. Unfortunately, security is often secondary to user experience, especially for demographics less impacted by the most severe drawbacks of centralized financial systems.
Depending on how regulation goes over the next decade, you may see the custodial wallet model grow more than the alternative.

Custodial Wallets and Services
While non-custodial wallets are much more powerful than custodial wallets, custodial wallets are definitely getting better.

Some crypto exchanges are beginning to offer exposure and interoperability through DeFi products, a growing part of the industry to watch out for. This is primarily through Earn and Stake products which generally incorporate traditional lending or sometimes modern DeFi strategies on the backend. DeFi is essentially not allowed in the US, and BlockFi had to pay $100 million in penalties because it failed to adhere to specific compliance disclosures. Whoops.

Conclusion
Although self-custody may not be the right choice for everybody, this course will help you understand the pros and cons of centralized systems, custodial and non-custodial wallets, and to choose the option that’s right for you.
