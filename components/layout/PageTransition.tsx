'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const variants = {
    initialState: {
      opacity: 0,
      clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
    },
    animateState: {
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    },
    exitState: {
      opacity: 0,
      clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
