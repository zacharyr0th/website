import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'acid-for-the-children',
  slug: 'acid-for-the-children',
  title: 'Acid for the Children',
  subtitle: 'Flea',
  image: '/images/reviews/acid-for-the-children.webp',
  imageCaption: 'Book cover of Acid for the Children by Flea',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Flea's raw and honest memoir about his wild youth and the formation of the Red Hot Chili Peppers.",
  content: '',
  author: 'Zachary Roth',
  date: 'Jan 2023',
  tags: ['Autobiography', 'Music'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Flea',
  language: 'en',
};

const AcidForTheChildren: React.FC = () => {
  return (
    <article>
      <p>
        Flea's memoir "Acid for the Children" is a raw, honest, and impactful account of his youth
        and the formation of the Red Hot Chili Peppers. With short, engaging chapters and heartfelt
        narration, Flea delivers a 10/10 listening experience (through the audiobook) that offers
        unique insights into his life and the early days of RHCP.
      </p>
      <p>
        Having read Anthony Kedis's autobiography, Scar Tissue, in high school, I thought hearing
        Flea's side of the story would be interesting. I tried listening to the audiobook, which
        Flea graciously narrated, but I remember being on a treadmill and thinking, "Wow, I'm not
        following this. " So I kept it unread for about a year. Then I saw some posts by Flea on
        Instagram and decided to relisten.
      </p>
      <p>Thank God because it's an amazing book that has left a lasting impact on me.</p>
      <h3>Writing Style and Content</h3>
      <p>
        Flea uses short chapters to tell funny and heart-wrenching stories that shaped him, and he
        narrates them in an honest tone. He's not trying to prove anything. He goes into detail
        about his upbringing and the early days of the Chili Peppers but stops before they reach
        superstardom.
      </p>
      <p>
        Like many young musicians, I had an unhealthy obsession with John Frusciante's solos from
        his time with the Red Hot Chili Peppers. The only note for Flea in this book would be to
        include more content about John, but I digress. Because of this obsession, I learned all of
        RHCP's best songs and have intimately studied the deep cuts - where I've developed a deep
        respect for Flea. BloodSugarSexMagic's bass and guitar lines are fucking funky.
      </p>
      <h3>Its a Good One</h3>
      <p>
        A foundational understanding of the band gave me enough context to work with, and Flea does
        nothing but deliver. 10/10, and I teared up at times, especially when Flea does at the end
        of a few emotional chapters. He's gone through it.
      </p>
      <p>
        Flea is a legend, and if you like people, read this book. If you like music, watch this
        improvised intro at Slane castle between Flea and Frusciante. VIDEO INSERT
      </p>
    </article>
  );
};

export default AcidForTheChildren;
