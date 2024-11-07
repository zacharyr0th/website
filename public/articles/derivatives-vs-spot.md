---
title: 'Derivatives vs Spot'
date: '2024-10-25'
image: /images/derivatives-0.webp
subtitle: Who wins?
description: 'Who wins?'
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

Derivative markets significantly influence equity prices through market-maker actions. Real asset values differ from notional values due to monetary policy and market mechanics. While crypto markets are less affected by derivatives, they face unique challenges from well capitalized traders, resulting in illiquidity and volatility.

</div>

The recent S&P 500 futures (/ES) movement presents an interesting case study:

<ol className="list-decimal pl-6 space-y-2">
  <li>Large traders, reportedly including Carl Icahn, accumulated significant positions in 4050 puts</li>
  <li>The market declined to precisely 4050 by expiration</li>
  <li>Subsequently, these traders established new positions in 3950 puts for the following month</li>
  <li>And sure enough - the market dropped again</li>
</ol>

The relationship between large options positions and market movements can appear to be more than coincidental. While it's impossible to definitively prove causation, the mechanics of dealer hedging combined with market psychology create conditions where large derivative positions can significantly influence the price action of spot assets.

Why is that? Let's look into it.

## Market Structure

One largely overlooked aspect of retail trading is market structure. Predicting when to buy/sell is where billions are made, and having a thorough understanding of the market structure and how big players are positioned, or how big positions are played, is one of the market's most predictive resources.

Market Structure encompasses all market characteristics, such as the number and size of buyers and sellers, competition level, information availability, regulatory environment, and the physical and virtual infrastructures where financial instruments are traded. All of which can significantly affect market efficiency, price discovery, and overall price trajectory.

During Covid times, 'gamma squeezes' became a colloquial term on financial news channels. They represent the phenomenon of dealer positioning (Gary), an inevitable result of how equity markets are structured. In short, a 'gamma squeeze' occurs when the acceleration of upside derivative purchases increases, leading to the purchasing of the underlying by cash-heavy dealers, resulting in exponential rises in price, as seen in Gamestop and AMC. When you buy derivatives that profit on the upside on an asset (going long), a dealer can sell you the derivative (going short) and hedge against that by buying the underlying, which is the asset

When the acceleration of upside derivative purchases increases, so does the purchasing of the underlying by cash-heavy dealers, resulting in exponential rises in price, as seen in Gamestop and AMC. Monitoring the call or put volume before a gamma squeeze could give actionable insights on how to trade it.

This is what a gamma squeeze looks like.

![Derivatives vs Spot](/images/derivatives-1.webp)

### Consequences of 1987

How can these dealers be so involved when they impact the market so much? The answer is liquidity. Some market-making dealers are legally obliged to place bids under specific market conditions. This is meant to protect the infrastructure and price stability of the underlying and became standard practice after the 1987 crash, which resulted from an overcrowded trade in portfolio insurance. Some traders like Paul Tudor Jones made a killing by being on the right side of this and once the dust settled, the market nearly went up only until the tech bubble burst in the early 2000s.

![Derivatives vs Spot](/images/derivatives-2.webp)

The crash was a technical reaction to how the market was structured. - there was no fundamental change that provoked the price collapse. Simply put, there were not enough market-making firms willing to place a bid on that frightful morning. Regulators deemed that unacceptable, and market makers have since become one of the primary driving forces of global markets - to a fault.

The arguably black swan events of 2008 and 2020 were two moments when this market-making backstop failed. In both cases, price conditions were so dire that there seemed to be no buyers left - until the central banks made their money printing intentions clear, as they have time and again.

## Notional Value vs. Real Value

Below is a graph of the S&P 500 index (traded as /ES) priced in USD.

![Derivatives vs Spot](/images/derivatives-3.webp)

Now compare the index against the Fed's balance sheet.

![Derivatives vs Spot](/images/derivatives-4.webp)

As you can see, the value of the index in 2007/2008 was around 0.0016. So for every $1 on the Fed's balance sheet, ~$0.0016 of value existed in the S&P 500 index. Quantitative easing and bank bailouts brought floods of new capital into the system and onto the Fed's balance sheet, pushing the value of the index to the $0.0004/0.0006 territory.

The index has not even come close to its previous highs in relative real value. Meanwhile, a steep rise exists in the USD notional value. This leads to the forgone conclusion that each unit of USD is effectively losing its real value over time.

