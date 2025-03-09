'use client';

import React, { memo, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { HeroBackground } from '../utils/BackgroundComponents';
import { Button } from '@/components/misc';
import { heroContent } from '../constants/hero';
import { fadeInUpAnimation, fadeInAnimation } from '../utils/animations';

const ChainLogo = memo<{ logo: string }>(({ logo }) => (
  <motion.div
    className="chain-logo w-12 h-12 rounded-full bg-black/40 border border-white/10 p-0.5 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 hover:scale-105 shadow-lg"
    {...fadeInAnimation()}
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

const ChainLogos = memo(() => (
  <motion.div className="flex items-center gap-6" {...fadeInUpAnimation()}>
    {heroContent.chainLogos.map((logo) => (
      <ChainLogo key={logo} logo={logo} />
    ))}
  </motion.div>
));
ChainLogos.displayName = 'ChainLogos';

type ContentSectionProps = {
  title: string;
  content: React.ReactNode;
  children?: React.ReactNode;
};

const ContentSection = memo<ContentSectionProps>(({ title, content, children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="mb-12 mt-16 lg:mt-0"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-mono mb-6 whitespace-nowrap font-medium tracking-tight text-white"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-base sm:text-lg text-white/70 leading-relaxed font-light tracking-wide mb-6 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {content}
      </motion.p>
      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
});
ContentSection.displayName = 'ContentSection';

const StickyHeader = memo(() => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'visible';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
      {...fadeInUpAnimation()}
    >
      <motion.h1
        className="text-3xl sm:text-4xl mb-2 sm:mb-4 whitespace-nowrap font-mono font-light tracking-[-0.03em] text-white"
        style={{ textShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        {...fadeInAnimation(0.2)}
      >
        {heroContent.name}
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg mb-4 tracking-wide text-white/60 font-light flex flex-wrap items-center gap-1.5"
        {...fadeInAnimation(0.3)}
      >
        <span className="hidden sm:inline">{heroContent.title}</span>
        <span className="sm:hidden">{heroContent.mobileTitle}</span>
        <a
          href={heroContent.aptosLink}
          className="text-accent hover:text-accent/80 transition-colors duration-300 font-normal inline-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' Aptos'}
        </a>
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
        {...fadeInAnimation(0.4)}
      >
        <Button
          variant="primary"
          onClick={handleOpenModal}
          size="md"
          className="sm:!px-3 sm:!py-1.5 sm:!text-sm sm:!min-h-[36px]"
        >
          Connect
        </Button>
        <Link href="/bio" passHref>
          <Button
            variant="secondary"
            size="md"
            className="sm:!px-3 sm:!py-1.5 sm:!text-sm sm:!min-h-[36px]"
          >
            Bio
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
});
StickyHeader.displayName = 'StickyHeader';

const MainContent = memo(() => {
  const isFirstSection = useCallback(
    (title: string) => title === heroContent.sections?.[0]?.title,
    []
  );

  return (
    <motion.div className="min-h-screen bg-background lg:bg-transparent flex flex-col justify-center">
      <div className="px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 max-w-screen-2xl">
        {heroContent.sections?.map((section) => {
          const showChainLogos = isFirstSection(section.title);
          return (
            <ContentSection key={section.title} title={section.title} content={section.content}>
              {showChainLogos && <ChainLogos />}
            </ContentSection>
          );
        })}
      </div>
    </motion.div>
  );
});
MainContent.displayName = 'MainContent';

const HeroContent = memo(() => (
  <>
    <StickyHeader />
    <MainContent />
  </>
));
HeroContent.displayName = 'HeroContent';

const Hero = memo(() => (
  <motion.section className="relative min-h-screen overflow-visible" {...fadeInUpAnimation()}>
    <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 z-10 bg-background" />
    <motion.div className="w-full lg:w-1/2 flex flex-col relative z-20" {...fadeInAnimation(0.2)}>
      <HeroContent />
    </motion.div>
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
      <HeroBackground />
    </div>
  </motion.section>
));
Hero.displayName = 'Hero';

export default Hero;
