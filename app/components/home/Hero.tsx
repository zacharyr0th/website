import React, { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import BackgroundSVG from './HeroBackground';
import { heroContent } from '@/app/lib/constants/constants';
import ConnectModal from '../common/Connect';
import { Button } from '../common/Button';

const ChainLogo = memo<{ logo: string }>(({ logo }) => (
  <div className="chain-logo">
    <Image
      src={`/logos/${logo}-logo.webp`}
      alt={`${logo.charAt(0).toUpperCase() + logo.slice(1)} Logo`}
      width={48}
      height={48}
      className="w-full h-full object-contain"
      loading="eager"
      priority
      sizes="48px"
    />
  </div>
));
ChainLogo.displayName = 'ChainLogo';

const ChainLogos = memo(() => (
  <div className="flex items-center gap-6">
    {heroContent.chainLogos.map((logo) => (
      <ChainLogo key={logo} logo={logo} />
    ))}
  </div>
));
ChainLogos.displayName = 'ChainLogos';

type ContentSectionProps = {
  title: string;
  content: React.ReactNode;
  children?: React.ReactNode;
};

const ContentSection = memo<ContentSectionProps>(
  ({ title, content, children }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-text-primary tracking-tight">{title}</h2>
      <p className="text-base max-w-xl leading-relaxed mb-6 text-text-secondary">{content}</p>
      {children}
    </div>
  )
);

const StickyHeader = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="h-screen px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 flex flex-col justify-center sticky top-0 z-30">
      <h1 className="text-4xl sm:text-6xl font-normal leading-tight tracking-tight text-text-primary mb-4">
        {heroContent.name}
      </h1>
      <p className="text-base sm:text-lg mb-6 max-w-xl tracking-tight text-text-secondary font-normal">
        {heroContent.title}{' '}
        <a
          href={heroContent.aptosLink}
          className="hover:underline transition-colors duration-300 text-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aptos Labs
        </a>
      </p>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Button variant="primary" onClick={handleOpenModal} size="md">
          Connect
        </Button>
        <Button variant="secondary" onClick={() => window.location.href = '/bio'} size="md">
          Bio
        </Button>
      </div>
      <ConnectModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
});

const MainContent = memo(() => {
  const isFirstSection = useCallback(
    (title: string) => title === heroContent.sections?.[0]?.title,
    []
  );

  return (
    <div className="h-screen lg:bg-transparent bg-background flex flex-col justify-center">
      <div className="px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 max-w-screen-2xl mx-auto">
        {heroContent.sections?.map((section) => {
          const showChainLogos = isFirstSection(section.title);
          
          return (
            <ContentSection 
              key={section.title} 
              title={section.title} 
              content={section.content}
            >
              {showChainLogos && <ChainLogos />}
            </ContentSection>
          );
        })}
      </div>
    </div>
  );
});

const HeroContent = memo(() => (
  <>
    <StickyHeader />
    <MainContent />
  </>
));
HeroContent.displayName = 'HeroContent';

const Hero = memo(() => (
  <section className="relative min-h-[200vh]">
    <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 z-10 bg-background" />
    <div className="w-full lg:w-1/2 flex flex-col relative z-20">
      <HeroContent />
    </div>
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[200vh] max-lg:opacity-20">
      <BackgroundSVG />
    </div>
  </section>
));
Hero.displayName = 'Hero';

export default Hero;