In other words, prices are rising. Real value can be measured by a notional value less inflation which results in spending power, but how do we measure inflation? You can listen to what the Fed reports in its CPI numbers, or you can measure your purchases.

### Candy is not a Store of Value

| Product                  | 2014 Weight | 2018 Weight | Change |
| ------------------------ | ----------- | ----------- | ------ |
| Snickers (4 pack)        | 232g        | 167g        | -28.1% |
| Toblerone Milk Chocolate | 200g        | 150g        | -25.0% |
| Twix Twin Bars (4 pack)  | 200g        | 160g        | -20.0% |
| Kit Kat Chunky           | 48g         | 40g         | -16.7% |

The notional value of these candies has not changed, yet the real value of what you are purchasing has declined substantially. This pattern of decreasing returns and increasing prices is common across many industries, such as education, groceries, commodities, ride-sharing services, and streaming platforms. It is not a specific issue, it's a systemic problem.

To be clear, its probably a good thing that we're getting less candy than before but prices should reflect that reality.

## Asset Scarcity

Scarcity, physical or digital, has made its way to the front lines of the debate on asset valuation. One thing is certain: the US dollar is not scarce, nor are the derivatives tied to it.

According to Visualise Capitalist's research on the world's money supply, the global derivatives markets outside the world's stock markets by a factor of 11.

A conservative estimate of the notional value of the world's derivative markets is one quadrillion US dollars.

If that estimate is correct, then for every $1 in a stock market, there are $11 in derivatives betting on what that $1 does. These $11 serve a variety of purposes, such as supply-side hedging, but most are cash-settled speculations. These are side-bets, bets on side-bets, and bets on bets on side-bets. Each of these carry their own risk profiles but are ultimately tied to that first $1.

The thesis here is the sheer quantity of the value of side bets changes how the initial bet plays out.

It's similar to the reflexivity principle discussed by George Soros in his book the Alchemy of Finance (read my review here) or the concept of Gary as described by TV-friendly market maker and fund manager Cem Karsan. GO INTO DETAIL ON GARY HERE AND LINK SQUEEZE PAPER

## Reflexivity: The Observer Effect

Physicists deal with the same issues of reflexivity as financial markets, but in a more fundamental sense — the observer effect.

"In physics, the observer effect is the disturbance of an observed system by the act of observation. This is often the result of instruments that, by necessity, alter the state of what they measure in some manner. A common example is checking the pressure in an automobile tire; this is difficult to do without letting out some air, thus changing the pressure. Similarly, it is not possible to see any object without light hitting the object and causing it to reflect that light. While the effects of observation are often negligible, the object still experiences a change."

Financial markets are dynamic entities with an infinitely complex combination of observers and their intentions. This observer effect is compounded through the use of derivatives.

## Crypto Market Structure

Things are slightly different in crypto.

The whales in the equity markets are traditionally risk-averse like endowmnets, pension funds, and even market makers while the whales in crypto are often early adopters playing with house money, emerging funds, or individual traders with a large risk tolerance. I go into more depth on this risk tolerance in Easy Money & Veblen Goods.

These dynamics create sustained volatility unmatched in traditional equity markets, aside from perhaps penny stocks or OTC stocks where market caps are small, and majority share owners can, at least temporarily, get away with acting shady to pump or dump prices.

## So, which is the real underlying asset?

Its hard to tell and in crypto, it's definitely not clear. Crypto derivatives are relatively niche compared to equity derivatives, and their notional value is far lower. The existence of multiple crypto futures exchanges, funding rates, on-chain activity and other factors muddy the answer.

For example, there have been times when Bitcoin futures traded 10% higher on Coinbase than on other exchanges. This doesn't happen to SPX futures on the single exchange (CME), where all /ES futures contracts are traded. Bitcoin's premium has been as high as 20% in South Korea due to restrictions on foreigners trading the South Korean Won — it eventually gets arbitraged out or resets to equilibrium, but that is a non-existent phenomenon in equity markets and shouldn't happen.

The lack of standardized futures contracts and the use of many different price oracles in cryptocurrency markets creates a complex and uncorrelated web of price data that has yet to be demonstrated to have the same impact on crypto spot transactions as in traditional markets.

As crypto derivatives markets mature, will they become as reflexive as equity markets?
