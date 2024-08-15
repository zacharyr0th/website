import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'playlist-ai',
  slug: 'playlist-ai',
  title: 'Playlist AI',
  subtitle: 'Facilitating Music Discovery with AI-Orchestrated Playlists',
  image: '/images/interviews/playlist-0.webp',
  imageCaption: 'PlaylistAI app interface',
  pageViews: 0,
  type: 'interview',
  description: 'An interview with Brett Bauman, creator of PlaylistAI, discussing the app\'s features, development challenges, and the future of AI in music curation.',
  author: 'Zachary Roth',
  bookAuthor: 'Brett Bauman',
  date: '2023-03-03',
  tags: ['Music', 'Technology', 'AI', 'Startups'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  content: '',
  language: 'en',
};

const PlaylistAIInterview: React.FC = () => {
  return (
    <article>

      <img src="/images/interviews/playlist-0.webp" alt="PlaylistAI app interface" />
      <p> </p>

      <section>
        <p>
          The evolution of computing was the main driver of financial growth in the 1990s and the
          vision of a new, more open world aligned with the creation of the world wide web. Along with
          increasing the efficiency of everything, the internet gave creators the ability to
          independently connect with a global audience for the first time.
        </p>
        <p>
          This series, Building in Public, introduces builders who can quickly ship and execute their
          ideas in the public sphere. These creators interact with users and iterate on their products
          in real time using resources and infrastructure available to anyone.
        </p>
      </section>

      <section>
        <h3>Introducing PlaylistAI</h3>
        <p>
          PlaylistAI is a free app with a premium option that uses AI technology to create personalized
          playlists on Spotify and Apple Music. You can input AI prompts, images, videos, or your
          most-listened-to tracks to generate unique playlists that reflect your taste. The app
          seamlessly integrates with your Spotify or Apple Music profile, so you can access your custom
          playlists as soon as they're generated.
        </p>
      </section>

      <section>
        <h3>Interview with Brett Bauman, Creator of PlaylistAI</h3>
        
        <h4>Background and Experience</h4>
        <p><strong>Zach:</strong> Hi Brett. Let's start with your background. What's your experience with programming, AI, and product development?</p>
        <p><strong>Brett:</strong> I studied Computer Science at Arizona State University where I first started making apps for fun. Since then I've been an iOS developer in my day job, but I've always liked making apps on the side. PlaylistAI got started last year as a side project and I've been expanding on it since then.</p>

        <h4>PlaylistAI Overview</h4>
        <p><strong>Zach:</strong> Can you give us an overview of the PlaylistAI and its unique features?</p>
        <p><strong>Brett:</strong> Sure. PlaylistAI is an enhancement on top of your music streaming service for people who are unhappy with the music recommendations that their streaming platform is providing them. Instead of being fed a list of playlists to choose from, the premiere feature lets you instantly create your own by prompting PlaylistAI with something like "popular hip-hop music from the early 2000's" or "music similar to the artists Drake and SZA". There are other ways to make playlists and discover music as well, like making a playlist from an image of a music festival poster.</p>

        // ... (continue with the rest of the interview questions and answers)

      </section>

      <section>
        <h3>Conclusion</h3>
        <p>
          Building in Public is the DAOJ's new series that highlights entrepreneurs developing
          cutting-edge products out in the open. PlaylistAI and its creator Brett Bauman are prime
          examples of this. The product uses some of the newest and most widely available technology on
          the market to fix a problem that incumbents have dropped the ball on for a decade.
        </p>
        <p>
          Interested in having your product featured in this series? Reach out to zacharyroth@pm.me.
        </p>
      </section>

      <footer>
        <p>© 2024 Zachary Roth</p>
      </footer>
    </article>
  );
};

export default PlaylistAIInterview;