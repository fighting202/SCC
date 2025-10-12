'use client';

import { Button } from '@/components/ui/button';
import { CONTACT } from '@/lib/scc-constants';
import { useSCCStore } from '@/lib/store/sccStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const { language } = useSCCStore();
  const [isTallyLoaded, setIsTallyLoaded] = useState(false);

  useEffect(() => {
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

    if (window.innerWidth < 768) {
      window.open(
        `https://tally.so/r/${process.env.NEXT_PUBLIC_TALLY_FORM_ID}`,
        '_blank'
      );
      return;
    }

    if (isTallyLoaded && (window as any).Tally) {
      (window as any).Tally.openPopup(process.env.NEXT_PUBLIC_TALLY_FORM_ID, {
        layout: 'modal',
        width: 700,
        autoClose: 3000,
        emoji: {
          text: '✈️',
          animation: 'wave',
        },
      });
    } else {
      window.open(
        `https://tally.so/r/${process.env.NEXT_PUBLIC_TALLY_FORM_ID}`,
        '_blank'
      );
    }
  };

  return (
    <section
      id="get-started"
      className="section-padding bg-gray-50 dark:bg-scc-dark-bg"
    >
      <div className="container-responsive text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl text-[#2C5F7C] dark:text-scc-dark-text mb-4 ${
            language === 'zh' ? 'font-chinese' : 'font-sans'
          }`}
          style={{ fontWeight: 700 }}
        >
          {language === 'en' ? 'Get Started Today' : '立即开始'}
        </h2>

        <p className="body-text text-gray-600 dark:text-scc-dark-text-secondary mb-12">
          {language === 'en'
            ? 'Complete our quick form and receive a personalized consultation within 24 hours'
            : '填写快速表格，24小时内收到个性化咨询'}
        </p>

        <div className="mb-8">
          <motion.div
            whileHover={{
              x: [0, -8, 8, -8, 8, 0],
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              x: { duration: 0.6, ease: 'easeInOut' },
              scale: { duration: 0.2 }
            }}
          >
            <Button
              onClick={handleTallyClick}
              variant="primary"
              size="xl"
              language={language}
              className="w-full md:w-auto min-w-[280px] h-20 px-16 text-2xl font-bold hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <span>✈️</span>
                <span>
                  {language === 'en' ? 'Get Free Consultation' : '获取免费咨询'}
                </span>
              </span>
            </Button>
          </motion.div>
          <p
            className={`small-text mt-3 text-gray-600 dark:text-scc-dark-text-secondary ${
              language === 'zh' ? 'font-chinese' : ''
            }`}
          >
            ⏱️ {language === 'en' ? 'Takes only 2 minutes' : '仅需2分钟'}
          </p>
        </div>

        <div className="mt-16">
          <p
            className={`text-gray-600 mb-6 body-text ${
              language === 'zh' ? 'font-chinese' : ''
            }`}
          >
            {language === 'en' ? 'Or contact us directly:' : '或直接联系我们：'}
          </p>
          <div className="flex flex-col sm:flex-row card-gap justify-center max-w-2xl mx-auto">
            {language === 'zh' ? (
              <>
                <motion.div
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 }
                  }}
                >
                  <Button
                    onClick={() => window.open('/wechat-qr', '_blank')}
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">💬</span>
                      <span className="text-base font-chinese">微信</span>
                    </span>
                  </Button>
                </motion.div>

                <motion.a
                  href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 }
                  }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">📱</span>
                      <span className="text-base">WhatsApp</span>
                    </span>
                  </Button>
                </motion.a>
              </>
            ) : (
              <>
                <motion.a
                  href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 }
                  }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">📱</span>
                      <span className="text-base">WhatsApp</span>
                    </span>
                  </Button>
                </motion.a>

                <motion.div
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 }
                  }}
                >
                  <Button
                    onClick={() => window.open('/wechat-qr', '_blank')}
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">💬</span>
                      <span className="text-base">WeChat</span>
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{
                    x: [0, -4, 4, -4, 4, 0],
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeInOut' },
                    y: { duration: 0.2 }
                  }}
                >
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="no-gold-hover"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-700"
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
          </div>
        </div>
      </div>
    </section>
  );
}
