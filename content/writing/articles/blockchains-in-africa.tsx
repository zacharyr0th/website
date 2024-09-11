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
        longstanding economic challenges.
      </p>
      <p>"Are blockchains a solution looking for a problem?"</p>
      <p>
        This was the keynote remark made by Ravi Menon, the Managing Director of the Monetary
        Authority of Singapore (MAS). He later clarified his answer and stated, "Blockchain
        technology is mostly use-case driven: there is almost always a real problem to be solved."
      </p>
      <p>
        Ravi's question above implies a common misperception of cryptocurrency's role in developed
        economies and is a consistent argument made by critics and no-coiners alike. 
      </p>
      <h2>Africa</h2>
      <p>
        Africa is a resource-rich, expansive landscape that can fit
        China, India, the USA, and half of Europe's landmass within its boundaries. Roughly 1.5
        billion people live across 54 countries, and it's estimated that 40% of the population is 15
        years old or younger. Its population is expected to grow to 2.5 billion by 2050.
      </p>
      <p>
        Prominent players like Nigeria and Seychelles, Ethiopia, Ghana, Mauritius, Kenya, Rwanda,
        Sierra Leone, South Africa, and Tanzania have already made inroads or formally declared
        their interest in blockchain and fintech industries.
      </p>
      <Image
        src="/images/articles/ba-1.webp"
        alt="Graph showing the increase in remittances sent via crypto to Africa over the past few years"
      />
      <p>
        Nigeria and Seychelles raised over 50% of all blockchain-based venture capital investments
        on the continent as Africa's YoY VC investment increased by 1100%. Nigeria is also one
        of the largest oil exporters in the world and has become the wealthiest country in Africa.
        As oil cruises to near all-time highs, Nigeria collects a pretty penny from
        energy-dependent countries like India, China, and elsewhere in Africa. Nigerian
        millionaires grew by 44% over the past decade, although 60% of the country still lives on
        less than $1 / day. Nigeria is also the 10th largest economy in the world by nominal GDP.
      </p>
      <h2>Blockchains as a Solution</h2>
      <h3>Currencies</h3>
      <p>
        While blockchain adoption is moving in the right direction, it's important to
        note that many currencies in the region are experiencing unacceptable levels of inflation, 
        like the Nigerian Naira, whose annual inflation rate accelerated to 16.82% in April of this
        year. That doesn't bode well for individuals or corporations who simply need to facilitate transactions or save their money.
        Blockchains offer a solution to outsource savings from volatile currencies and unstable banking systems to more stable stores of value 
        like USDC, USDT, and other fiat-backed stablecoins. It also provides a framework for fundraising and investment that is transparent and accessible to all.
      </p>
      <p>
        Currencies traditionally have acted very similar to languages in that the ones that survive
        only do so with an army and a navy. Bitcoin changed that. Bitcoin, and blockchains in general,
        offer new frameworks for global payment rails. Rather than be subject to the volatility of Bitcoin or 
        the more minor domestic currencies that tend to be manipulated by outside forces, African countries can take advantage of both
        stable coins and interconnected token networks to expand upon their economic progress.
      </p>
      <h3>Remittances</h3>
      <p>
        African remittances have nearly been in a perpetual bull market. The following represents the number of
        remittances sent via crypto to Africa over the past few years.
      </p>
      <Image
        src="/images/articles/ba-2.webp"
        alt="Graph showing the increase in remittances sent via crypto to Africa over the past few years"
      />
      <p>
        Remittances are the payments foreign workers send back home to their families. The remittance industry 
        is a fairly dirty one. Average wiring fees are 7.45%, which equates to over 27 days of a low-income worker's 
        annual income. In 2017, low and middle-income country remittances amounted to $466 billion, and 
        remittance fees were $34.7 billion. This is not stealing from the rich and giving to the poor; 
        it's quite the opposite. 
      </p>
      <p>
        To put the dollar value of these fees into perspective, the US's non-military
        foreign aid budget was $34 billion in 2017.
      </p>
      <p>
        Crypto does actually fix this. Using Solana, for example, you can make 1,000,000 transactions for a cost of ~$10. The issue
        is that banks and vendors in your region may not accept crypto, USDC, or other stablecoins.
        This is why crypto infrastructure in Africa must improve to facilitate low-fee remittances
        and benefit from the many other benefits that blockchains enable. 
      </p>
      <h3>Debt & Independence</h3>
      <p>
        China recently banned holding and transacting cryptocurrency in preparation for their
        own Central Bank Digital Currency (CBDC). China is also Africa's largest creditor.
      </p>
      <Image
        src="/images/articles/ba-3.webp"
        alt="Graph showing China's debt to African countries"
      />
      <p>
        Time is a critical component of China's geopolitical strategies. Over the past few decades,
        there has been extensive investment from Chinese firms in infrastructure projects across the
        African continent. Many resource-rich but financially developing countries cannot pay their
        debts and this can lead to several unintended consequences, such as the Chinese government's
        nationalizing of African public goods.
      </p>
      <p>
        The Chinese government has been known to nationalize assets in other countries when they feel 
        that the assets are being used for purposes that are not in the best interests of the Chinese government or its citizens. 
        This has led to concerns about the long-term stability and sovereignty of African countries that have borrowed heavily from
        China.
      </p>
      <p>
        Rather than succumb to the external forces that the Chinese government has put on some of the less affluent African
        countries, blockchains present an alternative financial system for these countries to
        operate with. Businesses can function globally in a permissionless manner, and individuals are able to self-custody their assets 
        and don't need to rely as much on their domestic currency or local banks.
      </p>
      <h2>Blockchains as a Problem</h2>
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
      <Image src="/images/articles/ba-4.webp" alt="El Salvador Scene" />
      <p>
        Crypto Critics' Corner recorded four podcasts about this situation, and it seems all is not well. 
        Those can be found here - 1, 2, 3, 4. The IMF recently downgraded El Salvador's credit rating and 
        the rollout of Bitcoin's Lightning network has been met with significant resistance from vendors and individuals within the
        country.
      </p>
      <p>
        More recently, there was a confusing decision made by the Central African Republic
        (CAR), ranked 188/189 on the global welfare list to adopt BTC as a domestic currency
        this past April. Only 4% of the CAR population has access to the internet, but like many in
        Africa, CAR is resource-rich, so it is a target of commodity-minded governments like China
        and Russia.
      </p>
      <Image src="/images/articles/ba-5.webp" alt="Vibrant river in CAR" />
      <p>
        Over the past few years, the CAR government has become very close to Putin's regime in
        Russia after decades of internal strife and external influence from France. French analyst
        Thierry Vircoulon told the AFP news agency, "The context, given the systemic corruption and
        a Russian partner facing international sanctions, does encourage suspicion."
      </p>
      <p>
        On the other side of the argument, Economist Yann Daworo told BBC Afrique that businesses
        and individuals "will no longer have to walk around with suitcases of CFA francs that will
        have to be converted into dollars or any other currency to purchase abroad."
      </p>
      <h2>Final Thoughts</h2>
      <p>
        As Bitcoin and blockchains are more readily adopted in emerging markets worldwide, the need for scalable, transparent, and decentralized networks is becoming more apparent.
      </p>
      <p>In the meantime, blockchain adoption in Africa is happening.</p>
    </article>
  );
};

export default BlockchainsInAfrica;
