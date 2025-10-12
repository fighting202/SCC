'use client';

import { TrustIndicators } from '@/components/scc/trust-indicators';
import { useTallyAnimation } from '@/hooks/use-tally-animation';
import { scrollToSection } from '@/lib/client-utils';
import { useSCCStore } from '@/store/scc_store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Tally global object type - moved to global types

export default function HeroSection() {
  const { language } = useSCCStore();
  const [isTallyLoaded, setIsTallyLoaded] = useState(false);

  // 탤리 모달 애니메이션 적용 (중앙에서 펼쳐지는 애니메이션)
  useTallyAnimation('center');

  useEffect(() => {
    // Tally 스크립트 로딩 확인
    const checkTally = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).Tally) {
        setIsTallyLoaded(true);
        clearInterval(checkTally);
      }
    }, 100);

    return () => clearInterval(checkTally);
  }, []);

  const handleTallyClick = () => {
    if (typeof window === 'undefined') return;

    // 임시 Tally Form ID (실제 Form ID로 교체 필요)
    const formId = process.env.NEXT_PUBLIC_TALLY_FORM_ID || 'n9Yd3Z';
    const tallyUrl = `https://tally.so/r/${formId}`;

    // 모바일에서는 새 창으로 열기
    if (window.innerWidth < 768) {
      window.open(tallyUrl, '_blank');
      return;
    }

    // 데스크톱에서는 모달 시도
    if (isTallyLoaded && (window as any).Tally) {
      (window as any).Tally.openPopup(formId, {
        layout: 'modal',
        width: 700,
        autoClose: 3000,
        emoji: {
          text: '✈️',
          animation: 'wave',
        },
      });
    } else {
      // Fallback: 새 탭
      window.open(tallyUrl, '_blank');
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 lg:pt-28 section-padding"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Main image */}
        <Image
          src="/optimized/modern-seoul-skyline-at-sunset-with-luxury-medical.webp"
          alt="Seoul medical tourism skyline with luxury medical facilities"
          fill
          className="object-cover dark:brightness-75 dark:contrast-110"
          priority
          quality={90}
          sizes="100vw"
          onError={e => {
            // Fallback to original JPG if WebP fails
            e.currentTarget.src =
              '/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50 dark:from-black/60 dark:via-black/50 dark:to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-responsive text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white dark:text-white text-balance leading-tight animate-fade-in">
          {language === 'zh'
            ? '您在韩国的安全无忧之旅'
            : 'Your Safe & Seamless Journey in Korea'}
        </h1>
        <p className="text-xl md:text-2xl text-white/95 dark:text-white/90 mb-6 md:mb-10 max-w-3xl mx-auto text-pretty leading-relaxed animate-slide-up">
          {language === 'zh'
            ? '专业医疗美容管家服务'
            : 'Professional Medical & Beauty Concierge'}
        </p>

        {/* Main CTA Button */}
        <div className="mb-8 animate-scale-in">
          <motion.button
            onClick={handleTallyClick}
            className={`bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white hover:text-[#D4AF37] w-full md:w-auto px-8 py-4 font-bold
                         rounded-xl shadow-2xl transition-all duration-300
                         inline-flex items-center justify-center gap-3 ${
                           language === 'zh' ? 'font-chinese' : 'font-sans'
                         }`}
            aria-label={
              language === 'zh'
                ? '免费咨询按钮'
                : 'Get Free Consultation Button'
            }
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              x: { duration: 0.6, ease: 'easeInOut' },
              scale: { duration: 0.2 },
            }}
          >
            <span className="text-xl md:text-2xl">📋</span>
            <span className="font-semibold text-lg md:text-xl">
              {language === 'en' ? 'Get Free Consultation' : '免费咨询'}
            </span>
          </motion.button>
          <p
            className={`small-text mt-3 text-white/80 dark:text-white/70 ${
              language === 'zh' ? 'font-chinese' : 'font-sans'
            }`}
          >
            ⏱️ {language === 'en' ? 'Takes only 2 minutes' : '仅需2分钟'}
          </p>
        </div>

        {/* Small CTA Buttons */}
        <div className="grid grid-cols-2 md:flex items-center justify-center gap-4 mb-16 animate-scale-in max-w-2xl mx-auto">
          <motion.button
            onClick={() => scrollToSection('services')}
            className="bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white dark:text-white hover:bg-white/30 dark:hover:bg-white/20 px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            whileHover={{
              x: [0, -5, 5, -5, 5, 0],
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              x: { duration: 0.5, ease: 'easeInOut' },
              y: { duration: 0.2 },
            }}
          >
            <span
              className={`text-sm md:text-base font-semibold ${
                language === 'zh' ? 'font-chinese' : 'font-sans'
              }`}
            >
              {language === 'zh' ? '查看服务' : 'View Services'}
            </span>
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('how-it-works')}
            className="bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white dark:text-white hover:bg-white/30 dark:hover:bg-white/20 px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            whileHover={{
              x: [0, -5, 5, -5, 5, 0],
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              x: { duration: 0.5, ease: 'easeInOut' },
              y: { duration: 0.2 },
            }}
          >
            <span
              className={`text-sm md:text-base font-semibold ${
                language === 'zh' ? 'font-chinese' : 'font-sans'
              }`}
            >
              {language === 'zh' ? '使用指南' : 'How It Works'}
            </span>
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('packages')}
            className="bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white dark:text-white hover:bg-white/30 dark:hover:bg-white/20 px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            whileHover={{
              x: [0, -5, 5, -5, 5, 0],
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              x: { duration: 0.5, ease: 'easeInOut' },
              y: { duration: 0.2 },
            }}
          >
            <span
              className={`text-sm md:text-base font-semibold ${
                language === 'zh' ? 'font-chinese' : 'font-sans'
              }`}
            >
              {language === 'zh' ? '查看套餐' : 'View Packages'}
            </span>
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('faq')}
            className="bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white dark:text-white hover:bg-white/30 dark:hover:bg-white/20 px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            whileHover={{
              x: [0, -5, 5, -5, 5, 0],
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              x: { duration: 0.5, ease: 'easeInOut' },
              y: { duration: 0.2 },
            }}
          >
            <span
              className={`text-sm md:text-base font-semibold ${
                language === 'zh' ? 'font-chinese' : 'font-sans'
              }`}
            >
              {language === 'zh' ? '常见问题' : 'FAQ'}
            </span>
          </motion.button>
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <TrustIndicators className="justify-center" />
        </div>
      </div>
    </section>
  );
}
