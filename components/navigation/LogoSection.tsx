'use client';

import { useSCCStore } from '@/lib/store/sccStore';
import { cn } from '@/lib/utils';

interface LogoSectionProps {
  isScrolled: boolean;
}

export default function LogoSection({ isScrolled }: LogoSectionProps) {
  const { language } = useSCCStore();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
      aria-label={language === 'zh' ? '返回首页' : 'Go to Home'}
    >
      <div
        className={cn(
          'scc-logo-image hover:rotate-3 transition-all duration-300 relative flex-shrink-0 flex items-center justify-center mr-3',
          isScrolled ? 'w-12 h-12' : 'w-16 h-16'
        )}
      >
        <img
          src="/scc-logo/scc-letter logo_배경다크.png"
          alt="SCC Logo"
          className="dark:brightness-150 dark:contrast-125 dark:drop-shadow-lg w-full h-full object-contain"
        />
      </div>
      <div className="hidden sm:block">
        <h1
          className={cn(
            'font-bold drop-shadow-lg transition-all duration-300 hover:text-[#D4AF37]',
            isScrolled
              ? 'text-xl text-[#2C5F7C] dark:text-white'
              : 'text-2xl text-white'
          )}
        >
          Seoul Care Concierge
        </h1>
        <p
          className={cn(
            'drop-shadow-md transition-all duration-300 cursor-pointer hover:text-[#D4AF37]',
            isScrolled
              ? 'text-xs text-[#2C5F7C]/80 dark:text-gray-300'
              : 'text-sm text-white/90'
          )}
        >
          {language === 'zh'
            ? '韩国医疗美容管家服务'
            : 'Medical & Beauty Tourism'}
        </p>
      </div>
    </button>
  );
}
