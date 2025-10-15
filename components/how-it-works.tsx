'use client';

import { useSCCStore } from '@/store/scc_store';
import {
    ArrowRight,
    Calendar,
    CheckCircle,
    Clock,
    CreditCard,
    MessageSquare,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function HowItWorks() {
  const { language } = useSCCStore();
  const [visibleElements, setVisibleElements] = useState<Set<number>>(
    new Set()
  );
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-step-index') || '0'
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

    // Observe all step elements
    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // Also observe the main section for initial animations
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '1',
      icon: MessageSquare,
      title: language === 'zh' ? '免费咨询' : 'Free Consultation',
      items: [
        language === 'zh' ? '提交咨询表格' : 'Submit inquiry form',
        language === 'zh'
          ? '24小时内收到回复'
          : 'Receive response within 24 hours',
        language === 'zh' ? '初步评估' : 'Initial assessment',
      ],
    },
    {
      number: '2',
      icon: Calendar,
      title: language === 'zh' ? '个性化计划' : 'Personalized Plan',
      items: [
        language === 'zh' ? '定制行程安排' : 'Customized itinerary',
        language === 'zh' ? '医疗/美容预约' : 'Medical/beauty appointments',
        language === 'zh' ? '住宿推荐' : 'Accommodation recommendations',
        language === 'zh' ? '透明定价' : 'Transparent pricing',
      ],
    },
    {
      number: '3',
      icon: CheckCircle,
      title: language === 'zh' ? '预订与支付' : 'Booking & Payment',
      items: [
        language === 'zh' ? '确认您的计划' : 'Confirm your plan',
        language === 'zh'
          ? '安全支付 (Stripe/PayPal)'
          : 'Secure payment (Stripe/PayPal)',
        language === 'zh' ? '收到确认书' : 'Receive confirmation',
        language === 'zh' ? '出发前2-3周' : '2-3 weeks before arrival',
      ],
    },
    {
      number: '4',
      icon: CreditCard,
      title: language === 'zh' ? '享受您的旅程' : 'Enjoy Your Journey',
      items: [
        language === 'zh' ? '机场接送' : 'Airport pickup',
        language === 'zh' ? '24/7支持' : '24/7 support',
        language === 'zh' ? '所有服务协调' : 'All services coordinated',
        language === 'zh' ? '术后跟进' : 'Post-care follow-up',
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 lg:py-32 bg-white dark:bg-scc-dark-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl text-[#2C5F7C] dark:text-scc-dark-text mb-4 animate-fade-in-up ${
              language === 'zh' ? 'font-chinese' : 'font-sans'
            }`}
            style={{ fontWeight: 700 }}
          >
            {language === 'zh' ? '开始您的韩国之旅' : 'Start Your Journey'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-scc-dark-text-secondary max-w-2xl mx-auto mb-6 animate-fade-in-up animate-delay-100">
            {language === 'zh'
              ? '只需四步，轻松开启您的专属韩国医疗美容之旅'
              : 'Just four simple steps to your personalized Korean medical & beauty experience'}
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-scc-primary/10 text-scc-primary rounded-full font-semibold hover-scale animate-fade-in-up animate-delay-200">
            <Clock className="w-5 h-5 mr-2 animate-rotate-slow" />
            {language === 'zh' ? '总耗时 2-3周' : 'Takes 2-3 weeks'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => {
                stepRefs.current[index] = el;
              }}
              data-step-index={index}
              className={`relative animate-on-scroll hover-lift hover-glow ${
                visibleElements.has(index) ? 'animate-visible' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-scc-dark-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group h-full min-h-[400px]">
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2C5F7C] hover:bg-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center justify-center mb-4 hover-rotate transition-all duration-300 active:scale-95 touch-manipulation">
                  <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-white/80 transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3
                  className={`text-lg md:text-xl font-bold mb-3 transition-all duration-300 hover:text-[#D4AF37] hover:scale-105 hover:drop-shadow-lg rounded-md px-3 py-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 ${
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
                  {step.title}
                </h3>
                <div
                  className={`text-gray-600 dark:text-scc-dark-text-secondary leading-relaxed text-sm md:text-base space-y-1 flex-1 flex flex-col justify-center ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  {step.items.map((item, idx) => (
                    <p
                      key={idx}
                      className="hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:drop-shadow-lg rounded-md px-3 py-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 cursor-pointer"
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
                        e.currentTarget.style.transform =
                          'scale(1) rotate(0deg)';
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div
                  className={`hidden lg:block absolute top-8 -right-4 text-scc-primary/30 animate-fade-in-right ${
                    visibleElements.has(index) ? 'animate-visible' : ''
                  }`}
                  style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                >
                  <ArrowRight className="w-8 h-8 hover-scale" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
