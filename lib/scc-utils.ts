/**
 * Seoul Care Concierge (SCC) 유틸리티 함수들
 * SCC 프로젝트 전용 유틸리티 함수들을 모아놓은 파일입니다.
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { 
  Language, 
  BilingualText, 
  ContactMethod, 
  ServiceType, 
  PackageType,
  InquiryForm,
  FormError
} from './scc-types'

// Tailwind CSS 클래스 병합 유틸리티
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 언어 관련 유틸리티
export const languageUtils = {
  /**
   * 현재 언어에 맞는 텍스트를 반환합니다.
   */
  getText: (text: BilingualText | undefined, language: Language): string => {
    if (!text) return ''
    return text[language] || text.en || ''
  },

  /**
   * 브라우저 언어 설정을 감지하여 지원되는 언어를 반환합니다.
   */
  detectBrowserLanguage: (): Language => {
    if (typeof window === 'undefined') return 'en'
    
    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'zh' ? 'zh' : 'en'
  },

  /**
   * 언어 코드를 언어 이름으로 변환합니다.
   */
  getLanguageName: (code: Language): string => {
    const names = {
      en: 'English',
      zh: '中文'
    }
    return names[code]
  },

  /**
   * 언어에 따른 날짜 포맷을 반환합니다.
   */
  formatDate: (date: Date, language: Language): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    
    const locale = language === 'zh' ? 'zh-CN' : 'en-US'
    return new Intl.DateTimeFormat(locale, options).format(date)
  },

  /**
   * 언어에 따른 숫자 포맷을 반환합니다.
   */
  formatNumber: (number: number, language: Language): string => {
    const locale = language === 'zh' ? 'zh-CN' : 'en-US'
    return new Intl.NumberFormat(locale).format(number)
  },

  /**
   * 언어에 따른 통화 포맷을 반환합니다.
   */
  formatCurrency: (amount: number, currency: string, language: Language): string => {
    const locale = language === 'zh' ? 'zh-CN' : 'en-US'
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount)
  }
}

// 폼 관련 유틸리티
export const formUtils = {
  /**
   * 폼 데이터를 검증합니다.
   */
  validateInquiryForm: (form: Partial<InquiryForm>): FormError[] => {
    const errors: FormError[] = []

    if (!form.name || form.name.trim().length < 2) {
      errors.push({
        field: 'name',
        message: {
          en: 'Name must be at least 2 characters',
          zh: '姓名至少需要2个字符'
        }
      })
    }

    if (!form.email || !isValidEmail(form.email)) {
      errors.push({
        field: 'email',
        message: {
          en: 'Please enter a valid email address',
          zh: '请输入有效的电子邮件地址'
        }
      })
    }

    if (!form.phone || !isValidPhone(form.phone)) {
      errors.push({
        field: 'phone',
        message: {
          en: 'Please enter a valid phone number',
          zh: '请输入有效的电话号码'
        }
      })
    }

    if (!form.travelDate) {
      errors.push({
        field: 'travelDate',
        message: {
          en: 'Please select your travel date',
          zh: '请选择您的旅行日期'
        }
      })
    }

    if (!form.agreeToTerms) {
      errors.push({
        field: 'agreeToTerms',
        message: {
          en: 'You must agree to the terms and conditions',
          zh: '您必须同意条款和条件'
        }
      })
    }

    if (!form.agreeToPrivacy) {
      errors.push({
        field: 'agreeToPrivacy',
        message: {
          en: 'You must agree to the privacy policy',
          zh: '您必须同意隐私政策'
        }
      })
    }

    return errors
  },

  /**
   * 폼 데이터를 초기화합니다.
   */
  resetInquiryForm: (): Partial<InquiryForm> => ({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    preferredContact: 'email',
    serviceInterest: 'all',
    travelDate: '',
    budget: '',
    message: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  }),

  /**
   * 폼 데이터를 URL 쿼리 파라미터로 변환합니다.
   */
  formToQueryString: (form: Partial<InquiryForm>): string => {
    const params = new URLSearchParams()
    
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value))
      }
    })
    
    return params.toString()
  },

  /**
   * URL 쿼리 파라미터를 폼 데이터로 변환합니다.
   */
  queryStringToForm: (queryString: string): Partial<InquiryForm> => {
    const params = new URLSearchParams(queryString)
    const form: Partial<InquiryForm> = {}
    
    for (const [key, value] of params.entries()) {
      if (key in form) {
        (form as any)[key] = value
      }
    }
    
    return form
  }
}

