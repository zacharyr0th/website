3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","blockchain-foundations","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","blockchain-foundations","d"],{"children":["__PAGE__?{\"slug\":\"blockchain-foundations\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","blockchain-foundations","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
9:T1ff6,
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

Blockchains are ever-expanding ledgers of transactions that have distinct features and functionalities which differentiate them from traditional computing networks. As a result, they open doors to new ways of doing things and this article explores the foundational knowledge required to understand them from the ground up.

</div>

The impl of a blockchain is for transactions to be Transactions are grouped into blocks and verified by a distributed network of computers that earn money for participating in the verification process. Distributed means that these computers are not governed by any central entity but rather by a widespread collection of individual entities. This network collectively creates a public ledger that can be indexed and searched with extreme detail. Anything that happens on a public blockchain is immediately and immutably a part of the public record.

## Accounts & Wallets

Each account is accessed with a digital wallet. Accounts hold an individual or entity's tokens, which can be freely transferred between wallets and interact with applications that are compatible with the wallet. These applications can be financial or used for gaming, messaging, and virtually anything else.

Unlike traditional markets, blockchains operate all day, so on-chain markets run 24/7, and anyone with a wallet can participate.

## Reducing Counterparty Risk

Consensus methods are the backbone of any blockchain. In the next chapter, we'll explain their work in more detail. They are meant to give disparate network participants the ability to verify the truth without trusting anyone or relying on any centralized entity to act accurately or ethically.

Not wanting to trust a counterparty may sound counterintuitive, but if there is no counterparty, then there is no counterparty risk. If there are no ethics, there is no misbehavior. It's a technical philosophy embodied in the code behind decentralized systems, and it's all possible because of consensus methods.

Consensus methods are algorithms that an incentivized computer network uses to participate in collective transaction verification. The process of how this works varies from method to method.

## Digital Transparency

Specific blockchains (ZEC, MXR, SCRT) are oriented towards privacy, but most are transparent by default. A blockchain scanner can openly search and index every detail of every transaction, as shown below.

You can see that 0.00203928 SOL was transferred from one wallet to another on March 18, 03:21:07 AM +UTC, and the transaction fee was 0.000005 SOL (a fraction of $0.01).

On other blockchains, transaction fees can quickly go into the dozens and hundreds of dollars, depending on network congestion. Using Solana, you can make 1,000,000 trades and only pay ~$10 in transaction fees.

## The Store of Value Narrative

Bitcoin was initially intended to be a peer-to-peer medium of exchange, although its narrative has switched mainly to that of a global store of value. Countries that use their proprietary currency other than the big six (USD—United States Dollar, CAD—Canadian Dollar, EUR—Euro, AUS—Australian Dollar, JPY—Japanese Yen, and GBP—British Pound) are subject to grave risks imposed by the arbiters of the big six.

Rather than hold onto, for example ��� the Turkish Lira or South African Rand and have their spending power decline over time, many have fled to BTC or other cryptocurrencies that enable pseudonymous, secure transfers of value and opportunities for capital appreciation. Bitcoin, for example, increased in value by 6,965,454,545.45% between 2010 and 2021.

Its low was $0.00099, and the all-time high was $$68,958.

## Uncertainty

Financial markets serve many critical economic functions, although they do not always reflect what's happening in the real world. They often aren't. The stock market, for example, is constantly attempting to base prices and valuations on future expectations. To predict future outcomes, you want the least amount of uncertainty involved.

Markets are always searching for certainty.

When outcomes are uncertain – such as when a supply chain crisis, a war, or a pandemic occurs- prices will reflect that. Speculative assets like revenueless tech stocks or purposeless altcoins will reflect uncertainty by having their price spike downwards because there is no more perceived value. Re-pricings will occur, even if it's not immediate. It's easy to forget that asset prices can go down another 99% after dropping by 99%.

## Mimetic Desire

Physical gold bars have historically outperformed most assets during periods of economic strife. As a result, gold has become a haven asset in the eyes of asset managers. It's important to understand that money flows from speculative investments to safe-haven assets doesn't happen automatically. It's a result of trader psychology being influenced by mimetic desire, and it happens slowly, then all at once.

Other than its use in jewelry and select manufacturing, gold is perceived to exist outside of the traditional financial system, although banks are the largest owners of it. Derivatives are constantly used to manipulate its price, so that is a relatively naïve assumption. Below is one of the many headlines detailing big bank baboonery. In this instance, JPM Chase had to pay a $920 million fine.

Source
Even though gold has performed well in the past during times of distress, this rise in value is not based on any fundamental, intrinsic characteristic. Gold is not easy to transport or store, especially at scale. Try moving $1 billion in gold across an ocean. Due to the large number of industry players, gold is a very centralized commodity, and the price will only be appreciated because of a fluctuating extrinsic value. Someone will see that someone else has gold, and they'll want it.

What if everyone thought silver was a better store of value, or tungsten, or rhodium, or zinc… or Bitcoin?

## Bitcoin as Digital Gold

Narratives drive markets as much as fear and uncertainty do. Although gold hasn't been a practical currency in hundreds, if not thousands, of years in most places, big banks, and asset managers still recommend it as a haven asset worthy of 1-5% of a traditional financial nest egg in the off-chance that calamity happens.

The narrative that it stores its value in times of distress is just that – a narrative. It will work until it doesn't. If rarity or scarcity is the argument, there are more scarce assets on this planet that could replace gold if the narrative shifted—Bitcoin is one of them.

As proposed in the white paper, Bitcoin was initially conceived as a peer-to-peer method of exchange. It has since become part of the larger store of value narrative to which gold can attribute its declining relevance, except this time—it's digital. Bitcoin has been referred to as Digital Gold by many investors and mainstream media pundits, partially because that's the most digestible explanation they can come up with for its sucess, and partially because it's true.

## Censorship Resistance

Some blockchains, particularly the privacy ones listed above, are intended to resist censorship. The goal is for anyone to build and use them. There are no credit checks; the only requirement to open a digital wallet is an internet connection.

The reality of censorship resistance in crypto is that some blockchains do a better job than others. The blockchain industry is barely a teenager, and there are many schools of thought regarding how it should operate. Maximalism, tribalism, game theory, and investor bias contribute to a never-ending conversation on which consensus methods and blockchain infrastructure are the most secure and censorship-resistant.
a:["crypto"]
b:{"src":"/misc/placeholder.webp","alt":"Blockchain Foundations"}
c:T29a6,/*@jsxRuntime automatic @jsxImportSource react*/
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
        children: "Blockchains are ever-expanding ledgers of transactions that have distinct features and functionalities which differentiate them from traditional computing networks. As a result, they open doors to new ways of doing things and this article explores the foundational knowledge required to understand them from the ground up."
      })
    }), "\n", _jsx(_components.p, {
      children: "The impl of a blockchain is for transactions to be Transactions are grouped into blocks and verified by a distributed network of computers that earn money for participating in the verification process. Distributed means that these computers are not governed by any central entity but rather by a widespread collection of individual entities. This network collectively creates a public ledger that can be indexed and searched with extreme detail. Anything that happens on a public blockchain is immediately and immutably a part of the public record."
    }), "\n", _jsx(_components.h2, {
      children: "Accounts & Wallets"
    }), "\n", _jsx(_components.p, {
      children: "Each account is accessed with a digital wallet. Accounts hold an individual or entity's tokens, which can be freely transferred between wallets and interact with applications that are compatible with the wallet. These applications can be financial or used for gaming, messaging, and virtually anything else."
    }), "\n", _jsx(_components.p, {
      children: "Unlike traditional markets, blockchains operate all day, so on-chain markets run 24/7, and anyone with a wallet can participate."
    }), "\n", _jsx(_components.h2, {
      children: "Reducing Counterparty Risk"
    }), "\n", _jsx(_components.p, {
      children: "Consensus methods are the backbone of any blockchain. In the next chapter, we'll explain their work in more detail. They are meant to give disparate network participants the ability to verify the truth without trusting anyone or relying on any centralized entity to act accurately or ethically."
    }), "\n", _jsx(_components.p, {
      children: "Not wanting to trust a counterparty may sound counterintuitive, but if there is no counterparty, then there is no counterparty risk. If there are no ethics, there is no misbehavior. It's a technical philosophy embodied in the code behind decentralized systems, and it's all possible because of consensus methods."
    }), "\n", _jsx(_components.p, {
      children: "Consensus methods are algorithms that an incentivized computer network uses to participate in collective transaction verification. The process of how this works varies from method to method."
    }), "\n", _jsx(_components.h2, {
      children: "Digital Transparency"
    }), "\n", _jsx(_components.p, {
      children: "Specific blockchains (ZEC, MXR, SCRT) are oriented towards privacy, but most are transparent by default. A blockchain scanner can openly search and index every detail of every transaction, as shown below."
    }), "\n", _jsx(_components.p, {
      children: "You can see that 0.00203928 SOL was transferred from one wallet to another on March 18, 03:21:07 AM +UTC, and the transaction fee was 0.000005 SOL (a fraction of $0.01)."
    }), "\n", _jsx(_components.p, {
      children: "On other blockchains, transaction fees can quickly go into the dozens and hundreds of dollars, depending on network congestion. Using Solana, you can make 1,000,000 trades and only pay ~$10 in transaction fees."
    }), "\n", _jsx(_components.h2, {
      children: "The Store of Value Narrative"
    }), "\n", _jsx(_components.p, {
      children: "Bitcoin was initially intended to be a peer-to-peer medium of exchange, although its narrative has switched mainly to that of a global store of value. Countries that use their proprietary currency other than the big six (USD—United States Dollar, CAD—Canadian Dollar, EUR—Euro, AUS—Australian Dollar, JPY—Japanese Yen, and GBP—British Pound) are subject to grave risks imposed by the arbiters of the big six."
    }), "\n", _jsx(_components.p, {
      children: "Rather than hold onto, for example ��� the Turkish Lira or South African Rand and have their spending power decline over time, many have fled to BTC or other cryptocurrencies that enable pseudonymous, secure transfers of value and opportunities for capital appreciation. Bitcoin, for example, increased in value by 6,965,454,545.45% between 2010 and 2021."
    }), "\n", _jsx(_components.p, {
      children: "Its low was $0.00099, and the all-time high was $$68,958."
    }), "\n", _jsx(_components.h2, {
      children: "Uncertainty"
    }), "\n", _jsx(_components.p, {
      children: "Financial markets serve many critical economic functions, although they do not always reflect what's happening in the real world. They often aren't. The stock market, for example, is constantly attempting to base prices and valuations on future expectations. To predict future outcomes, you want the least amount of uncertainty involved."
    }), "\n", _jsx(_components.p, {
      children: "Markets are always searching for certainty."
    }), "\n", _jsx(_components.p, {
      children: "When outcomes are uncertain – such as when a supply chain crisis, a war, or a pandemic occurs- prices will reflect that. Speculative assets like revenueless tech stocks or purposeless altcoins will reflect uncertainty by having their price spike downwards because there is no more perceived value. Re-pricings will occur, even if it's not immediate. It's easy to forget that asset prices can go down another 99% after dropping by 99%."
    }), "\n", _jsx(_components.h2, {
      children: "Mimetic Desire"
    }), "\n", _jsx(_components.p, {
      children: "Physical gold bars have historically outperformed most assets during periods of economic strife. As a result, gold has become a haven asset in the eyes of asset managers. It's important to understand that money flows from speculative investments to safe-haven assets doesn't happen automatically. It's a result of trader psychology being influenced by mimetic desire, and it happens slowly, then all at once."
    }), "\n", _jsx(_components.p, {
      children: "Other than its use in jewelry and select manufacturing, gold is perceived to exist outside of the traditional financial system, although banks are the largest owners of it. Derivatives are constantly used to manipulate its price, so that is a relatively naïve assumption. Below is one of the many headlines detailing big bank baboonery. In this instance, JPM Chase had to pay a $920 million fine."
    }), "\n", _jsx(_components.p, {
      children: "Source\nEven though gold has performed well in the past during times of distress, this rise in value is not based on any fundamental, intrinsic characteristic. Gold is not easy to transport or store, especially at scale. Try moving $1 billion in gold across an ocean. Due to the large number of industry players, gold is a very centralized commodity, and the price will only be appreciated because of a fluctuating extrinsic value. Someone will see that someone else has gold, and they'll want it."
    }), "\n", _jsx(_components.p, {
      children: "What if everyone thought silver was a better store of value, or tungsten, or rhodium, or zinc… or Bitcoin?"
    }), "\n", _jsx(_components.h2, {
      children: "Bitcoin as Digital Gold"
    }), "\n", _jsx(_components.p, {
      children: "Narratives drive markets as much as fear and uncertainty do. Although gold hasn't been a practical currency in hundreds, if not thousands, of years in most places, big banks, and asset managers still recommend it as a haven asset worthy of 1-5% of a traditional financial nest egg in the off-chance that calamity happens."
    }), "\n", _jsx(_components.p, {
      children: "The narrative that it stores its value in times of distress is just that – a narrative. It will work until it doesn't. If rarity or scarcity is the argument, there are more scarce assets on this planet that could replace gold if the narrative shifted—Bitcoin is one of them."
    }), "\n", _jsx(_components.p, {
      children: "As proposed in the white paper, Bitcoin was initially conceived as a peer-to-peer method of exchange. It has since become part of the larger store of value narrative to which gold can attribute its declining relevance, except this time—it's digital. Bitcoin has been referred to as Digital Gold by many investors and mainstream media pundits, partially because that's the most digestible explanation they can come up with for its sucess, and partially because it's true."
    }), "\n", _jsx(_components.h2, {
      children: "Censorship Resistance"
    }), "\n", _jsx(_components.p, {
      children: "Some blockchains, particularly the privacy ones listed above, are intended to resist censorship. The goal is for anyone to build and use them. There are no credit checks; the only requirement to open a digital wallet is an internet connection."
    }), "\n", _jsx(_components.p, {
      children: "The reality of censorship resistance in crypto is that some blockchains do a better job than others. The blockchain industry is barely a teenager, and there are many schools of thought regarding how it should operate. Maximalism, tribalism, game theory, and investor bias contribute to a never-ending conversation on which consensus methods and blockchain infrastructure are the most secure and censorship-resistant."
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
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"blockchain-foundations","slug":"blockchain-foundations","title":"Blockchain Foundations","content":"$9","date":"2024-10-25","link":"/writing/blockchain-foundations","frontmatter":{"title":"Blockchain Foundations","date":"2024-10-25","featured":false,"draft":false,"description":"Understanding the Building Blocks","tags":["crypto"],"image":{"src":"/misc/placeholder.webp","alt":"Blockchain Foundations"}},"description":"Understanding the Building Blocks","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
