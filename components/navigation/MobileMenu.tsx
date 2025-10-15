'use client';

import { Button } from '@/components/ui/button';
import { handleKeyboardEvent, scrollToSection } from '@/lib/client-utils';
import { useSCCStore } from '@/store/scc_store';
import {
    Globe,
    HelpCircle,
    Home,
    MessageCircle,
    Package,
    Settings,
    X,
} from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  className = '',
}: MobileMenuProps) {
  const { language, setLanguage } = useSCCStore();

  const navigationItems = [
    {
      id: 'hero',
      en: 'Home',
      zh: '首页',
      icon: Home,
    },
    {
      id: 'services',
      en: 'Services',
      zh: '服务',
      icon: Settings,
    },
    {
      id: 'how-it-works',
      en: 'How It Works',
      zh: '工作流程',
      icon: Settings,
    },
    {
      id: 'why-choose-us',
      en: 'Why Choose Us',
      zh: '选择我们的理由',
      icon: Settings,
    },
    {
      id: 'packages',
      en: 'Packages',
      zh: '套餐',
      icon: Package,
    },
    {
      id: 'faq',
      en: 'FAQ',
      zh: '常见问题',
      icon: HelpCircle,
    },
    {
      id: 'get-started',
      en: 'Contact',
      zh: '联系我们',
      icon: MessageCircle,
    },
  ];

  const handleNavClick = (id: string) => {
    // 햅틱 피드백 (지원하는 기기에서)
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // 50ms 진동
    }

    scrollToSection(id);
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    handleKeyboardEvent(event, {
      onEscape: onClose,
      allowedKeys: ['Escape', 'Enter', ' '],
    });
  };

  const handleLanguageToggle = () => {
    // 햅틱 피드백 (지원하는 기기에서)
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Content */}
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h2 className="text-lg font-semibold text-white drop-shadow-md">
            {language === 'zh' ? '导航菜单' : 'Navigation Menu'}
          </h2>
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLanguageToggle}
              onKeyDown={handleKeyDown}
              aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
              className="hover:bg-white/20 active:scale-95 touch-manipulation"
            >
              <Globe className="h-5 w-5" />
            </Button>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              onKeyDown={handleKeyDown}
              aria-label={language === 'zh' ? '关闭菜单' : 'Close menu'}
              className="hover:bg-muted active:scale-95 touch-manipulation"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav
          className="flex-1 px-4 py-6"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-2 sm:space-y-3">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    onKeyDown={handleKeyDown}
                    className="w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 rounded-xl text-white hover:bg-white/20 hover:text-[#D4AF37] active:bg-white/30 active:scale-95 transition-all duration-200 font-medium group touch-manipulation"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                    aria-label={`Navigate to ${
                      language === 'zh' ? item.zh : item.en
                    } section`}
                    tabIndex={0}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-base font-semibold">
                        {language === 'zh' ? item.zh : item.en}
                      </div>
                      <div className="text-sm text-white/70 group-hover:text-[#D4AF37]/80">
                        {language === 'zh'
                          ? `前往${item.zh}页面`
                          : `Go to ${item.en} page`}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          <div className="text-center space-y-2">
            <p className="text-sm text-white/80">
              {language === 'zh'
                ? '按 ESC 键关闭菜单'
                : 'Press ESC to close menu'}
            </p>
            <p className="text-xs text-white/60">
              {language === 'zh'
                ? '💡 提示: 上下 스와이프로 섹션 이동 가능'
                : '💡 Tip: Swipe up/down to navigate sections'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
