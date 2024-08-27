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
  readTime: 12,
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
          users. The current financial and political infrastructure makes it difficult for most
          people to easily enter and exit crypto ecosystems. This limitation, coupled with
          regulatory hurdles and public skepticism, presents a significant barrier to widespread
          adoption.
        </p>
        <p>
          Goldman unofficially became Gary Gensler's prefix once he made an estimated between high 8
          and low 9{' '}
          <a href="https://news.bloomberglaw.com/securities-law/biden-sec-nominee-gary-gensler-worth-as-much-as-119-million">
            figures
          </a>{' '}
          at Goldman Sachs before former US President Clinton nominated him as the Assistant
          Secretary of the Treasury. Over the past few months, Gary Gensler has been cracking down
          on a few seemingly{' '}
          <a href="https://www.justice.gov/usao-edny/pr/founder-and-majority-owner-bitzlato-cryptocurrency-exchange-charged-unlicensed-money">
            inconsequential
          </a>{' '}
          crypto events. He missed out on becoming an iconic fiduciary figure by preventing a spot
          bitcoin ETF and by not preventing{' '}
          <a href="https://www.foxbusiness.com/markets/sec-chairman-gary-gensler-met-with-head-ftx-months-before-collapse">
            FTX's
          </a>{' '}
          collapse because he was too busy fining Kim Kardashian for an{' '}
          <a href="https://www.vox.com/recode/2022/10/3/23384955/kim-kardashian-crypto-ethereum-max-emax-sec">
            Instagram post
          </a>
          . Meanwhile, more{' '}
          <a href="https://www.forbes.com/sites/kenrapoza/2022/11/20/ftx-failure-reminds-investors-crypto-investor-protection-does-not-exist/?sh=2e8965b51210">
            voices
          </a>{' '}
          are beginning to argue that the SEC is failing to fulfill its investor protection mandate.
        </p>
        <p>
          Kim reportedly earned only a few hundred thousand dollars from that post, yet faced a
          $1.26 million fine, which was later{' '}
          <a href="https://decrypt.co/116734/kim-kardashian-floyd-mayweather-ethereummax-lawsuit-dismissed">
            rescinded
          </a>
          . She regularly makes a million{' '}
          <a href="https://www.instyle.com/kim-kardashian-north-west-cher-dionne-clueless-halloween-8385018">
            per post
          </a>{' '}
          for other endorsements, so it was a questionable display by the SEC. Gary Gensler then
          bragged about it on his{' '}
          <a href="https://x.com/GaryGensler/status/1576897535427448832?lang=en">Twitter</a>, and
          only a few months later, Sam Bankman Fried checked off the box on a document, declaring
          that FTX's bankruptcy was in the ballpark of $10 - $50{' '}
          <a href="https://www.pymnts.com/cryptocurrency/2022/ftx-us-and-alameda-research-each-have-liabilities-of-10b-to-50b/">
            billion
          </a>
          . It's easy to point out the flawed actions of a controversial government figure, but a
          more significant issue looms over the blockchain industry that doesn't have clear
          solutions.
        </p>
      </section>

      <section>
        <h2>On and Off Ramps</h2>

        <h3>Onboarding</h3>
        <p>
          Onboarding to a blockchain is challenging for first-time users. An estimated 30 million
          developers worldwide are less than 0.5% of the population, meaning 99.5% are technically
          untechnical in computer science. Blockchains are advanced implementations of concepts in
          advanced computer science categories, so it's difficult to explain their safety and
          utility concerns to untechnical individuals. Even technical individuals have their
          pushback due to ideological differences or disinterest. But the problem goes deeper than
          this.
        </p>
      </section>

      <section>
        <p>
          Many ideas are in progress, but only two well-adopted methods exist for funding a
          blockchain account, using a CEX or a third-party integration. A CEX is a whole can of
          worms and requires a KYCd bank account connected to a KYCd centralized exchange (that has
          yet to go under). Third Party examples include companies like Moonpay and Flexa who
          integrate with CEXes and OTC desks to provide users With a quick way to fund their
          blockchain account. With these options come relatively high fees and poor trading spreads.
          Not to mention the censorship built into the flawed and gamable KYC/AML procedures that we
          all must abide by. I'm not including the option to fund it with another wallet because
          that wallet would have had to be funded via one of the two options above, which has the
          chicken-and-egg problem. Validator/Miner rewards are maybe an exception to this rule but
          when you offboard you run into the same issues listed below that affect everyone else.
        </p>
      </section>

      <section>
        <h3>Offboarding</h3>
        <p>
          Let's say you on boarded correctly and have USDC in a digital wallet. Now you're
          financially free and scouring DeFi Telegram channels with the word 'Ape' in their names to
          find the highest yield for your $asUVNslsBUSDBTC tokens. Non-custodial digital wallets are
          the same concept as investment or checking accounts. This account you just funded is your
          investment account, and you collateralize your entire portfolio to leverage long $doge.
          Elon goes back on SNL and says you can buy a SpaceX rocket with it. Shortly after, $doge's
          market cap exceeds $btc, and you sell at the top. You've 10xd your money, and now, you
          must withdraw. Once you do your work life will become optional. #FIRE
        </p>
        <p>
          If all goes well, you withdraw from your CEX and then to your bank from the CEX. Your bank
          happily accepts the transaction because it feels comfortable working with crypto companies
          like CEXes, given their history of good behavior. They let you spend the gains you made
          and everyone walks hand-in-hand down the yellow-brick road together.
        </p>
        <p>
          {' '}
          Many things can go wrong during the above process, even if everything goes right on-chain.
          The on-chain capital is almost unreal unless you're spending out of your blockchain
          account (not possible for most purchases yet) or the value it represents is in your bank
          account. Maybe you could get an IRL loan for on-chain assets, pseudonymously purchase gift
          cards, or do an IRL/P2P exchange in a crypto-friendly SEZ, but that won't be realistic for
          most people.
        </p>
      </section>

      <section>
        <h2>Censorship</h2>
        <p>
          If you understand the financial plumbing behind both of the above options, you can
          appreciate how flawed the idea of monetary sovereignty is from a censorship perspective.
          If the US wants to stop 95% of crypto traffic within its borders, it just needs to block
          all bank transactions with centralized exchanges and prevent individuals from transacting
          with vendors like Moonpay and Flexa. That is a significant problem for those who believe
          in the ethos behind blockchain technology, and there is no clear or scalable solution.
        </p>
        <p>
          In a world where all blockchains are made illegal by the US and others, there will likely
          be fringe blockchain users and governments that are not trying to compete with first-world
          capital controls. This 5% estimate is based on the disproportionate number of technical
          people in the industry - let's say 10x more than most industries - compared to the ~0.05%
          resulting from sampling the general population mentioned above. Blockchains want to be
          like cockroaches, but it's really a case-by-case basis regarding how decentralized they
          are. Its unrealistic to think the technology goes away, but adoption is another issue
          entirely.
        </p>
      </section>

      <section>
        <p>
          The reality is that DeFi's value depends on your location. If you're not one to care about
          self-sovereignty or permissionless markets, can trust your banks, and are not trying to
          speculate, DeFi isn't for you. Currently, the risks far exceed the benefits for people in
          that position. Blockchain products may still be helpful and fun, but they're only
          necessary if your location requires them and you need a self-custodial alternative to
          manage your finances - such is the case in Argentina, Venezuela, Russia, and elsewhere.
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
          the first billion users that everyone talks about in their pitch decks.
        </p>
      </section>

      <section>
        <h2>Ideals</h2>
        <p>
          Blockchains are trying to become economies that are independent from the real world. Banks
          have no control, governments have no control, markets are free, and individuals have
          financial sovereignty. Algo-stable coins work at scale in this world, and there are no
          hacks. But what are the stablecoins stabled to? There are either algo-stables stabled to
          fiat (is it still an independent economy?) or centralized stables (also stabled to fiat)
          that can be shut down or go insolvent at any moment. More fail points. Is the solution to
          get rid of stablecoins and have every asset be volatile? No, without stablecoins, it's
          unclear where crypto would be.
        </p>
      </section>

      <section>
        <h2>Bridging the Gap</h2>
        <p>
          There's a certain level of speculation involved with every cryptocurrency because it is
          more than just a store of value that may be fleeting depending on which cryptocurrency
          we're referring to. It's a technology backed by blockchains whose price follows very
          surface-level factors. Lower-cap coins are manipulated constantly, and due to Bitcoin's
          mainstream popularity, it's roughly as correlated to what the Fed says, just as every
          other high-beta risk asset is. Blockchains offer legitimate solutions, and their value is
          clear to many industries, but it's more than an uphill battle to convince adversaries.
        </p>
        <p>
          Governments are the hardest to convince and many see it as a problem. It's difficult to
          imagine a world where governments want their "users" to access censorship-resistant,
          global, permissionless markets. They probably wish to have everyone use CBDCs, and I
          suspect they will begin banning blockchain activity once they understand it to be a trojan
          horse that removes their power. Non-technical people see blockchains as a confusing and
          largely unnecessary thing killing the planet because they don't know the difference
          between PoS and PoW. No matter the public and policy sentiment, persuading anti-blockchain
          people (no-coiners) is easier done when the listener is technical. Telling them that its a
          distributed database with only read and write properties usually gets their gears going.
        </p>
        <p>
          Technical people either see its value, don't see it (usually due to not understanding the
          broader macroeconomic and philosophic context), or need more time to know how to make
          money off it (AI engineers). Either way, they are the minority.
        </p>
      </section>
    </article>
  );
};

export default FundamentalFlaw;
