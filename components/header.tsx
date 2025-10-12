'use client';

import DesktopNavigation from '@/components/navigation/DesktopNavigation';
import LanguageSwitcher from '@/components/navigation/LanguageSwitcher';
import LogoSection from '@/components/navigation/LogoSection';
import MobileMenu from '@/components/navigation/MobileMenu';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useSCCStore } from '@/lib/store/sccStore';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useSCCStore();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // 히어로 섹션은 min-h-screen이므로 뷰포트 높이의 80% 이상 스크롤해야 색상 변경
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY;
          const threshold = viewportHeight * 0.8;
          const isScrolledNow = scrollY > threshold;

          setIsScrolled(isScrolledNow);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="navigation"
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-300',
              isScrolled ? 'h-16' : 'h-20'
            )}
          >
            {/* Logo and Company Name */}
            <LogoSection isScrolled={isScrolled} />

            {/* Desktop Navigation */}
            <DesktopNavigation
              className="hidden md:flex"
              isScrolled={isScrolled}
            />

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <LanguageSwitcher className="hidden sm:flex" />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="md:hidden"
                aria-label={language === 'zh' ? '打开菜单' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
