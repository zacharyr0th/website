import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'fundamental-flaw',
  slug: 'fundamental-flaw',
  title: 'The Fundamental Flaw',
  subtitle: 'Onboarding and Offboarding in crypto',
  image: '/images/articles/flaw-0.webp',
  imageCaption: '',
  pageViews: 0,
  type: 'article',
  description:
    'A critical analysis of the main obstacle to blockchain adoption: the difficulties in onboarding and offboarding users. This piece examines the implications for financial sovereignty and the future of decentralized finance.',
  content: '',
  author: 'Zachary Roth',
  date: '2023-05-15',
  tags: ['Blockchain', 'DeFi'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const FundamentalFlaw: React.FC = () => {
  return (
    <article>
      <section>
        <img src="/images/articles/flaw-0.webp" alt="Fundamental Flaw" />
        <p>
          The fundamental flaw in blockchain adoption lies in the challenges of on and off-boarding
          users. The current financial and political infrastructure makes it difficult for people to
          easily enter and exit crypto ecosystems. This limitation, coupled with regulatory hurdles
          and public skepticism, presents a significant barrier to widespread adoption.
        </p>
        <p>Onboarding to and offboarding from a blockchain is challenging for first-time users.</p>
        <p>
          The estimated 30 million developers worldwide are less than 0.5% of the population,
          meaning 99.5% are technically untechnical when it comes to computer science. Blockchains
          are advanced implementations of concepts in advanced computer science categories, so it's
          difficult to explain their safety and utility concerns to untechnical individuals. Even
          technical individuals have their pushback due to ideological differences or disinterest.
        </p>
        <p>But the problems goes deeper than this.</p>
      </section>
      <h3>Onboarding</h3>
      <section>
        <p>
          Many ideas are in progress, but only two well-adopted methods exist for funding a
          blockchain account, using a CEX or a third-party integration. A CEX is a whole can of
          worms and requires a KYCd bank account connected to a KYCd centralized exchange that has
          yet to go under.
        </p>
        <p>
          Third Party examples include companies like Moonpay and Flexa who integrate with CEXes and
          OTC desks to provide users with a quick way to fund their blockchain account. With these
          options come relatively high fees and wide trading spreads. Not to mention the censorship
          built into the flawed and gamable KYC/AML procedures that we all must abide by.
        </p>
        <p>
          I'm not including the option to fund it with another wallet because that wallet would have
          had to be funded via one of the two options above, which has the chicken-and-egg problem.
          Validator/Miner rewards are maybe an exception to this rule but when you offboard you run
          into the same issues listed below that affect everyone else.
        </p>
      </section>
      <section>
        <h3>Offboarding</h3>
        <p>
          Let's say you on boarded correctly and have USDC in a digital wallet. Now you're
          financially free and scouring DeFi Telegram channels with the word 'Ape' in their names to
          find the highest yield for your $asUVNslsBUSDBTC tokens.
        </p>
        <p>
          Non-custodial digital wallets are the same concept as investment or checking accounts.
          This account you just funded is your investment account, and you collateralize your entire
          portfolio to leverage long $doge. Elon goes back on SNL and says you can buy a SpaceX
          rocket with it. Shortly after, $doge's market cap exceeds $btc, and you sell at the top.
          You've 10xd your money, and now, you must withdraw. Once you do your work life will become
          optional. #FIRE
        </p>
        <p>
          If all goes well, you withdraw from your CEX and then to your bank from the CEX. Your bank
          happily accepts the transaction because it feels comfortable working with crypto companies
          like CEXes, given their history of good behavior. They let you spend the gains you made
          and everyone walks hand-in-hand down the yellow-brick road together.
        </p>
        <p>
          Many things can go wrong during the above process, even if everything goes right on-chain.
          The on-chain capital is almost unreal unless you're spending out of your blockchain
          account which is not possible for most purchases yet. Maybe you could get an IRL loan for
          on-chain assets, pseudonymously purchase gift cards, or do an IRL/P2P exchange in a
          crypto-friendly SEZ, but that won't be realistic for most people.
        </p>
      </section>
      <section>
        <h3>Censorship</h3>
        <p>
          If you understand the financial plumbing behind both of the above options, you can
          appreciate how flawed the idea of monetary sovereignty is from a censorship perspective.
          If the US wants to stop 95% of crypto traffic within its borders, it just needs to block
          all bank transactions with centralized exchanges and prevent individuals from transacting
          with vendors like Moonpay and Flexa. That is a significant problem for those who believe
          in the ethos behind blockchain technology, and there is no clear or scalable solution.
        </p>
        <p></p>
        <p>
          In a world where all blockchains are made illegal by the US and others, there will likely
          be fringe blockchain users and governments that are not trying to compete with first-world
          capital controls. This 5% estimate is based on the disproportionate number of technical
          people in the industry - let's say 10x more than most industries - compared to the ~0.05%
          resulting from sampling the general population mentioned above. Blockchains want to be
          like cockroaches, but it's really a case-by-case basis regarding how decentralized they
          are. Its unrealistic to think the technology goes away, but its implementation is not
          clear in the scenarios I'm describing.
        </p>
      </section>
      <section>
        <p>
          The reality is that DeFi's value depends on your location. If you're not one to care about
          self-sovereignty or permissionless markets, can trust your banks, and are not trying to
          speculate, DeFi isn't for you. Currently, the risks far exceed the benefits for people in
          that position. Blockchain products may still be helpful and fun, but they're only
          necessary if your location requires them and you prefer a self-custodial alternative to
          manage your finances - such is the case for many in Argentina, Venezuela, Russia, and
          elsewhere.
        </p>
      </section>
      <section>
        <h2>The Fundamental Flaw</h2>
        <p>
          Blockchains and what they enable are amazing feats of engineering, but the political and
          financial infrastructure surrounding them needs to be improved. A blockchain and
          everything it enables is only as strong as its weakest link, and until further notice, on
          and offboarding is its fatal flaw. Until public sentiment, governmental policies, and
          UX/UI improvements occur (a whole different discussion), it will be difficult to onboard
          the first billion users that everyone talks about on slide 5 of their pitch decks.
        </p>
      </section>
      <section>
        <h3>Ideals</h3>
        <p>
          Blockchains are trying to become economies that are independent from the real world. Banks
          have no control, governments have no control, markets are free, and individuals have
          financial sovereignty. Algo-stable coins work at scale in this world, and there are no
          hacks. But what are the stablecoins stabled to? If its stabled to fiat, is it still an
          independent economy? Is the solution to get rid of stablecoins and have every asset be
          volatile? Is BTC as the reserve asset the only solution? Depends who you ask.
        </p>
      </section>
      <section>
        <h3>Bridging the Gap</h3>
        <p>
          There's a certain level of speculation involved with every cryptocurrency because it is
          more than just a store of value that may be fleeting depending on which cryptocurrency
          we're referring to. It's a technology backed by blockchains whose price follows very
          surface-level factors. Lower-cap coins are manipulated constantly, and due to Bitcoin's
          mainstream popularity, it's roughly correlated to what the Fed says just as every other
          high-beta risk asset is. Blockchains however do offer legitimate solutions, and their
          value is clear to many industries, but it's more than an uphill battle to convince the
          adversaries.
        </p>
        <p>
          Governments are the hardest to convince and many see it as a problem. It's difficult to
          imagine a world where governments want their "users" to access censorship-resistant,
          global, permissionless markets. They probably wish to have everyone use
          <a href="https://www.investopedia.com/terms/c/central-bank-digital-currency-cbdc.asp">
            CBDCs
          </a>
          , and I suspect they will begin banning blockchain activity once they understand it to be
          a trojan horse that removes their power. Non-technical people see blockchains as a
          confusing and largely unnecessary thing killing the planet because they don't know the
          difference between PoS and PoW. No matter the public and policy sentiment, persuading
          anti-blockchain people (no-coiners) is easier done when the listener is technical. Telling
          them that its a distributed database with only read and write properties usually gets
          their gears going.
        </p>
        <p>
          Technical people either see its value, don't see it due to not understanding the broader
          macroeconomic and philosophic context, or need more time to know how to make money off it
          - aka AI engineers. Either way, they are the minority.
        </p>
      </section>
    </article>
  );
};

export default FundamentalFlaw;
