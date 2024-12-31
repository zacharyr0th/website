3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","boson-protocol","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","boson-protocol","d"],{"children":["__PAGE__?{\"slug\":\"boson-protocol\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","boson-protocol","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
9:T2320,
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

Named after an elementary particle described as a force carrier that functions as the 'glue' holding matter together, Boson Protocol has made its mission to build a decentralized commerce ecosystem to disrupt global trade.

</div>

Boson Protocol is a toolset that gives businesses and individuals the control to engage in trustless transactions of physical goods and services using Ethereum as the underlying settlement layer. It enables the tokenization and redemption of physical items through NFTs, the creation of liquid digital markets for these NFTs, and, as a biproduct, the creation of a robust data market.

> "Commerce is a human endeavor that should not have value captured by the few."
>
> — Justin Banon, Boson CEO

The early Internet promised a future of fair and accessible data for all. Instead, market forces favored centralized infrastructure for its profitability. This trend extended to e-commerce, where intermediaries now dominate. These middlemen often exploit user data for profit or fail to utilize it effectively, hindering the potential for a more open and efficient online marketplace.

Web3's infrastructure - public blockchains, NFTs, digital wallets, etc. — has given vendors a level of control that wasn't available a decade ago. You no longer need to rely on these intermediaries to perform commerce functions or pay an arm and a leg to keep track of commerce data.

![Boson Protocol 1](/images/bp-1.webp)

Inspired by trustless and tokenized DeFi communities, Boson Protocol aims to reduce incumbent rent-seeking behavior by creating a decentralized and trustless environment for commerce. The functionality surrounds what are called Commitment tokens, Thing tokens, and the role of the BOSON token.

### Commitment Tokens

A Buyer and Seller commit to exchange digital value for a physical item (a Thing). This commitment is funded & tokenized into an escrow contract built into an NFT. The NFT serves as a voucher to buy or sell an item, so Boson refers to them as NFTVs. The NFT contract has an expiration date and, in essence, acts as a futures contract where the Seller is obliged to deliver the said item(s) listed in the contract at expiration. Commitment Token holders are granted the right to transfer their token to another wallet or reliably and securely redeem the token for a particular Thing.

#### Commitment Tokens Characteristics

1. **Universal** - Can represent any Thing.
2. **Interoperable** - Can represent a standardized version of any Thing.
3. **Composable** - Can be assembled into composite products.
4. **Programmable** - Fully customizable within computing limits.
5. **Transferable / Storable** - Between any standard EVM wallet.
6. **Stateful** - Appropriately change state across the core exchange mechanism process.

The Core Exchange Mechanism governs Commitment Tokens, where the programmed game theory comes into play. Buyers and Sellers sequentially deposit up-front funds, so there are varying levels of skin in the game on both sides of the transaction. The final deposit transfer process is structured to incentivize both parties to behave well.

Using this sequential transaction process, Commitment Tokens can achieve a 'Subgame Perfect Equilibrium,' a concept from game theory. This equilibrium ensures that each transaction step is balanced and fair, reducing the potential for disputes. In simpler terms, it's like a game where each player knows the other players' strategy and has nothing to gain by changing only their strategy, leading to a balanced outcome.

![Boson Protocol 2](/images/bp-2.webp)

The possible game outcomes are the triangles on the right side of the above diagram. CoF stands for Cancel or Fault, which is an undesirable outcome. The most desirable outcome for all parties is 'Redemption; No Complaint; No CoF,' which is the fourth triangle from the top of the diagram. The purpose of programming this game theory into Commitment Tokens is to minimize the number of disputes and arbitration required between Buyers and Sellers, with the hopes of providing a smooth and efficient transaction process.

### Thing Tokens

Thing Tokens, which conform to the standard ERC20 contract, are used to purchase Commitment Tokens. Think of a Thing token as a 'generalized Unisock' and the Commitment Token as an add-on futures contract. Unisocks are a grand experiment in scarcity. There were 500 real pairs of Uniswap merchandise socks tokenized as SOCKs and deposited into a liquidity pool on Uniswap along with their starting value worth of ETH.

Each SOCK token represents the redeemable ownership of 1 pair of socks and is minted with a bonding curve, hence the 11,048.07% increase in price from the original $12. You can either sell the token back to the liquidity pool or redeem it for the physical socks, where the Uniswap company will ship a physical pair to you anywhere in the world.

![Boson Protocol 3](/images/bp-3.webp)

At the time of writing, the price of a single $SOCK token is $132,576.82, and 192 have already been redeemed. Thing tokens are similar. The interoperability and composability of Thing tokens enable them to be fitted or retrofitted into any existing DeFi infrastructure. They are tradable in the same way you can trade SOCKs between different wallets, and they can 'plug' into AMMs (Automated Market Makers) to create liquid digital markets. Their use cases within DeFi include product price discovery on DEXes, yield optimization, and the crowdfunding of non-existent products through ITOs (Initial Thing Offerings).

### Boson Tokens

Incentives are the invisible hand that Adam Smith was talking about. Boson built reward mechanisms within the Thing / Commitment Token relationship to incentivize good behavior by both Buyers and Sellers - but that doesn't tell the whole story. The core objective of the Boson Protocol is to 'maximize the supply of quality redemptions.' In other words, it facilitates successful commerce transactions. To do so, Boson implemented the BOSON token (Bosons) as a monetary reward for actors within the Boson ecosystem who help the protocol reach its objective. Below is a high-level overview of the main stakeholders within the Protocol.

![Boson Protocol 4](/images/bp-4.webp)
![Boson Protocol 5](/images/bp-5.webp)

### Gluons

There's also gluons, which act as quality indicators, encouraging participants to stake more capital for higher-quality items. This system incentivizes market participants to engage in high-quality transactions of high-quality physical goods. Each voucher has a unique derivative called a Gluon that represents the stake of the participant holding the voucher and the associated BOSON reward. Vouchers with higher amounts of Gluons indicate items expected to be higher quality than items with lower amounts of Gluons.

### Applications

Unisocks, unrelated to Boson, is a proof of concept for decentralized commerce of physical goods. While the Boson protocol is built for that, their white paper lists other potential use cases.

1. **Online Commerce**: Decentralized e-commerce platform
2. **M2M-commerce**: Autonomous machine-to-machine transactions
3. **Loyalty & Rewards**: Interoperable, composable reward systems
4. **Gaming**: Physical rewards for in-game achievements
5. **Crypto Exchanges**: Token redemption for physical rewards
6. **Service Bookings**: Permissionless, two-sided deposit bookings
7. **Tokenized Networks**: Token exchange for goods and services

### Scaling

To scale, Boson estimates they will need to handle, on average, ten transactions per second, with peaks potentially being more than 10x that. To do so, they decided to utilize the most battle-tested layer 1 - Ethereum, which handles dozens of transactions per second. Boson raised $36,000,000 and hired teams covering protocol design & architecture, legal, engineering & game theory. After scaling their team to 50+ Boson purchased $700,000+ in digital real estate within Decentraland's Vegas City with the intention of creating Portal, a lifestyle and commerce playground. Portal will enable creators and brands to sell redeemable NFTs for real-world products and services.

![Boson Protocol 8](/images/bp-8.webp)

Now that funds have been raised, the team assembled, and the strategy set, Boson has entered what it calls "hyper blitz scale mode" of development. For a detailed explanation of what hyper-blitz scaling means to Boson, refer to their Roadmap article on Medium. Time will tell if supply chains actually adopt models like this.

Let's hope so.
a:["crypto"]
b:{"src":"/images/boson.webp","alt":"Boson Protocol"}
c:T351f,/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    blockquote: "blockquote",
    img: "img",
    h3: "h3",
    h4: "h4",
    ol: "ol",
    li: "li",
    strong: "strong"
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
        children: "Named after an elementary particle described as a force carrier that functions as the 'glue' holding matter together, Boson Protocol has made its mission to build a decentralized commerce ecosystem to disrupt global trade."
      })
    }), "\n", _jsx(_components.p, {
      children: "Boson Protocol is a toolset that gives businesses and individuals the control to engage in trustless transactions of physical goods and services using Ethereum as the underlying settlement layer. It enables the tokenization and redemption of physical items through NFTs, the creation of liquid digital markets for these NFTs, and, as a biproduct, the creation of a robust data market."
    }), "\n", _jsxs(_components.blockquote, {
      children: ["\n", _jsx(_components.p, {
        children: "\"Commerce is a human endeavor that should not have value captured by the few.\""
      }), "\n", _jsx(_components.p, {
        children: "— Justin Banon, Boson CEO"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "The early Internet promised a future of fair and accessible data for all. Instead, market forces favored centralized infrastructure for its profitability. This trend extended to e-commerce, where intermediaries now dominate. These middlemen often exploit user data for profit or fail to utilize it effectively, hindering the potential for a more open and efficient online marketplace."
    }), "\n", _jsx(_components.p, {
      children: "Web3's infrastructure - public blockchains, NFTs, digital wallets, etc. — has given vendors a level of control that wasn't available a decade ago. You no longer need to rely on these intermediaries to perform commerce functions or pay an arm and a leg to keep track of commerce data."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/bp-1.webp",
        alt: "Boson Protocol 1"
      })
    }), "\n", _jsx(_components.p, {
      children: "Inspired by trustless and tokenized DeFi communities, Boson Protocol aims to reduce incumbent rent-seeking behavior by creating a decentralized and trustless environment for commerce. The functionality surrounds what are called Commitment tokens, Thing tokens, and the role of the BOSON token."
    }), "\n", _jsx(_components.h3, {
      children: "Commitment Tokens"
    }), "\n", _jsx(_components.p, {
      children: "A Buyer and Seller commit to exchange digital value for a physical item (a Thing). This commitment is funded & tokenized into an escrow contract built into an NFT. The NFT serves as a voucher to buy or sell an item, so Boson refers to them as NFTVs. The NFT contract has an expiration date and, in essence, acts as a futures contract where the Seller is obliged to deliver the said item(s) listed in the contract at expiration. Commitment Token holders are granted the right to transfer their token to another wallet or reliably and securely redeem the token for a particular Thing."
    }), "\n", _jsx(_components.h4, {
      children: "Commitment Tokens Characteristics"
    }), "\n", _jsxs(_components.ol, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Universal"
        }), " - Can represent any Thing."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Interoperable"
        }), " - Can represent a standardized version of any Thing."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Composable"
        }), " - Can be assembled into composite products."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Programmable"
        }), " - Fully customizable within computing limits."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Transferable / Storable"
        }), " - Between any standard EVM wallet."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Stateful"
        }), " - Appropriately change state across the core exchange mechanism process."]
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "The Core Exchange Mechanism governs Commitment Tokens, where the programmed game theory comes into play. Buyers and Sellers sequentially deposit up-front funds, so there are varying levels of skin in the game on both sides of the transaction. The final deposit transfer process is structured to incentivize both parties to behave well."
    }), "\n", _jsx(_components.p, {
      children: "Using this sequential transaction process, Commitment Tokens can achieve a 'Subgame Perfect Equilibrium,' a concept from game theory. This equilibrium ensures that each transaction step is balanced and fair, reducing the potential for disputes. In simpler terms, it's like a game where each player knows the other players' strategy and has nothing to gain by changing only their strategy, leading to a balanced outcome."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/bp-2.webp",
        alt: "Boson Protocol 2"
      })
    }), "\n", _jsx(_components.p, {
      children: "The possible game outcomes are the triangles on the right side of the above diagram. CoF stands for Cancel or Fault, which is an undesirable outcome. The most desirable outcome for all parties is 'Redemption; No Complaint; No CoF,' which is the fourth triangle from the top of the diagram. The purpose of programming this game theory into Commitment Tokens is to minimize the number of disputes and arbitration required between Buyers and Sellers, with the hopes of providing a smooth and efficient transaction process."
    }), "\n", _jsx(_components.h3, {
      children: "Thing Tokens"
    }), "\n", _jsx(_components.p, {
      children: "Thing Tokens, which conform to the standard ERC20 contract, are used to purchase Commitment Tokens. Think of a Thing token as a 'generalized Unisock' and the Commitment Token as an add-on futures contract. Unisocks are a grand experiment in scarcity. There were 500 real pairs of Uniswap merchandise socks tokenized as SOCKs and deposited into a liquidity pool on Uniswap along with their starting value worth of ETH."
    }), "\n", _jsx(_components.p, {
      children: "Each SOCK token represents the redeemable ownership of 1 pair of socks and is minted with a bonding curve, hence the 11,048.07% increase in price from the original $12. You can either sell the token back to the liquidity pool or redeem it for the physical socks, where the Uniswap company will ship a physical pair to you anywhere in the world."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/bp-3.webp",
        alt: "Boson Protocol 3"
      })
    }), "\n", _jsx(_components.p, {
      children: "At the time of writing, the price of a single $SOCK token is $132,576.82, and 192 have already been redeemed. Thing tokens are similar. The interoperability and composability of Thing tokens enable them to be fitted or retrofitted into any existing DeFi infrastructure. They are tradable in the same way you can trade SOCKs between different wallets, and they can 'plug' into AMMs (Automated Market Makers) to create liquid digital markets. Their use cases within DeFi include product price discovery on DEXes, yield optimization, and the crowdfunding of non-existent products through ITOs (Initial Thing Offerings)."
    }), "\n", _jsx(_components.h3, {
      children: "Boson Tokens"
    }), "\n", _jsx(_components.p, {
      children: "Incentives are the invisible hand that Adam Smith was talking about. Boson built reward mechanisms within the Thing / Commitment Token relationship to incentivize good behavior by both Buyers and Sellers - but that doesn't tell the whole story. The core objective of the Boson Protocol is to 'maximize the supply of quality redemptions.' In other words, it facilitates successful commerce transactions. To do so, Boson implemented the BOSON token (Bosons) as a monetary reward for actors within the Boson ecosystem who help the protocol reach its objective. Below is a high-level overview of the main stakeholders within the Protocol."
    }), "\n", _jsxs(_components.p, {
      children: [_jsx(_components.img, {
        src: "/images/bp-4.webp",
        alt: "Boson Protocol 4"
      }), "\n", _jsx(_components.img, {
        src: "/images/bp-5.webp",
        alt: "Boson Protocol 5"
      })]
    }), "\n", _jsx(_components.h3, {
      children: "Gluons"
    }), "\n", _jsx(_components.p, {
      children: "There's also gluons, which act as quality indicators, encouraging participants to stake more capital for higher-quality items. This system incentivizes market participants to engage in high-quality transactions of high-quality physical goods. Each voucher has a unique derivative called a Gluon that represents the stake of the participant holding the voucher and the associated BOSON reward. Vouchers with higher amounts of Gluons indicate items expected to be higher quality than items with lower amounts of Gluons."
    }), "\n", _jsx(_components.h3, {
      children: "Applications"
    }), "\n", _jsx(_components.p, {
      children: "Unisocks, unrelated to Boson, is a proof of concept for decentralized commerce of physical goods. While the Boson protocol is built for that, their white paper lists other potential use cases."
    }), "\n", _jsxs(_components.ol, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Online Commerce"
        }), ": Decentralized e-commerce platform"]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "M2M-commerce"
        }), ": Autonomous machine-to-machine transactions"]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Loyalty & Rewards"
        }), ": Interoperable, composable reward systems"]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Gaming"
        }), ": Physical rewards for in-game achievements"]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Crypto Exchanges"
        }), ": Token redemption for physical rewards"]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Service Bookings"
        }), ": Permissionless, two-sided deposit bookings"]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Tokenized Networks"
        }), ": Token exchange for goods and services"]
      }), "\n"]
    }), "\n", _jsx(_components.h3, {
      children: "Scaling"
    }), "\n", _jsx(_components.p, {
      children: "To scale, Boson estimates they will need to handle, on average, ten transactions per second, with peaks potentially being more than 10x that. To do so, they decided to utilize the most battle-tested layer 1 - Ethereum, which handles dozens of transactions per second. Boson raised $36,000,000 and hired teams covering protocol design & architecture, legal, engineering & game theory. After scaling their team to 50+ Boson purchased $700,000+ in digital real estate within Decentraland's Vegas City with the intention of creating Portal, a lifestyle and commerce playground. Portal will enable creators and brands to sell redeemable NFTs for real-world products and services."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/bp-8.webp",
        alt: "Boson Protocol 8"
      })
    }), "\n", _jsx(_components.p, {
      children: "Now that funds have been raised, the team assembled, and the strategy set, Boson has entered what it calls \"hyper blitz scale mode\" of development. For a detailed explanation of what hyper-blitz scaling means to Boson, refer to their Roadmap article on Medium. Time will tell if supply chains actually adopt models like this."
    }), "\n", _jsx(_components.p, {
      children: "Let's hope so."
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
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"boson-protocol","slug":"boson-protocol","title":"Boson Protocol","content":"$9","date":"2024-10-25","link":"/writing/boson-protocol","frontmatter":{"title":"Boson Protocol","date":"2024-10-25","featured":false,"draft":false,"description":"Tackling dEcommerce","tags":["crypto"],"image":{"src":"/images/boson.webp","alt":"Boson Protocol"}},"description":"Tackling dEcommerce","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
