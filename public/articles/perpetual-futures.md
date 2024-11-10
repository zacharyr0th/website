---
title: 'Perpetual Futures'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: 'A New Financial Primitive'
description: 'A New Financial Primitive'
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

Perpetual futures are derivative contracts with no expiration date. They track an underlying asset's price through funding rates, where traders pay or receive fees to maintain the price peg. These contracts are secured by collateral and settled directly on a blockchain.

</div>

## Introduction

Perpetual futures contracts are derivatives. Derivatives are tradable financial instruments that fluctuate in value as a real-time response to an underlying asset's price changes. A trade of the underlying asset itself would be referred to as a spot trade. This underlying asset could be anything that has a verifiable price feed.

For some perspective, there are estimated to be a few hundred trillion dollars worth of assets in the world and a few quadrillion dollars worth of derivatives.

Standard futures contracts have a set expiration and settlement date. Technically, futures contracts are legally binding documents that ensure the delivery of an asset at a specific price on a specific date. The asset being delivered at expiration could be physical or it could be a cash exchange. Most futures contracts are closed out and cashed out for difference before they reach expiration as only a small portion of traders are looking for physical delivery.

When you trade a stock, a market maker is usually providing liquidity for you to trade. There are issues with this as market makers have a large influence on prices. When you trade futures, the exchange itself is the only counterparty. They will settle the trade and either deposit winnings into your account or take losses out of it.

It is important to understand that futures contracts are leveraged positions. Every time you are making a futures trade, you are borrowing money to do so. Your wins and your losses will be amplified by the amount of leverage you utilize.

## Benefits of Using Futures

<ul>
  <li>Having the ability to go long or short an asset
    <ul>
      <li>Long = You buy the asset and make money when the price goes up</li>
      <li>Short = You sell the asset and make money when the price goes down</li>
      <li>When shorting, you are selling X at Y price with the intention of buying back at a lower price of Y-Z</li>
      <li>Shorting requires borrowing money, secured by collateral in your account</li>
    </ul>
  </li>
  <li>Traders can utilize leverage for capital efficiency
    <ul>
      <li>When done successfully, leverage trading can yield much higher returns</li>
      <li>Can easily lead to blown accounts for inexperienced traders</li>
    </ul>
  </li>
  <li>Traders can hedge effectively
    <ul>
      <li>Example: Long 10 SOL but expect short-term decline? Open a short futures position</li>
      <li>For delta neutral: Use 10 SOL as collateral to short 10 SOL</li>
    </ul>
  </li>
</ul>

## Perpetual Futures Contracts

A perpetual futures contract (a perp) is essentially the same as a standard futures contract except there is no expiration date. If a position is opened, it can be held in perpetuity unless the price goes so far in the opposite direction that the position is liquidated.

Liquidations, which also exist in standard futures, are when your position is automatically closed and the money you used to open it is lost. This occurs when the ratio of how much money you used as collateral falls below the amount of money needed to maintain your position.

All of these details are emphasized in most futures trading interfaces like the one below. You will usually see a liquidation value meaning if the price were to get to that point, your position would be liquidated.

## Funding Rates

As mentioned above, futures contracts move in tandem with the spot price of an asset. This spot price is just the open market price. In order for this peg to be maintained, a funding rate is implemented. Funding rates are fees that are paid from one side of a trade to another. For example, if the futures contract is worth less than the spot price, then short positions will pay long positions a fee and vice versa.

As prices go up, it becomes more expensive to hold a long position and the same goes for short positions when prices go down. Because of this, it is more advantageous for traders trying to take a long-term futures position to use standard futures as there are no funding fees.

As you can see in the chart above, funding rates often follow the price of an asset but it is not always a leading indicator. It is possible to trade perps with the intention of profiting off of the funding rates and many traders attempt to do so.

## Futures in DeFi

Although the majority of perp trading takes place on CEXes like Deribit, Binance, and FTX, perp trading has been a feature of DeFi for some time now. Dydx is an on-chain derivative exchange on Ethereum that has significant volume and there are now a number of protocols on Solana that enable perp trading – namely Mango Market, Zeta Markets, and Drift Protocol.

Solana is the world’s highest-performing blockchain. It can withstand more volume than any other blockchain while still maintaining its security, transparency, and speed. The combination of speed and low fees make Solana the perfect environment for futures trading of all kinds, in particular high-frequency trading.

## Conclusion

Perps are a relatively new financial instrument that gives traders the ability to easily open leveraged positions and maintain them indefinitely. It is important to understand the differences between perpetual futures and standard futures as there are pros and cons to each depending on what you are trying to do.

For a more thorough understanding of how you can utilize futures using your Solflare wallet, check out this guide on How to Trade Perps using Mango.
