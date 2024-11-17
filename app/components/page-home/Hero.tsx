import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackgroundSVG from './HeroBackground';
import { heroContent } from '@/lib/constants';

const Hero: React.FC = memo(() => (
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

const HeroContent: React.FC = memo(() => (
  <>
    <StickyHeader />
    <MainContent />
  </>
));

HeroContent.displayName = 'HeroContent';

const StickyHeader: React.FC = () => (
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
      <Button variant="primary">Connect</Button>
      <Link href="/bio" passHref>
        <Button variant="secondary">Bio</Button>
      </Link>
    </div>
  </div>
);

const Button: React.FC<{ variant: 'primary' | 'secondary'; children: React.ReactNode }> = ({
  variant,
  children,
}) => {
  const styles = {
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
  };

  return (
    <button
      className={`px-6 py-2 rounded-full transition-colors duration-300`}
      style={variant === 'primary' ? styles.primary : styles.secondary}
    >
      {children}
    </button>
  );
};

const MainContent: React.FC = memo(() => (
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

const ContentSection: React.FC<{
  title: string;
  content: React.ReactNode;
  children?: React.ReactNode;
}> = ({ title, content, children }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 text-text-primary">{title}</h2>
    <p className="text-base max-w-xl leading-relaxed mb-6 text-text-secondary">{content}</p>
    {children}
  </div>
);

const ChainLogos: React.FC = memo(() => (
  <div className="flex justify-between items-center max-w-xs py-2">
    {heroContent.chainLogos.map((logo) => (
      <ChainLogo key={logo} logo={logo} />
    ))}
  </div>
));

ChainLogos.displayName = 'ChainLogos';

const ChainLogo: React.FC<{ logo: string }> = memo(({ logo }) => (
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

export default memo(Hero);
