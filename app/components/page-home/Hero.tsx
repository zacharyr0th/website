import React, { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackgroundSVG from './HeroBackground';
import { heroContent } from '@/lib/constants';
import ConnectModal from '../../components/common/Connect';

// Extract button styles to prevent recreation
const buttonStyles = {
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    boxShadow: 'var(--box-shadow)',
  },
  secondary: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-secondary)',
  },
} as const;

// Memoize Button component
const Button = memo<{
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}>(({ variant, children, onClick }) => (
  <button
    className="px-6 py-2 rounded-full transition-colors duration-300"
    style={buttonStyles[variant]}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
));
Button.displayName = 'Button';

// Memoize ChainLogo component with proper type
const ChainLogo = memo<{ logo: string }>(({ logo }) => (
  <div className="w-18 h-18 rounded-full overflow-hidden bg-background flex items-center justify-center shadow-custom">
    <Image
      src={`/logos/${logo}-logo.webp`}
      alt={`${logo.charAt(0).toUpperCase() + logo.slice(1)} Logo`}
      width={50}
      height={50}
      className={`object-contain ${logo === 'bitcoin' ? 'scale-[2]' : ''}`}
    />
  </div>
));
ChainLogo.displayName = 'ChainLogo';

// Memoize ChainLogos component
const ChainLogos = memo(() => (
  <div className="flex justify-between items-center max-w-xs py-2">
    {heroContent.chainLogos.map((logo) => (
      <ChainLogo key={logo} logo={logo} />
    ))}
  </div>
));
ChainLogos.displayName = 'ChainLogos';

// Memoize ContentSection
const ContentSection = memo<{
  title: string;
  content: React.ReactNode;
  children?: React.ReactNode;
}>(({ title, content, children }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 text-text-primary">{title}</h2>
    <p className="text-base max-w-xl leading-relaxed mb-6 text-text-secondary">{content}</p>
    {children}
  </div>
));
ContentSection.displayName = 'ContentSection';

// Memoize MainContent
const MainContent = memo(() => (
  <div className="lg:bg-transparent bg-background w-screen relative left-1/2 -translate-x-1/2">
    <div className="ml-12 mr-6 pt-10">
      {heroContent.sections?.map((section) => (
        <ContentSection key={section.title} title={section.title} content={section.content}>
          {section.title === heroContent.sections?.[0]?.title && <ChainLogos />}
        </ContentSection>
      ))}
    </div>
  </div>
));
MainContent.displayName = 'MainContent';

// Optimize StickyHeader with useCallback
const StickyHeader = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="h-screen p-4 mb-24 flex flex-col justify-center sticky top-0 ml-12">
      <h1 className="text-6xl font-bold leading-tight tracking-tighter text-text-primary pt-12 lg:pt-24">
        {heroContent.name}
      </h1>
      <p className="text-lg mb-6 max-w-xl tracking-wide text-text-secondary">
        {heroContent.title}{' '}
        <a
          href={heroContent.aptosLink}
          className="hover:underline transition-colors duration-300 text-accent"
        >
          Aptos Labs
        </a>
      </p>
      <div className="flex space-x-4">
        <Button variant="primary" onClick={handleOpenModal}>
          Connect
        </Button>
        <Link href="/bio" passHref>
          <Button variant="secondary">Bio</Button>
        </Link>
      </div>
      <ConnectModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
});
StickyHeader.displayName = 'StickyHeader';

// Memoize HeroContent
const HeroContent = memo(() => (
  <>
    <StickyHeader />
    <MainContent />
  </>
));
HeroContent.displayName = 'HeroContent';

// Main Hero component
const Hero = memo(() => (
  <section className="relative min-h-[200vh]">
    <div
      className="hidden lg:block absolute inset-y-0 left-0 w-1/2 z-10"
      style={{ backgroundColor: 'var(--color-background)' }}
    />
    <div className="w-full lg:w-1/2 flex flex-col relative z-20">
      <HeroContent />
    </div>
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[200vh] block">
      <BackgroundSVG />
    </div>
  </section>
));
Hero.displayName = 'Hero';

export default Hero;
