import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'corrections',
  slug: 'corrections',
  title: 'The Corrections',
  subtitle: '',
  image: '',
  imageCaption: 'Book cover of The Corrections by Jonathan Franzen',
  pageViews: 0,
  type: 'review',
  description: "A review of Jonathan Franzen's novel about a Midwestern family.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Jonathan Franzen',
  date: 'Nov 2023',
  tags: ['Fiction'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const Corrections: React.FC = () => {
  return (
    <article>
      <p>I'm from the Midwest. Johnathon Franzen is from the Midwest.</p>

      <p>
        Johnathon Franzen writes what he knows. I can tell you that his perception of the Midwest is
        largely accurate. It's a depressing picture he paints, but it's something I empathize with.
      </p>

      <p>
        He is a good writer. But as I said, it's depressing, and there were moments when I wished I
        had read something else, but the ending was potent.
      </p>
    </article>
  );
};

export default Corrections;
