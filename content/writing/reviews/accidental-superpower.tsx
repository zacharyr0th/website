import React from 'react';
import { ContentItem } from '../../../lib/types';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'accidental-superpower',
  slug: 'accidental-superpower',
  title: 'The Accidental Superpower',
  subtitle: 'Peter Zeihan',
  image: '/images/reviews/accidental-superpower-.webp',
  imageCaption: 'Prompt: of Accidental Superpower',
  pageViews: 0,
  type: 'review',
  description:
    'An exploration of how unforeseen circumstances led to the emergence of a new global superpower.',
  content: '',
  author: 'Zachary Roth',
  date: 'May 2022',
  tags: ['Geopolitics'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Peter Zeihan',
  language: 'en',
};

const AccidentalSuperpower: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/accidental-superpower-1.webp"
        alt="Book cover of The Accidental Superpower"
        width={500}
        height={500}
      />
      <p>
        The Accidental Superpower, the first book in Peter Zeihan's series, is a hefty introduction
        to the US-centric theses of Peter Zeihan, a well-known geopolitical analyst, speaker, and
        writer with private and public-sector experience.
      </p>
      <p>
        Peter's job requires him to be a generalist, so much so that it's hard not to reel when he
        glosses over a very complex topic and lays down his opinion. Some could perceive his
        matter-of-factness as persuasive, but others may find it off-putting. This confidence is
        present throughout the four books he has written, all reviewed on this website, and the
        Accidental Superpower kicks it off.
      </p>
      <p>
        Peter deals a lot with the context of the USA and its relation to the world, as well as
        historical events that have made things what they are. Throughout, he makes conclusive
        statements that don't tell the whole story or consider the full context of a given
        situation. It makes sense from his perspective as there is a lot of ground to cover, and
        there isn't enough time to get into the details that support each conclusion on every topic
        because then his books would be too long. I'd need to learn more about most of the issues he
        covers to have a definitive opinion on his accuracy. Still, he's a good storyteller and has
        a team of researchers working with him - so I view his work as representing a particular
        school of thought.
      </p>
      <h3>The Role of Geography</h3>
      <p>
        Peter's books, much like Jared Diamond's Gun's, Germ, and Steel - also reviewed
        <a href="/writing/reviews/guns-germs-steel">here</a> - focus on the fate of geography and
        its unintended consequences. Geography underlies the forces that shape history and still
        affect our lives today.
      </p>
      <p>
        For example, Mexico is historically difficult to govern because its geography prevents it
        from having a central power source. Instead, multiple regions of power in Mexico were
        separated by geographic obstructions, each of which turned into their own states.
      </p>
      <p>
        It's as simple as gravity. Trains in Mexico, for example, become less capable of transport
        when they have to go up a hill, which is a prevelant feature of the boundaries seperating
        the flatlands in the country. The US on the otherhand was lucky to be able to build
        railroads over the flat flyover states that connected the country's East and West sides.
        Mexico's terrain wasn't so friendly.
      </p>
      <h3>US Dominance</h3>
      <p>
        Peter loudly concludes that the US is positioned to dominate society for the foreseeable
        future. With no military threats to the North or South, the most potent natural defense
        barriers in the world - the Pacific and Atlantic Oceans, and the untapped shale beneath its
        feet, let alone the accelerating decline of Asian and European birth rates - he has some
        solid arguments.
      </p>
      <p>
        This book is the first of a four-part series, all following the same train of thought. At
        times it feels redundant and I'd prefer that more counterarguments to be considered because
        every road Peter goes down leads to US supremacy. While it's possible and likely, there are
        a lot of variables and unknown unknowns that could lead to a different outcome.
      </p>
      <p>
        With that said, I enjoyed listening to all four of his books. They feel like modern economic
        world history, and Peter drops many interesting facts between his conclusions. He also has
        expansive demographic datasets that he works with and interesting charts to support his
        arguments, which are available for free on his website. I go into more detail about some of
        those charts in later reviews.
      </p>
      <h3>Related Books in the Series</h3>
      <p>Check out my reviews of his other books below.</p>
      <table>
  <thead>
    <tr>
      <th>Book</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/writing/accidental-superpower">The Accidental Superpower</a></td>
      <td>How the USA found itself in such a dominant position</td>
    </tr>
    <tr>
      <td><a href="/writing/absent-superpower">The Absent Superpower</a></td>
      <td>How the USA began to resign from global affairs and what the world would look like if it removed itself entirely</td>
    </tr>
    <tr>
      <td><a href="/writing/disunited-nations">Disunited Nations</a></td>
      <td>The best of the series. This book details interesting historical events and modern relationships that have occurred between countries other than the US, such as Angola, Argentina, Turkey, and more.</td>
    </tr>
    <tr>
      <td><a href="/writing/eotwijtb">The End of the World is Just the Beginning</a></td>
      <td>This book outlays where Peter thinks the world is going from here.</td>
    </tr>
  </tbody>
</table>

    </article>
  );
};

export default AccidentalSuperpower;
