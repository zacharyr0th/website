---
title: 'Swaps'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: 'Orderbooks trade, AMMs swap'
description: 'Orderbooks trade, AMMs swap'
tags: ['Crypto', 'Trading']
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

A swap is an exchange of one cryptocurrency for the equivalent value of another using an AMM. The difference between swaps and trades is swaps refer to the selling or buying of an asset from a liquidity pool where the price is managed by an automated market maker (AMM). Trades refer to selling or buying assets on an exchange using an order book.

</div>

Swaps have two key advantages over trades on centralized exchanges

1. Algorithmic

on a centralized exchange, there must be sufficient “buys” in the exchange’s order book for your sell order to be executed. There’s never a guarantee that your buy or sell order will be filled. When swapping with a liquidity pool, the pool’s AMM algorithm guarantees that your order will be executed automatically - for better or worse depending on how liquid the market is.

2. Non-custodial

liquidity pools on decentralized exchanges (DEXes) are attempts at decentralization, which means the assets in the pools you interact with during the swap AND the wallet you connect to the pool are both non-custodial.

Liquidity pools can also be permissioned, so remember that not all liquidity pools are equal. As more traditional firms like JP Morgan and Fidelity dabble in DeFi, you’ll hear about the rise of permissioned DEXes and more permissioned DeFi. _shivers_

Unlike centralized exchanges, where an organization holds custody over the exchange funds and the users’ wallet keys, liquidity pools’ non-custodial nature eliminates the risk of malicious behavior and security vulnerabilities common with custodial exchanges.

### How do Swaps Work?

Swaps require you to input how much you want to buy or sell, and the interface will show you how much you can sell or buy. For example, say you want to sell 1 SOL. You’ll input the 1 SOL at the top of your swap interface.

At the time of writing, 1 SOL = 144.624125 USDC. I can accept this price and execute the swap transaction, or I can wait to see if the price changes in my favor and increases on the USDC end.

You can flip the trade using the two arrows separating the top and bottom. The quoted price has changed, and it now shows the same amount of USDC listed above, only being able to purchase 0.994637261 SOL.

These quotes do not consider the transaction fee you’ll be paying, which usually amounts to 0.000005 SOL or about $0.001, which is a godsend when you think about the $30-120 fees on Ethereum at the moment.

In Solflare’s swap interface, you’ll also see the quoted values for what you’re trading right above the swap button.

### Understanding Slippage

Slippage
A critical aspect of swaps is slippage, which refers to the price of the asset you’re trying to buy changing while trying to buy it. This is due to either volatility or volume issues. Usually, the faster the swap – the less slippage there will be.

Volatility based slippage
If you swap $100 of SOL-SRM and there is $100 worth of SRM available within the swap interface you’re working with, the transaction will be confirmed. Let’s say SOL’s price quickly declines before your transaction goes through. This will result in the quoted amount of SRM you will receive to decline as well.

To alleviate this issue, some Swap services have implemented a fixed-rate swap mechanism that maintains your quoted price until the transaction has been finalized or a new quote is provided.

Volume based slippage
Volume-based slippage is mainly an issue for ‘whales’ – wallets with large amounts of cryptocurrencies – and for low-liquidity markets.

Let’s say you want to purchase $100 million of SRM with your SOL. Although the SOL-SRM market is very liquid, there is probably not $100 million worth of SRM available at the same price. Due to the sheer size of the order, the beginning of the purchase will be priced lower than the remaining. You’ll end up with an order that moves the market in one way or another. If you’re buying $100 million, you’ll be incrementally raising the price of SRM until your order is filled, and vice versa if you’re selling.

This same issue applies to trading securities and currencies. There always has to be a buyer or seller on the other side of your transaction, and they don’t have the same views of how things are priced. The way to get around slippage is a limit order, which only executes the trade when you can get the complete transaction executed at a specified price.

### Atomic Swaps: The Future of Cross-Chain Trading

Atomic swaps enable users to trade tokens between two blockchains once predefined conditions are met. Atomic refers to the idea that the swap is either completed or never happens.

They often incorporate smart contracts using Hashed Timelock Contracts (HTLC), which set time limits for the swap. These swaps can also be reversed if the counterparty fails to fulfill its predefined duties in the allotted time period.

Atomic swaps are becoming fundamental blockchain mechanisms as more chains garner communities of value that need to be transmitted. They remove the risk of the centralized intermediary bridging the two chains together.

They give more control to the swapper while eliminating counterparty risk.
