'use client';

import { Button } from '@/components/ui/button';
import { handleKeyboardEvent } from '@/lib/client-utils';
import { useSCCStore } from '@/lib/store/sccStore';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({
  className = '',
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useSCCStore();

  const handleLanguageChange = (newLanguage: 'en' | 'zh') => {
    setLanguage(newLanguage);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    newLanguage: 'en' | 'zh'
  ) => {
    handleKeyboardEvent(event, {
      onEnter: () => handleLanguageChange(newLanguage),
      onSpace: () => handleLanguageChange(newLanguage),
      allowedKeys: ['Enter', ' '],
    });
  };

  return (
    <div
      className={`flex items-center space-x-2 ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Button
        variant={language === 'en' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => handleLanguageChange('en')}
        onKeyDown={e => handleKeyDown(e, 'en')}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
        className={`min-w-[60px] ${
          language === 'en'
            ? 'bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white'
            : 'bg-white/90 hover:bg-white text-gray-900 hover:text-[#D4AF37] border-gray-300 hover:border-[#D4AF37] dark:bg-white/20 dark:hover:bg-white/30 dark:text-white dark:hover:text-[#D4AF37] dark:border-white/30'
        }`}
      >
        English
      </Button>
      <Button
        variant={language === 'zh' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => handleLanguageChange('zh')}
        onKeyDown={e => handleKeyDown(e, 'zh')}
        aria-pressed={language === 'zh'}
        aria-label="Switch to Chinese"
        className={`min-w-[60px] ${
          language === 'zh'
            ? 'bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white'
            : 'bg-white/90 hover:bg-white text-gray-900 hover:text-[#D4AF37] border-gray-300 hover:border-[#D4AF37] dark:bg-white/20 dark:hover:bg-white/30 dark:text-white dark:hover:text-[#D4AF37] dark:border-white/30'
        }`}
      >
        中文
      </Button>
    </div>
  );
}
