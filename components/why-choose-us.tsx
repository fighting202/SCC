'use client';

import { useSCCStore } from '@/store/scc_store';
import { motion } from 'framer-motion';
import { Building2, MessageCircle, Plane, UserCheck } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export function WhyChooseUs() {
  const { language } = useSCCStore();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 3D 효과를 위한 상태 추가
  const [cardRotations, setCardRotations] = useState<
    { rotateX: number; rotateY: number }[]
  >([
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
  ]);

  // 마우스 움직임에 따른 3D 회전 효과
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardIndex: number
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const multiplier = 15; // 다른 섹션과 동일한 값
    const rotateX = ((y - centerY) / centerY) * -multiplier;
    const rotateY = ((x - centerX) / centerX) * multiplier;

    setCardRotations(prev => {
      const newRotations = [...prev];
      newRotations[cardIndex] = { rotateX, rotateY };
      return newRotations;
    });
  };

  const handleMouseLeave = (cardIndex: number) => {
    setCardRotations(prev => {
      const newRotations = [...prev];
      newRotations[cardIndex] = { rotateX: 0, rotateY: 0 };
      return newRotations;
    });
  };

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 100); // Stagger animation
            observer.unobserve(card);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const features = [
    {
      icon: Plane,
      title: language === 'zh' ? '一站式服务' : 'All-in-One Service',
      description:
        language === 'zh'
          ? '从机场接机、住宿安排、餐饮推荐到翻译陪同，一切为您安排妥当'
          : 'Airport pickup, accommodation, meals, and translation — everything arranged for you',
    },
    {
      icon: Building2,
      title: language === 'zh' ? '可信赖的网络' : 'Trusted Network',
      description:
        language === 'zh'
          ? '对接韩国认证医美机构，安全可靠'
          : 'We connect you with verified clinics and beauty centers throughout Korea',
    },
    {
      icon: MessageCircle,
      title:
        language === 'zh'
          ? '母语沟通，安心无忧'
          : 'Language Support',
      description:
        language === 'zh'
          ? '全程中文服务支持，让您在韩国感受如家般的便利'
          : 'English and Chinese language support available throughout your stay',
    },
    {
      icon: UserCheck,
      title: language === 'zh' ? '专属客户经理' : 'Personal Manager',
      description:
        language === 'zh' ? (
          <React.Fragment>
            专属协调员全程陪伴
            <br />
            为您在韩国的旅程
            <br />
            提供贴心服务
          </React.Fragment>
        ) : (
          'One dedicated coordinator guides you through your entire journey'
        ),
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-scc-dark-bg scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C5F7C] dark:text-scc-dark-text mb-4 ${
              language === 'zh' ? 'font-chinese' : 'font-sans'
            }`}
            style={{ fontWeight: 700 }}
          >
            {language === 'zh' ? '选择我们的理由' : 'Why Choose Us'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-scc-dark-text-secondary max-w-2xl mx-auto">
            {language === 'zh'
              ? '您的舒适与安全是我们的首要任务'
              : 'Your comfort and safety are our top priorities'}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              ref={el => {
                cardsRef.current[index] = el;
              }}
              className="bg-white dark:bg-scc-dark-card rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 min-h-[320px] flex flex-col cursor-pointer hover-glow opacity-100 translate-y-0"
              animate={{
                opacity: visibleCards.includes(index) ? 1 : 0,
                y: visibleCards.includes(index) ? 0 : 50,
                rotateX: cardRotations[index]?.rotateX || 0,
                rotateY: cardRotations[index]?.rotateY || 0,
              }}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                },
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                rotateX: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                rotateY: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={e => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* 아이콘 영역 */}
              <div className="flex-shrink-0 flex justify-center mb-6">
                <div
                  className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-[#2C5F7C] hover:bg-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110"
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform =
                      'rotate(12deg) scale(1.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                  }}
                >
                  <feature.icon className="w-8 h-8 md:w-9 md:h-9 text-white" />
                </div>
              </div>

              {/* 카드 내용 */}
              <div className="flex flex-col flex-1 text-center">
                <h3
                  className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-scc-dark-text mb-4 transition-all duration-300 hover:text-[#D4AF37] hover:scale-105 hover:drop-shadow-lg rounded-md px-3 py-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 active:scale-95 active:text-[#D4AF37] active:bg-gray-200/50 whitespace-nowrap flex items-center justify-center touch-manipulation ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    textShadow: '0 0 0 transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.textShadow =
                      '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform =
                      'scale(1.05) rotate(1deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                  onTouchStart={e => {
                    e.currentTarget.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onTouchEnd={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-gray-600 dark:text-scc-dark-text-secondary leading-relaxed flex-1 text-sm md:text-base ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    wordBreak: language === 'zh' ? 'keep-all' : 'normal',
                    overflowWrap: language === 'zh' ? 'break-word' : 'normal',
                    whiteSpace: language === 'zh' ? 'normal' : 'normal',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
