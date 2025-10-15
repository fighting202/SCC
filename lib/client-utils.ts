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

  // 헤더 높이 계산
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;
  
  // Contact 섹션은 더 큰 오프셋, 다른 섹션들은 작은 오프셋
  const extraOffset = id === 'get-started' ? 40 : 10;
  const offset = headerHeight + extraOffset;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: 'smooth',
  });
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
