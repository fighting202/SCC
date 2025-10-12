/**
 * SCC 애니메이션 컴포넌트들
 * Framer Motion을 사용한 재사용 가능한 애니메이션 컴포넌트들
 */

export { FadeIn } from './fade-in';
export { HoverScale } from './hover-scale';
export { Parallax } from './parallax';
export { SlideIn } from './slide-in';
export { StaggerChildren } from './stagger-children';

// 애니메이션 프리셋들
export const animationPresets = {
  // 기본 페이드 인
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // 빠른 페이드 인
  fadeInFast: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // 슬라이드 인 (왼쪽)
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // 슬라이드 인 (오른쪽)
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // 스케일 인
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // 호버 효과
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },

  // 탭 효과
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
} as const;

// 페이지 전환 애니메이션
export const pageTransitions = {
  // 페이지 진입
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },

  // 모달 진입
  modalEnter: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;
