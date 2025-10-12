'use client';

import React from 'react';
import type { BilingualText, Language } from './scc-types';

export function checkBusinessHours(): boolean {
  const now = new Date();
  const seoulTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
  );
  const day = seoulTime.getDay();
  const hour = seoulTime.getHours();

  if (day === 0) return false; // Sunday closed
  if (day === 6) return hour >= 10 && hour < 16; // Sat 10-4
  return hour >= 9 && hour < 18; // Mon-Fri 9-6
}

export function getText(text: BilingualText, lang: Language): string {
  return text[lang];
}

export function formatPrice(
  amount: number,
  currency: 'USD' | 'CNY' = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppLink(message?: string): string {
  const defaultMsg = encodeURIComponent(
    `Hi Seoul Care Concierge!\n\nName: \nService: \nTravel dates: \nBudget: `
  );
  return `https://wa.me/821029816653?text=${message || defaultMsg}`;
}

/**
 * Smooth scroll to section with header offset
 * Eliminates code duplication across header, hero-section, and footer components
 *
 * @param {string} id - The ID of the element to scroll to
 *
 * @example
 * ```tsx
 * <button onClick={() => scrollToSection('services')}>
 *   Go to Services
 * </button>
 * ```
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id "${id}" not found`);
    return;
  }

  // 섹션의 실제 콘텐츠 시작 위치를 찾기 위해 첫 번째 자식 요소 확인
  const firstChild = element.querySelector(
    'h1, h2, h3, .section-title, .container > *:first-child'
  );
  const targetElement = firstChild || element;

  // 스크롤 함수 정의
  const performScroll = () => {
    // 헤더의 현재 높이를 실시간으로 계산
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80;

    // 섹션 패딩 및 여백 고려
    const extraOffset = 20;
    const totalOffset = headerHeight + extraOffset;

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition), // 음수 방지
      behavior: 'smooth',
    });
  };

  // 즉시 스크롤 시작
  performScroll();

  // 스크롤 애니메이션 완료 후 헤더 높이 변화를 고려하여 정확한 위치로 재조정
  setTimeout(() => {
    performScroll();
  }, 100); // 스크롤 애니메이션 완료 대기
}

/**
 * Handle keyboard events for accessibility
 * Provides consistent keyboard navigation across components
 *
 * @param {KeyboardEvent} event - The keyboard event
 * @param {Object} options - Configuration options
 * @param {string[]} options.allowedKeys - Array of allowed key codes
 * @param {Function} options.onEnter - Callback for Enter key
 * @param {Function} options.onEscape - Callback for Escape key
 * @param {Function} options.onArrowUp - Callback for ArrowUp key
 * @param {Function} options.onArrowDown - Callback for ArrowDown key
 * @param {Function} options.onArrowLeft - Callback for ArrowLeft key
 * @param {Function} options.onArrowRight - Callback for ArrowRight key
 * @param {Function} options.onSpace - Callback for Space key
 * @param {Function} options.onTab - Callback for Tab key
 *
 * @example
 * ```tsx
 * <button
 *   onKeyDown={(e) => handleKeyboardEvent(e, {
 *     onEnter: () => handleClick(),
 *     onEscape: () => handleClose(),
 *     allowedKeys: ['Enter', 'Escape', 'Space']
 *   })}
 * >
 *   Click me
 * </button>
 * ```
 */
export function handleKeyboardEvent(
  event: React.KeyboardEvent<Element>,
  options: {
    allowedKeys?: string[];
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onSpace?: () => void;
    onTab?: () => void;
  } = {}
): void {
  const {
    allowedKeys = [],
    onEnter,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onSpace,
    onTab,
  } = options;

  // Check if key is allowed
  if (allowedKeys.length > 0 && !allowedKeys.includes(event.key)) {
    return;
  }

  // Prevent default behavior for handled keys
  const handledKeys = [
    'Enter',
    'Escape',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    ' ',
    'Tab',
  ];
  if (handledKeys.includes(event.key)) {
    event.preventDefault();
  }

  // Handle specific keys
  switch (event.key) {
    case 'Enter':
      onEnter?.();
      break;
    case 'Escape':
      onEscape?.();
      break;
    case 'ArrowUp':
      onArrowUp?.();
      break;
    case 'ArrowDown':
      onArrowDown?.();
      break;
    case 'ArrowLeft':
      onArrowLeft?.();
      break;
    case 'ArrowRight':
      onArrowRight?.();
      break;
    case ' ':
      onSpace?.();
      break;
    case 'Tab':
      onTab?.();
      break;
  }
}
