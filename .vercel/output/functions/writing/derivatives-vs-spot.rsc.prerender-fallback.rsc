3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","derivatives-vs-spot","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","derivatives-vs-spot","d"],{"children":["__PAGE__?{\"slug\":\"derivatives-vs-spot\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","derivatives-vs-spot","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
9:T2be5,
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

During Covid times, 'gamma squeezes' became a colloquial term on financial news channels. They represent the phenomenon of dealer positioning (Gary), an inevitable result of how equity markets are structured. In short, a 'gamma squeeze' occurs when the acceleration of upside derivative purchases increases, leading to the purchasing of the underlying by cash-heavy dealers, resulting in exponential rises in price, as seen in Gamestop and AMC. When you buy derivatives that profit on the upside on an asset (going long), a dealer can sell you the derivative (going short) and hedge against that by buying the underlying, which is the asset.

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

<ul>
  <li>
    Having the ability to go long or short an asset:
    <ul>
      <li>Long = You buy the asset and make money when the price goes up</li>
      <li>Short = You sell the asset and make money when the price goes down</li>
    </ul>
  </li>
  <li>
    Understanding market structure:
    <ul>
      <li>Number and size of buyers and sellers</li>
      <li>Competition level and information availability</li>
      <li>Regulatory environment</li>
    </ul>
  </li>
</ul>
a:["trading","crypto"]
b:{"src":"/images/derivatives-0.webp","alt":"Derivatives vs Spot"}
c:T3c10,/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    h2: "h2",
    img: "img",
    h3: "h3"
  }, _provideComponents(), props.components);
  return _jsxs(_Fragment, {
    children: [_jsx("style", {
      jsx: true,
      children: `
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
`
    }), "\n", _jsx("div", {
      class: "tldr-section",
      children: _jsx(_components.p, {
        children: "Derivative markets significantly influence equity prices through market-maker actions. Real asset values differ from notional values due to monetary policy and market mechanics. While crypto markets are less affected by derivatives, they face unique challenges from well capitalized traders, resulting in illiquidity and volatility."
      })
    }), "\n", _jsx(_components.p, {
      children: "The recent S&P 500 futures (/ES) movement presents an interesting case study:"
    }), "\n", _jsxs("ol", {
      className: "list-decimal pl-6 space-y-2",
      children: [_jsx("li", {
        children: "Large traders, reportedly including Carl Icahn, accumulated significant positions in 4050 puts"
      }), _jsx("li", {
        children: "The market declined to precisely 4050 by expiration"
      }), _jsx("li", {
        children: "Subsequently, these traders established new positions in 3950 puts for the following month"
      }), _jsx("li", {
        children: "And sure enough - the market dropped again"
      })]
    }), "\n", _jsx(_components.p, {
      children: "The relationship between large options positions and market movements can appear to be more than coincidental. While it's impossible to definitively prove causation, the mechanics of dealer hedging combined with market psychology create conditions where large derivative positions can significantly influence the price action of spot assets."
    }), "\n", _jsx(_components.p, {
      children: "Why is that? Let's look into it."
    }), "\n", _jsx(_components.h2, {
      children: "Market Structure"
    }), "\n", _jsx(_components.p, {
      children: "One largely overlooked aspect of retail trading is market structure. Predicting when to buy/sell is where billions are made, and having a thorough understanding of the market structure and how big players are positioned, or how big positions are played, is one of the market's most predictive resources."
    }), "\n", _jsx(_components.p, {
      children: "Market Structure encompasses all market characteristics, such as the number and size of buyers and sellers, competition level, information availability, regulatory environment, and the physical and virtual infrastructures where financial instruments are traded. All of which can significantly affect market efficiency, price discovery, and overall price trajectory."
    }), "\n", _jsx(_components.p, {
      children: "During Covid times, 'gamma squeezes' became a colloquial term on financial news channels. They represent the phenomenon of dealer positioning (Gary), an inevitable result of how equity markets are structured. In short, a 'gamma squeeze' occurs when the acceleration of upside derivative purchases increases, leading to the purchasing of the underlying by cash-heavy dealers, resulting in exponential rises in price, as seen in Gamestop and AMC. When you buy derivatives that profit on the upside on an asset (going long), a dealer can sell you the derivative (going short) and hedge against that by buying the underlying, which is the asset."
    }), "\n", _jsx(_components.p, {
      children: "When the acceleration of upside derivative purchases increases, so does the purchasing of the underlying by cash-heavy dealers, resulting in exponential rises in price, as seen in Gamestop and AMC. Monitoring the call or put volume before a gamma squeeze could give actionable insights on how to trade it."
    }), "\n", _jsx(_components.p, {
      children: "This is what a gamma squeeze looks like."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/derivatives-1.webp",
        alt: "Derivatives vs Spot"
      })
    }), "\n", _jsx(_components.h3, {
      children: "Consequences of 1987"
    }), "\n", _jsx(_components.p, {
      children: "How can these dealers be so involved when they impact the market so much? The answer is liquidity. Some market-making dealers are legally obliged to place bids under specific market conditions. This is meant to protect the infrastructure and price stability of the underlying and became standard practice after the 1987 crash, which resulted from an overcrowded trade in portfolio insurance. Some traders like Paul Tudor Jones made a killing by being on the right side of this and once the dust settled, the market nearly went up only until the tech bubble burst in the early 2000s."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/derivatives-2.webp",
        alt: "Derivatives vs Spot"
      })
    }), "\n", _jsx(_components.p, {
      children: "The crash was a technical reaction to how the market was structured. - there was no fundamental change that provoked the price collapse. Simply put, there were not enough market-making firms willing to place a bid on that frightful morning. Regulators deemed that unacceptable, and market makers have since become one of the primary driving forces of global markets - to a fault."
    }), "\n", _jsx(_components.p, {
      children: "The arguably black swan events of 2008 and 2020 were two moments when this market-making backstop failed. In both cases, price conditions were so dire that there seemed to be no buyers left - until the central banks made their money printing intentions clear, as they have time and again."
    }), "\n", _jsx(_components.h2, {
      children: "Notional Value vs. Real Value"
    }), "\n", _jsx(_components.p, {
      children: "Below is a graph of the S&P 500 index (traded as /ES) priced in USD."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/derivatives-3.webp",
        alt: "Derivatives vs Spot"
      })
    }), "\n", _jsx(_components.p, {
      children: "Now compare the index against the Fed's balance sheet."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/derivatives-4.webp",
        alt: "Derivatives vs Spot"
      })
    }), "\n", _jsx(_components.p, {
      children: "As you can see, the value of the index in 2007/2008 was around 0.0016. So for every $1 on the Fed's balance sheet, ~$0.0016 of value existed in the S&P 500 index. Quantitative easing and bank bailouts brought floods of new capital into the system and onto the Fed's balance sheet, pushing the value of the index to the $0.0004/0.0006 territory."
    }), "\n", _jsx(_components.p, {
      children: "The index has not even come close to its previous highs in relative real value. Meanwhile, a steep rise exists in the USD notional value. This leads to the forgone conclusion that each unit of USD is effectively losing its real value over time."
    }), "\n", _jsx(_components.p, {
      children: "In other words, prices are rising. Real value can be measured by a notional value less inflation which results in spending power, but how do we measure inflation? You can listen to what the Fed reports in its CPI numbers, or you can measure your purchases."
    }), "\n", _jsx(_components.h3, {
      children: "Candy is not a Store of Value"
    }), "\n", _jsx(_components.p, {
      children: "| Product                  | 2014 Weight | 2018 Weight | Change |\n| ------------------------ | ----------- | ----------- | ------ |\n| Snickers (4 pack)        | 232g        | 167g        | -28.1% |\n| Toblerone Milk Chocolate | 200g        | 150g        | -25.0% |\n| Twix Twin Bars (4 pack)  | 200g        | 160g        | -20.0% |\n| Kit Kat Chunky           | 48g         | 40g         | -16.7% |"
    }), "\n", _jsx(_components.p, {
      children: "The notional value of these candies has not changed, yet the real value of what you are purchasing has declined substantially. This pattern of decreasing returns and increasing prices is common across many industries, such as education, groceries, commodities, ride-sharing services, and streaming platforms. It is not a specific issue, it's a systemic problem."
    }), "\n", _jsx(_components.p, {
      children: "To be clear, its probably a good thing that we're getting less candy than before but prices should reflect that reality."
    }), "\n", _jsx(_components.h2, {
      children: "Asset Scarcity"
    }), "\n", _jsx(_components.p, {
      children: "Scarcity, physical or digital, has made its way to the front lines of the debate on asset valuation. One thing is certain: the US dollar is not scarce, nor are the derivatives tied to it."
    }), "\n", _jsx(_components.p, {
      children: "According to Visualise Capitalist's research on the world's money supply, the global derivatives markets outside the world's stock markets by a factor of 11."
    }), "\n", _jsx(_components.p, {
      children: "A conservative estimate of the notional value of the world's derivative markets is one quadrillion US dollars."
    }), "\n", _jsx(_components.p, {
      children: "If that estimate is correct, then for every $1 in a stock market, there are $11 in derivatives betting on what that $1 does. These $11 serve a variety of purposes, such as supply-side hedging, but most are cash-settled speculations. These are side-bets, bets on side-bets, and bets on bets on side-bets. Each of these carry their own risk profiles but are ultimately tied to that first $1."
    }), "\n", _jsx(_components.p, {
      children: "The thesis here is the sheer quantity of the value of side bets changes how the initial bet plays out."
    }), "\n", _jsx(_components.p, {
      children: "It's similar to the reflexivity principle discussed by George Soros in his book the Alchemy of Finance (read my review here) or the concept of Gary as described by TV-friendly market maker and fund manager Cem Karsan. GO INTO DETAIL ON GARY HERE AND LINK SQUEEZE PAPER"
    }), "\n", _jsx(_components.h2, {
      children: "Reflexivity: The Observer Effect"
    }), "\n", _jsx(_components.p, {
      children: "Physicists deal with the same issues of reflexivity as financial markets, but in a more fundamental sense — the observer effect."
    }), "\n", _jsx(_components.p, {
      children: "\"In physics, the observer effect is the disturbance of an observed system by the act of observation. This is often the result of instruments that, by necessity, alter the state of what they measure in some manner. A common example is checking the pressure in an automobile tire; this is difficult to do without letting out some air, thus changing the pressure. Similarly, it is not possible to see any object without light hitting the object and causing it to reflect that light. While the effects of observation are often negligible, the object still experiences a change.\""
    }), "\n", _jsx(_components.p, {
      children: "Financial markets are dynamic entities with an infinitely complex combination of observers and their intentions. This observer effect is compounded through the use of derivatives."
    }), "\n", _jsx(_components.h2, {
      children: "Crypto Market Structure"
    }), "\n", _jsx(_components.p, {
      children: "Things are slightly different in crypto."
    }), "\n", _jsx(_components.p, {
      children: "The whales in the equity markets are traditionally risk-averse like endowmnets, pension funds, and even market makers while the whales in crypto are often early adopters playing with house money, emerging funds, or individual traders with a large risk tolerance. I go into more depth on this risk tolerance in Easy Money & Veblen Goods."
    }), "\n", _jsx(_components.p, {
      children: "These dynamics create sustained volatility unmatched in traditional equity markets, aside from perhaps penny stocks or OTC stocks where market caps are small, and majority share owners can, at least temporarily, get away with acting shady to pump or dump prices."
    }), "\n", _jsx(_components.h2, {
      children: "So, which is the real underlying asset?"
    }), "\n", _jsx(_components.p, {
      children: "Its hard to tell and in crypto, it's definitely not clear. Crypto derivatives are relatively niche compared to equity derivatives, and their notional value is far lower. The existence of multiple crypto futures exchanges, funding rates, on-chain activity and other factors muddy the answer."
    }), "\n", _jsx(_components.p, {
      children: "For example, there have been times when Bitcoin futures traded 10% higher on Coinbase than on other exchanges. This doesn't happen to SPX futures on the single exchange (CME), where all /ES futures contracts are traded. Bitcoin's premium has been as high as 20% in South Korea due to restrictions on foreigners trading the South Korean Won — it eventually gets arbitraged out or resets to equilibrium, but that is a non-existent phenomenon in equity markets and shouldn't happen."
    }), "\n", _jsx(_components.p, {
      children: "The lack of standardized futures contracts and the use of many different price oracles in cryptocurrency markets creates a complex and uncorrelated web of price data that has yet to be demonstrated to have the same impact on crypto spot transactions as in traditional markets."
    }), "\n", _jsx(_components.p, {
      children: "As crypto derivatives markets mature, will they become as reflexive as equity markets?"
    }), "\n", _jsxs("ul", {
      children: [_jsxs("li", {
        children: [_jsx(_components.p, {
          children: "Having the ability to go long or short an asset:"
        }), _jsxs("ul", {
          children: [_jsx("li", {
            children: "Long = You buy the asset and make money when the price goes up"
          }), _jsx("li", {
            children: "Short = You sell the asset and make money when the price goes down"
          })]
        })]
      }), _jsxs("li", {
        children: [_jsx(_components.p, {
          children: "Understanding market structure:"
        }), _jsxs("ul", {
          children: [_jsx("li", {
            children: "Number and size of buyers and sellers"
          }), _jsx("li", {
            children: "Competition level and information availability"
          }), _jsx("li", {
            children: "Regulatory environment"
          })]
        })]
      })]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
return {
  default: MDXContent
};
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"derivatives-vs-spot","slug":"derivatives-vs-spot","title":"Derivatives vs Spot","content":"$9","date":"2024-10-25","link":"/writing/derivatives-vs-spot","frontmatter":{"title":"Derivatives vs Spot","date":"2024-10-25","featured":false,"draft":false,"description":"Market Structure & Price Discovery","tags":["trading","crypto"],"image":{"src":"/images/derivatives-0.webp","alt":"Derivatives vs Spot"}},"description":"Market Structure & Price Discovery","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
