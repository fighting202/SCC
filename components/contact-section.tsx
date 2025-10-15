'use client';

import { Button } from '@/components/ui/button';
import { useTallyAnimation } from '@/hooks/use-tally-animation';
import { CONTACT } from '@/lib/scc-constants';
import { useSCCStore } from '@/store/scc_store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const { language } = useSCCStore();
  const [isTallyLoaded, setIsTallyLoaded] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(
    new Set()
  );
  const sectionRef = useRef<HTMLElement>(null);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 탤리 모달 애니메이션 적용 (아래에서 위로 올라오는 애니메이션)
  useTallyAnimation('bottom-up');

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-element-index') || '0'
            );
            setVisibleElements(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all elements
    elementRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // Also observe the main section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

    // Tally Form ID - Vercel 환경 변수에서 가져오기
    const formId = process.env.NEXT_PUBLIC_TALLY_FORM_ID || 'nWxl8Q';
    const tallyUrl = `https://tally.so/r/${formId}`;

    // 모바일: 새 탭에서 열기 (더 나은 UX)
    if (window.innerWidth < 768) {
      window.open(tallyUrl, '_blank');
      return;
    }

    // 데스크톱: 팝업 모달
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

  const [showWeChatQR, setShowWeChatQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const handleWeChatClick = () => {
    // 모바일에서는 새 탭으로 열기, 데스크톱에서는 모달
    if (window.innerWidth < 768) {
      window.open('/wechat-qr', '_blank');
    } else {
      setShowWeChatQR(true);
    }
  };

  const closeWeChatQR = () => {
    setShowWeChatQR(false);
  };

  const copyWeChatId = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.wechatId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Copy failed silently
    }
  };

  return (
    <section
      ref={sectionRef}
      id="get-started"
      className="section-padding bg-gray-50 dark:bg-scc-dark-bg scroll-mt-16"
    >
      <div className="container-responsive text-center">
        {/* 섹션 제목 */}
        <motion.h2
          ref={el => {
            if (el) elementRefs.current[0] = el;
          }}
          data-element-index="0"
          className={`text-3xl sm:text-4xl md:text-5xl text-[#2C5F7C] dark:text-scc-dark-text mb-4 ${
            language === 'zh' ? 'font-chinese' : 'font-sans'
          }`}
          style={{ fontWeight: 700 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: visibleElements.has(0) ? 1 : 0,
            y: visibleElements.has(0) ? 0 : 50,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {language === 'en'
            ? 'Ready to Plan Your Medical Journey to Seoul?'
            : '准备规划您的首尔医疗之旅？'}
        </motion.h2>

        {/* 설명 */}
        <motion.p
          ref={el => {
            if (el) elementRefs.current[1] = el;
          }}
          data-element-index="1"
          className="body-text text-gray-600 dark:text-scc-dark-text-secondary mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: visibleElements.has(1) ? 1 : 0,
            y: visibleElements.has(1) ? 0 : 50,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1,
          }}
        >
          {language === 'en'
            ? 'Get expert guidance in 3-5 days. No more guesswork, just clarity and confidence.'
            : '3-5天内获得专家指导。不再猜测，只有清晰和信心。'}
        </motion.p>

        {/* 메인 CTA 버튼 */}
        <motion.div
          ref={el => {
            if (el) elementRefs.current[2] = el;
          }}
          data-element-index="2"
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: visibleElements.has(2) ? 1 : 0,
            y: visibleElements.has(2) ? 0 : 50,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
        >
          <motion.div
            whileHover={{
              x: [0, -8, 8, -8, 8, 0],
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              x: { duration: 0.6, ease: 'easeInOut' },
              scale: { duration: 0.2 },
            }}
          >
            <Button
              onClick={handleTallyClick}
              variant="primary"
              size="xl"
              language={language}
              className="w-full md:w-auto min-w-[280px] h-20 px-16 text-2xl font-bold hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#D4AF37] animate-pulse-glow touch-manipulation"
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
              }}
            >
              <span className="flex items-center gap-3">
                <span>✈️</span>
                <span>
                  {language === 'en'
                    ? 'Get Your Personalized Consultation Now →'
                    : '立即获取您的个性化咨询 →'}
                </span>
              </span>
            </Button>
          </motion.div>
          <p
            className={`small-text mt-3 text-gray-600 dark:text-scc-dark-text-secondary ${
              language === 'zh' ? 'font-chinese' : ''
            }`}
          >
            💰{' '}
            {language === 'en'
              ? 'Have questions? Email us at seoulcareconcierge@gmail.com'
              : '有疑问？请发邮件至 seoulcareconcierge@gmail.com'}
          </p>
        </motion.div>

        {/* 대안 연락 방법 */}
        <motion.div
          ref={el => {
            if (el) elementRefs.current[3] = el;
          }}
          data-element-index="3"
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: visibleElements.has(3) ? 1 : 0,
            y: visibleElements.has(3) ? 0 : 50,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3,
          }}
        >
          <motion.p
            className={`text-gray-600 mb-6 body-text ${
              language === 'zh' ? 'font-chinese' : ''
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: visibleElements.has(3) ? 1 : 0,
              y: visibleElements.has(3) ? 0 : 30,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4,
            }}
          >
            {language === 'en' ? 'Or contact us directly:' : '或直接联系我们：'}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row card-gap justify-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: visibleElements.has(3) ? 1 : 0,
              y: visibleElements.has(3) ? 0 : 30,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.5,
            }}
          >
            {language === 'zh' ? (
              <>
                {/* WeChat - 중국 고객 우선 */}
                <motion.div
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 },
                  }}
                >
                  <Button
                    onClick={handleWeChatClick}
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 hover:text-[#D4AF37] transition-all duration-200 px-8 py-4 text-base font-bold active:scale-95 touch-manipulation"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">💬</span>
                      <span className="text-lg font-chinese font-normal">
                        微信
                      </span>
                    </span>
                  </Button>
                </motion.div>

                {/* WhatsApp */}
                <motion.a
                  href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 },
                  }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 hover:text-[#D4AF37] transition-all duration-200 px-8 py-4 text-base font-bold active:scale-95 touch-manipulation"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">📱</span>
                      <span className="text-base">WhatsApp</span>
                    </span>
                  </Button>
                </motion.a>

                {/* Email */}
                <motion.div
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 },
                  }}
                >
                  <a href={`mailto:${CONTACT.email}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-700 hover:text-[#D4AF37] transition-all duration-200 px-8 py-4 text-base font-bold active:scale-95 touch-manipulation"
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation',
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xl">📧</span>
                        <span className="text-lg font-chinese font-normal">
                          邮箱
                        </span>
                      </span>
                    </Button>
                  </a>
                </motion.div>
              </>
            ) : (
              <>
                {/* WhatsApp - 영문 고객 우선 */}
                <motion.a
                  href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 },
                  }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 hover:text-[#D4AF37] transition-all duration-200 px-8 py-4 text-base font-bold active:scale-95 touch-manipulation"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">📱</span>
                      <span className="text-base">WhatsApp</span>
                    </span>
                  </Button>
                </motion.a>

                {/* WeChat */}
                <motion.div
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 },
                  }}
                >
                  <Button
                    onClick={handleWeChatClick}
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 hover:text-[#D4AF37] transition-all duration-200 px-8 py-4 text-base font-bold active:scale-95 touch-manipulation"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">💬</span>
                      <span className="text-base">WeChat</span>
                    </span>
                  </Button>
                </motion.div>

                {/* Email */}
                <motion.div
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 },
                  }}
                >
                  <a href={`mailto:${CONTACT.email}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-700 hover:text-[#D4AF37] transition-all duration-200 px-8 py-4 text-base font-bold active:scale-95 touch-manipulation"
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation',
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xl">📧</span>
                        <span className="text-base">Email</span>
                      </span>
                    </Button>
                  </a>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* WeChat QR Code Modal */}
      {showWeChatQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-scc-dark-card rounded-xl p-6 max-w-sm mx-4 text-center">
            <h3
              className={`text-xl font-bold mb-4 text-gray-900 dark:text-scc-dark-text ${
                language === 'zh' ? 'font-chinese' : 'font-sans'
              }`}
            >
              {language === 'zh' ? '微信二维码' : 'WeChat QR Code'}
            </h3>
            <div className="mb-4">
              {imageLoadFailed ? (
                <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs mt-1">
                      WeChat ID: {CONTACT.wechatId}
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src="/optimized/scc-wechat-qr.webp"
                  alt="WeChat QR Code"
                  width={192}
                  height={192}
                  className="object-contain rounded-lg"
                  onError={e => {
                    console.error('QR code image load failed:', e);
                    setImageLoadFailed(true);
                  }}
                />
              )}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'zh' ? 'WeChat ID: ' : 'WeChat ID: '}
              <button
                onClick={copyWeChatId}
                className="text-[#2C5F7C] hover:underline font-mono"
              >
                {CONTACT.wechatId}
              </button>
            </p>
            <button
              onClick={closeWeChatQR}
              className="no-gold-hover flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
            >
              {language === 'zh' ? '关闭' : 'Close'}
            </button>
            {copied && (
              <p className="text-xs text-green-600 mt-2">
                {language === 'zh' ? '已复制!' : 'Copied!'}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
