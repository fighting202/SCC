'use client';

import { scrollToSection } from '@/lib/client-utils';
import { useSCCStore } from '@/lib/store/sccStore';
import { cn } from '@/lib/utils';

interface DesktopNavigationProps {
  className?: string;
  isScrolled?: boolean;
}

export default function DesktopNavigation({
  className = '',
  isScrolled = false,
}: DesktopNavigationProps) {
  const { language } = useSCCStore();

  const navigationItems = [
    {
      id: 'services',
      en: 'Services',
      zh: '服务',
    },
    {
      id: 'how-it-works',
      en: 'How It Works',
      zh: '工作流程',
    },
    {
      id: 'packages',
      en: 'Packages',
      zh: '套餐',
    },
    {
      id: 'faq',
      en: 'FAQ',
      zh: '常见问题',
    },
    {
      id: 'get-started',
      en: 'Contact',
      zh: '联系我们',
    },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
  };

  return (
    <nav
      className={`hidden md:flex items-center space-x-1 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {navigationItems.map(item => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={cn(
            'transition-all duration-300 font-medium text-sm lg:text-base rounded-md px-3 py-2 hover:text-[#D4AF37] hover:scale-105 hover:drop-shadow-lg',
            isScrolled
              ? 'text-[#2C5F7C] dark:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
              : 'text-white hover:bg-white/10'
          )}
          style={{
            textShadow: '0 0 0 transparent',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.textShadow =
              '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
            e.currentTarget.style.transform = 'scale(1.05) rotate(1deg)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.textShadow = '0 0 0 transparent';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
          aria-label={`Navigate to ${
            language === 'zh' ? item.zh : item.en
          } section`}
        >
          {language === 'zh' ? item.zh : item.en}
        </button>
      ))}
    </nav>
  );
}
