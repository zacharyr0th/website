import React from 'react';
import Image from 'next/image';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'blockchains-in-africa',
  slug: 'blockchains-in-africa',
  title: 'Blockchains in Africa',
  subtitle: 'An Emerging Trend',
  image: '/images/articles/ba-0.webp',
  imageCaption: 'A vibrant African landscape with a Bitcoin symbol encompassing the sun.',
  pageViews: 0,
  type: 'article',
  description:
    "An in-depth exploration of how blockchain technology and cryptocurrencies are being adopted in Africa, discussing the potential benefits, challenges, and implications for the continent's economic future.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: '',
  date: '2023-05-15',
  tags: ['Technology', 'Blockchains'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const BlockchainsInAfrica: React.FC = () => {
  return (
    <article>
      <Image src="/images/articles/ba-0.webp" alt="Blockchains in Africa" />
      <p>
        Blockchain technology is gaining traction in Africa, offering innovative solutions to
        longstanding economic challenges while also presenting new risks and complexities for the
        continent's diverse nations.
      </p>
      <p>"Are blockchains a solution looking for a problem?"</p>
      <p>
        This was the keynote remark made by Ravi Menon, the Managing Director of the Monetary
        Authority of Singapore (MAS). He later clarified his answer and stated that "blockchain
        technology is mostly use-case driven: there is almost always a real problem to be solved."
        Ravi's question above implies a common (mis)perception of cryptocurrency's role in developed
        economies and is a consistent argument made by critics and no-coiners alike - although in
        many cases it has merit. The intellectually honest opinion is that blockchains make more
        sense in some regions and industries than others.
      </p>
      <h2>Africa</h2>
      <p>
        Africa is the cradle of humankind and is a resource-rich, expansive landscape that can fit
        China, India, the USA, and half of Europe's landmass within its boundaries. Roughly 1.5
        billion people live across 54 countries, and it's estimated that 40% of the population is 15
        years old or younger, and the ITU forecasts that 500 million Africans will have smartphones
        by 2025.
      </p>
      <p>
        At this stage, half of the battle of implementing blockchains is educating people on how to
        use them. While the average African may not be acquainted with self-custody or the
        difference between the consensus methods underlying Ethereum and Solana, the average
        American or European isn't either. Africa's young and tech-savvy population has more ability
        and incentive to learn how to utilize blockchains effectively, and a handful of countries
        have already enabled a burgeoning crypto industry to begin.
      </p>
      <p>
        Prominent players like Nigeria and Seychelles, Ethiopia, Ghana, Mauritius, Kenya, Rwanda,
        Sierra Leone, South Africa, and Tanzania have already made inroads or formally declared
        their interest in blockchain and fintech industries. This growing adoption signals that
        blockchains offer novel solutions to longstanding problems in Africa and their potential is
        being recognized by world leaders.
      </p>
      <p>Speaking of Nigeria and Seychelles, check out this graph.</p>
      <Image
        src="/images/articles/ba-1.webp"
        alt="Graph showing the increase in remittances sent via crypto to Africa over the past few years"
      />
      <p>
        Nigeria and Seychelles raised over 50% of all blockchain-based venture capital investments
        on the continent as Africa's YoY VC investment increased by over 1100%. Nigeria is also one
        of the largest oil exporters in the world and has become the wealthiest country in Africa.
        As oil cruises to near all-time highs, Nigeria continues to collect a pretty penny from
        energy-dependent countries like India, China, Europe, and elsewhere in Africa. Nigerian
        millionaires grew by 44% over the past decade, although 60% of the country still lives on
        less than $1 / day.
      </p>
      <h2>Blockchains as a Solution</h2>
      <p>
        Most countries don't have the luxury of managing their currency. Having the ability to put
        money into the system or take it out using the medium of a domestic central bank is an
        underrated superpower. For example, smaller and less affluent European nations are at the
        whim of Christine Lagarde and the European Central Bank (ECB). If the ECB wants to print
        money until eternity, the less powerful nations in the region must deal with the
        consequences.
      </p>
      <p>Here's a video showcasing Christine LaGarde's competency.</p>
      <p>
        While blockchain adoption is moving in the right direction in Nigeria, it's important to
        note that the Nigerian Naira's annual inflation rate accelerated to 16.82% in April of this
        year. That doesn't bode well for individuals or corporations, and unfortunately, more of the
        world than many realize is in a position similar to this.
      </p>
      <h3>Currencies</h3>
      <p>
        Currencies traditionally have acted very similar to languages in that the ones that survive
        only do so with an army and a navy. Bitcoin changed that.
      </p>
      <p>
        Bitcoin, and blockchains at large, offer entirely new frameworks for global payment rails to
        function. Using USD worldwide is doable, but there are plenty of limitations, and USD is
        also experiencing surging inflation rates.
      </p>
      <p>
        Rather than be subject to the volatility of Bitcoin or the more minor domestic currencies
        that stand to be manipulated by outside forces, African countries can take advantage of both
        stable coins and interconnected token networks to expand upon their economic progress.
      </p>
      <h3>Remittances</h3>
      <p>
        African remittances are in a perpetual bull market. The following represents the number of
        remittances sent via crypto to Africa over the past few years.
      </p>
      <Image
        src="/images/articles/ba-2.webp"
        alt="Graph showing the increase in remittances sent via crypto to Africa over the past few years"
      />
      <p>
        If you're unfamiliar with remittances, they're the payments foreign workers send back home
        to their families. The remittance industry is a reasonably dirty one. Average wiring fees of
        7.45% equate to over 27 days of a low-income worker's annual income. In 2017, low and
        middle-income country remittances amounted to $466 billion, and remittance fees were $34.7
        billion. This is not stealing from the rich and giving to the poor; it's quite the opposite.
        To put the absolute dollar value of these fees into perspective, the US's non-military
        foreign aid budget was $34 billion in 2017.
      </p>
      <p>Crypto fixes this.</p>
      <p>
        Using Solana, for example, you can make 1,000,000 transactions for a cost of ~$10. The issue
        is that banks and vendors in your region may not accept crypto, USDC, or other stablecoins.
        This is why crypto infrastructure in Africa must improve to facilitate low-fee remittances
        and benefit from the many other benefits that blockchains enable.
      </p>
      <h3>Debt & Independence</h3>
      <p>
        China recently banned holding and transacting cryptocurrency (although a few dozen Bitcoin
        nodes are active within the country - it's all about who you know) in preparation for their
        own Central Bank Digital Currency (CBDC). What does China have to do with Africa? China is
        Africa's largest creditor.
      </p>
      <Image
        src="/images/articles/ba-3.webp"
        alt="Graph showing China's debt to African countries"
      />
      <p>
        Time is a critical component of China's geopolitical strategies. Over the past few decades,
        there has been extensive investment from Chinese firms in infrastructure projects across the
        African continent. Many resource-rich but financially developing countries cannot pay their
        debts. This can lead to several unintended consequences, such as the Chinese government's
        nationalizing of African public goods.
      </p>
      <p>
        Rather than succumb to the external forces that China can put on less affluent African
        countries, blockchains present an alternative financial system for these countries to
        operate with. Businesses would be able to function globally without friction from Chinese
        authorities, and individuals would be able to self custody access their assets and not need
        to trust third parties.
      </p>
      <h2>Blockchains as a Problem</h2>
      <p>
        Rather than write more examples of how blockchains can help African economies, it's worth
        noting how they can cause and solve problems.
      </p>
      <p>
        El Salvador adopted BTC as a domestic currency in June of 2021, and the results have been
        lackluster. At the time of writing, President Nayib Bukele and the El Salvadorian government
        are down about 30% on their purchase, and citizens are unhappy with the situation.
      </p>
      <p>
        You also need to consider that Nayib "deployed the armed forces and civil police around and
        inside the Legislative Assembly" to "coerce the legislative branch to act on his crime
        bill."
      </p>
      <Image
        src="/images/articles/ba-4.webp"
        alt="El Salvadorian President Nayib Bukele's armed forces"
      />
      <p>
        I'm not saying that this is an authoritarian regime but what walks and sounds like a duck is
        usually a 🦆.
      </p>
      <p>
        Crypto Critics' Corner recorded four interesting podcasts about the situation in El
        Salvador, and all is not well. Those can be found here - 1, 2, 3, 4.
      </p>
      <p>
        The IMF recently downgraded El Salvador's credit rating due to its lack of transparency and
        questionable financial activities surrounding Bitcoin. The rollout of Bitcoin's Lightning
        network has been met with significant resistance from vendors and individuals within the
        country. It simply doesn't make sense for a volatile currency to pay for goods and services
        in a nation where poverty is the norm.
      </p>
      <p>
        Hence, my head-shaking apprehension when I found out that the Central African Republic
        (CAR), ranked 188/189 on the global welfare list, chose to adopt BTC as a domestic currency
        this past April. Only 4% of the CAR population has access to the internet but like many in
        Africa, CAR is resource-rich, so it is a target of commodity-minded governments like China
        and Russia.
      </p>
      <Image
        src="/images/articles/ba-5.webp"
        alt="A vibrant river in the Central African Republic"
      />
      <p>
        Over the past few years, the CAR government has become very close to Putin's regime in
        Russia after decades of internal strife and external influence from France. French analyst
        Thierry Vircoulon told the AFP news agency, "The context, given the systemic corruption and
        a Russian partner facing international sanctions, does encourage suspicion."
      </p>
      <p>
        On the other side of the argument, Economist Yann Daworo told BBC Afrique that businesses
        and individuals "will no longer have to walk around with suitcases of CFA francs that will
        have to be converted into dollars or any other currency to make purchases abroad."
      </p>
      <p>
        As Bitcoin and blockchains are more readily adopted in emerging markets across the globe,
        the need for scalable, transparent, and decentralized networks is more apparent than ever.
      </p>
      <h2>Low Hanging Fruit</h2>
      <p>
        Africa isn't looking to disrupt the mortgage industry by putting real estate on the
        blockchain. There are more fundamental incentives and use cases that are garnering support.
        The low-hanging fruit is to replace volatile domestic currencies with on-chain stable coins
        or other token networks, reduce the influence of foreign interests, and introduce
        transparency in financial governance.
      </p>
      <p>Adoption is happening but it's not going to be easy.</p>
      <p>If it were, it would have already happened.</p>
    </article>
  );
};

export default BlockchainsInAfrica;
