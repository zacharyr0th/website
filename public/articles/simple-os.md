---
title: 'SimpleOS'
date: '2023-12-31'
image:
  src: /images/simpleos-0.webp
  alt: 'SimpleOS'
description: 'BSOD and the Need for a Multi-Layered Kernel'
category: 'technology'
tags: ['computing']
---

<style jsx>{`
  .prose a {
    text-decoration: underline;
    color: var(--color-accent);
  }
  .prose ol {
    list-style-type: decimal;
    margin-left: 2em; /* Adjust as needed for indentation */
    padding-left: 0.5em; /* Add padding if needed */
  }
  .prose ol li {
    margin-bottom: 0.5em;
    color: var(--color-text-primary);
    line-height: 1.5; /* Adjust line height for better readability */
  }
`}</style>

<div class="tldr-section">

A software update crashed millions of computers on July 19, 2024, causing widespread flight cancellations.
I was fortunate enough to have booked my flight on this day, and while waiting in the terminal, I started to think about kernels.

</div>

My flight was luckily only delayed by two hours, but I felt for those whose journeys were more severely disrupted.
That sympathy disapated when Delta notified me four hours before my return flight a few days later that they had canceled it.
The cause was a widespread failure that affected 8.5 million Windows computers running CrowdStrike, a cybersecurity software that half of
the top S&P 500 companies use.

![SFO BSOD](/images/simpleos-2.webp)

## The Incident

At 04:09 UTC on July 19, CrowdStrike released an update for its Falcon sensor software on Windows systems.
A defect in this update caused these systems to crash, triggering the infamous Blue Screen of Death (BSOD) which signals that the computer is
incapacitated and requires a manual reboot.

The root cause was a problematic modification to a configuration file, Channel File 291, which handles screening named pipes.
This led to an out-of-bounds memory read, causing an invalid page fault which was forcefed to each device by an auto-update from CrowdStrike.
In simpler terms, the program tried to access memory it shouldn't, causing a crash and this update was forced upon millions of systems, ultimately
bringing them into a BSOD state and rendering them temporarily useless.

Like many security products, CrowdStrike's Falcon sensor operates at the kernel level to provide robust system protection.
This level of access introduces the risk of an application crashing the entire system (or worse) and after that occurred on July 19th and I was
left to my own devices in the airport terminal, I started thinking about the variations of kernels out there and what could be done to prevent
this from happening again while also realizing I was severely understudied on the topic.

## Kernels

A kernel is the core of an operating system, providing essential services to other programs. There are many different types of kernels,
including monolithic, micro, hybrid, exo, and nano - all with their own pros and cons.

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

## Multi-Tier Kernels

Because of how early I am placed on the Dunning-Kreuger chart when it comes to this topic, I figure a multi-tier kernel architecture can
theoretically prevent higher-level applications from having unrestricted access to the kernel, thereby enhancing system stability and security.

- Core OS functions operate at the lowest, most privileged level.
- Essential drivers and security software run at a slightly higher level with restricted access.
- Application-level software operates at the highest level with minimal kernel access.

During my brief research, I found a [paper](https://faculty.nps.edu/irvine/Publications/Publications2006/NPS-CS-06-001_Analysis3KernelArchi.pdf)
discussing three different multilevel security kernel architectures. The authors rightly conclude that the choice of architecture depends on the
specific requirements of a system or deployment scenario and that the goal is to prevent a single issue from compromising the entire system or affecting core OS functions.

One clear benefit of implementing a multi-tier approach is that you could facilitate a least privilege architecture, potentially limiting the impact of vulnerabilities or bugs,
such as the one in Falcon's Channel File 291.

## SimpleOS: A Prototype Implementation

After learning so much about kernels, I decided to prototype one. There is not much to it, but it will be a continuous project. Since this is my
first kernel, I figured I'd make it monolithic in order to understand standard practices. To start, SimpleOS features the following:

1. Monolithic kernel design
2. Interrupt handling system with custom handler support
3. Memory management with paging and simple heap allocation
4. Basic multitasking using round-robin scheduling
5. Essential x86 structures (GDT, IDT) and initialization

View the full source code [here](https://github.com/zacharyr0th/SimpleOS) and stay tuned for upcoming PRs to SimpleOS and future kernel projects which further explore the multi-tier ideas mentioned above.

![SimpleOS](/images/simpleos-1.webp)
