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
        <img src="/images/articles/kernel-0.webp" alt="Bing" className="article-image" />
        <p>A software update crashed millions of computers on July 19, 2024, causing widespread flight cancellations. This incident highlighted the risks of applications requesting kernel-level access, prompting an exploration of different kernel types and potential safeguards against similar future disruptions.</p>
        <p>
          I was fortunate enough to have booked my flight from SFO to MKE on July 19, 2024, unaware that the Blue Screen of Death (BSOD) was about to hit. My flight was only delayed by two hours, but I felt for those whose journeys were more severely disrupted.
        </p>
        <p>
          That sympathy was gone when, four hours before my return flight a few days later, Delta notified me that it was canceled. Thousands across the country received similar messages, leading to all relevant flights being booked for days. The cause was a widespread failure that affected 8.5 million Windows computers running CrowdStrike, a cybersecurity software that half of the top S&P 500 companies used.
        </p>
        <h2>The Incident</h2>
        <p>
          At 04:09 UTC on July 19, CrowdStrike released an update for its Falcon sensor software on Windows systems. A defect in this update caused these systems to crash, triggering the infamous BSOD or boot loop.
        </p>
        <p>
          The root cause was a problematic modification to a configuration file, Channel File 291, which handles screening named pipes. This led to an out-of-bounds memory read, causing an invalid page fault. Channel File 291 was designed to manage named pipes, a feature often used by malware for communication. The file caused a kernel-level crash, simultaneously bringing down millions of systems.
        </p>
        <p>
          Like many security products, CrowdStrike's Falcon sensor operates at the kernel level to provide comprehensive protection. This deep integration also means issues with Falcon can have catastrophic effects on the entire operating system. The trend with many new applications is to request kernel level access At the same time which got me thinking about the variations of kernels out there and what could be done to prevent this from happening again.
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
          While there are modular microkernels, I wondered why there wasn't a kernel with a multi-tier structure or authentication scheme. This aims to create a more granular approach to kernel access, potentially mitigating the risks associated with kernel-level vulnerabilities.
        </p>
        <p>
          A multi-tier kernel could operate on the principle of least privilege, with different levels of kernel access for various types of software. 
        </p>
        <ul>
          <li>Core OS functions might operate at the lowest, most privileged level.</li>
          <li>Essential drivers and security software could run slightly higher, with more restricted access.</li>
          <li>Application-level software would operate at even higher levels with minimal kernel access.</li>
        </ul>
        <p>
          This tiered approach could help contain the impact of vulnerabilities or bugs in any single component. If an issue occurs in a higher-level tier, it would be less likely to bring down the entire system or affect core OS functions.
        </p>
        <p>
          A multi-tier kernel would be inherently more complex than most other kernel architectures and requires significant battle testing before any statements can be made about its security. 
        </p>
        <p>
          The ultimate aim of this research is not to replace existing kernel architectures but to explore innovative approaches that could inform the next generation of operating system design. Conceptualizing a multi-tier kernel architecture opens up interesting avenues for research and experimentation in operating system design. With the help of AI, I've decided to explore this as a medium to gain a deeper understanding of the limitations of existing kernel architectures in production environments and to prototype a multi-tier permission kernel.
        </p>
      </section>
    </article>
  );
};

export default ModularMicrokernelOS;