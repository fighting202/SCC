'use client';

import { useSCCStore } from '@/store/scc_store';
import { useTallyAnimation } from '@/hooks/use-tally-animation';
import { Clock, DollarSign, FileText, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function CommitmentSection() {
  const { language } = useSCCStore();
  const [visibleElements, setVisibleElements] = useState<Set<number>>(
    new Set()
  );
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isTallyLoaded, setIsTallyLoaded] = useState(false);

  // 탤리 모달 애니메이션 적용 (중앙에서 펼쳐지는 애니메이션)
  useTallyAnimation('center');

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-card-index') || '0'
            );
            setVisibleElements(prev => new Set([...prev, index]));
            // Add visible class for immediate animation
            entry.target.classList.add('animate-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all card elements
    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // Also observe the main section for initial animations
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  // Updated: 2025-01-09

  const commitments = [
    {
      icon: Shield,
      title: language === 'zh' ? '您的安全第一' : 'Your Safety First',
      description:
        language === 'zh'
          ? '严格筛选医疗机构\n确保最高安全标准'
          : 'Rigorous facility screening\nensuring highest safety standards',
    },
    {
      icon: DollarSign,
      title:
        language === 'zh' ? '仅与认证合作伙伴\n合作' : 'Verified Partners Only',
      description:
        language === 'zh'
          ? '我们只与国际认证的\n医疗和美容机构合作'
          : 'We only work with licensed, internationally accredited medical facilities and established beauty centers.',
    },
    {
      icon: FileText,
      title: language === 'zh' ? '无隐藏费用' : 'No Hidden Costs',
      description:
        language === 'zh'
          ? '所有费用都提前说明\n确认前提供详细报价'
          : "Every expense is explained upfront. You'll receive a detailed quote before confirming any services.",
    },
    {
      icon: Clock,
      title: language === 'zh' ? '24/7紧急热线' : '24/7 Emergency Line',
      description:
        language === 'zh'
          ? '专属护理经理全天候待命\n随时通过WhatsApp为您服务'
          : 'Your dedicated care manager is available via WhatsApp any time, day or night, throughout your stay.',
    },
  ];

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

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-scc-primary/5 to-scc-accent/5 dark:from-scc-dark-bg dark:to-scc-dark-bg-secondary scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl text-[#2C5F7C] dark:text-scc-dark-text mb-4 ${
              language === 'zh' ? 'font-chinese' : 'font-sans'
            }`}
            style={{ fontWeight: 700 }}
          >
            {language === 'zh' ? '我们对您的承诺' : 'Our Commitment to You'}
          </h2>
          <p
            className={`text-lg text-gray-600 dark:text-scc-dark-text-secondary max-w-2xl mx-auto ${
              language === 'zh' ? 'font-chinese' : 'font-sans'
            }`}
          >
            {language === 'zh'
              ? '通过透明度和关怀建立信任'
              : 'Building trust through transparency and care'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {commitments.map((commitment, index) => (
            <div
              key={index}
              ref={el => {
                cardRefs.current[index] = el;
              }}
              data-card-index={index}
              className={`bg-white dark:bg-scc-dark-card rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 min-h-[320px] flex flex-col cursor-pointer animate-on-scroll hover-lift hover-glow hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] hover:shadow-[0_0_40px_rgba(44,95,124,0.3)] ${
                visibleElements.has(index) ? 'animate-visible' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* 아이콘 영역 */}
              <div className="flex-shrink-0 flex justify-center mb-6">
                <div
                  className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-[#2C5F7C] flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110"
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
                  <commitment.icon className="w-8 h-8 md:w-9 md:h-9 text-white" />
                </div>
              </div>

              {/* 카드 내용 */}
              <div className="flex flex-col flex-1 text-center">
                <h3
                  className={`text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-scc-dark-text mb-4 transition-all duration-300 hover:text-[#D4AF37] hover:scale-105 hover:drop-shadow-lg rounded-md px-3 py-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 ${
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
                  {commitment.title}
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
                  {commitment.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={handleTallyClick}
            className="inline-flex items-center justify-center px-6 py-4 text-base font-semibold bg-[#2C5F7C] hover:bg-[#1F4A5F] active:bg-[#1F4A5F] text-white hover:text-[#D4AF37] rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] active:shadow-lg hover:scale-105 active:scale-95 animate-pulse-glow"
          >
            {language === 'zh' ? '开始使用' : 'Get Started'}
          </button>
        </div>
      </div>
    </section>
  );
}