// 검증 유틸리티
export const validationUtils = {
  /**
   * 이메일 주소가 유효한지 검증합니다.
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * 전화번호가 유효한지 검증합니다.
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  },

  /**
   * URL이 유효한지 검증합니다.
   */
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
}

// 재사용 가능한 검증 함수들
export const isValidEmail = validationUtils.isValidEmail
export const isValidPhone = validationUtils.isValidPhone
export const isValidUrl = validationUtils.isValidUrl

// 스크롤 관련 유틸리티
export const scrollUtils = {
  /**
   * 특정 요소로 부드럽게 스크롤합니다.
   */
  scrollToElement: (elementId: string, offset: number = 0): void => {
    if (typeof window === 'undefined') return
    
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  },

  /**
   * 페이지 상단으로 스크롤합니다.
   */
  scrollToTop: (): void => {
    if (typeof window === 'undefined') return
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  },

  /**
   * 현재 스크롤 위치를 반환합니다.
   */
  getScrollPosition: (): number => {
    if (typeof window === 'undefined') return 0
    return window.pageYOffset || document.documentElement.scrollTop
  },

  /**
   * 스크롤이 특정 위치에 도달했는지 확인합니다.
   */
  isScrolledTo: (position: number): boolean => {
    return scrollUtils.getScrollPosition() >= position
  }
}

// 로컬 스토리지 유틸리티
export const storageUtils = {
  /**
   * 로컬 스토리지에 데이터를 저장합니다.
   */
  setItem: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },

  /**
   * 로컬 스토리지에서 데이터를 가져옵니다.
   */
  getItem: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Failed to read from localStorage:', error)
      return defaultValue
    }
  },

  /**
   * 로컬 스토리지에서 데이터를 제거합니다.
   */
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove from localStorage:', error)
    }
  }
}

// 문자열 유틸리티
export const stringUtils = {
  /**
   * 문자열을 URL 친화적인 슬러그로 변환합니다.
   */
  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },

  /**
   * 문자열을 제한된 길이로 자르고 말줄임표를 추가합니다.
   */
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  },

  /**
   * 첫 글자를 대문자로 변환합니다.
   */
  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  },

  /**
   * 카멜케이스를 케밥케이스로 변환합니다.
   */
  camelToKebab: (text: string): string => {
    return text.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  }
}

// 배열 유틸리티
export const arrayUtils = {
  /**
   * 배열을 고유한 값들로 필터링합니다.
   */
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)]
  },

  /**
   * 배열을 무작위로 섞습니다.
   */
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },

  /**
   * 배열을 청크 단위로 나눕니다.
   */
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }
}

// 객체 유틸리티
export const objectUtils = {
  /**
   * 객체의 깊은 복사를 수행합니다.
   */
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj))
  },

  /**
   * 객체에서 빈 값들을 제거합니다.
   */
  removeEmptyValues: <T extends Record<string, any>>(obj: T): Partial<T> => {
    const cleaned: Partial<T> = {}
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        cleaned[key as keyof T] = value
      }
    })
    return cleaned
  },

  /**
   * 객체의 키들을 카멜케이스로 변환합니다.
   */
  keysToCamel: <T extends Record<string, any>>(obj: T): T => {
    const result = {} as T
    Object.keys(obj).forEach(key => {
      const camelKey = stringUtils.camelToKebab(key)
      result[camelKey as keyof T] = obj[key]
    })
    return result
  }
}

// 디바운스 유틸리티
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 쓰로틀 유틸리티
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 기본 내보내기
const sccUtils = {
  cn,
  languageUtils,
  formUtils,
  validationUtils,
  scrollUtils,
  storageUtils,
  stringUtils,
  arrayUtils,
  objectUtils,
  debounce,
  throttle
}

export default sccUtils
