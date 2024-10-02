import React from 'react';
import BackgroundSVG from './BackgroundSVG';

const Hero: React.FC = () => (
  <section>
    <div className="flex flex-row min-h-[200vh]">
      <div className="w-1/2 flex flex-col">
        <div className="h-screen flex flex-col justify-center sticky top-0 ml-8">
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

        <div className="ml-8 mr-6 mt-10">
          <div className="mb-12">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Facilitating Innovation
            </h2>
            <p
              className="text-base max-w-xl leading-relaxed mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We actively invest in the boldest and most pioneering founders, as well as emerging
              fund managers with differentiated investment theses and value propositions.
            </p>
            <p
              className="text-base max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              By leveraging our business partnerships with Bybit, Mantle, and a broad network of
              portfolio companies and funds, we help founders transform their groundbreaking ideas
              into reality.
            </p>
          </div>

          <div>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Cross-chain Experience
            </h2>
            <p
              className="text-base max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              anchor capital providers are the co-founders of Bybit. Mirana also acts as the
              Operating Fund Partner for the Mantle Eco Fund, strategically investing to catalyze
              the growth of the Mantle Ecosystem.
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
