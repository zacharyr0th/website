import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'absent-superpower',
  slug: 'absent-superpower',
  title: 'The Absent Superpower',
  subtitle: 'The Shale Revolution and a World Without America',
  image: '/images/reviews/absent-superpower.webp',
  imageCaption:
    'Prompt: power willingly chooses to withdraw inward abstract expressionist painting dramatic and geometric',
  pageViews: 0,
  type: 'review',
  description: "A review of Peter Zeihan's book The Absent Superpower",
  content: '',
  author: 'Zachary Roth',
  date: 'May 2022',
  tags: ['Geopolitics'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Peter Zeihan',
  language: 'en',
};

const AbsentSuperpower: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
      <p>
        The Absent Superpower carries on the narratives introduced in the Accidental Superpower that
        the US still reigns supreme - but now has reasons and incentive to withdraw itself from
        world affairs.
      </p>
      <p>
        The Accidental Superpower explains how the US became so powerful by happenstance. It sets
        the foundation for the Absent Superpower to explain what the world could look like without
        the US being as international as it historically has been. To do so, the US will need to
        focus on Mexico, Canada, and SHALE.
      </p>
      <p>
        This book goes deep into the shale industry, which is not for the faint of heart if you're
        uninitiated. Lots of statistics and geopolitical explanations of historical events. He makes
        compelling arguments for why the US will be the leader in shale for the foreseeable future
        (decades). The most recruited talent is in the US, the most money and arguably the most
        incentive is in the US, and there are no competitors on the North or South American
        continents. The US also has the most known shale beds in the world, of course.
      </p>
      <p>
        Once the US takes advantage of its shale fields and continues to improve its relationships
        with Canada and Mexico, it can withdraw from the global oil stage and immediately stop
        having to bow down to Saudi Arabia, Iran, Russia, etc. - at least in the ways it has to now.
        OPEC+ would be on its way to being obsolete in US markets.
      </p>
    </article>
  );
};

export default AbsentSuperpower;
