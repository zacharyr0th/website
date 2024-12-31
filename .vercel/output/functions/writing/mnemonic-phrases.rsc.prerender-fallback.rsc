3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","mnemonic-phrases","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","mnemonic-phrases","d"],{"children":["__PAGE__?{\"slug\":\"mnemonic-phrases\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","mnemonic-phrases","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
9:T17db,
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
  Mnemonic phrases are 12-24 word sequences that serve as master keys for cryptocurrency wallets, allowing users to securely access and recover their funds across multiple blockchain networks.
</div>

To comprehend the role of mnemonic phrases, it's important to understand the foundation of cryptographic keys in blockchain technology. This hierarchical structure ensures that a single mnemonic phrase can generate an extensive array of wallet accounts, always producing the same sequence when input.

1. Mnemonic Phrase: The root of the hierarchy
2. Private Keys: Derived from the mnemonic phrase
3. Public Keys: Generated from private keys
4. Wallet Addresses: Derived from public keys

## BIP: Standardizing Mnemonic Phrases

The concept of mnemonic phrases was introduced and standardized through Bitcoin Improvement Proposals (BIPs), specifically BIP39. These proposals have had a lasting impact on the cryptocurrency ecosystem, with many other blockchain networks adopting similar standards, including Ethereum and Solana.

## How Mnemonic Phrases Work

1. Generation: A wallet creates a random sequence of words from a predefined list.
2. Conversion: The phrase is converted into a binary seed through key stretching.
3. Key Derivation: The seed generates the master private and subsequent child keys.
4. Address Creation: Public keys and addresses are derived from these private keys.

- Human-Readable: Easier to record and remember than long strings of characters.
- Versatility: A single phrase can access multiple accounts across various cryptocurrencies.
- Security: Properly stored phrases provide robust protection against unauthorized access.

Physical Storage: Write the phrase on paper or engrave it on metal; avoid digital storage.
Multiple Copies: Store copies in different secure locations to prevent loss.
Confidentiality: Never share your mnemonic phrase with anyone.
Verification: Regularly verify the integrity and readability of your stored phrase.

## Key Components

### Private Keys

A private key is a unique code granting access to a digital wallet containing cryptocurrencies or NFTs. It's comparable to a safety deposit box key or email password. Access is typically through mnemonic phrases or keystore files.

### Public Keys

Public keys are associated with blockchain accounts and digital wallets. They're used as addresses for receiving tokens, similar to email addresses for receiving messages.

## Technical Implementation

### The BIP-39 Process

Entropy – or randomness, is encoded in multiples of 32 bits. A bit is a single unit of information with a value of 1 or 0. The bits are split into groups and are then encoded with a number ranging from 0-2047. These numbers are cross-referenced with a word list, and a mnemonic sentence is born. This sentence is converted into a mnemonic seed phrase using the PBKDF2 hash function, which helps reduce the effectiveness of brute-force attacks. For a more detailed explanation of this process, refer to BIP-39's documentation.

### BIP-32 & BIP-44

Using elliptic curve cryptography, one can calculate a public key without revealing the private key. The single private key can also generate a nearly infinite set of public keys, each accessible by various derivation paths required for a wallet to hold more than one token.

For most users, accessing more than a digital wallet's recommended derivation path is unnecessary. Most wallets' user interfaces either do not require a derivation specification or give users the option to choose which derivation path to access—often with the option to select a recommended path.

Each token has its derivation path. If users were required to access each asset in a multi-asset wallet individually, this could become cumbersome. Instead, BIP-32 introduced the ability of a single private key to unlock more than one public key.

BIP-44 defines the specific hierarchy to use as described by an algorithm detailed in BIP-32. This means that different derivations of a wallet will comply with the following format:

m/purpose'/coin_type'/account'/change/address_index

Hierarchical deterministic wallets are identified with the BIP-44 reference under purpose'.

For example, m/44'/60/' 0'/1’/8′ = The 9th address at change level 1 (addresses begin at 0).

## Final Thoughts

Before BIP-32, burdensome tasks and financially insecure practices regarding digital wallets and derivation paths prevented many people who needed to be computer-savvy from participating.

Once BIP-32, 39, and 44 were widely implemented, users could access nearly a limitless number of digital assets (tokens and NFTs) from one user-friendly mnemonic device. Thank BIP-32, 39, and 44.

## Further Reading

### Core BIP Documentation

- [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) - Hierarchical Deterministic Wallets
- [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#Generating_the_mnemonic) - Mnemonic code for generating deterministic keys
- [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) - Multi-Account Hierarchy for Deterministic Wallets
- [BIP-39 Word Lists](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md)
- [English Word List](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
- [Chinese Word List](https://github.com/bitcoin/bips/blob/master/bip-0039/chinese_simplified.txt)
- [From Mnemonic Phrase to Address](https://blog.mycrypto.com/the-journey-from-mnemonic-phrase-to-address)
- [PBKDF2 Hash Function](https://en.wikipedia.org/wiki/PBKDF2)
- [Brute-force Attacks](https://en.wikipedia.org/wiki/Brute-force_attack)
a:["crypto"]
b:{"src":"/misc/placeholder.webp","alt":"Mnemonic Phrases"}
c:T2866,/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    ol: "ol",
    li: "li",
    h2: "h2",
    ul: "ul",
    h3: "h3",
    a: "a"
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
        children: "Mnemonic phrases are 12-24 word sequences that serve as master keys for cryptocurrency wallets, allowing users to securely access and recover their funds across multiple blockchain networks."
      })
    }), "\n", _jsx(_components.p, {
      children: "To comprehend the role of mnemonic phrases, it's important to understand the foundation of cryptographic keys in blockchain technology. This hierarchical structure ensures that a single mnemonic phrase can generate an extensive array of wallet accounts, always producing the same sequence when input."
    }), "\n", _jsxs(_components.ol, {
      children: ["\n", _jsx(_components.li, {
        children: "Mnemonic Phrase: The root of the hierarchy"
      }), "\n", _jsx(_components.li, {
        children: "Private Keys: Derived from the mnemonic phrase"
      }), "\n", _jsx(_components.li, {
        children: "Public Keys: Generated from private keys"
      }), "\n", _jsx(_components.li, {
        children: "Wallet Addresses: Derived from public keys"
      }), "\n"]
    }), "\n", _jsx(_components.h2, {
      children: "BIP: Standardizing Mnemonic Phrases"
    }), "\n", _jsx(_components.p, {
      children: "The concept of mnemonic phrases was introduced and standardized through Bitcoin Improvement Proposals (BIPs), specifically BIP39. These proposals have had a lasting impact on the cryptocurrency ecosystem, with many other blockchain networks adopting similar standards, including Ethereum and Solana."
    }), "\n", _jsx(_components.h2, {
      children: "How Mnemonic Phrases Work"
    }), "\n", _jsxs(_components.ol, {
      children: ["\n", _jsx(_components.li, {
        children: "Generation: A wallet creates a random sequence of words from a predefined list."
      }), "\n", _jsx(_components.li, {
        children: "Conversion: The phrase is converted into a binary seed through key stretching."
      }), "\n", _jsx(_components.li, {
        children: "Key Derivation: The seed generates the master private and subsequent child keys."
      }), "\n", _jsx(_components.li, {
        children: "Address Creation: Public keys and addresses are derived from these private keys."
      }), "\n"]
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "Human-Readable: Easier to record and remember than long strings of characters."
      }), "\n", _jsx(_components.li, {
        children: "Versatility: A single phrase can access multiple accounts across various cryptocurrencies."
      }), "\n", _jsx(_components.li, {
        children: "Security: Properly stored phrases provide robust protection against unauthorized access."
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "Physical Storage: Write the phrase on paper or engrave it on metal; avoid digital storage.\nMultiple Copies: Store copies in different secure locations to prevent loss.\nConfidentiality: Never share your mnemonic phrase with anyone.\nVerification: Regularly verify the integrity and readability of your stored phrase."
    }), "\n", _jsx(_components.h2, {
      children: "Key Components"
    }), "\n", _jsx(_components.h3, {
      children: "Private Keys"
    }), "\n", _jsx(_components.p, {
      children: "A private key is a unique code granting access to a digital wallet containing cryptocurrencies or NFTs. It's comparable to a safety deposit box key or email password. Access is typically through mnemonic phrases or keystore files."
    }), "\n", _jsx(_components.h3, {
      children: "Public Keys"
    }), "\n", _jsx(_components.p, {
      children: "Public keys are associated with blockchain accounts and digital wallets. They're used as addresses for receiving tokens, similar to email addresses for receiving messages."
    }), "\n", _jsx(_components.h2, {
      children: "Technical Implementation"
    }), "\n", _jsx(_components.h3, {
      children: "The BIP-39 Process"
    }), "\n", _jsx(_components.p, {
      children: "Entropy – or randomness, is encoded in multiples of 32 bits. A bit is a single unit of information with a value of 1 or 0. The bits are split into groups and are then encoded with a number ranging from 0-2047. These numbers are cross-referenced with a word list, and a mnemonic sentence is born. This sentence is converted into a mnemonic seed phrase using the PBKDF2 hash function, which helps reduce the effectiveness of brute-force attacks. For a more detailed explanation of this process, refer to BIP-39's documentation."
    }), "\n", _jsx(_components.h3, {
      children: "BIP-32 & BIP-44"
    }), "\n", _jsx(_components.p, {
      children: "Using elliptic curve cryptography, one can calculate a public key without revealing the private key. The single private key can also generate a nearly infinite set of public keys, each accessible by various derivation paths required for a wallet to hold more than one token."
    }), "\n", _jsx(_components.p, {
      children: "For most users, accessing more than a digital wallet's recommended derivation path is unnecessary. Most wallets' user interfaces either do not require a derivation specification or give users the option to choose which derivation path to access—often with the option to select a recommended path."
    }), "\n", _jsx(_components.p, {
      children: "Each token has its derivation path. If users were required to access each asset in a multi-asset wallet individually, this could become cumbersome. Instead, BIP-32 introduced the ability of a single private key to unlock more than one public key."
    }), "\n", _jsx(_components.p, {
      children: "BIP-44 defines the specific hierarchy to use as described by an algorithm detailed in BIP-32. This means that different derivations of a wallet will comply with the following format:"
    }), "\n", _jsx(_components.p, {
      children: "m/purpose'/coin_type'/account'/change/address_index"
    }), "\n", _jsx(_components.p, {
      children: "Hierarchical deterministic wallets are identified with the BIP-44 reference under purpose'."
    }), "\n", _jsx(_components.p, {
      children: "For example, m/44'/60/' 0'/1’/8′ = The 9th address at change level 1 (addresses begin at 0)."
    }), "\n", _jsx(_components.h2, {
      children: "Final Thoughts"
    }), "\n", _jsx(_components.p, {
      children: "Before BIP-32, burdensome tasks and financially insecure practices regarding digital wallets and derivation paths prevented many people who needed to be computer-savvy from participating."
    }), "\n", _jsx(_components.p, {
      children: "Once BIP-32, 39, and 44 were widely implemented, users could access nearly a limitless number of digital assets (tokens and NFTs) from one user-friendly mnemonic device. Thank BIP-32, 39, and 44."
    }), "\n", _jsx(_components.h2, {
      children: "Further Reading"
    }), "\n", _jsx(_components.h3, {
      children: "Core BIP Documentation"
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.a, {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki",
          children: "BIP-32"
        }), " - Hierarchical Deterministic Wallets"]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.a, {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#Generating_the_mnemonic",
          children: "BIP-39"
        }), " - Mnemonic code for generating deterministic keys"]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.a, {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki",
          children: "BIP-44"
        }), " - Multi-Account Hierarchy for Deterministic Wallets"]
      }), "\n", _jsx(_components.li, {
        children: _jsx(_components.a, {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md",
          children: "BIP-39 Word Lists"
        })
      }), "\n", _jsx(_components.li, {
        children: _jsx(_components.a, {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt",
          children: "English Word List"
        })
      }), "\n", _jsx(_components.li, {
        children: _jsx(_components.a, {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0039/chinese_simplified.txt",
          children: "Chinese Word List"
        })
      }), "\n", _jsx(_components.li, {
        children: _jsx(_components.a, {
          href: "https://blog.mycrypto.com/the-journey-from-mnemonic-phrase-to-address",
          children: "From Mnemonic Phrase to Address"
        })
      }), "\n", _jsx(_components.li, {
        children: _jsx(_components.a, {
          href: "https://en.wikipedia.org/wiki/PBKDF2",
          children: "PBKDF2 Hash Function"
        })
      }), "\n", _jsx(_components.li, {
        children: _jsx(_components.a, {
          href: "https://en.wikipedia.org/wiki/Brute-force_attack",
          children: "Brute-force Attacks"
        })
      }), "\n"]
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
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"mnemonic-phrases","slug":"mnemonic-phrases","title":"Mnemonic Phrases","content":"$9","date":"2024-10-25","link":"/writing/mnemonic-phrases","frontmatter":{"title":"Mnemonic Phrases","date":"2024-10-25","featured":false,"draft":false,"description":"AKA Seed Phrases","tags":["crypto"],"image":{"src":"/misc/placeholder.webp","alt":"Mnemonic Phrases"}},"description":"AKA Seed Phrases","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
