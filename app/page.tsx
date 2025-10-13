'use client';

import BackToTop from '@/components/back-to-top';
import { CommitmentSection } from '@/components/commitment-section';
import ContactSection from '@/components/contact-section';
import FAQSection from '@/components/faq-section';
import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import { HowItWorks } from '@/components/how-it-works';
import PackageComparison from '@/components/package-comparison';
import { ScrollProgress } from '@/components/scroll-progress';
import { ServicesSection } from '@/components/services-section';
import { WhyChooseUs } from '@/components/why-choose-us';
import { useSwipeNavigation } from '@/hooks/use-swipe-navigation';
import { scrollToSection } from '@/lib/client-utils';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sections = [
    'hero',
    'services',
    'how-it-works',
    'why-choose-us',
    'packages',
    'faq',
    'get-started',
    'commitment',
  ];

  useEffect(() => {
    // 페이지 로드 시 히어로 섹션으로 스크롤
    window.scrollTo(0, 0);
    // 페이지 로드 시 애니메이션 시작
    setIsVisible(true);
  }, []);

  // 스와이프 네비게이션
  useSwipeNavigation({
    onSwipeUp: () => {
      if (currentSectionIndex > 0) {
        const nextIndex = currentSectionIndex - 1;
        setCurrentSectionIndex(nextIndex);
        const sectionId = sections[nextIndex];
        if (sectionId) {
          scrollToSection(sectionId);
        }
      }
    },
    onSwipeDown: () => {
      if (currentSectionIndex < sections.length - 1) {
        const nextIndex = currentSectionIndex + 1;
        setCurrentSectionIndex(nextIndex);
        const sectionId = sections[nextIndex];
        if (sectionId) {
          scrollToSection(sectionId);
        }
      }
    },
    threshold: 80, // 스와이프 감도 조정
  });

  return (
    <motion.main
      id="main"
      className="min-h-screen bg-white"
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <ScrollProgress />
      <Header />
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <WhyChooseUs />
      <PackageComparison />
      <FAQSection />
      <ContactSection />
      <CommitmentSection />
      <Footer />
      <BackToTop />
    </motion.main>
  );
}
