import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'are-derivatives-the-real-underlying-asset',
  slug: 'are-derivatives-the-real-underlying-asset',
  title: 'Are derivatives the real underlying asset?',
  subtitle: 'Exploring the influence of derivatives on market dynamics',
  image: '/placeholder.webp',
  imageCaption: "A visual representation of the complex world of derivatives trading",
  pageViews: 0,
  type: 'article',
  description: "An in-depth analysis of how derivatives markets impact the underlying assets and overall market structure.",
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: '', 
  date: '2023-02-21',
  tags: ['Finance'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
} 

const AreDerivativesTheRealUnderlyingAsset: React.FC = () => {
  return (
    <article>
      <p>Carl Icahn and some deep-pocketed traders supposedly bought lots of 4050 puts when /ES was floating between 4150-4200 the other day. Well, /ES dropped to 4050 the day the puts expired.</p>

      <p>Then it became known that the same trader(s) bought 3950 puts that expire next month. The market doesn't seem to go up when big players are positioned for it to go down.</p>

      <p>Why is that? Are they just hedging larger long positions? Are they taking advantage of option flows and the influential affects of dealer positioning?</p>

      <p>Let's look into it.</p>

      <h2>Market Structure</h2>
      <p>Market Structure encompasses all characteristics of a market such as the number and size of buyers and sellers, competition level, information availability, regulatory environment, and the physical and virtual infrastructures where financial instruments are traded. All of which can significantly affect market efficiency, price discovery, and overall price trajectory.</p>

      <p>During Covid times, gamma squeezes became a colloquial term on financial news channels. They represent the phenomenon of dealer positioning (Gary), an inevitable result of how equity markets are structured. In short, when you buy derivatives that profit on the upside on an asset (going long), a dealer can sell you the derivative (going short) and hedge against that by buying the underlying, which is the asset that the derivative is using to base its value on.</p>

      <p>When the acceleration of upside derivative purchases increases, so does the purchasing of the underlying by cash-heavy dealers, resulting in exponential rises in price as seen in Gamestop and AMC. Monitoring the call or put volume prior to a gamma squeeze could give actionable insights on how to trade it.</p>

      <h2>Consequences of 1987</h2>
      <p>How can these dealers be so involved if they impact the market so much? The answer is liquidity. Some of these market-making dealers are legally obliged to place bids under specific market conditions. This is meant to protect the infrastructure and price stability of the underlying and became standard practice after the 1987 crash which resulted from an overcrowded trade in portfolio insurance.</p>

      <p>The crash was a technical reaction to how the market was structured - there was no fundamental change that provoked the price collapse. Simply put, there were not enough market-making firms willing to place a bid on that frightful morning. Regulators deemed that unacceptable and market makers have since become one of the primary driving forces of global markets.</p>

      <p>The arguably black swan events of 2008 and 2020 were two moments in time where this market-making backstop failed. In both cases, price conditions were so dire that there seemed to be no buyers left - until the central banks made their money printing intentions clear.</p>

      <h2>Notional Value vs. Real Value</h2>
      <p>The S&P 500 index (traded as /ES) priced in USD has essentially been up only since 2009 when quantitative easing measures began taking place. However, when compared against the Fed's balance sheet, a different picture emerges.</p>

      <p>The value of the index in 2007/2008 was around 0.0016. So for every $1 on the Fed's balance sheet, there existed ~$0.0016 of value in the S&P 500 index. Quantitative easing and bank bailouts brought floods of new capital into the system and onto the Fed's balance sheet, pushing the value of the index to the $0.0004/0.0006 territory.</p>

      <p>The index has not even come close to its previous highs in relative real value. Meanwhile, in USD notional value, there exists a precipitous rise. This leads to the forgone conclusion that each unit of USD is effectively losing its real value.</p>

      <h2>Asset Scarcity</h2>
      <p>Scarcity, physical or digital, has made its way to the front lines of the debate on asset valuation. One thing is certain; the US dollar is not scarce, and neither are the derivatives tied to it.</p>

      <p>According to Visualist Capitalist' research on the world's money supply, the global derivatives markets outsize the world's stock markets by a factor of 11. A modest estimate of the world's derivatives is $1,000,000,000,000,000. One quadrillion US dollars.</p>

      <p>If that estimate is correct, then for every $1 in a stock market, there are $11 in derivatives. These $11 serve a variety of purposes such as supply-side hedging but most are cash-settled speculations. These are side-bets, bets on side-bets, and bets on bets on side-bets. The sheer quantity of the value of side bets changes how the initial bet plays out.</p>

      <h2>The Observer Effect</h2>
      <p>Physicists deal with the same issues of reflexivity as financial markets, but in a more fundamental sense — the observer effect. In physics, the observer effect is the disturbance of an observed system by the act of observation. This is often the result of instruments that, by necessity, alter the state of what they measure in some manner.</p>

      <p>Financial markets are dynamic entities with infinitely complex combinations of observers and their intentions. This observer effect is compounded through the use of derivatives.</p>

      <h2>Conclusion</h2>
      <p>The influence of derivatives on market dynamics is undeniable. While they were originally designed as tools for hedging and risk management, their sheer volume and the way they're traded have transformed them into a force that can significantly impact the underlying assets.</p>

      <p>As we've seen with examples like the gamma squeezes and the impact of large option trades, derivatives can sometimes drive the market more than the fundamentals of the underlying assets. This raises important questions about market efficiency and the true nature of price discovery in modern financial markets.</p>

      <p>However, it's crucial to remember that derivatives also provide essential functions in our financial system, including risk management and price discovery. The key lies in understanding their impact and ensuring that regulatory frameworks keep pace with the evolving market structure.</p>

      <p>As investors and market participants, being aware of these dynamics can provide valuable insights into market movements and potentially inform more effective trading and investment strategies.</p>
    </article>
  );
};

export default AreDerivativesTheRealUnderlyingAsset;