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
  tags: ['Technology', 'Kernels'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const ModularMicrokernelOS: React.FC = () => {
  return (
    <article>
      <section>
        <img src="/images/articles/simpleos-2.webp" alt="" className="article-image" />
        <p>
          A software update crashed millions of computers on July 19, 2024, causing widespread
          flight cancellations. I was fortunate enough to have booked my flight on this day, and while I 
          was waiting in the terminal, I started to think about kernels.
        </p>
        <p>
          My flight was only delayed by two hours, but I felt for those whose journeys were more 
          severely disrupted. That sympathy was gone when Delta notified me four hours before my return flight a few days 
          later that they had canceled it. Thousands across the country received similar messages,
          leading people to book all relevant flights for days. The cause was a widespread failure
          that affected 8.5 million Windows computers running CrowdStrike, a cybersecurity software
          that half of the top S&P 500 companies use.
        </p>
        <h2>The Incident</h2>
        <p>
          At 04:09 UTC on July 19, CrowdStrike released an update for its Falcon sensor software on
          Windows systems. A defect in this update caused these systems to crash, triggering the
          infamous BSOD or boot loop.
        </p>
        <p>
          The root cause was a problematic modification to a configuration file, Channel File 291,
          which handles screening named pipes. This led to an out-of-bounds memory read, causing an
          invalid page fault - aka - the program tried to access memory it shouldn't, causing a crash
          and bringing down millions of systems.
        </p>
        <p>
          Like many security products, CrowdStrike's Falcon sensor operates at the kernel level to
          provide protection. This introduces the risk of an application crashing the entire system and
          when that happened with Falcon, and I was waiting at my gate, I started thinking 
          about the variations of kernels out there and what could be done to prevent this from
          happening again.
        </p>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Pros</th>
              <th>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monolithic Kernels</td>
              <td>Run all OS services in kernel space</td>
              <td>High performance, efficient</td>
              <td>Large size, potential system-wide crashes</td>
            </tr>
            <tr>
              <td>Microkernels</td>
              <td>Most services run in user space</td>
              <td>Enhanced stability and security</td>
              <td>Lower performance</td>
            </tr>
            <tr>
              <td>Hybrid Kernels</td>
              <td>Balance between monolithic and microkernels</td>
              <td>Optimized performance and modularity</td>
              <td>Increased complexity</td>
            </tr>
            <tr>
              <td>Exokernels</td>
              <td>Gives programs direct control instead of relying on the kernel</td>
              <td>High performance, efficient</td>
              <td>Increased complexity</td>
            </tr>
            <tr>
              <td>Nanokernels</td>
              <td>Offer bare minimum services for hardware management</td>
              <td>Minimal attack surface, highly specialized</td>
              <td>Limited functionality, not suitable for general-purpose use</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>Multi-Tier Kernels</h2>
        <p>
          A multi-tier kernel in theory could prevent higher level applications from accessing the kernel access for various types of software.
        </p>
        <ul>
          <li>Core OS functions might operate at the lowest, most privileged level.</li>
          <li>
            Essential drivers and security software could run slightly higher, with more restricted
            access.
          </li>
          <li>
            Application-level software would operate at even higher levels with minimal kernel
            access.
          </li>
        </ul>
        <p>
          As I began researching this idea, I came across this <a href="https://faculty.nps.edu/irvine/Publications/Publications2006/NPS-CS-06-001_Analysis3KernelArchi.pdf">paper</a> which discusses 
          three different multilevel security kernel architectures. The authors conclude that the choice between these architectures depends on the specific requirements of a given system or deployment scenario. In any case,
          the goas is to prevent a single issue from bringing down the entire system or affecting core OS functions. 
        </p>
        <p>
          This multi-tier approach could be used to implement a least privilege architecture, which may have limited the impact of a vulnerability or bug in Falcon's Channel File 291.
        </p>
      </section>
      <section>
        <h2>SimpleOS: A Prototype Implementation</h2>
        <p>
          After learning so much about kernels, I decided to prototype one. There is not much to it, but it will be a continuous project. To start, it features the following:
        </p>
        <ul>
          <li>Monolithic kernel design</li>
          <li>Interrupt handling system with custom handler support</li>
          <li>Memory management with paging and simple heap allocation</li>
          <li>Basic multitasking using round-robin scheduling</li>
          <li>Essential x86 structures (GDT, IDT) and initialization</li>
        </ul>
        <p>
          The first iteration can be found here: <a href="https://github.com/zacharyr0th/SimpleOS">SimpleOS</a>. 
        </p>
        <img src="/images/articles/simpleos-1.webp" alt="" className="article-image" />
      </section>
    </article>
  );
};

export default ModularMicrokernelOS;