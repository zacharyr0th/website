---
title: 'Liquidity Pools'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle:
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

One of the most important innovations in decentralized finance (DeFi) is the liquidity pool. It eradicates the need for market makers, bootstraps liquidity for markets that may otherwise be illiquid, and introduces a novel way to generate yield on your assets.

Liquidity pools are an alternative to the traditional order book structure of trading. Exchanges like Binance, Coinbase, New York Stock Exchange, and the Nasdaq utilize order books as their liquidity management method. Before we break down liquidity pools, let’s outline an order book.

Order Books
An order book is the tried and true liquidity management method that has been globally implemented across exchanges for decades. They refer to the electronic lists of previously placed buy orders (bids) and sell orders (offers) of an asset at different price levels.

The buyers are trying to pay the least amount possible, while the sellers are trying to sell for the highest amount possible. What exists in between the buyers and sellers is what’s called the spread.

When you buy a share of Apple, you must place a limit or market order. The limit order will be placed into the order book until it is canceled or filled at the listed price. A market order will jump the spread and pay/sell for the ‘best’ offer/bid.

In the US, the best bid and best offer refer to the NBBO standard enforced by the SEC, which requires brokers to guarantee that market buys are at the lowest possible price, and market sells are at the highest possible price.

What’s wrong with an order book?

Bookmap’s visualization of an active order book

The infrastructure behind traditional/centralized finance (TradFi or CeFi) requires excessive intermediaries. To facilitate a single trade, you will need at least a dozen different entities to be directly or indirectly involved. These include centralized exchanges (CEXes), market makers, prime brokers or high net-worth individuals who fund the market makers, custodians, etc.

This creates high entry barriers and high levels of informational asymmetry. Incentives are not aligned, and the retail investor is often hung out to dry.

Here’s an Example
What happens if you want to buy 150 shares of Apple for $130, but there are only 50 shares that people are willing to sell at that price, and the next available price people are ready to sell at is $131? This is where the market maker comes into play.

Market makers make markets by providing the remaining 100 shares to the buyer as long as the buyer is willing to pay more for the spread. This enables instantaneous, continuous trading. Since no one is willing to sell for less than $131, market makers could sell their Apple shares for $130.99 until someone is willing to sell for $130.99, etc. Market makers won’t just take undue amounts of risk to complete your trades. They may also trade against you.

Now let’s say you sell your 100 shares. No trader on the other side is trying to buy them at the price you offered. The market maker buys them. The market maker then buys a put option, so they profit if the cost of their Apple shares declines. If the put becomes in the money, the market maker is incentivized to execute the option giving them 100 more shares to sell. They can now sell 100 shares onto the open market while retaining their original 100 shares. If the share price goes up, the market maker makes money; if the share price goes down, the market maker makes money.

You can see how deeply integrated, and necessary market makers have become in TradFi. Because of this order book structure, they are privy to much more information than retail traders. If a company like Robinhood states that they offer feeless trading, that is only partially true because they sell your trades to a market maker who then profits off this spread. The reflexive relationship between market makers and the market causes unnatural price action as derivatives have an outsized effect on the underlying asset’s price.

Cue Liquidity Pools
Liquidity pools operate entirely on their own without the need for any market makers. They enable individuals to provide liquidity to traders by pooling tokens into a smart contract and proportionately distributing trading fees to liquidity providers.

How do they work?
Liquidity providers deposit an equivalent value of two tokens; in return, they receive LP tokens in proportion to how much they deposit. Traders then swap tokens with the liquidity pools (funded by the liquidity providers), and the trading fees are proportionally distributed to the LP holders. The liquidity providers must burn LP tokens by selling them to the liquidity pool to take back the underlying liquidity and any accumulated swapping fees.

The formula
Each swap adjusts the price via a deterministic algorithm called an automated market maker (AMM). Different protocols use different AMMs for other purposes but are fundamentally based on the same concept.

x \* y =k

