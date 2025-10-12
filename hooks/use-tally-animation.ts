'use client';

import { useEffect } from 'react';

export type TallyAnimationType = 'center' | 'bottom-up' | 'slide-up' | 'fade';

export function useTallyAnimation(
  animationType: TallyAnimationType = 'center'
) {
  useEffect(() => {
    // 전역 함수를 통해 애니메이션 타입 설정
    if (typeof window !== 'undefined' && (window as any).setTallyAnimation) {
      (window as any).setTallyAnimation(animationType);
    }
  }, [animationType]);
}

// 탤리 모달 애니메이션을 직접 적용하는 함수
export function applyTallyAnimation(
  animationType: TallyAnimationType = 'center'
) {
  const overlay = document.querySelector('.tally-modal-overlay');
  if (overlay) {
    const content =
      overlay.querySelector('[data-tally-modal]') ||
      overlay.querySelector('.tally-modal-content') ||
      overlay.querySelector('iframe')?.parentElement;

    if (content) {
      // 기존 애니메이션 클래스 제거
      content.classList.remove(
        'tally-modal-center',
        'tally-modal-bottom-up',
        'tally-modal-content'
      );

      // 새로운 애니메이션 클래스 추가
      content.classList.add('tally-modal-content');
      switch (animationType) {
        case 'center':
          content.classList.add('tally-modal-center');
          break;
        case 'bottom-up':
          content.classList.add('tally-modal-bottom-up');
          break;
        case 'slide-up':
          // 기본 slide-up 애니메이션 (tally-modal-content 클래스 사용)
          break;
        case 'fade':
          // 기본 fade 애니메이션 (tally-modal-content 클래스 사용)
          break;
      }
    }
  }
}
