'use client';

import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { HeroBackground } from '../utils/BackgroundComponents';
import { Button } from 'components/common';
import { useMounted } from '@/hooks/useMounted';
import { animations, useScrollAnimation } from '@/lib/animations';

const heroContent = {
  name: 'Zachary Roth',
  title: 'Builder, Writer, & Musician',
  mobileTitle: 'Builder, Writer, & Musician',
  sections: [
    {
      title: 'Builder',
      content:
        'Curious analyst and builder with experience across the Bitcoin, Ethereum, Solana, and Aptos ecosystems.',
      backgroundColor: 'var(--color-primary)',
    },
    {
      title: 'Market Strategist',
      content:
        'My focus involves identifying market opportunities and advising teams on how to utilize on-chain solutions to improve their products and services. ',
      backgroundColor: 'var(--color-secondary)',
    },
    {
      title: 'Writer',
      content:
        'I write about technology and finance, bringing a wide-ranging perspective to each topic.',
      backgroundColor: 'var(--color-accent)',
    },
  ],
  chainLogos: ['bitcoin', 'ethereum', 'solana', 'aptos'],
} as const;

// Optimization: Move styles to constants to prevent recalculation
const STYLES = {
  shadowStyle: { textShadow: '0 4px 8px rgba(0,0,0,0.1)' } as const,
  buttonStyles: 'sm:!px-3 sm:!py-1.5 sm:!text-sm sm:!min-h-[36px]' as const,
} as const;

const defaultViewport = { once: true, amount: 0.2 } as const;

const ChainLogo = memo<{ logo: string }>(({ logo }) => (
  <motion.div
    className="chain-logo w-12 h-12 rounded-full bg-black/40 border border-white/10 p-0.5 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 hover:scale-105 shadow-lg"
    {...animations.fadeIn()}
    viewport={defaultViewport}
  >
    <Image
      src={`/logos/${logo}-logo.webp`}
      alt={`${logo.charAt(0).toUpperCase() + logo.slice(1)} Logo`}
      width={48}
      height={48}
      className="object-cover w-full h-full rounded-full"
      loading="eager"
      priority
      sizes="48px"
    />
  </motion.div>
));
ChainLogo.displayName = 'ChainLogo';

const ChainLogos = memo(
  () => (
    <motion.div className="flex items-center gap-6" {...animations.fadeInUp()}>
      {heroContent.chainLogos.map((logo) => (
        <ChainLogo key={logo} logo={logo} />
      ))}
    </motion.div>
  ),
  () => true
);
ChainLogos.displayName = 'ChainLogos';

type ContentSectionProps = {
  title: string;
  content: React.ReactNode;
  children?: React.ReactNode;
};

const ContentSection = memo<ContentSectionProps>(({ title, content, children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const scrollAnimation = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className="mb-12 mt-16 lg:mt-0"
      {...scrollAnimation}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-mono mb-6 whitespace-nowrap font-medium tracking-tight text-white"
        {...animations.fadeIn(0.2)}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-lg sm:text-xl text-white/70 leading-relaxed font-light tracking-wide mb-6 max-w-3xl"
        {...animations.fadeIn(0.3)}
      >
        {content}
      </motion.p>
      {children && <motion.div {...animations.fadeIn(0.4)}>{children}</motion.div>}
    </motion.div>
  );
});
ContentSection.displayName = 'ContentSection';

const StickyHeader = memo(() => {
  const mounted = useMounted({
    onMount: () => {
      document.body.style.overflow = 'visible';
    },
    onUnmount: () => {
      document.body.style.overflow = '';
    },
  });

  const handleOpenModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const event = new CustomEvent('openConnectModal', { bubbles: true, cancelable: true });
    window.dispatchEvent(event);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 flex flex-col justify-center">
        <div className="opacity-0">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 flex flex-col justify-center"
      {...animations.fadeInUp()}
    >
      <motion.h1
        className="text-4xl sm:text-5xl mb-3 sm:mb-4 whitespace-nowrap font-mono font-light tracking-[-0.03em] text-white"
        style={STYLES.shadowStyle}
        {...animations.fadeIn(0.2)}
      >
        {heroContent.name}
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl mb-5 tracking-wide text-white/60 font-light flex flex-wrap items-center gap-1.5"
        {...animations.fadeIn(0.3)}
      >
        <span className="hidden sm:inline">{heroContent.title}</span>
        <span className="sm:hidden">{heroContent.mobileTitle}</span>
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
        {...animations.fadeIn(0.4)}
      >
        <Button
          variant="primary"
          onClick={handleOpenModal}
          size="md"
          className={STYLES.buttonStyles}
        >
          Connect
        </Button>
        <Link href="/bio" passHref>
          <Button variant="secondary" size="md" className={STYLES.buttonStyles}>
            Bio
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
});
StickyHeader.displayName = 'StickyHeader';

const MainContent = memo(() => (
  <motion.div className="min-h-screen bg-background lg:bg-transparent flex flex-col justify-center">
    <div className="px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 max-w-screen-2xl">
      {heroContent.sections?.map((section) => (
        <ContentSection key={section.title} title={section.title} content={section.content}>
          {section.title === heroContent.sections?.[0]?.title && <ChainLogos />}
        </ContentSection>
      ))}
    </div>
  </motion.div>
));
MainContent.displayName = 'MainContent';

const HeroContent = memo(() => (
  <>
    <StickyHeader />
    <MainContent />
  </>
));
HeroContent.displayName = 'HeroContent';

const Hero = memo(() => (
  <motion.section className="relative min-h-screen overflow-visible" {...animations.fadeInUp()}>
    <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 z-10 bg-background" />
    <motion.div className="w-full lg:w-1/2 flex flex-col relative z-20" {...animations.fadeIn(0.2)}>
      <HeroContent />
    </motion.div>
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
      <HeroBackground />
    </div>
  </motion.section>
));
Hero.displayName = 'Hero';

export default Hero;