This formula describes the relationship between the assets deposited into liquidity pools. It implies that the quantity and value of token X must equal the amount and value of token Y, which enables a constant value of K representing the level of liquidity available.

Arbitrage bots are incentivized to take advantage of any indiscretions between the price of the assets in the pool and the price of that same asset on another exchange. The first liquidity provider sets the price of the assets, and each swap after that will affect the asset’s prices, engaging the arb bots. If a trader wants to buy ETH with USDC, the trader will be depositing USDC into the liquidity pool while removing ETH.

Source
The AMM asymptotically increases token prices as quantities decrease because the ratio of tokens within the pool dictates token prices.

The Result
This balance of consistent liquidity and accurate pricing enables users to trustlessly trade on decentralized exchanges (DEXes) simply by connecting to a non-custodial digital wallet. The days of needing to deal with market makers manipulating prices and taking advantage of illiquidity are over. You can now freely make a market for just about anything and rely on nothing but the trust of the underlying smart contract governing the transactions.

Larger liquidity pools enable larger trades, so many platforms have been incentivized to reward liquidity providers with extra tokens for providing liquidity. This process is called liquidity mining which can be very profitable and helped kickstart the DeFi Summer of 2020.

The Risks
Although there have been vast amounts of progress and development in DeFi over the past few years, it still needs to be considered an unproven technology at scale. Doing anything in DeFi carries three risks you can’t avoid: smart contract bugs, admin key, and systemic risks.

Smart contract bugs are vulnerabilities or errors encoded within the smart contracts governing your capital. Even audited smart contracts can contain these bugs, and the results can be disheartening. Admin key risk refers to the contract’s creators retaining too much control, which puts the assets within it at risk. Systemic risk can be anything from the blockchain you are using failing or even the price of stablecoins de-pegging from their intended values.

Along with all of the above, engaging with liquidity pools entails one more risk that needs to be considered.

Impermanent Loss
Impermanent loss is a confusing name. It’s a result of one token’s price change affecting the aggregate value of the tokens in the liquidity pool.

The loss becomes permanent once the LP tokens are sold back to the AMM. The loss can go away if the liquidity provider keeps holding the LP tokens and the token price returns to normal. Depending on when you deposit your tokens into a liquidity pool, having them sit boringly in your wallet may be more profitable.

However, trading volumes and platform incentives may offset the impermanent loss. Understanding how price changes will affect the underlying liquidity you provide to any pool is essential.

The Issues
Liquidity pools are dynamic, powerful tools that can disrupt much of centralized finance. While there are benefits to trading with an order book or building a platform with one, there are also drawbacks.

The new AMMs being designed are much more complicated than what has been explained above. The x\*y=k formula describes the relationship of a simple 2-asset liquidity pool. New pools can contain much more than two assets. Some may even be a hybrid of multiple AMMs to enhance liquidity in specific regions. This substantially lessens a trader’s losses due to slippage and enables pools with tokens pegged to each other (USDC/DAI, ETH/wETH) to experience less price variation.

Liquidity providers can be inconsistent as well. As soon as they feel like it, they can leave. This makes the market they were providing liquidity to suddenly illiquid, and when this happens, prices crash if it’s a token that’s only traded on-chain.

Final Thoughts
TradFi requires too many intermediaries taking fees. Retail investors suffer from a lack of information and assets aren’t yielding what they used to while inflation is rampant. The order book has worked until now, but the convoluted system involved is ripe for innovation.

Liquidity pools present an alternative that can help fix each of these problems. Not only do they enable permissionless trading, but they incentivize everybody to get involved. The barriers to entry are very low.

If you understand this article, you can understand how to be a liquidity provider.

Similar Posts
What are SPL tokens?
Zachary
Zachary
17 November 2021
18 min
What are SPL tokens?
This article breaks down what liquidity pools are and what issues they address.

Solflare
Copyright © 2024 Solflare
Still have questions?
Want to just say hello?
