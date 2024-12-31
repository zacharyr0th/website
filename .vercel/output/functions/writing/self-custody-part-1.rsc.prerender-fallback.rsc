3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","self-custody-part-1","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","self-custody-part-1","d"],{"children":["__PAGE__?{\"slug\":\"self-custody-part-1\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","self-custody-part-1","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
9:T1ee9,
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

</div>

# Introduction to Non-Custodial Wallets

Non-custodial wallets are digital wallets like private bank accounts built into a blockchain. They consist of three primary mechanisms: public keys, private keys, and mnemonics. Your wallet can connect to crypto applications like Solrise and Magic Eden.

## Benefits of Non-Custodial Wallets

The short answer:
Traditional custodial methods for asset management require at least one counterparty, like a bank. A non-custodial wallet enables you to custody your assets without any counterparty.

The long answer:
Decentralized networks only make sense if access to their assets is also decentralized. If blockchains operated in a decentralized fashion while wallets operated using centralized counterparties, many of the benefits of using a blockchain would vanish.

## Real-World Use Case: Remittances

Non-custodial wallets enable digital economies to exist in unprecedented ways. Their significance can be difficult to convey, so let's start with a tangible, real-world example.

When migrant workers acquire a visa to work in foreign countries and send money back to their family's home, they send what's called a remittance. This is usually done through Western Union or a large bank with branches worldwide.

Low-income country remittances amounted to $466 billion in 2017. Globally, fees averaged 7.45%, or $34.7 billion. $7.45% equates to over 27 days of an average worker's annual income, meaning low-income migrant workers spent 27 days' worth of their 2017 salary to send money back home. To put the absolute dollar value of these fees into perspective, the US's non-military foreign aid budget in 2017 was $34 billion.

Non-custodial wallets present an alternative solution by enabling permissionless, global capital transfers. If blockchains or blockchain wallets were custodial, the counterparty could stop transactions from happening and require all remittances to be paid through Western Union. Foreign workers are already taking advantage of the low-cost and open nature of cryptocurrencies, and it's one of the most influential and socially impactful use cases for the technology we've seen to date.

## Understanding the Technical Components

Public and private key cryptography, which is particularly complex, makes non-custodial wallets possible. Like using the internet today, you won't need to understand what's happening under the hood to secure custody of your assets.

Account abstraction tooling is in the works but for now, you'll need to understand the basics – public, private, and mnemonics.

### Public Keys

Public keys are wallet addresses. Think of them as your email address. You can send emails to any email address at any time. In the same way, you can send digital assets to any wallet's address at any time – as long as the blockchain you're on is not compromised.

A public key on Ethereum: 0x47bb4cCA98FC49B971d86c5t26562c86E6284CeD

Public keys are intimidating if you're new to them, but you can copy and paste them when necessary. This one-time copy and pasting is recommended in crypto, as copying and pasting a private key or mnemonic can result in a hacker obtaining it.

Each character of the wallet address, aka public key, is connected to your private key, and if you send digital assets to the wrong wallet address, you will likely be unable to recover them. Wallet designers are continually addressing this issue. If these long alphanumerics are overly intimidating, there's always the option to utilize a custodial wallet at a centralized crypto exchange (like FTX or Coinbase) rather than a non-custodial one (like Solflare or Metamask).

Many wallets have built-in address books, so you won't need to copy and paste a public key every time. Most mainstream crypto exchanges also support this feature. The primary risk of utilizing a non-custodial wallet is either losing your private key or mnemonic/recovery phrase or stealing it. It is crucial to keep a copy of each of those written down and stored safely. Some people etch it into fireproof, "bullet-proof" steel.

Don't take a video for social media and accidentally leave your phrase visible in the background. Don't click on any suspicious-looking links—they could be phishing attempts that drain your wallet. This happened to Seth Green, who played Dr. Evil's son in the Austin Powers movie trilogy.

Also, don't take screenshots of your recovery phrase or private key. Your photos are likely automatically uploaded to iCloud or Google Photos and are subject to risk and seizure by your cloud computing service or federal authorities.

### Private Keys

Private keys are more complex to describe than public ones. A private key is an alphanumeric string of characters that gives you access to your wallet.

Think of a private key as a randomly generated password for a specific account that you access with a master password technology like WordPress or Last Pass. The master password, in this case, would be your mnemonic phrase.

A private key on Ethereum looks like E9883D79C6D87DC0FB6A5778633389F4253213303DA61F20BD47FC233AA332623.

You won't need to remember your private key and will likely never need to use it directly unless you're a developer. However, access to your private key (via your recovery phrase) is necessary to access your funds.

### Mnemonics / Recovery Phrases / Seed Phrases

A private key allows you to sign transactions for a single wallet account. Recovery phrases, however, give you access to an infinite number of private keys. New wallets can be added to one mnemonic's purview by being imported or generated within the intended wallet's user interface.

Mnemonics serve two primary purposes:

They offer a more human-readable format than a private key, making importing a wallet account into a wallet application easier.
You can derive multiple private keys from a single mnemonic phrase, allowing you to create various wallet accounts for different use cases.

In short, your mnemonic gives you access to your private key, which gives you access to your funds. From the user's perspective, Mnemonics / Recovery Phrases / Seed Phrases are the most essential aspects of a wallet. They are the human-readable sequences of words that give you access to your private keys and, thus, your capital. The words are generally in English, although there are many languages wallet providers can choose to implement.

A public key can easily be calculated from a private key; however, computing the private key from a public key is impossible. Most people are blissfully unaware of their private key(s), which is fine … as long as they are painfully aware of their mnemonic.

A mnemonic phrase looks like this:

dog house safe board room chair table desk computer space flower rain

To be clear, a mnemonic is not a private key, although if someone were to obtain either your mnemonic or your private key, your digital assets would be compromised.

## The Future of Wallet Technology

Crypto's adoption and accessibility metrics are similar to those of the early internet. Initially, things were overly complicated for the average individual, and generalists ruled the land. To use the internet, you had to know what you were doing. In today's modern internet, you barely need to see what you are doing.

Although the Internet initially had massive technical learning curves, once protocols were standardized and the average adult understood how to operate it, it took over.
a:["crypto"]
b:{"src":"/misc/placeholder.webp","alt":"Self Custody: Part 1"}
c:T29b2,/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
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
      class: "tldr-section"
    }), "\n", _jsx(_components.h1, {
      children: "Introduction to Non-Custodial Wallets"
    }), "\n", _jsx(_components.p, {
      children: "Non-custodial wallets are digital wallets like private bank accounts built into a blockchain. They consist of three primary mechanisms: public keys, private keys, and mnemonics. Your wallet can connect to crypto applications like Solrise and Magic Eden."
    }), "\n", _jsx(_components.h2, {
      children: "Benefits of Non-Custodial Wallets"
    }), "\n", _jsx(_components.p, {
      children: "The short answer:\nTraditional custodial methods for asset management require at least one counterparty, like a bank. A non-custodial wallet enables you to custody your assets without any counterparty."
    }), "\n", _jsx(_components.p, {
      children: "The long answer:\nDecentralized networks only make sense if access to their assets is also decentralized. If blockchains operated in a decentralized fashion while wallets operated using centralized counterparties, many of the benefits of using a blockchain would vanish."
    }), "\n", _jsx(_components.h2, {
      children: "Real-World Use Case: Remittances"
    }), "\n", _jsx(_components.p, {
      children: "Non-custodial wallets enable digital economies to exist in unprecedented ways. Their significance can be difficult to convey, so let's start with a tangible, real-world example."
    }), "\n", _jsx(_components.p, {
      children: "When migrant workers acquire a visa to work in foreign countries and send money back to their family's home, they send what's called a remittance. This is usually done through Western Union or a large bank with branches worldwide."
    }), "\n", _jsx(_components.p, {
      children: "Low-income country remittances amounted to $466 billion in 2017. Globally, fees averaged 7.45%, or $34.7 billion. $7.45% equates to over 27 days of an average worker's annual income, meaning low-income migrant workers spent 27 days' worth of their 2017 salary to send money back home. To put the absolute dollar value of these fees into perspective, the US's non-military foreign aid budget in 2017 was $34 billion."
    }), "\n", _jsx(_components.p, {
      children: "Non-custodial wallets present an alternative solution by enabling permissionless, global capital transfers. If blockchains or blockchain wallets were custodial, the counterparty could stop transactions from happening and require all remittances to be paid through Western Union. Foreign workers are already taking advantage of the low-cost and open nature of cryptocurrencies, and it's one of the most influential and socially impactful use cases for the technology we've seen to date."
    }), "\n", _jsx(_components.h2, {
      children: "Understanding the Technical Components"
    }), "\n", _jsx(_components.p, {
      children: "Public and private key cryptography, which is particularly complex, makes non-custodial wallets possible. Like using the internet today, you won't need to understand what's happening under the hood to secure custody of your assets."
    }), "\n", _jsx(_components.p, {
      children: "Account abstraction tooling is in the works but for now, you'll need to understand the basics – public, private, and mnemonics."
    }), "\n", _jsx(_components.h3, {
      children: "Public Keys"
    }), "\n", _jsx(_components.p, {
      children: "Public keys are wallet addresses. Think of them as your email address. You can send emails to any email address at any time. In the same way, you can send digital assets to any wallet's address at any time – as long as the blockchain you're on is not compromised."
    }), "\n", _jsx(_components.p, {
      children: "A public key on Ethereum: 0x47bb4cCA98FC49B971d86c5t26562c86E6284CeD"
    }), "\n", _jsx(_components.p, {
      children: "Public keys are intimidating if you're new to them, but you can copy and paste them when necessary. This one-time copy and pasting is recommended in crypto, as copying and pasting a private key or mnemonic can result in a hacker obtaining it."
    }), "\n", _jsx(_components.p, {
      children: "Each character of the wallet address, aka public key, is connected to your private key, and if you send digital assets to the wrong wallet address, you will likely be unable to recover them. Wallet designers are continually addressing this issue. If these long alphanumerics are overly intimidating, there's always the option to utilize a custodial wallet at a centralized crypto exchange (like FTX or Coinbase) rather than a non-custodial one (like Solflare or Metamask)."
    }), "\n", _jsx(_components.p, {
      children: "Many wallets have built-in address books, so you won't need to copy and paste a public key every time. Most mainstream crypto exchanges also support this feature. The primary risk of utilizing a non-custodial wallet is either losing your private key or mnemonic/recovery phrase or stealing it. It is crucial to keep a copy of each of those written down and stored safely. Some people etch it into fireproof, \"bullet-proof\" steel."
    }), "\n", _jsx(_components.p, {
      children: "Don't take a video for social media and accidentally leave your phrase visible in the background. Don't click on any suspicious-looking links—they could be phishing attempts that drain your wallet. This happened to Seth Green, who played Dr. Evil's son in the Austin Powers movie trilogy."
    }), "\n", _jsx(_components.p, {
      children: "Also, don't take screenshots of your recovery phrase or private key. Your photos are likely automatically uploaded to iCloud or Google Photos and are subject to risk and seizure by your cloud computing service or federal authorities."
    }), "\n", _jsx(_components.h3, {
      children: "Private Keys"
    }), "\n", _jsx(_components.p, {
      children: "Private keys are more complex to describe than public ones. A private key is an alphanumeric string of characters that gives you access to your wallet."
    }), "\n", _jsx(_components.p, {
      children: "Think of a private key as a randomly generated password for a specific account that you access with a master password technology like WordPress or Last Pass. The master password, in this case, would be your mnemonic phrase."
    }), "\n", _jsx(_components.p, {
      children: "A private key on Ethereum looks like E9883D79C6D87DC0FB6A5778633389F4253213303DA61F20BD47FC233AA332623."
    }), "\n", _jsx(_components.p, {
      children: "You won't need to remember your private key and will likely never need to use it directly unless you're a developer. However, access to your private key (via your recovery phrase) is necessary to access your funds."
    }), "\n", _jsx(_components.h3, {
      children: "Mnemonics / Recovery Phrases / Seed Phrases"
    }), "\n", _jsx(_components.p, {
      children: "A private key allows you to sign transactions for a single wallet account. Recovery phrases, however, give you access to an infinite number of private keys. New wallets can be added to one mnemonic's purview by being imported or generated within the intended wallet's user interface."
    }), "\n", _jsx(_components.p, {
      children: "Mnemonics serve two primary purposes:"
    }), "\n", _jsx(_components.p, {
      children: "They offer a more human-readable format than a private key, making importing a wallet account into a wallet application easier.\nYou can derive multiple private keys from a single mnemonic phrase, allowing you to create various wallet accounts for different use cases."
    }), "\n", _jsx(_components.p, {
      children: "In short, your mnemonic gives you access to your private key, which gives you access to your funds. From the user's perspective, Mnemonics / Recovery Phrases / Seed Phrases are the most essential aspects of a wallet. They are the human-readable sequences of words that give you access to your private keys and, thus, your capital. The words are generally in English, although there are many languages wallet providers can choose to implement."
    }), "\n", _jsx(_components.p, {
      children: "A public key can easily be calculated from a private key; however, computing the private key from a public key is impossible. Most people are blissfully unaware of their private key(s), which is fine … as long as they are painfully aware of their mnemonic."
    }), "\n", _jsx(_components.p, {
      children: "A mnemonic phrase looks like this:"
    }), "\n", _jsx(_components.p, {
      children: "dog house safe board room chair table desk computer space flower rain"
    }), "\n", _jsx(_components.p, {
      children: "To be clear, a mnemonic is not a private key, although if someone were to obtain either your mnemonic or your private key, your digital assets would be compromised."
    }), "\n", _jsx(_components.h2, {
      children: "The Future of Wallet Technology"
    }), "\n", _jsx(_components.p, {
      children: "Crypto's adoption and accessibility metrics are similar to those of the early internet. Initially, things were overly complicated for the average individual, and generalists ruled the land. To use the internet, you had to know what you were doing. In today's modern internet, you barely need to see what you are doing."
    }), "\n", _jsx(_components.p, {
      children: "Although the Internet initially had massive technical learning curves, once protocols were standardized and the average adult understood how to operate it, it took over."
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
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"self-custody-part-1","slug":"self-custody-part-1","title":"Self Custody: Part 1","content":"$9","date":"2024-10-25","link":"/writing/self-custody-part-1","frontmatter":{"title":"Self Custody: Part 1","date":"2024-10-25","featured":false,"draft":false,"description":"More Power, More Responsibility","tags":["crypto"],"image":{"src":"/misc/placeholder.webp","alt":"Self Custody: Part 1"}},"description":"More Power, More Responsibility","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
