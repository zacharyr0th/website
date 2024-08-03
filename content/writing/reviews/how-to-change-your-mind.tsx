import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'how-to-change-your-mind',
  slug: 'how-to-change-your-mind',
  title: 'How to Change Your Mind',
  subtitle:
    'What the New Science of Psychedelics Teaches Us About Consciousness, Dying, Addiction, Depression, and Transcendence',
  image: '/placeholder.webp',
  imageCaption: 'Book cover of How to Change Your Mind by Michael Pollan',
  pageViews: 0,
  type: 'review',
  description: "A critical review of Michael Pollan's exploration of psychedelic medicine.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Michael Pollan',
  date: 'Oct 2023',
  tags: ['Science', 'Psychology'],
  readTime: 3,
  likes: 0,
  comments: 0,
  shares: 0,
};

const HowToChangeYourMind: React.FC = () => {
  return (
    <article>
      <p>
        This would have been a good introductory book to the psychedelic world of medicine, but I
        read it with the idea of learning about the newest updates in the field, and I felt like I
        learned nothing. The author is overrated.
      </p>

      <p>
        I've been casually following the updates in psychedelic medicine for the last decade, so I
        probably wasn't the correct audience for this book. As a result, I was very bored, skipped
        around, and quit early.
      </p>

      <p>
        I'll likely never read or listen to what Michael Pollan says because my impression of him
        was so vanilla and trite - but again, I think I'm just not the right audience.
      </p>
    </article>
  );
};

export default HowToChangeYourMind;
