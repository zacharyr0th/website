import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'ministry-for-the-future',
  slug: 'ministry-for-the-future',
  title: 'The Ministry for the Future',
  subtitle: 'Kim Stanley Robinson',
  image: '/images/reviews/the-ministry-for-the-future.webp',
  imageCaption: 'Book cover of The Ministry for the Future by Kim Stanley Robinson',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Kim Stanley Robinson's speculative fiction novel about climate change and its global impacts.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Kim Stanley Robinson',
  date: 'Nov 2023',
  tags: ['Sci-Fi'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en', // Added this line
};

const MinistryForTheFuture: React.FC = () => {
  return (
    <article>
      <p>
        As Overstory helps explain the mindset of the activist-environmentalist movement from the
        1960s, Ministry helps explains what the future could look like if their warnings aren't
        heeded.
      </p>

      <p>
        I don't want to give too much away, but the opening scenes of Ministry paint a dire picture
        of climate change effects on a region of the world that had a relatively small carbon
        footprint. As many have noted, a depressingly ironic fact of the future is that countries
        with the least impact on humanity's global carbon footprint will suffer the most - at first.
      </p>

      <p>
        What stems from this introduction is a rolling escapade that travels the globe, which
        frankly loses me after about 17 hours - but it's great. I will listen to this again one day
        because so many smart ideas are introduced that do not seem impossible. Sci-Fi is always
        ahead of the curve on these types of things.
      </p>

      <p>
        Authors introduce something, and ten years later, someone figures something else out that's
        unrelated, then 50 years later, someone else who is a multi-disciplinarian polymath puts 2
        and 2 together and changes the world.
      </p>
    </article>
  );
};

export default MinistryForTheFuture;
