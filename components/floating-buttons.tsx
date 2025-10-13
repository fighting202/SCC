'use client';

import { Button } from '@/components/ui/button';
import { useSCCStore } from '@/store/scc_store';
import { ArrowUp, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useSCCStore();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
          {/* Home Button */}
          <Button
            onClick={goToHome}
            className="w-12 h-12 rounded-full bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 touch-manipulation"
            aria-label={language === 'zh' ? '返回首页' : 'Back to Home'}
            title={language === 'zh' ? '返回首页' : 'Back to Home'}
          >
            <Home className="w-5 h-5" />
          </Button>

          {/* Back to Top Button */}
          <Button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-[#D4AF37] hover:bg-[#B8941F] text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 touch-manipulation"
            aria-label={language === 'zh' ? '返回顶部' : 'Back to Top'}
            title={language === 'zh' ? '返回顶部' : 'Back to Top'}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      )}
    </>
  );
}
