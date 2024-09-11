import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'derivative-vs-spot',
  slug: 'derivative-vs-spot',
  title: 'Derivatives vs Spot',
  subtitle: 'Chicken and the egg',
  image: '/images/articles/derivatives-0.webp',
  imageCaption: '',
  pageViews: 0,
  type: 'article',
  description:
    'A high level overview of the difference between spot and derivative markets across crypto and equity markets',
  content: '',
  author: 'Zachary Roth',
  bookAuthor: '',
  date: '2023-05-15',
  tags: ['Finance', 'Trading'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const Derivatives: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/articles/derivatives-0.webp"
        alt="Derivatives vs Spot"
        width={800}
        height={600}
      />
      <p>
        Derivative markets significantly influence equity prices through market-maker actions. Real
        asset values differ from notional values due to monetary policy and crypto markets, while
        less affected by derivatives, face unique challenges from whale traders, such as illiquidity
        and volatility.
      </p>
      <p>
        Carl Icahn and some deep-pocketed traders supposedly bought lots of 4050 puts when /ES was
        floating between 4150-4200 the other day.
      </p>
      <p>Well, /ES dropped to 4050 the day the puts expired.</p>
      <p>
        Then it became known that the same trader(s) bought boatloads of the 3950 puts that expire
        next month. Sometimes, the market seems never to go up when big enough players are
        positioned for it to go down.
      </p>
      <p>
        Why is that? Are they just hedging more prominent long positions? Are they taking advantage
        of option flows and the influential effects of dealer positioning?
      </p>
      <p>Let's look into it.</p>
      <h2>Market Structure</h2>
      <p>
        One largely overlooked aspect of retail trading is market structure. Predicting when to
        buy/sell is where billions are made, and having a thorough understanding of the market
        structure and how big players are positioned, or how big positions are played, is one of the
        market's most predictive resources.
      </p>
      <p>
        Market Structure encompasses all market characteristics, such as the number and size of
        buyers and sellers, competition level, information availability, regulatory environment, and
        the physical and virtual infrastructures where financial instruments are traded. All of
        which can significantly affect market efficiency, price discovery, and overall price
        trajectory.
      </p>
      <p>
        During Covid times, 'gamma squeezes' became a colloquial term on financial news channels.
        They represent the phenomenon of dealer positioning (Gary), an inevitable result of how
        equity markets are structured. In short, a 'gamma squeeze' occurs when the acceleration of
        upside derivative purchases increases, leading to the purchasing of the underlying by
        cash-heavy dealers, resulting in exponential rises in price, as seen in Gamestop and AMC.
        When you buy derivatives that profit on the upside on an asset (going long), a dealer can
        sell you the derivative (going short) and hedge against that by buying the underlying, which
        is the asset
      </p>
      <p>
        When the acceleration of upside derivative purchases increases, so does the purchasing of
        the underlying by cash-heavy dealers, resulting in exponential rises in price, as seen in
        Gamestop and AMC. Monitoring the call or put volume before a gamma squeeze could give
        actionable insights on how to trade it.
      </p>
      <p>This is what a gamma squeeze looks like.</p>
      <Image
        src="/images/articles/derivatives-1.webp"
        alt="Derivatives vs Spot"
        width={800}
        height={600}
      />
      <h3>Consequences of 1987</h3>
      <p>
        How can these dealers be so involved if they impact the market so much? The answer is
        liquidity. Some market-making dealers are legally obliged to place bids under specific
        market conditions. This is meant to protect the infrastructure and price stability of the
        underlying and became standard practice after the 1987 crash, which resulted from an
        overcrowded trade in portfolio insurance.
      </p>
      <Image
        src="/images/articles/derivatives-2.webp"
        alt="Derivatives vs Spot"
        width={800}
        height={600}
      />
      <p>
        The crash was a technical reaction to how the market was structured. - there was no
        fundamental change that provoked the price collapse. Simply put, there were not enough
        market-making firms willing to place a bid on that frightful morning. Regulators deemed that
        unacceptable, and market makers have since become one of the primary driving forces of
        global markets.
      </p>
      <p>
        The arguably black swan events of 2008 and 2020 were two moments when this market-making
        backstop failed. In both cases, price conditions were so dire that there seemed to be no
        buyers left - until the central banks made their money printing intentions clear.
      </p>
      <h2>Notional Value vs. Real Value</h2>
      <p>Below is a graph of the S&P 500 index (traded as /ES) priced in USD.</p>
      <Image
        src="/images/articles/derivatives-3.webp"
        alt="Derivatives vs Spot"
        width={800}
        height={600}
      />
      <p></p>
      <p>Now compare the index against the Fed's balance sheet.</p>
      <Image
        src="/images/articles/derivatives-4.webp"
        alt="Derivatives vs Spot"
        width={800}
        height={600}
      />
      <p></p>
      <p>
        As you can see, the value of the index in 2007/2008 was around 0.0016. So for every $1 on
        the Fed's balance sheet, ~$0.0016 of value existed in the S&P 500 index. Quantitative easing
        and bank bailouts brought floods of new capital into the system and onto the Fed's balance
        sheet, pushing the value of the index to the $0.0004/0.0006 territory.
      </p>
      <p>
        The index has not even come close to its previous highs in relative real value. Meanwhile, a
        steep rise exists in the USD notional value. This leads to the forgone conclusion that each
        unit of USD is effectively losing its real value.
      </p>
      <p>
        In other words, prices are rising. Real value can be measured by a notional value less
        inflation (resulting in spending power), but how do we measure inflation? You can listen to
        what the Fed reports in its CPI numbers, or you can measure your purchases.
      </p>
      <h3>Candy is not a Store of Value</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>2014 Weight</th>
            <th>2018 Weight</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Snickers (4 pack)</td>
            <td>232g</td>
            <td>167g</td>
            <td>-28.1%</td>
          </tr>
          <tr>
            <td>Toblerone Milk Chocolate</td>
            <td>200g</td>
            <td>150g</td>
            <td>-25.0%</td>
          </tr>
          <tr>
            <td>Twix Twin Bars (4 pack)</td>
            <td>200g</td>
            <td>160g</td>
            <td>-20.0%</td>
          </tr>
          <tr>
            <td>Kit Kat Chunky</td>
            <td>48g</td>
            <td>40g</td>
            <td>-16.7%</td>
          </tr>
        </tbody>
      </table>
      <p>
        The notional value of these candies has not changed, yet the real value of what you are
        purchasing has declined substantially. This pattern of decreasing returns and increasing
        prices is common across many industries, such as education, groceries, commodities,
        ride-sharing services, and streaming platforms. It is not a specific issue, it's a systemic
        problem. 
      </p>
      <p>
        To be clear, its probably a good thing that we're getting less candy than before
        but prices should reflect that reality
      </p>
      <h2>Asset Scarcity</h2>
      <p>
        Scarcity, physical or digital, has made its way to the front lines of the debate on asset
        valuation. One thing is certain: the US dollar is not scarce, nor are the derivatives tied
        to it.
      </p>
      <p>
        According to Visualise Capitalist's research on the world's money supply, the global
        derivatives markets outside the world's stock markets by a factor of 11.
      </p>
      <Image
        src="/images/articles/derivatives-6.webp"
        alt="Derivatives vs Spot"
        width={800}
        height={600}
      />
      <p></p>
      <p>
        A modest estimate of the world's derivatives is $1,000,000,000,000,000. One quadrillion US
        dollars.
      </p>
      <Image
        src="/images/articles/derivatives-7.webp"
        alt="Derivatives vs Spot"
        width={800}
        height={600}
      />
      <p></p>
      <p>
        If that estimate is correct, then for every $1 in a stock market, there are $11 in
        derivatives. These $11 serve a variety of purposes, such as supply-side hedging, but most
        are cash-settled speculations. These are side-bets, bets on side-bets, and bets on bets on
        side-bets. The thesis here is the sheer quantity of the value of side bets changes how the
        initial bet plays out.
      </p>
      <p>
        It's similar to the reflexivity principle discussed by George Soros or the concept of Gary
        as described by TV-friendly market maker and fund manager Cem Karsan.
      </p>
      <h2>The Observer Effect</h2>
      <p>
        Physicists deal with the same issues of reflexivity as financial markets, but in a more
        fundamental sense — the observer effect.
      </p>
      <blockquote>
        <p>
          "In physics, the observer effect is the disturbance of an observed system by the act of
          observation. This is often the result of instruments that, by necessity, alter the state
          of what they measure in some manner. A common example is checking the pressure in an
          automobile tire; this is difficult to do without letting out some air, thus changing the
          pressure. Similarly, it is not possible to see any object without light hitting the object
          and causing it to reflect that light. While the effects of observation are often
          negligible, the object still experiences a change."
        </p>
      </blockquote>
      <p>
        Financial markets are dynamic entities with infinitely complex combinations of observers and
        their intentions. This observer effect is compounded through the use of derivatives.
      </p>
      <h2>Crypto Market Structure</h2>
      <p>Things are slightly different in crypto.</p>
      <p>
        The whales in the equity markets are usually large traditional funds or market makers. On
        the other hand, the whales in crypto are often early adopters, emerging funds, or individual
        traders with large risk tolerances.
      </p>
      <p>
        For large traders, simply opening a position can cause a market to rise or fall, especially
        in lower market cap / less liquid altcoins. When Doge had a ~$40 billion market cap, a
        handful of wallets held nearly half of its supply. What if these wallets conspired and
        decided to market sell simultaneously?
      </p>
      <p>
        These dynamics create sustained volatility unmatched in traditional equity markets, aside
        from perhaps penny stocks or OTC stocks where market caps are small, and majority share
        owners can, at least temporarily, get away with acting shady to pump or dump prices.
      </p>
      <h2>So, which is the underlying asset?</h2>
      <p>
        It varies. Sometimes, spot equities lead to derivative price action and vice versa. In
        crypto, it's not so clear. Crypto derivatives are relatively niche compared to equity
        derivatives, and their notional value is far lower. The existence of multiple crypto futures
        exchanges, funding rates, on-chain activity, and price discounts and premiums are other factors
        that muddy the answer.
      </p>
      <p>
        For example, there have been times when Bitcoin futures traded 10% higher on Coinbase than
        on other exchanges. This doesn't happen to SPX futures on the single exchange (CME), where
        all /ES futures contracts are traded. Bitcoin's premium has been as high as 20% in South
        Korea due to restrictions on foreigners trading the South Korean Won — it eventually gets
        arbitraged out or resets to equilibrium, but that is a non-existent phenomenon in equity
        markets.
      </p>
      <p>
        The lack of standardized futures contracts and the use of many different price oracles in
        cryptocurrency markets creates a complex and uncorrelated web of price data that has yet to
        be demonstrated to have the same impact on crypto spot transactions as in traditional
        markets.
      </p>
      <p>As crypto derivatives markets mature, will they become as reflexive as equity markets?</p>
    </article>
  );
};

export default Derivatives;
