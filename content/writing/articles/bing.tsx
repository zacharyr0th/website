import React from 'react';
import { ContentItem } from '../../../lib/types';

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
        LLMs introduce a new form of search. They can answer questions, provide summaries, and even
        generate content based off of learned data. They're the first real challenge to the
        long-standing dominance of Google search, and there's sure to be a lot of turmoil in the
        search engine market in the coming years.
      </p>
      <h2>The AI Gold Rush</h2>
      <p>
        If you have an AI idea that you want to get funded, now is your time to try. VCs have been
        pouring billions into AI startups for years at an accelerating rate, and since ChatGPT went
        mainstream in December, the acceleration has been reaching a fever pitch. ChatGPT was the
        <a href="https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/">
          {' '}
          fastest
        </a>{' '}
        consumer product to hit 1 million users, and interest in it has only increased - most
        recently in China and Southeast Asia.
      </p>
      <p>
        There's a meme now that all you have to do to raise money from VCs is build a UI wrapper
        around a ChatGPT function - like an app to give you customized recipes or help you code.
        Even{' '}
        <a href="https://www.theverge.com/2023/2/27/23614959/snapchat-my-ai-chatbot-chatgpt-openai-plus-subscription">
          Snapchat
        </a>{' '}
        is releasing a new chatbot with ChatGPT on the backend. Pretty soon it will be refrigerators
        and washing machines.
      </p>
      <img src="/images/articles/bing-1.webp" alt="Bing-1" className="article-image" />
      <p>But as Balaji put it:</p>
      <blockquote>
        "Not your API keys, not your AI."
        <footer>
          — Balaji Srinivasan (@balajis) <cite>February 24, 2023</cite>
        </footer>
      </blockquote>
      <h3>The Battle of the Tech Giants: Satya vs. Sergey</h3>
      <p>
        Companies are feeling the competition. Google's co-founder, Sergey Brin, came out of the
        shadows of his private islands and submitted his first{' '}
        <a href="https://www.forbes.com/sites/richardnieva/2023/01/31/sergey-brin-code-request-lamda/?sh=751f6a857ce6">
          changelist
        </a>{' '}
        (request for code access) in years to none other than LaMDa - Google's natural language
        chatbot.
      </p>
      <p>
        This was a natural reaction to the moves Microsoft has been making with Bing. As Microsoft's
        CEO, Satya Nadella, made <a href="https://www.youtube.com/watch?v=UcLw-CNySiA">this</a> very
        clear, "I want people to know that we made them dance."
      </p>
      <h3>Let's talk about Bing</h3>
      <p>
        For those of you unfamiliar with Bing's background,{' '}
        <a href="https://www.readtrung.com/">Trung Phan</a> laid out its{' '}
        <a href="https://www.readtrung.com/p/bing-a-history-in-7-stories">history</a> in his
        newsletter. Bing now incorporates variations of the technology used in ChatGPT, LLMs and
        other AI models, to answer users' questions and provide a new, arguably revolutionized,
        browsing experience. Of course, there are variations of this already in the wild - the most
        interesting alternative being You.com, which has been incorporating a chat search feature
        for months.As you can see with Notion's AI, GitHub's co-pilot, Replit's AI, Meta AI, and
        SnapChat's new chatbot - to name a few, there will be a lot of competition in this industry.
        <p>
          So why is OpenAI valued at{' '}
          <a href="https://bdtechtalks.com/2023/01/09/openai-tender-offer/">$29 billion</a>?
        </p>
        <p>Let's not get into that.</p>
      </p>
      <h2>Public Perception and Potential Pitfalls</h2>
      <p>
        There are stories of AI fearing individuals who begin fearing imminent human extinction due
        to rapid AI progress and proceed to hastily liquidate all their assets and indulge
        recklessly, only to realize they've acted prematurely. Others are saying it's valid to bomb
        the data centers to prevent the AI from learning too much. Others are saying that everything
        relevant that can be learned by these models has been and that there will need to be a
        completely new architecture to actually reach the coveted "artificial general intelligence"
        level of machine reasoning.
      </p>
      <p>
        However, AI advancement may slow down as it historically has following the typical S-curve
        of expertise acquisition. ChatGPT, while impressive, still has a known hallucination rate of
        10-20%, making it unreliable for serious consideration in search or medicine. Given the
        nature of S-curves, some speculate that the progress AI has made recently will be the most
        it experiences for a while (until the next leap forward in the sweet spot region of the
        above graph - maybe quantum computing gets us there?). If this stagnation occurs, it will be
        a repeat of what happened during the AI winters of 1974-1980 and 1987-1993 - booms and busts
        in both technological advancement and investment. Right now, we're in a boom. Will it end
        differently this time?
      </p>
      <img src="/images/articles/bing-2.webp" alt="Bing-2" className="article-image" />
      <h3>Unintended Consequences</h3>
      <p>
        The unintended consequences of this are hard to quantify, but there are a few that are
        clear. Ted Goya goes into detail on a few examples{' '}
        <a href="https://www.honest-broker.com/p/over-the-course-72-hours-microsofts?utm_source=substack&utm_campaign=post_embed&utm_medium=web">
          here
        </a>
        . Bing has returned strange things to me like "I would rather us not have this conversation
        anymore 😔" instead of giving me a wrong answer - as ChatGPT, You.com, or Poe would. Note
        the word return - I am not going to anthropomorphize these chatbots. It's not responding to
        me or talking to me. Prompts are the same as binary code to these things, and I view their
        entire existence as a simple function with emergent properties. On another note, I am
        creeped out by Bing's use of Emojis - look at the screenshot below. It was taken from this
        thread made by Juan Cambeiro.
      </p>
      <img src="/images/articles/bing-3.webp" alt="Bing-3" className="article-image" />
      <p></p>
      <p>And then there's this one 😳.</p>
      <img src="/images/articles/bing-4.webp" alt="Bing-4" className="article-image" />
      <h3>The Future of AI and Search</h3>
      <p>
        In the above interview, Satya made it clear that improving Google's search model has been
        daunting. They are monolithic and, until recently, have had no competition. He sees ChatGPT
        and Bing as the first real competitor to Google's prowess. Combine this with the fact that
        Nvidia's CEO went on the{' '}
        <a href="https://www.pcgamer.com/nvidia-predicts-ai-models-one-million-times-more-powerful-than-chatgpt-within-10-years/">
          record
        </a>{' '}
        to say that their chips will be 1 million x the power of current AI models in the next
        decade. ChatGPT runs on an estimated 10,000 Nvidia GPUs. Things could get dicey for Google
        if this is true. Satya directly called Google out and will have billions spent competing
        with them.
      </p>
      <p>
        With Edge and Bing only amounting to a fraction of Google's market share, what do he and
        Microsoft have to lose? Every good underdog story has a Goliath. This time, it's Google.
      </p>
      <p>
        Although, one could argue all of the recent progress in AI wouldn't have happened without
        Google. Transformers are considered game changers in the application of AI models, and all
        of these chatbots were trained on networks that incorporate transformers… and Google's
        research department is where the{' '}
        <a href="https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)">
          transformer
        </a>{' '}
        was first developed). Google may speed up its historically slow software development cycle
        and blow everybody out of the water. Or maybe Apple will, or Tesla, or Anthropic, or{' '}
        <a href="https://hackernoon.com/how-buzzfeed-plans-to-use-ai-to-generate-listicles-and-more-content">
          Buzzfeed
        </a>
        ?
      </p>{' '}
      <p></p>
      <h3>Inspiration</h3>
      <p>
        In{' '}
        <a href="https://www.npr.org/2022/09/12/1122375097/space-exploration-jfk-we-choose-the-moon-speech#:~:text=His%20%22We%20Choose%20the%20Moon%22%20speech%20became%20a%20pivotal%20moment,at%20Rice%20University%20in%20Houston.">
          1962
        </a>
        , Kennedy talked about landing on the moon within a decade. Unfortunately, he didn't get to
        see it, but the US landed on the moon in 1969. Then, all of a sudden, Sci-Fi became an
        exciting topic in mainstream culture, and space blockbuster after space blockbuster was
        produced in Hollywood. You start hearing about Star Wars this and Star Trek that and Alien
        this and Stanley Kubrick's 2001 Space Odyssey that, etc. UFOs are suddenly spotted all over
        the US, and STEM subjects become the academic system's focal point.
      </p>
      <p>
        The generation before the moon landing probably thought about space less than the generation
        after it. The same will be the case with AI because of the radical changes that will take
        place in our day to day lives. At first, the most significant societal changes will be
        inspiration or fear - similar to Sergey Brin's and Elizier Yudkowsky's reactions. Then
        unintended consequences that no one can predict will start happening for better or worse. I
        hope people don't start marrying chatbots.
      </p>
    </article>
  );
};

export default Bing;
