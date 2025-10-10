import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import type { Language, BilingualText } from './scc-types';

export function checkBusinessHours(): boolean {
  const now = new Date();
  const seoulTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const day = seoulTime.getDay();
  const hour = seoulTime.getHours();
  
  if (day === 0) return false; // Sunday closed
  if (day === 6) return hour >= 10 && hour < 16; // Sat 10-4
  return hour >= 9 && hour < 18; // Mon-Fri 9-6
}

export function getText(text: BilingualText, lang: Language): string {
  return text[lang];
}

export function formatPrice(amount: number, currency: 'USD' | 'CNY' = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
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
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`Element with id "${id}" not found`)
    return
  }

  // Define header offsets for different sections
  const offsets: Record<string, number> = {
    'get-started': 160,
    'services': 120,
    'how-it-works': 120,
    'about': 120,
    'why-choose-us': 120,
    'contact': 120,
    'faq': 120,
    'default': 120,
  }

  const headerHeight = offsets[id] || offsets.default
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}