import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'deep-work',
  slug: 'deep-work',
  title: 'Deep Work',
  subtitle: 'Cal Newport',
  image: '/images/reviews/deep-work1.webp',
  imageCaption: 'Book cover of Deep Work by Cal Newport',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Cal Newport's book on the importance of focused, distraction-free work.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Cal Newport',
  date: 'Nov 2023',
  tags: ['Productivity'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const DeepWork: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/deep-work.webp"
        alt="Book cover of Deep Work by Cal Newport"
        width={500}
        height={300}
      />  
      <p>A long lecture on how to be more productive by using less technology.</p>
      <p>
 The thesis is to reduce your dependence on technology and multitasking while working because it's making you less productive.
 When this topic comes up, I just think about the attention span that people had 100 years ago compared to today. If you're reading this,
 you're probably on your phone right now, and that's fine. It's all about the quality of one's screen time rather than quantity now because of how
 ubiquitous screens have become although they've been proven to make one's brain lazier just by being near them. Do with that what you will.
      </p>
      <h3>
 Newport's Rules for Deep Work
      </h3>
      <table>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Work Deeply</td>
            <td>Focus intensely on your work without distractions.</td>
          </tr>
          <tr>
            <td>Embrace Boredom</td>
            <td>Allow yourself to be bored to improve your focus.</td>
          </tr>
          <tr>
            <td>Quit Social Media</td>
            <td>Reduce or eliminate social media use to avoid distractions.</td>
          </tr>
          <tr>
            <td>Drain the Shallows</td>
            <td>Minimize shallow work to focus on more meaningful tasks.</td>
          </tr>
        </tbody>
      </table>
      <p>
 Technology addiction is real, and the advice here is good, but most of it is common sense. Cal gives out a lot of advice, and there are Deep Work 
 Playbooks and analyses are available online if you're interested in implementing some of it.
      </p>
    </article>
  );
};

export default DeepWork;
