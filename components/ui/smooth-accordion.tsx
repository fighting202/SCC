'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface SmoothAccordionProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function SmoothAccordion({
  title,
  children,
  className = '',
  titleClassName = '',
  contentClassName = '',
  isOpen = false,
  onToggle,
}: SmoothAccordionProps) {
  const [isInternalOpen, setIsInternalOpen] = useState(isOpen);

  const isActuallyOpen = onToggle ? isOpen : isInternalOpen;
  const handleToggle = onToggle || (() => setIsInternalOpen(!isInternalOpen));

  return (
    <div className={`border rounded-lg ${className}`}>
      <motion.button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 ${titleClassName}`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isActuallyOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isActuallyOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <motion.div
              className={`p-4 pt-0 text-gray-600 dark:text-gray-300 ${contentClassName}`}
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
