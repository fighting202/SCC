'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TrustBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'pulse' | 'glow' | 'bounce' | 'none';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function TrustBadge({
  children,
  className = '',
  variant = 'pulse',
  intensity = 'medium',
}: TrustBadgeProps) {
  const getAnimationProps = () => {
    const baseProps = {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    };

    switch (variant) {
      case 'pulse':
        return {
          ...baseProps,
          animate: {
            ...baseProps.animate,
            scale: [1, 1.05, 1],
          },
        };

      case 'glow':
        return {
          ...baseProps,
          animate: {
            ...baseProps.animate,
            boxShadow: [
              '0 0 0px rgba(212, 175, 55, 0)',
              '0 0 20px rgba(212, 175, 55, 0.3)',
              '0 0 0px rgba(212, 175, 55, 0)',
            ],
          },
        };

      case 'bounce':
        return {
          ...baseProps,
          animate: {
            ...baseProps.animate,
            y: [0, -5, 0],
          },
        };

      default:
        return baseProps;
    }
  };

  const intensityClasses = {
    subtle: 'opacity-60',
    medium: 'opacity-80',
    strong: 'opacity-100',
  };

  return (
    <motion.div
      className={`${className} ${intensityClasses[intensity]}`}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
}
