'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

interface Experience {
  company: string;
  logo: string;
  roles: {
    title: string;
    period: string;
    location: string;
    description: string;
  }[];
}

interface Skill {
  name: string;
  subSkills: string[];
}

const education: Education[] = [
  {
    degree: '',
    institution: 'DePaul University',
    year: '2015 - 2018',
    location: 'Chicago, IL',
  },
];

const experiences: Experience[] = [
  {
    company: 'Aptos Labs',
    logo: '/images/logos/aptos-labs-logo.webp',
    roles: [
      {
        title: 'Head of Growth, DeFi & AI',
        period: 'Nov 2023 - Present',
        location: 'San Francisco, CA',
        description:
          '• Leading growth strategies for DeFi and AI verticals\n• Driving ecosystem expansion and adoption\n• Collaborating with cross-functional teams to develop innovative blockchain solutions',
      },
      {
        title: 'Developer Ecosystems Manager',
        period: 'May 2023 - Oct 2023',
        location: 'San Francisco, CA',
        description:
          '• Managed relationships with DeFi projects building on Aptos\n• Facilitated technical integrations and provided support to developers\n• Organized developer-focused events and hackathons to grow the Aptos ecosystem',
      },
    ],
  },
  {
    company: 'Solrise Finance',
    logo: '/images/logos/solrise-logo.webp',
    roles: [
      {
        title: 'Product Manager',
        period: 'Feb 2021 - Nov 2022',
        location: 'Chicago, IL',
        description:
          '• Led product strategy and managed technical documentation for innovative blockchain solutions\n• Bridged the gap between new users and blockchain wallets by conducting extensive user research',
      },
      {
        title: 'Technical Writer',
        period: 'Apr 2020 - Jan 2021',
        location: 'Chicago, IL',
        description:
          '• Developed comprehensive technical documentation for Solrise Finance products and the Solana ecosystem\n• Created user guides, API documentation, and educational content for blockchain and DeFi concepts',
      },
    ],
  },
  {
    company: 'N2 Communications',
    logo: '/images/logos/n2-logo.webp',
    roles: [
      {
        title: 'Senior Analyst',
        period: 'Jan 2018 - Dec 2021',
        location: 'Chicago, IL',
        description:
          '• Played a pivotal role in capital raising initiatives for specialized private equity ventures\n• Enhanced investor relations through comprehensive monthly reports\n• Developed expertise in analyzing global regulatory landscapes, particularly in the crypto sector',
      },
    ],
  },
];

const skills: Skill[] = [
  {
    name: 'Programming',
    subSkills: ['Full Stack Development', 'Quantitative Trading', 'Smart Contracts'],
  },
  {
    name: 'Ecosystem Growth',
    subSkills: [
      'Relationship Development',
      'Grants & Investments',
      'Incentive Campaigns',
      'Community Building',
    ],
  },
  {
    name: 'Product Management',
    subSkills: ['Competitive Analysis', 'Product Strategy', 'User Research'],
  },
  {
    name: 'Financial Analysis',
    subSkills: ['Investment Strategies', 'Macro Insights', 'Market Trends'],
  },
];

const ResumePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="home-container">
      {/* SubHeader */}
      <header className="py-6 mb-8">
        <div className="container flex justify-between items-center">
          <h1 className="text-4xl font-bold">Resume</h1>
        </div>
      </header>

      {/* Main content */}
      <main
        className={`container transition-opacity duration-500 ease-in ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="text-left">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="mt-4">
                  <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                  <p className="text-lg text-gray-300">{edu.location}</p>
                  <p className="text-sm text-gray-400">{edu.year}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
              Skills & Expertise
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="bg-inherit">
                  <h4 className="text-lg font-bold text-white mb-2">{skill.name}</h4>
                  <ul className="space-y-1">
                    {skill.subSkills.map((subSkill, subIndex) => (
                      <li key={subIndex} className="text-gray-300 text-sm flex items-center">
                        <span className="mr-2 text-pastel-blue">•</span>
                        {subSkill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 text-left">
            <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
              Professional Experience
            </h3>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-inherit p-2 transition-all duration-300 hover:bg-gray-750 mb-4"
              >
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-white">{exp.company}</h4>
                  </div>
                </div>
                <div>
                  {exp.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="mb-2">
                      <h5 className="text-lg font-semibold text-white">{role.title}</h5>
                      <p className="text-sm text-gray-400">
                        {role.period} | {role.location}
                      </p>
                      <p className="text-gray-300 whitespace-pre-line mt-1">{role.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumePage;
