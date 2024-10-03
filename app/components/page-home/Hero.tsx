import React from 'react';
import BackgroundSVG from './BackgroundSVG';

const Hero: React.FC = () => (
  <section>
    <div className="flex flex-row min-h-[200vh]">
      <div className="w-1/2 flex flex-col">
        <div className="h-screen flex flex-col justify-center sticky top-0 ml-12">
          <h1
            className="text-6xl font-bold leading-tight tracking-tighter mb-8"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Zachary Roth
          </h1>
          <p
            className="text-lg mb-6 max-w-xl tracking-wide"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Head of Growth, DeFi & AI @{' '}
            <a
              href="https://aptoslabs.com/"
              className="hover:underline transition-colors duration-300"
              style={{ color: 'var(--color-accent)' }}
            >
              Aptos Labs
            </a>
          </p>
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-accent)',
                boxShadow: 'var(--box-shadow)',
              }}
            >
              Connect
            </button>
            <button
              className="px-6 py-2 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-secondary)',
              }}
            >
              Bio
            </button>
          </div>
        </div>

        <div className="ml-12 mr-6 mt-10">
          <div className="mb-12">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Professional Experience
            </h2>
            <p
              className="text-base max-w-xl leading-relaxed mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Currently serving as Head of Growth, DeFi & AI at Aptos Labs (Oct 2023 - Present), following my role as Developer Ecosystems Manager (May 2023 - Sep 2023). At Aptos, I focus on identifying and nurturing groundbreaking projects in the DeFi and AI spaces, involving strategic partnerships and ecosystem development.
            </p>
            <p
              className="text-base max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Previously, as Product Manager at Solrise Finance (Aug 2021 - Jan 2023), I led product strategy for innovative blockchain solutions, enhanced user experiences, and developed comprehensive user-facing content.
            </p>
          </div>

          <div>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Additional Experience
            </h2>
            <p
              className="text-base max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              As Senior Analyst at N2 Communications (Jan 2020 - Jan 2023), I contributed to raising over $2 billion for private equity ventures, enhanced investor relations through comprehensive reporting, and provided strategic guidance on global regulatory landscapes, particularly in the evolving crypto sector.
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 relative h-[200vh]">
        <BackgroundSVG />
      </div>
    </div>
  </section>
);

export default Hero;
