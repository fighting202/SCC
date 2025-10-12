'use client';

import { AnimatedIcon } from '@/components/ui/animated-icon';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useSCCStore } from '@/store/scc_store';
import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles, Stethoscope } from 'lucide-react';
import { useState } from 'react';

export function ServicesSection() {
  const { language } = useSCCStore();
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: descriptionRef, isVisible: descriptionVisible } =
    useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  // 3D 효과를 위한 상태 추가
  const [cardRotations, setCardRotations] = useState<
    { rotateX: number; rotateY: number }[]
  >([
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
    const multiplier = 15; // Package Comparison과 동일한 값
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const services = [
    {
      icon: Stethoscope,
      title: language === 'zh' ? '医疗服务' : 'Medical Services',
      items:
        language === 'zh'
          ? ['整形手术', '皮肤科', '口腔护理', '韩方医学']
          : [
              'Plastic Surgery',
              'Dermatology',
              'Dental Care',
              'Traditional Korean Medicine',
            ],
      description:
        language === 'zh'
          ? '我们为您推荐韩国顶尖医疗机构，量身定制医疗方案'
          : "We connect you with Korea's top medical facilities, offering personalized treatment plans and comprehensive care",
      fallbackIcon: '🏥',
      gradient: 'from-blue-500 to-blue-700',
      animation: 'pulse' as const,
    },
    {
      icon: Sparkles,
      title: language === 'zh' ? '美容服务' : 'Beauty Services',
      items:
        language === 'zh'
          ? ['K-Beauty护肤', '美发造型', 'SPA养生', '专业指导']
          : [
              'K-Beauty Skincare',
              'Hair & Makeup',
              'Spa & Wellness',
              'Professional Guidance',
            ],
      description:
        language === 'zh'
          ? '在专业指导下体验正宗的韩国美容护理，让您焕发自然光彩'
          : 'Experience authentic Korean beauty treatments with professional guidance to enhance your natural beauty',
      fallbackIcon: '💄',
      gradient: 'from-pink-500 to-purple-600',
      animation: 'bounce' as const,
    },
    {
      icon: HeartHandshake,
      title: language === 'zh' ? '全程支持' : 'Complete Support',
      items:
        language === 'zh'
          ? ['机场接送', '住宿预订', '翻译陪同', '紧急协助']
          : [
              'Airport Transfer',
              'Accommodation Booking',
              'Interpreter Service',
              'Emergency Assistance',
            ],
      description:
        language === 'zh'
          ? '从您抵达的那一刻到离开，我们始终陪伴左右'
          : "From the moment you land to the day you leave, we're with you every step of the way",
      fallbackIcon: '🤝',
      gradient: 'from-green-500 to-teal-600',
      animation: 'float' as const,
    },
  ];

  return (
    <section
      id="services"
      className="section-padding bg-gray-50 dark:bg-scc-dark-bg scroll-mt-16"
    >
      <div className="container-responsive">
        <div className="text-center section-margin">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl text-[#2C5F7C] dark:text-scc-dark-text mb-4 ${
              language === 'zh' ? 'font-chinese' : 'font-sans'
            }`}
            style={{ fontWeight: 700 }}
          >
            {language === 'zh' ? '服务项目' : 'Our Services'}
          </h2>
          <p className="body-text text-gray-600 dark:text-scc-dark-text-secondary max-w-2xl mx-auto">
            {language === 'zh'
              ? '为您量身定制的全方位护理'
              : 'Comprehensive care tailored to your needs'}
          </p>
        </div>

        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="service-card click-ripple bg-white dark:bg-scc-dark-card rounded-xl p-6 md:p-8 shadow-lg hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 min-h-[420px] flex flex-col cursor-pointer hover-glow"
              animate={{
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
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.3,
                rotateX: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                rotateY: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={e => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* 아이콘 영역 */}
              <div className="flex-shrink-0 relative w-full h-40 sm:h-48 md:h-52 rounded-lg mb-6 overflow-hidden bg-gradient-to-br from-[#2C5F7C] to-[#1F4A5F] flex items-center justify-center">
                <AnimatedIcon
                  animation={service.animation}
                  delay={index * 0.2}
                  className="text-center text-white"
                >
                  <div className="text-6xl">{service.fallbackIcon}</div>
                </AnimatedIcon>
              </div>

              {/* 카드 내용 */}
              <div className="flex flex-col">
                <h3
                  className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-scc-dark-text mb-4 text-center transition-all duration-300 hover:text-[#D4AF37] hover:scale-105 hover:drop-shadow-lg rounded-md px-3 py-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 ${
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
                >
                  {service.title}
                </h3>

                <p
                  className={`text-gray-600 dark:text-scc-dark-text-secondary text-center mb-6 leading-relaxed transition-all duration-300 hover:text-[#D4AF37] hover:scale-105 hover:drop-shadow-lg rounded-md px-3 py-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    wordBreak: language === 'zh' ? 'keep-all' : 'normal',
                    lineBreak: language === 'zh' ? 'auto' : 'auto',
                    textShadow: '0 0 0 transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.textShadow =
                      '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform =
                      'scale(1.05) rotate(-1deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {service.description}
                </p>

                <ul className="space-y-3 text-center">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <motion.button
                        className={`click-ripple text-gray-700 dark:text-scc-dark-text hover:text-[#D4AF37] active:text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:drop-shadow-lg text-sm md:text-base cursor-pointer rounded-md px-3 py-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 ${
                          language === 'zh' ? 'font-chinese' : 'font-sans'
                        }`}
                        style={{
                          textShadow: '0 0 0 transparent',
                          transition: 'all 0.3s ease',
                        }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={e => {
                          e.currentTarget.style.textShadow =
                            '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.textShadow =
                            '0 0 0 transparent';
                        }}
                        onClick={() => {
                          // 클릭 시 스크롤을 Contact 섹션으로 이동
                          const contactSection =
                            document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({
                              behavior: 'smooth',
                            });
                          }
                        }}
                      >
                        {item}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
