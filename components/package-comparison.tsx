'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { scrollToSection } from '@/lib/client-utils';
import { useSCCStore } from '@/store/scc_store';
import { useTallyAnimation } from '@/hooks/use-tally-animation';
import { motion } from 'framer-motion';
import { Building, Check, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function PackageComparison() {
  const { language } = useSCCStore();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isTallyLoaded, setIsTallyLoaded] = useState(false);

  // 탤리 모달 애니메이션 적용 (중앙에서 펼쳐지는 애니메이션)
  useTallyAnimation('center');

  // 탤리 폼 열기 함수
  const handleTallyClick = () => {
    const formId = process.env.NEXT_PUBLIC_TALLY_FORM_ID || 'n9Yd3Z';

    if (typeof window !== 'undefined' && (window as any).Tally) {
      (window as any).Tally.openPopup(formId, {
        layout: 'modal',
        width: 800,
        height: 600,
        alignLeft: false,
        hideHeaders: false,
        overlay: true,
        customForm: true,
      });
    } else {
      // 탤리가 로드되지 않은 경우 새 탭으로 열기
      window.open(`https://tally.so/r/${formId}`, '_blank');
    }
  };

  // 탤리 스크립트 로드 확인
  useEffect(() => {
    const checkTallyLoaded = () => {
      if (typeof window !== 'undefined' && (window as any).Tally) {
        setIsTallyLoaded(true);
      } else {
        setTimeout(checkTallyLoaded, 100);
      }
    };
    checkTallyLoaded();
  }, []);

  const [cardRotations, setCardRotations] = useState<
    { rotateX: number; rotateY: number }[]
  >([
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
  ]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 200); // Stagger animation with 200ms delay
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
    // 오른쪽 작은 카드들(index 2,3)은 더 큰 각도 적용
    const multiplier = cardIndex >= 2 ? 30 : 15; // 오른쪽 카드들을 20에서 30으로 증가
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

  const packages = [
    {
      badge: language === 'zh' ? '基础套餐' : 'Basic Package',
      title: language === 'zh' ? '3-5天基础套餐' : '3-5 Day Basic Package',
      price: language === 'zh' ? '从 ¥8,400 起' : 'From $1,200',
      originalPrice: language === 'zh' ? '原价 ¥12,600' : 'Was $1,800',
      features:
        language === 'zh'
          ? [
              '3-5天停留时间',
              '标准住宿',
              '兼职翻译 (8小时/天)',
              '基础医疗协调',
              '邮件售后跟进',
              '基础机场接送',
              '24/7紧急热线',
            ]
          : [
              '3-5 days duration',
              'Standard accommodation',
              'Part-time interpreter (8hrs/day)',
              'Basic medical coordination',
              'Email post-care',
              'Basic airport transfer',
              '24/7 emergency hotline',
            ],
      icon: Clock,
      color: 'gray',
      popular: false,
    },
    {
      badge: language === 'zh' ? '推荐套餐' : 'RECOMMENDED',
      title: language === 'zh' ? '7-14天高级套餐' : '7-14 Day Premium Package',
      price: language === 'zh' ? '从 ¥24,500 起' : 'From $3,500',
      originalPrice: language === 'zh' ? '原价 ¥35,000' : 'Was $5,000',
      features:
        language === 'zh'
          ? [
              '7-14天停留时间',
              '高级住宿',
              '全职翻译 (14小时/天)',
              '高级医疗协调',
              '面对面售后跟进',
              '✓ 餐饮安排',
              '✓ 购物陪同',
              '✓ 文化观光',
            ]
          : [
              '7-14 days duration',
              'Premium accommodation',
              'Full-time interpreter (14hrs/day)',
              'Premium medical coordination',
              'In-person post-care',
              '✓ Meals included',
              '✓ Shopping assistance',
              '✓ Cultural tours',
            ],
      icon: Building,
      color: 'primary',
      popular: true,
    },
  ];

  const commonFeatures =
    language === 'zh'
      ? ['机场接送 (往返)', '24/7紧急支持热线', '基础医疗协调', '专业翻译服务']
      : [
          'Airport transfer',
          '24/7 emergency hotline',
          'Basic medical coordination',
          'Professional translation service',
        ];

  return (
    <section
      id="packages"
      className="py-20 bg-gray-50 dark:bg-scc-dark-bg scroll-mt-16"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-[#2C5F7C] dark:text-scc-dark-text mb-6 ${
              language === 'zh' ? 'font-chinese' : 'font-sans'
            }`}
          >
            {language === 'zh' ? '套餐对比' : 'Package Comparison'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-scc-dark-text-secondary max-w-3xl mx-auto">
            {language === 'zh'
              ? '找到最适合您需求的套餐'
              : 'Find the perfect fit for your needs'}
          </p>
        </div>

        {/* Package Cards and Side Content */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16"
          style={{ perspective: '1000px' }}
        >
          {/* Basic Package */}
          <motion.div
            ref={el => {
              cardsRef.current[0] = el;
            }}
            className="lg:col-span-4"
            animate={{
              opacity: visibleCards.includes(0) ? 1 : 0,
              y: visibleCards.includes(0) ? 0 : 50,
              rotateX: cardRotations[0]?.rotateX || 0,
              rotateY: cardRotations[0]?.rotateY || 0,
            }}
            whileHover={{
              scale: 1.05,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
              },
            }}
            transition={{
              opacity: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              rotateX: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
              rotateY: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={e => handleMouseMove(e, 0)}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            <Card className="relative flex flex-col h-[650px] opacity-100 translate-y-0 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="text-sm font-semibold text-gray-600 dark:text-scc-dark-text-secondary mb-2">
                  {packages[0]?.badge}
                </div>
                <CardTitle
                  className={`text-2xl font-bold mb-2 ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  {packages[0]?.title}
                </CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-[#2C5F7C]">
                    {packages[0]?.price}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-scc-dark-text-secondary line-through">
                    {packages[0]?.originalPrice}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 flex-1 px-4">
                {packages[0]?.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.startsWith('✓')
                          ? 'bg-green-100 text-green-600'
                          : feature.startsWith('无') || feature.startsWith('No')
                            ? 'bg-red-100 text-red-600'
                            : 'bg-[#2C5F7C] text-white'
                      }`}
                    >
                      {feature.startsWith('✓') ? (
                        <Check className="w-3 h-3" />
                      ) : feature.startsWith('无') ||
                        feature.startsWith('No') ? (
                        <span className="text-xs">✗</span>
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                    </div>
                    <span
                      className={`text-gray-700 dark:text-scc-dark-text ${
                        language === 'zh' ? 'font-chinese' : 'font-sans'
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-2 mt-auto flex justify-center">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={handleTallyClick}
                    className="px-8 py-4 text-base font-bold transition-all duration-300 bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white shadow-lg hover:shadow-xl animate-pulse-glow border-2 border-[#D4AF37]"
                  >
                    {language === 'zh' ? '获取报价' : 'Get Quote'}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Premium Package */}
          <motion.div
            ref={el => {
              cardsRef.current[1] = el;
            }}
            className="lg:col-span-4"
            animate={{
              opacity: visibleCards.includes(1) ? 1 : 0,
              y: visibleCards.includes(1) ? 0 : 50,
              rotateX: cardRotations[1]?.rotateX || 0,
              rotateY: cardRotations[1]?.rotateY || 0,
            }}
            whileHover={{
              scale: 1.05,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
              },
            }}
            transition={{
              opacity: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              rotateX: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
              rotateY: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={e => handleMouseMove(e, 1)}
            onMouseLeave={() => handleMouseLeave(1)}
          >
            <Card className="relative flex flex-col h-[650px] opacity-100 translate-y-0 border-2 border-[#D4AF37] shadow-2xl bg-gradient-to-br from-[#2C5F7C]/5 to-[#D4AF37]/5 hover:shadow-2xl transition-shadow duration-300">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                {packages[1]?.badge}
              </div>

              <CardHeader className="text-center pb-4">
                <CardTitle
                  className={`text-2xl font-bold mb-2 ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  {packages[1]?.title}
                </CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-[#2C5F7C]">
                    {packages[1]?.price}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-scc-dark-text-secondary line-through">
                    {packages[1]?.originalPrice}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 flex-1 px-4">
                {packages[1]?.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.startsWith('✓')
                          ? 'bg-green-100 text-green-600'
                          : feature.startsWith('无') || feature.startsWith('No')
                            ? 'bg-red-100 text-red-600'
                            : 'bg-[#2C5F7C] text-white'
                      }`}
                    >
                      {feature.startsWith('✓') ? (
                        <Check className="w-3 h-3" />
                      ) : feature.startsWith('无') ||
                        feature.startsWith('No') ? (
                        <span className="text-xs">✗</span>
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                    </div>
                    <span
                      className={`text-gray-700 dark:text-scc-dark-text ${
                        language === 'zh' ? 'font-chinese' : 'font-sans'
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-2 mt-auto flex justify-center">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={handleTallyClick}
                    className="px-8 py-4 text-base font-bold transition-all duration-300 bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white shadow-lg hover:shadow-xl animate-pulse-glow border-2 border-[#D4AF37]"
                  >
                    {language === 'zh' ? '获取报价' : 'Get Quote'}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Side Content - Common Features + Custom Package */}
          <div
            className="lg:col-span-4"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex flex-col h-[650px]">
              {/* Common Features */}
              <motion.div
                ref={el => {
                  cardsRef.current[2] = el;
                }}
                className="bg-white dark:bg-scc-dark-card rounded-xl p-6 shadow-lg h-[320px] flex flex-col hover:shadow-xl transition-shadow duration-300"
                animate={{
                  opacity: visibleCards.includes(2) ? 1 : 0,
                  y: visibleCards.includes(2) ? 0 : 50,
                  rotateX: cardRotations[2]?.rotateX || 0,
                  rotateY: cardRotations[2]?.rotateY || 0,
                }}
                whileHover={{
                  scale: 1.08, // 더 큰 스케일 효과
                  rotateX: 8, // 추가 회전 효과
                  rotateY: 8, // 추가 회전 효과
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                transition={{
                  opacity: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                  rotateX: { duration: 0.15, ease: 'easeOut' },
                  rotateY: { duration: 0.15, ease: 'easeOut' },
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={e => handleMouseMove(e, 2)}
                onMouseLeave={() => handleMouseLeave(2)}
              >
                <h3
                  className={`text-xl font-bold text-center mb-3 text-gray-900 dark:text-scc-dark-text ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  ✨{' '}
                  {language === 'zh'
                    ? '两个套餐均包含'
                    : 'Both packages include'}
                </h3>
                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  {commonFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                      <span
                        className={`text-gray-600 dark:text-scc-dark-text-secondary text-sm leading-relaxed ${
                          language === 'zh' ? 'font-chinese' : 'font-sans'
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Spacer */}
              <div className="h-6"></div>

              {/* Custom Package CTA */}
              <motion.div
                ref={el => {
                  cardsRef.current[3] = el;
                }}
                className="bg-white dark:bg-scc-dark-card rounded-xl p-6 shadow-lg h-[320px] flex flex-col text-center hover:shadow-xl transition-shadow duration-300"
                animate={{
                  opacity: visibleCards.includes(3) ? 1 : 0,
                  y: visibleCards.includes(3) ? 0 : 50,
                  rotateX: cardRotations[3]?.rotateX || 0,
                  rotateY: cardRotations[3]?.rotateY || 0,
                }}
                whileHover={{
                  scale: 1.08, // 더 큰 스케일 효과
                  rotateX: 8, // 추가 회전 효과
                  rotateY: 8, // 추가 회전 효과
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                transition={{
                  opacity: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                  rotateX: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                  rotateY: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={e => handleMouseMove(e, 3)}
                onMouseLeave={() => handleMouseLeave(3)}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <h3
                    className={`text-xl font-bold mb-3 text-gray-900 dark:text-scc-dark-text ${
                      language === 'zh' ? 'font-chinese' : 'font-sans'
                    }`}
                  >
                    {language === 'zh'
                      ? '需要定制套餐？'
                      : 'Need a Custom Package?'}
                  </h3>
                  <p className="text-gray-600 dark:text-scc-dark-text-secondary mb-4 text-sm leading-relaxed">
                    {language === 'zh'
                      ? '我们有专门的团队为您量身定制最适合的医疗美容套餐'
                      : 'Our dedicated team will create a personalized medical & beauty package just for you'}
                  </p>
                </div>
                <div className="mt-auto">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      onClick={handleTallyClick}
                      className="px-8 py-4 text-base font-bold bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white shadow-lg hover:shadow-xl inline-flex items-center justify-center transition-all duration-300 animate-pulse-glow border-2 border-[#D4AF37]"
                    >
                      {language === 'zh' ? '定制套餐' : 'Customize It'}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
