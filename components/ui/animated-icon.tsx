'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedIconProps {
  children: ReactNode;
  animation?: 'bounce' | 'rotate' | 'pulse' | 'scale' | 'shake' | 'float';
  className?: string;
  delay?: number;
}

export function AnimatedIcon({
  children,
  animation = 'bounce',
  className = '',
  delay = 0,
}: AnimatedIconProps) {
  const getAnimationProps = () => {
    const baseProps = {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    };

    switch (animation) {
      case 'bounce':
        return {
          ...baseProps,
          whileHover: { y: [-5, -10, -5] },
        };

      case 'rotate':
        return {
          ...baseProps,
          whileHover: { rotate: 360 },
        };

      case 'pulse':
        return {
          ...baseProps,
          whileHover: { scale: [1, 1.2, 1] },
        };

      case 'scale':
        return {
          ...baseProps,
          whileHover: { scale: 1.1 },
        };

      case 'shake':
        return {
          ...baseProps,
          whileHover: { x: [0, -5, 5, -5, 5, 0] },
        };

      case 'float':
        return {
          ...baseProps,
          animate: {
            ...baseProps.animate,
            y: [0, -10, 0],
          },
          whileHover: { scale: 1.1 },
        };

      default:
        return baseProps;
    }
  };

  return (
    <motion.div className={className} {...getAnimationProps()}>
      {children}
    </motion.div>
  );
}
