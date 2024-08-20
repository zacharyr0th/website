import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'a-simple-operating-system',
  slug: 'a-simple-operating-system',
  title: 'A Simple Operating System',
  subtitle: 'BSOD and the need for a multi-layered kernel',
  image: '/images/articles/kernel-0.webp',
  imageCaption: 'Conceptual image of a modular microkernel architecture',
  pageViews: 0,
  type: 'article',
  description:
    'This article explores the need for a multi-layered kernel operating system with context from the recent Crowdstrike BSOD incident.',
  content: '',
  author: 'Zachary Roth',
  date: 'Aug 2024',
  tags: ['Technology'],
  readTime: 10,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const ModularMicrokernelOS: React.FC = () => {
  return (
    <article>
      <section>
        <p>
          I was fortunate enough to have scheduled my flight from SFO to MKE for July 19th, 2024. It
          was early and I didn't check the news so was not aware that the Blue Screen of Death
          (BSOD) was coming. Luckily my flight was only delayed 2 hours but I sympathized with everyone who
          had their flights delayed or cancelled before mine.
        </p>
        <p>
          That empathy only lasted so long because - to my dismay - 4 hours before my return flight
          was going to board, I received a message from Delta saying that my flight had been
          cancelled.
        </p>
        <p>
          This happened to thousands of people across the country at the same time and it led to all
          relevant flights being booked for the next few days. it affected 8.5m computers running
          Crowdstrike, a cybersecurity software used by half of the top S/P 500 companies.
        </p>
        <p>
          Feeling SoL, I ended up diving into the teeny tiny error that caused this mess. Initial reports were that it was a
          single Crowdstrike file that accidentally created a null pointer. (video from twitter)
        </p>
        <p>
          When you overlook Crowdstrike's criminally negligent error and lack of testing in place,
          it makes you wonder why Window's kernels are not multi-layered when it comes to
          permissions for programs running atop it, as that could have potentially prevented this
          issue.
        </p>
        <p>
          After briefly looking into it, I realized that this vulnerability was not unique to
          Windows and that all major OSes can fall prey to similar kernel level vulnerabilities. OS
          operations are fundamentally different than application level operations but many
          applications now have to rely on the kernel for speed, manueverability, and security
          purposes.
        </p>
        <p>
          We lived through Covid, we lived through Crowdstrike. 8.5m computers were affected. It can
          all happen again in an instant. Let alone solar flares.
        </p>
      </section>
      <section>
        <h2>Key Features of Modular Microkernels</h2>
        <ul>
          <li>Minimal kernel size</li>
          <li>Improved system stability</li>
          <li>Enhanced security through isolation</li>
          <li>Easier maintenance and updates</li>
        </ul>
      </section>
    </article>
  );
};

export default ModularMicrokernelOS;
