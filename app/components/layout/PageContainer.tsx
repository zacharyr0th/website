'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const PageContainer: FC<PageContainerProps> = ({ children, className, animate = true }) => {
  const Container = animate ? motion.div : 'div';

  return (
    <div className="content-page">
      <main>
        <Container
          className={cn('content-container', className)}
          {...(animate && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
          })}
        >
          {children}
        </Container>
      </main>
    </div>
  );
};

export default PageContainer;
