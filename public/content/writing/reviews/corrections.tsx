import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'corrections',
  slug: 'corrections',
  title: 'The Corrections',
  subtitle: 'Jonathan Franzen',
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
      <Image
        src="/images/reviews/corrections.webp"
        alt="Book cover of The Corrections by Jonathan Franzen"
        width={500}
        height={300}
      />
      <p>
        Jonathon Franzen's writing is famously Midwestern. I'm from the Midwest and can confirm his
        accuracy in describing what it can be like.
      </p>
      <p>
        The characters are unlikable, and the story is depressing but realistic. Readers observe a
        family's dysfunction and the patriarch's declining health throughout the book, which
        coincidentally was published around 9/11. Many associate the feelings of this book with that
        time period, and it has won a handful of awards.
      </p>
      <p>
        If you are into more traditional fiction and want to read a good old fashioned story, this
        is a good choice.
      </p>
    </article>
  );
};

export default Corrections;
