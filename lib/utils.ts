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