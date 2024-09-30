import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'fourth-turning',
  slug: 'fourth-turning',
  title: 'The Fourth Turning',
  subtitle: '',
  image: '/images/reviews/placeholder.webp',
  imageCaption: '',
  pageViews: 0,
  type: 'review',
  description: '',
  content: '',
  author: 'Zachary Roth',
  date: 'May 2022',
  tags: [''],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: '',
  language: 'en',
};

const AbsentSuperpower: React.FC = () => {
  return (
    <article>
      <p>
        The Absent Superpower carries on the narratives introduced in the Accidental Superpower that
        the US still reigns supreme - but introduces more variables about how there is good reason
        for the US to withdraw itself from world affairs.
      </p>
      <p>
        The Accidental Superpower explains how the US became so powerful by happenstance. It sets
        the foundation for the Absent Superpower to explain what the world could look like without
        the US being as international as it historically has been. In this case, the US must focus
        on Mexico, Canada, and most importantly SHALE to do so.
      </p>
      <p>
        This book goes deep into the shale industry, which is not for the faint of heart if you're
        uninitiated. There are lots of statistics and geopolitical explanations of historical
        events. It makes compelling arguments for why the US will be the leader in shale for the
        foreseeable future. The most recruited talent is in the US, the most money and arguably the
        most incentive is in the US, and the US has the most to lose. It also has the largest known
        shale beds in the world, of course.
      </p>
      <p>
        Once the US takes advantage of its shale fields and continues to improve its relationships
        with Canada and Mexico, it can withdraw from the global oil stage and immediately stop
        bowing down to Saudi Arabia, Iran, Russia, etc. - at least in the ways it has to now. OPEC+
        would be well on its way to becoming an obsolete force in US markets.
      </p>
      <p>
        Peter foresees a tumultuous period over the next few decades for the world's preeminent
        oil-producing regions. He's not alone in this theory. The Fourth Turning, reviewed{' '}
        <a href="/writing/reviews/fourth-turning">here</a>, presents a similar scenario in which
        society hinges around extra-impactful periods known as Fourth Turnings. The period we are
        about to enter is what some refer to as the Fourth Turning. So that's interesting.
      </p>
      <p>
        The Accidental Superpower (Peter's first book - reviewed{' '}
        <a href="/writing/reviews/accidental-superpower">here</a>) includes a handful of useful maps
        listed on his website but this book leans harder on these charts as a source of content. You
        can view all the charts <a href="https://zeihan.com/the-absent-superpower-maps/">here</a>,
        which will give you an idea of the context Peter and his team are working with.
      </p>
      <p>
        As with all four of Peter's books, they're informative and have a high signal-to-noise ratio
        - but they need to be taken with a grain of salt because the counterarguments are not there.
        If you have time, it's worth reading all four and skimming this one - unless you are an oil
        man or woman and want a more nuanced understanding of shale. In that case, take notes.
      </p>
    </article>
  );
};

export default AbsentSuperpower;
