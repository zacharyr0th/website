import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'playlist-ai',
  slug: 'playlist-ai',
  title: 'Playlist AI',
  subtitle: 'test',
  image: '/placeholder.webp',
  imageCaption: 'test',
  pageViews: 0,
  type: 'interview',
  description: '',
  author: 'Zachary Roth',
  bookAuthor: 'Brett Bauman',
  date: '2021-08-31',
  tags: ['Music', 'Technology'],
  readTime: 15,
  likes: 0,
  comments: 0,
  shares: 0,
  content: '' 
};

const Nouns: React.FC = () => {
  return (
    <article>
        <p>
DAOJ

Subscribe
Sign in
Building in Public 1: PlaylistAI
The BIP Series

zachary r0th
Mar 03, 2023

The evolution of computing was the main driver of financial growth in the 1990s and the vision of a new, more open world aligned with the creation of the world wide web.

Along with increasing the efficiency of everything, the internet gave creators the ability to independently connect with a global audience for the first time. This series, Building in Public, introduces builders who can quickly ship and execute their ideas in the public sphere. These creators interact with users and iterate on their products in real time using resources and infrastructure available to anyone.

DAOJ is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.

Type your email...
Subscribe
Before mass communication networks were established, it wasn't easy to build a global following. It nearly necessitated an invasion of foreign territories and a hope for the best. Now someone can bootstrap a product until an investor pays attention or until it becomes profitable. There is a growing list of success stories of independent builders making a living (and then some) just by sharing their ideas in public and integrating user feedback into product roadmaps. 

Here’s some math to put it into perspective.

Twitter avatar for @levelsio
@levelsio 
@levelsio
Similarly, a High Net Worth Individual (UHNWI) is $1M in assets

In 2023 a small SaaS multiple is 3-4x

Let's be optimistic @ 4x

$1M/4x = $250k/y

So $250k/y as an indie maker makes you high net worth already

$250k/y is "just" 208 customers paying $100/mo, VERY doable 
Twitter avatar for @levelsio
@levelsio 
@levelsio
Ultra High Net Worth Individual (UHNWI) is $30M in assets

In 2023 a typical SaaS multiple is 7-10x

Let's be optimistic @ 10x

$30M / 10x = $3M/y

So $3M/y as an indie makes you ultra high net worth already

$3M/y is "just" 2500 customers paying $100/mo, not easy but doable
9:34 AM ∙ Mar 2, 2023
167
Likes
11
Retweets
New Tools
Historically speaking, startups are known to implement cutting-edge technologies far sooner than their larger competitors. As discussed in the most recent DAOJ issue, Bing has a long way to go, but I’m here for it, there is incentive for smaller players to take risks in ways that don’t make sense for large incumbents. Bing has nothing better to do than take on Google. Google, on the other hand, could pull the trigger on something too quickly and damage their reputation. 

Bing can attribute much of its recent progress to that meddling startup - OpenAI. OpenAI’s public suite of tools like ChatGPT and Dall E have inspired many builders to incorporate AI models and methodologies into their products. Although OpenAI isn’t as open as some people want it to be, it is likely more open than would be a monolithic competitor had that monolithic competitor developed the same technologies. 

If IBM or Microsoft proper (not OpenAI) had developed ChatGPT, they probably would have gatekept it. Instead, Google has to dance. 

Introducing PlaylistAI
PlaylistAI is a free app with a premium option that uses AI technology to create personalized playlists on Spotify and Apple Music. You can input AI prompts, images, videos, or your most-listened-to tracks to generate unique playlists that reflect your taste.


The app seamlessly integrates with your Spotify or Apple Music profile, so you can access your custom playlists as soon as they're generated. Unlike other music streaming services, PlaylistAI produces highly curated and original playlists on the fly and results can be customized with natural language and image prompting.

Below is an interview with Playlist AI’s creator, Brett Bauman, where he answers questions about some of his background, his inspiration for the product, the reception of PlaylistAI so far, its tech stack, and his thoughts on building in public.

Interview with Brett
Zach: Hi Brett. Let's start with your background. What's your experience with programming, AI, and product development?

Brett: I studied Computer Science at Arizona State University where I first started making apps for fun. Since then I’ve been an iOS developer in my day job, but I’ve always liked making apps on the side. PlaylistAI got started last year as a side project and I’ve been expanding on it since then.

Zach: Can you give us an overview of the PlaylistAI and its unique features?

Brett: Sure. PlaylistAI is an enhancement on top of your music streaming service for people who are unhappy with the music recommendations that their streaming platform is providing them. Instead of being fed a list of playlists to choose from, the premiere feature lets you instantly create your own by prompting PlaylistAI with something like “popular hip-hop music from the early 2000’s” or “music similar to the artists Drake and SZA”. There are other ways to make playlists and discover music as well, like making a playlist from an image of a music festival poster. 

Zach: I noticed there's nearly a 5-star rating out of more than 150 reviews on Apple's App store. How has the reception of the app been other than that?

Brett: It’s been great to hear how people are discovering music through PlaylistAI. Music is a deeply personal subject for many people, so it's really special to hear that my work is impacting them in a positive way.

Zach: Right on. What inspired you to create PlaylistAI? Do you have a music background or did you just see an opportunity and act on it?

Brett: It started out as a way to make playlists for music festivals which was a personal itch I wanted to scratch. You can take a picture of a music festival poster and it finds the artist names in the image then makes you a playlist with their top songs. That got featured on TechCrunch and as I looked around I noticed there really wasn’t any great way to make playlists. Since then I’ve been toying with unique ways to discover music and integrating an AI prompt was a natural step for that. 

Zach: I've spent too many hours manually trying to curate my playlists. I hope an artist or composer discography is on Spotify, which isn't always the case. Then I'll make a folder with 2 playlists - disco and fav. I add the discography to disco, go through each song, and then add my favorites to fav until there are no more songs left. It works, but let me tell you, it is not scalable.

Because of this, I concluded that AI playlists are the way to go - but I've been disappointed with Spotify, YouTube, and especially Pandora. What do you think is going on behind the scenes at these companies? I suspect they'll eventually be integrating ChatGPT, Claude, Bard, or some proprietary AI of their own. Or they'll acquire PlaylistAI.

Brett: We saw Spotify release their first take on this recently with their AI DJ feature. It’s interesting, but doesn’t really worry me. Spotify has long ago decided that they know what’s best for someone to listen to with their recommendations, but I believe the best option is a middle ground that lets users inform algorithms with what they want to listen to in the moment. 

Behind the scenes I think big companies will struggle to find where they can integrate AI endpoints into their apps. There are already so many features that the bloat adds up and something like a direct PlaylistAI competitor becomes another button fighting for screen real estate. Companies will definitely attempt it, like Spotify’s DJ, but great execution is going to require really rethinking their apps from an AI-first mindset.


Zach: True. So what were some of the biggest technical challenges you faced when developing the app as a one-person team? Your GitHub has over 1,300 commits in the last year, so you've been on the grind. And then there are Spotify and Apple Music APIs you must rely on, marketing, admin, and any overhead you've got to deal with - it's a lot.

Brett: As someone working on this solo, the biggest challenges have been balancing building and marketing. I’ve gotten better about marketing with posting on Twitter more over the past few months, but what I really want to do is cut myself off from coding. That way I can fully focus on marketing and talking to users. I’m getting closer to being in a good spot within the app to do that. 

Zach: What features would you like to add to the app in the future?

Brett: I have a million ideas for fun and unique experiences to create playlists, but in the near future I’m going to focus on improving the AI Prompt feature. The ChatGPT API just opened up and I have some fun things planned for it. I’d also like to bring PlaylistAI to desktop.

Zach: Many are introduced to so-called indie builders through people like Pieter from Levels, who has emphasized that most of his projects are not massive success stories and that consistency matters more than anything else.

What advice would you give to budding entrepreneurs looking to build in public? Have there been any drawbacks?

Brett: It sounds simple, but I recommend building something and posting about it. It doesn’t matter what it is and it doesn’t matter if you have 0 followers. I agree that overnight success stories aren’t what we should be chasing. It can happen, but it's mostly a grind and you’ll find out if you enjoy it or not by doing it.

I can’t think of any drawbacks that are big enough to stop anyone from doing it. Even when your work gets copied, it looks like it can just attract more attention to yourself anyways. Most indie developers are extremely open and helpful to new people starting out.


Zach: So I made some playlists and was happier with the results than I am with the big companies. Natural language prompting is an art, so I'm still fine-tuning what I'm looking for, but I see a lot of potential in the idea - especially from the festival perspective you mentioned, and your execution has been great so far. 

What is the tech stack behind it?

Brett: Many prompts work well in PlaylistAI, but there are certain types that perform poorly and it's something I’m working on. I mix together recommendations from OpenAI, Spotify, and Apple Music in creative ways which helps to get around limitations that some people complain about online, like the OpenAI 4k token limit. The app itself is a native iOS app fully written in SwiftUI.

Zach: Nice. Given that you already use ChatGPT on the backend, I'm sure you've considered setting up Dall E or a competitor to generate customized images for each playlist. I'm curious how Spotify would react to that and about the cost structure since the token prices could add up.

Brett: Yeah that’s been on my mind for sure. I should really get around to it, since I’ve even seen some users manually do it for their PlaylistAI playlists. I don’t think it would be too expensive, I should be able to roll it up into the regular PlaylistAI subscription. 

Zach: Well, thank you for your time answering these questions. I will keep using your app and build the perfect playlist.

Brett: Thanks for having me. If anyone wants to follow along, I post about building PlaylistAI on my twitter page.

PlaylistAI’s Twitter

PlaylistAI’s Website

AppStore Download 


Share

Building in Public
Building in Public is the DAOJ's new series that highlights entrepreneurs developing cutting-edge products out in the open. PlaylistAI and its creator Brett Bauman are prime examples of this. The product uses some of the newest and most widely available technology on the market to fix a problem that incumbents have dropped the ball on for a decade. 

I've always hated Pandora.

Interested in having your product featured in this series?

Reach out to zacharyroth@pm.me.

Give a gift subscription

Comments

Write a comment...

Top

Latest

Discussions

NounsDAO
Timeless
Aug 31, 2021 • Zachary Roth
4
1

Star Atlas
An Ambitious Metaverse
Sep 23, 2021 • Zachary Roth
1
2

Boson Protocol
Decentralized Commerce
Sep 6, 2021 • Zachary Roth
1

See all
Ready for more?

Type your email...
Subscribe
© 2024 Zachary Roth
Privacy ∙ Terms ∙ Collection notice
Start Writing
Get the app
Substack is the home for great culture</p>
    </article>
  );
};

export default Nouns;