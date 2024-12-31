3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","perpetual-futures","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","perpetual-futures","d"],{"children":["__PAGE__?{\"slug\":\"perpetual-futures\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","perpetual-futures","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
9:T1847,
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
  <li>
    Having the ability to go long or short an asset:
    <ul>
      <li>Long = You buy the asset and make money when the price goes up</li>
      <li>Short = You sell the asset and make money when the price goes down</li>
      <li>When shorting, you are selling X at Y price with the intention of buying back at a lower price of Y-Z</li>
      <li>Shorting requires borrowing money, secured by collateral in your account</li>
    </ul>
  </li>
  <li>
    Traders can utilize leverage for capital efficiency:
    <ul>
      <li>When done successfully, leverage trading can yield much higher returns</li>
      <li>Can easily lead to blown accounts for inexperienced traders</li>
    </ul>
  </li>
  <li>
    Traders can hedge effectively:
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
a:["crypto","trading"]
b:{"src":"/misc/placeholder.webp","alt":"Perpetual Futures"}
c:T2238,/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    h2: "h2"
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
        children: "Perpetual futures are derivative contracts with no expiration date. They track an underlying asset's price through funding rates, where traders pay or receive fees to maintain the price peg. These contracts are secured by collateral and settled directly on a blockchain."
      })
    }), "\n", _jsx(_components.h2, {
      children: "Introduction"
    }), "\n", _jsx(_components.p, {
      children: "Perpetual futures contracts are derivatives. Derivatives are tradable financial instruments that fluctuate in value as a real-time response to an underlying asset's price changes. A trade of the underlying asset itself would be referred to as a spot trade. This underlying asset could be anything that has a verifiable price feed."
    }), "\n", _jsx(_components.p, {
      children: "For some perspective, there are estimated to be a few hundred trillion dollars worth of assets in the world and a few quadrillion dollars worth of derivatives."
    }), "\n", _jsx(_components.p, {
      children: "Standard futures contracts have a set expiration and settlement date. Technically, futures contracts are legally binding documents that ensure the delivery of an asset at a specific price on a specific date. The asset being delivered at expiration could be physical or it could be a cash exchange. Most futures contracts are closed out and cashed out for difference before they reach expiration as only a small portion of traders are looking for physical delivery."
    }), "\n", _jsx(_components.p, {
      children: "When you trade a stock, a market maker is usually providing liquidity for you to trade. There are issues with this as market makers have a large influence on prices. When you trade futures, the exchange itself is the only counterparty. They will settle the trade and either deposit winnings into your account or take losses out of it."
    }), "\n", _jsx(_components.p, {
      children: "It is important to understand that futures contracts are leveraged positions. Every time you are making a futures trade, you are borrowing money to do so. Your wins and your losses will be amplified by the amount of leverage you utilize."
    }), "\n", _jsx(_components.h2, {
      children: "Benefits of Using Futures"
    }), "\n", _jsxs("ul", {
      children: [_jsxs("li", {
        children: [_jsx(_components.p, {
          children: "Having the ability to go long or short an asset:"
        }), _jsxs("ul", {
          children: [_jsx("li", {
            children: "Long = You buy the asset and make money when the price goes up"
          }), _jsx("li", {
            children: "Short = You sell the asset and make money when the price goes down"
          }), _jsx("li", {
            children: "When shorting, you are selling X at Y price with the intention of buying back at a lower price of Y-Z"
          }), _jsx("li", {
            children: "Shorting requires borrowing money, secured by collateral in your account"
          })]
        })]
      }), _jsxs("li", {
        children: [_jsx(_components.p, {
          children: "Traders can utilize leverage for capital efficiency:"
        }), _jsxs("ul", {
          children: [_jsx("li", {
            children: "When done successfully, leverage trading can yield much higher returns"
          }), _jsx("li", {
            children: "Can easily lead to blown accounts for inexperienced traders"
          })]
        })]
      }), _jsxs("li", {
        children: [_jsx(_components.p, {
          children: "Traders can hedge effectively:"
        }), _jsxs("ul", {
          children: [_jsx("li", {
            children: "Example: Long 10 SOL but expect short-term decline? Open a short futures position"
          }), _jsx("li", {
            children: "For delta neutral: Use 10 SOL as collateral to short 10 SOL"
          })]
        })]
      })]
    }), "\n", _jsx(_components.h2, {
      children: "Perpetual Futures Contracts"
    }), "\n", _jsx(_components.p, {
      children: "A perpetual futures contract (a perp) is essentially the same as a standard futures contract except there is no expiration date. If a position is opened, it can be held in perpetuity unless the price goes so far in the opposite direction that the position is liquidated."
    }), "\n", _jsx(_components.p, {
      children: "Liquidations, which also exist in standard futures, are when your position is automatically closed and the money you used to open it is lost. This occurs when the ratio of how much money you used as collateral falls below the amount of money needed to maintain your position."
    }), "\n", _jsx(_components.p, {
      children: "All of these details are emphasized in most futures trading interfaces like the one below. You will usually see a liquidation value meaning if the price were to get to that point, your position would be liquidated."
    }), "\n", _jsx(_components.h2, {
      children: "Funding Rates"
    }), "\n", _jsx(_components.p, {
      children: "As mentioned above, futures contracts move in tandem with the spot price of an asset. This spot price is just the open market price. In order for this peg to be maintained, a funding rate is implemented. Funding rates are fees that are paid from one side of a trade to another. For example, if the futures contract is worth less than the spot price, then short positions will pay long positions a fee and vice versa."
    }), "\n", _jsx(_components.p, {
      children: "As prices go up, it becomes more expensive to hold a long position and the same goes for short positions when prices go down. Because of this, it is more advantageous for traders trying to take a long-term futures position to use standard futures as there are no funding fees."
    }), "\n", _jsx(_components.p, {
      children: "As you can see in the chart above, funding rates often follow the price of an asset but it is not always a leading indicator. It is possible to trade perps with the intention of profiting off of the funding rates and many traders attempt to do so."
    }), "\n", _jsx(_components.h2, {
      children: "Futures in DeFi"
    }), "\n", _jsx(_components.p, {
      children: "Although the majority of perp trading takes place on CEXes like Deribit, Binance, and FTX, perp trading has been a feature of DeFi for some time now. Dydx is an on-chain derivative exchange on Ethereum that has significant volume and there are now a number of protocols on Solana that enable perp trading – namely Mango Market, Zeta Markets, and Drift Protocol."
    }), "\n", _jsx(_components.p, {
      children: "Solana is the world’s highest-performing blockchain. It can withstand more volume than any other blockchain while still maintaining its security, transparency, and speed. The combination of speed and low fees make Solana the perfect environment for futures trading of all kinds, in particular high-frequency trading."
    }), "\n", _jsx(_components.h2, {
      children: "Conclusion"
    }), "\n", _jsx(_components.p, {
      children: "Perps are a relatively new financial instrument that gives traders the ability to easily open leveraged positions and maintain them indefinitely. It is important to understand the differences between perpetual futures and standard futures as there are pros and cons to each depending on what you are trying to do."
    }), "\n", _jsx(_components.p, {
      children: "For a more thorough understanding of how you can utilize futures using your Solflare wallet, check out this guide on How to Trade Perps using Mango."
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
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"perpetual-futures","slug":"perpetual-futures","title":"Perpetual Futures","content":"$9","date":"2024-10-25","link":"/writing/perpetual-futures","frontmatter":{"title":"Perpetual Futures","date":"2024-10-25","featured":false,"draft":false,"description":"A New Financial Primitive","tags":["crypto","trading"],"image":{"src":"/misc/placeholder.webp","alt":"Perpetual Futures"}},"description":"A New Financial Primitive","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
