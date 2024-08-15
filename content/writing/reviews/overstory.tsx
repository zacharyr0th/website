import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'overstory',
  slug: 'overstory',
  title: 'Overstory',
  subtitle: 'Richard Powers',
  image: '/images/reviews/overstory.webp',
  imageCaption: 'Book cover of The Overstory by Richard Powers',
  pageViews: 0,
  type: 'review',
  description: "A review of Richard Powers' epic novel about trees and human connection to nature.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Richard Powers',
  date: 'Sep 2023',
  tags: ['Fiction'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const Overstory: React.FC = () => {
  return (
    <article>
      <p>
        Overstory is an epic ode to trees. The first eight chapters introduce the main characters
        and their connections to trees, and chapter nine sees their stories converge into an
        8:52:49-long epic called Trunk. Crown, a 5:37:16-long chapter, follows that and leads into
        the ending, Seeds.
      </p>

      <p>
        The format feels monolithic as you're reading it because you know that the characters you
        haven't heard about in 5 hours will come back and be a significant part of the story. This
        book takes place in the 1960s and has an existential tension surrounding the environment
        that Ministry for the Future carries on into a different century.
      </p>

      <p>
        I consider Overstory to be a prequel to Ministry for the Future. The characters and story
        are different, but the themes introduced in Overstory are a fitting backdrop to the
        near-future semi-dystopian world that Ministry takes place in.
      </p>
    </article>
  );
};

export default Overstory;
