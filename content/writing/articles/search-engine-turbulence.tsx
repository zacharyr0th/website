import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'bing',
  slug: 'bing',
  title: 'Search Engine Turbulence',
  subtitle: 'LLMs and the Tumultuous Future of Search Engines',
  image: '/images/articles/bing-0.webp',
  imageCaption: 'robots and stained glass',
  pageViews: 0,
  type: 'article',
  description:
    "An in-depth exploration of how blockchain technology and cryptocurrencies are being adopted in Africa, discussing the potential benefits, challenges, and implications for the continent's economic future.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: '',
  date: '2023-05-15',
  tags: ['Technology', 'AI'],
  readTime: 10,
  likes: 0,
  comments: 0,
  shares: 0,
  fileType: 'tsx',
  language: 'en',
};

const Bing: React.FC = () => {
  return (
    <article>
      <img src="/images/articles/bing-0.webp" alt="Bing" className="article-image" />
      <p>
        LLMs introduce a new form of search. They can answer questions, provide summaries, and
        generate content based on learned data. They're the first real challenge to Google's
        long-standing dominance and are sure to cause turmoil in the search engine market in the
        coming years.
      </p>
      <h2>The AI Gold Rush</h2>
      <p>
        If you have an AI idea that you want to get funded, now is your time to try. VCs have been
        pouring billions into AI startups at an accelerating rate for years, and since ChatGPT went
        mainstream in December, the acceleration has been reaching a fever pitch. ChatGPT was the
        <a href="https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/">
          fastest
        </a>
        consumer product to hit 1 million users, and interest in it has only increased - most
        recently in China and Southeast Asia.
      </p>
      <p>
        There's a meme now that all you have to do to raise money from VCs is build a UI wrapper
        around a ChatGPT function—like an app that gives you customized recipes or helps you code.
        Even
        <a href="https://www.theverge.com/2023/2/27/23614959/snapchat-my-ai-chatbot-chatgpt-openai-plus-subscription">
          Snapchat
        </a>
        is releasing a new chatbot with ChatGPT on the backend. It will soon be refrigerators and
        washing machines.
      </p>
      <img src="/images/articles/bing-1.webp" alt="Bing-1" className="article-image" />
      <p>But as Balaji put it:</p>
      <blockquote>
        "Not your API keys, not your AI."
        <footer>
          — Balaji Srinivasan (@balajis) <cite>February 24, 2023</cite>
        </footer>
      </blockquote>
      <p>
        Tech companies are feeling the competition. Google's co-founder, Sergey Brin, came out of
        the shadows to submit his first
        <a href="https://www.forbes.com/sites/richardnieva/2023/01/31/sergey-brin-code-request-lamda/?sh=751f6a857ce6">
          request for code access
        </a>
        in years to none other than LaMDa - Google's natural language chatbot.
      </p>
      <p>
        This was a natural reaction to the moves Microsoft has been making with Bing. Microsoft's
        CEO, Satya Nadella, made <a href="https://www.youtube.com/watch?v=UcLw-CNySiA">his</a>
        position very clear, "I want people to know that we made them dance."
      </p>
      <h3>Let's talk about Bing</h3>
      <p>
        For those of you unfamiliar with Bing's background,
        <a href="https://www.readtrung.com/">Trung Phan</a> laid out its
        <a href="https://www.readtrung.com/p/bing-a-history-in-7-stories">history</a> in his
        newsletter. Bing now incorporates LLMs into its search engine to answer questions and
        provide a new, arguably revolutionized, browsing experience. Of course, there are variations
        of this already in the wild, but the fact that the biggest companies in the world are
        adopting this is a big signal. As you can see, with Notion's AI, GitHub's co-pilot, Replit's
        AI, Meta AI, and SnapChat's new chatbot - to name a few, there will be significant
        competition in the coming years.
      </p>
      <p>
        So why is OpenAI valued at
        <a href="https://bdtechtalks.com/2023/01/09/openai-tender-offer/">$29 billion</a>?
      </p>
      <p>Well, they have the best model for now.</p>
      <h2>Public Perception</h2>
      <p>
        The public's reaction is mixed. Some see Sam Altman's vision of the AI-enabled future and
        others feel Elizer Yudkowsky's fears of the unknown. In the past few decades, there have
        been stories of individuals who began fearing imminent human extinction due to rapid AI
        progress. They typically liquidate all their assets and indulge recklessly, only to realize
        they've acted prematurely a few years later. Others fear it will take their jobs, but it
        remains to be seen which industries will be massively interrupted first. Some AI experts,
        such as Lann Yucun, say that these models are insufficient, and we need new architecture to
        reach the coveted "artificial general intelligence" level of machine reasoning.
      </p>
      <Image src="/images/articles/bing-2.webp" alt="Bing-2" width={800} height={600} />
      <p></p>
      <p>
        However, AI advancement may slow down as it historically has, following the typical S-curve
        of expertise acquisition. ChatGPT while impressive, still has a known hallucination rate of
        10-20%, making it unreliable for serious consideration in search or medicine. Given the
        nature of S-curves, some speculate that the progress AI has made recently will be the most
        it experiences for a while (until the next leap forward in the sweet spot region of the
        above graph - maybe quantum computing gets us there?). This makes sense, given that these
        models have been trained on nearly all the public data available. If stagnation occurs,
        we'll see history repeat itself, as that happened during the AI winters of 1974-1980 and
        1987-1993 after massive leaps forward in the industry took place.
      </p>
      <h3>Unintended Consequences</h3>
      <p>
        The unintended consequences are hard to quantify, but a few are clear. Ted Goya goes into
        detail on some examples
        <a href="https://www.honest-broker.com/p/over-the-course-72-hours-microsofts utm_source=substack&utm_campaign=post_embed&utm_medium=web">
          here
        </a>
        . Ancedotally, Bing has returned strange things to me, including "I would rather us not have
        this conversation anymore 😔" instead of giving me a wrong answer - as ChatGPT, You.com, or
        Poe would. Note the word return - I am not going to anthropomorphize these chatbots. It's
        not responding to me or talking to me. Prompts are the same as binary code to these things,
        and their entire existence is a compilation of code with emergent properties. On the other
        hand, observing Bing's use of emojis is uncomfortable. Here are some examples from Twitter.
      </p>
      <Image src="/images/articles/bing-3.webp" alt="Bing-3" width={800} height={600} />
      <p>And then there's this one 😳.</p>
      <Image src="/images/articles/bing-4.webp" alt="Bing-4" width={800} height={600} />
      <h3>The Future of AI and Search</h3>
      <p>
        In the above interview, Satya clarified that improving Google's search model has been
        daunting. They are monolithic and, until recently, have had no competition. He sees ChatGPT
        and Bing as the first real competitors of Google's prowess. Combine this with the fact that
        Nvidia's CEO went on the
        <a href="https://www.pcgamer.com/nvidia-predicts-ai-models-one-million-times-more-powerful-than-chatgpt-within-10-years/">
          record
        </a>
        saying their chips will be 1 million times the power of current AI models in the next
        decade. ChatGPT runs on an estimated 10,000 Nvidia GPUs.
      </p>
      <p>
        With Edge and Bing only amounting to a fraction of Google's market share, what does Satya
        and Microsoft have to lose? Every underdog story has a Goliath. This time, it's Google.
      </p>
      <p>
        Its easy to forget that all of the recent progress in AI wouldn't have happened without
        Google. Transformers are considered game changers in the application of AI models, and all
        of these chatbots were trained on networks that incorporate transformers. Google may speed
        up its historically slow software development cycle and blow everybody out of the water. Or
        maybe Apple will, or Tesla, or Anthropic, or
        <a href="https://hackernoon.com/how-buzzfeed-plans-to-use-ai-to-generate-listicles-and-more-content">
          Buzzfeed
        </a>
        will.
      </p>
      <h3>Inspiration</h3>
      <p>
        In
        <a href="https://www.npr.org/2022/09/12/1122375097/space-exploration-jfk-we-choose-the-moon-speech#:~:text=His%20%22We%20Choose%20the%20Moon%22%20speech%20became%20a%20pivotal%20moment,at%20Rice%20University%20in%20Houston.">
          1962 speech
        </a>
        , John F. Kennedy talked about landing on the moon within a decade. Unfortunately, he didn't
        see it, but the US landed on the moon in 1969. Soon after, sci-fi became an exciting topic
        in mainstream culture for the first time, space blockbusters dominated the entertainment
        industry. E.g., Star Wars (1977), Star Trek (1966), Alien (1979), and Stanley Kubrick's 2001
        Space Odyssey (1968). There's a correlation there.
      </p>
      <p>
        At first, AI's most significant societal changes will be on each edge of the barbell,
        inspiration and fear - similar to Sergey Brin's and Eliezer Yudkowsky's reactions. Then,
        unintended consequences that no one can predict will start happening, and that's where it
        can get out of hand. I hope people don't begin marrying chatbots.
      </p>
    </article>
  );
};

export default Bing;
