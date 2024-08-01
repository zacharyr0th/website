import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'breath',
  slug: 'breath',
  title: 'Breath',
  subtitle: 'The New Science of a Lost Art',
  image: '/images/reviews/breath.webp',
  imageCaption: 'Book cover of Breath by James Nestor',
  pageViews: 0,
  type: 'review',
  description: 'A review of James Nestor\'s exploration of the science and importance of breathing.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'James Nestor',
  date: 'Jul 2023',
  tags: ['Science', 'Health'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const Breath: React.FC = () => {
  return (
    <article>
      <p>Everyone knows that mouth breathing is bad, but no one knows why.</p>

      <p>James found out, and I'm aggravated that more scientists haven't made it a big deal. No doctor has ever said anything to me about it. If I had a platform, I would preach about this book.</p>

      <p>There is so much proven value in breathing correctly, and no one talks about it or even prescribes it. It reminds me of the doctors that prescribe three different anti-depressants to a teenager who just had their first breakup rather than prescribe them diet and exercise.</p>

      <p>I'm not saying anything else about this book. Go read it.</p>
    </article>
  );
};

export default Breath;