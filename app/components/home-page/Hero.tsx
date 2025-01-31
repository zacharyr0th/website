'use client';

import React, { memo, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import BackgroundSVG from './backgrounds/HeroBackground';
import { ActionButton } from '../buttons';
import { heroContent } from './constants';
import { pageTransition, sectionTransition } from '../../lib/animations';

const ChainLogo = memo<{ logo: string }>(({ logo }) => (
  <motion.div 
    className="chain-logo w-12 h-12 rounded-full bg-black/40 border border-white/10 p-0.5 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 hover:scale-105 shadow-lg" 
    {...sectionTransition}
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
  <motion.div className="flex items-center gap-6" {...pageTransition}>
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
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h2
        className="text-2xl font-bold mb-4 text-text-primary tracking-tight"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-base max-w-xl leading-relaxed mb-6 text-text-secondary"
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
  }, []);

  const handleOpenModal = useCallback(() => {
    window.dispatchEvent(new CustomEvent('openConnectModal'));
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 flex flex-col justify-center sticky top-0 z-30">
        <div className="opacity-0">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="h-screen px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 flex flex-col justify-center sticky top-0 z-30"
      {...pageTransition}
    >
      <motion.h1
        className="text-4xl sm:text-6xl font-normal leading-tight tracking-tight text-text-primary mb-4"
        {...sectionTransition}
      >
        {heroContent.name}
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg mb-6 max-w-xl tracking-tight text-text-secondary font-normal"
        {...sectionTransition}
      >
        {heroContent.title}{' '}
        <a
          href={heroContent.aptosLink}
          className="hover:underline transition-colors duration-300 text-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aptos Labs
        </a>
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
        {...sectionTransition}
      >
        <ActionButton variant="primary" onClick={handleOpenModal} size="md">
          Connect
        </ActionButton>
        <Link href="/bio" passHref>
          <ActionButton variant="secondary" size="md">
            Bio
          </ActionButton>
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

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <motion.div
      className="h-screen lg:bg-transparent bg-background flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <div className="px-6 sm:px-12 ml-4 sm:ml-8 lg:ml-16 max-w-screen-2xl mx-auto">
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
  <motion.section className="relative min-h-[200vh]" {...pageTransition}>
    <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 z-10 bg-background" />
    <motion.div className="w-full lg:w-1/2 flex flex-col relative z-20" {...sectionTransition}>
      <HeroContent />
    </motion.div>
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[200vh] opacity-50">
      <BackgroundSVG />
    </div>
  </motion.section>
));
Hero.displayName = 'Hero';

export default Hero;
