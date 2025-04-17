---
title: 'Crypto-Repos'
date: '2025-4-14'
image:
  src: '/images/cr.webp'
  alt: 'Crypto-Repos Logo'
description: 'An open-source directory of code across major blockchain ecosystems'
category: 'technology'
tags: ['crypto']
takeaways:
  - Crypto-Repos indexes over 10,500 repositories and 7,400 contributors across major blockchain ecosystems
  - Built on Electric Capital's developer activity report data, providing deeper insights into blockchain development
  - Offers searchable interface for discovering projects, tracking contributions, and analyzing developer activity
---

Crypto-Repos is a new open-source directory of blockchain-related code, designed to facilitate the discovery of relevant repositories and contributors. It provides insights and utility for developers, projects, AI efforts, recruiters, analysts, and blockchain foundations.

It currently indexes 10,523 repositories and 7,457 contributors across [@Aptos](https://twitter.com/Aptos), [@SuiNetwork](https://twitter.com/SuiNetwork), and [@base](https://twitter.com/base), and can scale to cover all the ecosystems and contributors in Electric Capital's annual blockchain developer activity [report](https://www.developerreport.com/developer-report).

## Value Propositions

### For Developers:

- Find relevant projects to use or contribute to
- Build a professional profile with your blockchain-related work
- Reduce duplicate work by finding existing solutions quickly

### For Teams/Projects:

- Get more visibility in the blockchain community
- Find qualified developers

### For AI:

- Organized data about blockchain projects and contributors
- Ready-to-use datasets for analysis

### For Recruiters:

- Find developers with proven experience
- Evaluate talent based on actual contributions

### For Analysts/Ecosystem Foundations:

- Track developer activity week to week
- Track competitive gaps and the amount of open-source code in an ecosystem
- Track development trends by analyzing new commits across ecosystems

# Features

#### Detailed view of repository metrics, contributions, and analytics

![Repository Metrics Dashboard](/images/cr-metrics.jpeg)

#### Advanced search capabilities across ecosystems and categories

![Search Interface](/images/cr-search.webp)

#### In-depth repository analysis with key metrics

![Repository Analysis](/images/cr-view.webp)

#### Track and analyze contributor activities across repositories

![Contributor Profile](/images/cr-contributors.jpeg)

#### Find individual contributors and view their work

![Contributor Analytics](/images/cr-contributor.jpeg)
_Shout out to [@david_wolinsky](https://x.com/david_wolinsky)_

# Context

Measuring the success of permissionless blockchain ecosystems is not easy. While metrics like transaction volumes, user counts, and on-chain activities provide useful data points, they are frequently distorted by incentivization mechanisms and cabal behaviors.

The incentives attract sophisticated actors who deploy automated systems to artificially inflate metrics, making distinguishing genuine from simulated engagement difficult. This issue is compounded by the pseudonymous usage of accounts on blockchains, where it can become difficult to tell who is who and which users are humans or bots. To overcome these challenges, a more appropriate approach is to analyze the ecosystem's foundational element: its developer community.

By examining the developer's activity behind a protocol's codebase and applications, you can better assess the ecosystem's genuine growth and innovation capabilities.

## Open vs Closed Source

Open-source code is often foundational to trust, security, and collaboration. History has proven that crypto projects with open-source code are more trustworthy than the alternative, and developers can benefit from using it for templating, education, and even training data for LLMs.

The ethos underlying open-source ecosystems is deeply ingrained in crypto's origins, and the culture of open-source iteration has led to the industry's constant evolution. DeFi benefits from this open-source culture because, in an ideal world, users can be sure that what is supposed to happen is all that is happening and that developers can collectively audit, borrow, iterate, and improve on the status quo. **Crypto-Repos directly supports this open-source ethos by providing a dedicated platform for discovering and exploring open-source blockchain projects.**

While open-source projects offer a clear value add, a definitive analysis on the ratio of closed:open source code in crypto would require data from infrastructure providers and cross-referencing with reports on open-source blockchain code like Electric Capital's developer activity report. Anecdotally, when speaking with API providers, that number has been 2:1, so triple what you see on Electric Capital's annual report to have a directional guesstimate.

## Electric Capital's Annual Report

Electric Capital's annual developer report stands out as a cornerstone analysis in crypto. It provides a standardized framework to compare one blockchain ecosystem's aggregate developer activity to another.

![Electric Capital Report](/images/cr-ec.jpeg)

The crypto-ecosystems repository is a taxonomy hosted on GitHub that categorizes and tracks open-source blockchain development across various ecosystems. Maintained by Electric Capital, this collaborative database allows anyone to contribute by adding links to blockchain-related code repositories under specific ecosystems.

![Crypto Ecosystems Repository](/images/cr-ce.webp)

Ecosystem .toml files contain lists of all known repositories with at least some open-source code deployed on a corresponding blockchain.

## Quality vs Quantity

The report analyzes the number of commits, full-time developers, monthly active developers, and more. Electric Capital maintains its definitions of a full-time or monthly active developer, its own quality assurance standards, and the right to alter the calculation methodology, so some metrics may change over time. Github activity can be manipulated, so these top-down measures are required to prevent low-quality actors and ecosystems from tipping the scale.

Repository metrics don't always capture development quality—a high commit count might reflect minor updates rather than substantial development. At the same time, a single high-quality contribution could significantly impact a repository or an ecosystem. Several other factors complicate the quality assessment of this open-source analysis.

To name a few:

- **Code Accessibility**: Many projects maintain hybrid repositories where core functionality remains private while only specific components are public
- **Repository Maintenance**: A repository might show recent commits but be in maintenance mode
- **Code Reuse and Forking**: The prevalence of forked repositories and templated code can inflate repository counts
- **Documentation Quality**: The presence and quality of documentation significantly impacts project usability

With Electric Capital's report's database as the foundation, one can track the number of developers and repositories, but understanding the impact and quality of the codebases involved requires a more granular approach that considers details on the repositories and developers themselves.

**Crypto-Repos takes this more granular approach by offering detailed views of repository metrics, contributor activity, and in-depth analysis features.** This allows users to move beyond simple quantitative metrics and gain a deeper understanding of the quality and impact of the code and contributions within each project and ecosystem.

# Crypto-Repos

Crypto-Repos zooms in on Electric Capital's dataset and provides search capabilities to connect disparate repositories across .toml files and pinpoint the most relevant code and their contributors.

## Current Platform

- **Full index** of [aptos.toml](https://github.com/electric-capital/crypto-ecosystems/blob/master/data/ecosystems/a/aptos.toml), [sui.toml](https://github.com/electric-capital/crypto-ecosystems/blob/master/data/ecosystems/s/sui.toml), and [base.toml](https://github.com/electric-capital/crypto-ecosystems/blob/master/data/ecosystems/b/base.toml) files — totaling 10,523 repositories and 7,457 contributors
- Searchable [Repository](https://crypto-repos.com/) page with advanced filtering by ecosystem, language, stars, and keywords
- Searchable [Contributors](https://crypto-repos.com/contributors) page featuring ranked profiles, contribution metrics, and complete repository histories

### Implementation

- **Front-End**: [@nextjs](https://nextjs.org), [@tailwindcss](https://tailwindcss.com)
- **Back-End**: [@neondatabase](https://neon.tech), [@HasuraHQ](https://hasura.io)
- **Data-Collection**: [@ElectricCapital](https://github.com/electric-capital/crypto-ecosystems), [@github](https://github.com)
- **Deployment**: [@vercel](https://vercel.com)

### Next Steps

- **Resolve known errors**: Some repositories don't show all contributor information, and some contributor details include forked repositories, duplicating their contribution counts
- **Data Updates**: Implement weekly update schedule for .toml data
- **Data Expansion**: Add support for 200+ additional blockchain ecosystems using Github's API and the crypto-ecosystems dataset
- **Search Enhancement**: Optimize search using Hasura and vector embeddings. Refactor known redundancies/issues
- **Categorization v1**: Build a filter system to sort categories for repositories
- **Visualization**: Build proper developer profiles with detailed programming language usage statistics
- **Verified Page**: Build blockchain-specific pages featuring verified open-source projects, their source code, and their top contributors

## Future Plans

### Community Building

- Highlighting active projects and contributors (Repo/Contributor of the Day)
- Creating visibility for emerging technologies
- Creating insightful reports on ecosystem trends
- Supporting community-driven categorization of projects to define new and incumbent crypto verticals

### Developer Talent Platform

- Reputation-based skill verification
- Ecosystem-specific bounty boards
- Team building tools

Try it out at [crypto-repos.com](https://crypto-repos.com).
