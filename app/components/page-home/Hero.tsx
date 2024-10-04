import React from 'react';
import BackgroundSVG from './BackgroundSVG';
import Image from 'next/image';

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
                color: 'var(--color-white)',
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
              Hyper-growth Experience
            </h2>
            <p
              className="text-base max-w-xl leading-relaxed mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Having been involved in crypto since 2019, I&apos;ve had the privilege to work in 4 of the highest-growing ecosystems of all time - Bitcoin, Ethereum, Solana, and Aptos.
            </p>
            <div className="flex justify-between items-center max-w-xs py-2">
              {['bitcoin', 'ethereum', 'solana', 'aptos'].map((logo) => (
                <div
                  key={logo}
                  className="w-18 h-18 rounded-full overflow-hidden bg-background flex items-center justify-center"
                  style={{ boxShadow: 'var(--box-shadow)' }}
                >
                  <Image
                    src={`/logos/${logo}-logo.webp`}
                    alt={`${logo.charAt(0).toUpperCase() + logo.slice(1)} Logo`}
                    width={60}
                    height={60}
                    className="object-contain"
                    style={logo === 'bitcoin' ? { transform: 'scale(2)' } : {}}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              On-chain PMF
            </h2>
            <p
              className="text-base max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              As a builder, power user, and seasoned investor, I specialize in identifying product-market fit and advising on how to use on-chain technology to build superior products and services.
            </p>
          </div>


          <div className="my-12">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              High Signal
            </h2>
            <p
              className="text-base max-w-xl leading-relaxed mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
               Occasionally, I turn complex concepts across technology and finance into actionable insights. 
              </p>
              <p
              className="text-base max-w-xl leading-relaxed mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >Read some of my work here.</p>
      
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
