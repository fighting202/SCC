'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-700">
      <motion.div
        className="h-full bg-gradient-to-r from-[#2C5F7C] to-[#D4AF37]"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      {/* 모바일에서 더 두꺼운 진행률 표시 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-2 bg-gray-300/50 dark:bg-gray-600/50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#2C5F7C] to-[#D4AF37]"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
