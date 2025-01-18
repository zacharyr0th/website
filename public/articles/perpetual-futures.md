---
title: 'Perpetual Futures'
date: '2021-11-05'
image:
  src: '/misc/placeholder.webp'
  alt: 'Perpetual Futures'
description: 'A New Financial Primitive'
category: 'technology'
tags: ['crypto']
takeaways:
 - 'Perpetual futures are derivative contracts with no expiration date.'
 - 'Theyre secured by collateral and settled directly on a blockchain.'
---

Perpetual futures are derivative contracts with no expiration date. They track an underlying asset's price through funding rates, where traders pay or receive fees to maintain the price peg. These contracts are secured by collateral and settled directly on a blockchain.

# Futures

## Standard Futures

Standard futures contracts have a set expiration and settlement date. Technically, futures contracts are legally binding documents that ensure the delivery of an asset at a specific price on a particular date. The asset being delivered at expiration could be physical or a cash exchange. Most futures contracts are closed out and cashed out for the difference before expiration, as only a few traders are looking for physical delivery.

When you trade a stock, a market maker usually provides liquidity for you to trade. There are issues with this as market makers greatly influence prices. When you trade standardfutures, a centralized exchange serves as the clearinghouse. They settle the trade and either deposit winnings into your account or take losses from it. It's important to understand that futures contracts are leveraged positions. Every time you make a futures trade, you borrow money. Your wins and losses will be amplified by the leverage you utilize.

| Benefit                  | Description                                                                                     |
|--------------------------|-------------------------------------------------------------------------------------------------|
| Long or Short an Asset   | **Long**: Buy with leverage, profit from price increases beyond unleveraged gains. **Short**: Sell borrowed assets, profit from price decreases. Both require collateral-secured borrowing.                                                    |
| Leverage Efficiency      | Amplifies returns when successful. Increases risk of account liquidation for inexperienced traders.                              |
| Effective Hedging        | **Examples**: Long 10 SOL, hedge against decline with short futures position. Delta neutral strategy: Use 10 SOL as collateral to short 10 SOL.                             |

### Funding Rates

Funding rates are fees paid from one side of a trade to another. For example, if the futures contract is worth less than the spot price, then short positions will pay a fee to long positions and vice versa. The funding rate maintains this peg and dynamically adjusts to market conditions to keep the futures contract in line with the spot price. 

They're typically calculated every minute and comprise two components: the interest rate and the premium. The interest rate is the cost of borrowing the asset, and the premium is the difference between the futures and spot prices. As prices increase, it becomes more expensive to hold a long position, and the same goes for short positions when prices go down. In bullish markets, funding rates tend to be positive, and in bearish markets, they tend to be negative. 

Traders speculate on funding rates, most commonly through a basis trade, in which they buy futures and sell the underlying asset to profit from the difference between the two funding rates. 

### DeFi

Although most perp trading occurs on CEXes like Deribit, Binance, and FTX, it has been a feature of DeFi for some time. Ethereum has its trading venues, and several protocols on Solana now enable perp trading—namely, Mango Markets, Zeta Markets, and Drift Protocol. Not all assets are available on-chain, and the lack of a centralized clearinghouse means traders are responsible for risk management. Still, more opportunities exist to speculate on the future and form cohesive, decentralized financial networks than ever before.

Trading perpetual futures on-chain has its pros and cons. On the one hand, you can trade with leverage without needing a centralized counterparty. On the other hand, you need to be aware of the potential latency, slippage, and execution risk inherent to on-chain trading. Depending on your risk profile and time horizon, the pros may outweigh the cons, with the leading pros being 24/7, global permissionless access to leverage and composability opportunities. 

# A New Financial Primitive

Perps are an interesting new financial instrument that allows traders to permissionlessly open and maintain leveraged positions indefinitely, opening doors to new composability, market pairings, and asset creation opportunities.