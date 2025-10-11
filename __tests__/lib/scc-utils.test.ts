/**
 * Seoul Care Concierge Utilities Test Suite
 * 핵심 유틸리티 함수들의 정확성과 안정성을 검증합니다.
 */

import {
  languageUtils,
  formUtils,
  validationUtils,
  arrayUtils,
  stringUtils,
  objectUtils,
  isValidEmail,
  isValidPhone,
  isValidUrl,
} from '@/lib/scc-utils'
import type { InquiryForm } from '@/lib/scc-types'

describe('validationUtils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.kr')).toBe(true)
      expect(isValidEmail('user+tag@gmail.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false)
      expect(isValidEmail('notanemail')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('user @example.com')).toBe(false)
    })
  })

  describe('isValidPhone', () => {
    it('should validate correct phone numbers', () => {
      expect(isValidPhone('+821012345678')).toBe(true)
      expect(isValidPhone('+1234567890')).toBe(true)
      expect(isValidPhone('1234567890')).toBe(true)
    })

    it('should handle phone numbers with spaces', () => {
      expect(isValidPhone('+82 10 1234 5678')).toBe(true)
      // 정규식은 +나 1-9로 시작하는 번호만 허용하므로 0으로 시작하는 로컬 번호는 실패
      expect(isValidPhone('+1 234 567 8901')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('')).toBe(false)
      expect(isValidPhone('abc')).toBe(false)
      expect(isValidPhone('0')).toBe(false)
      expect(isValidPhone('+0')).toBe(false)
    })
  })

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://localhost:3000')).toBe(true)
      expect(isValidUrl('https://sub.domain.com/path?query=1')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(isValidUrl('')).toBe(false)
      expect(isValidUrl('notaurl')).toBe(false)
      expect(isValidUrl('//example.com')).toBe(false)
    })
  })
})

describe('languageUtils', () => {
  describe('getText', () => {
    it('should return text in requested language', () => {
      const text = { en: 'Hello', zh: '你好' }
      expect(languageUtils.getText(text, 'en')).toBe('Hello')
      expect(languageUtils.getText(text, 'zh')).toBe('你好')
    })

    it('should fallback to English if language not available', () => {
      const text = { en: 'Hello', zh: '' }
      expect(languageUtils.getText(text, 'zh')).toBe('Hello')
    })

    it('should return empty string for undefined text', () => {
      expect(languageUtils.getText(undefined, 'en')).toBe('')
    })
  })

  describe('getLanguageName', () => {
    it('should return correct language names', () => {
      expect(languageUtils.getLanguageName('en')).toBe('English')
      expect(languageUtils.getLanguageName('zh')).toBe('中文')
    })
  })

  describe('formatDate', () => {
    it('should format dates according to language', () => {
      const date = new Date('2025-01-15')
      const enResult = languageUtils.formatDate(date, 'en')
      const zhResult = languageUtils.formatDate(date, 'zh')

      expect(enResult).toContain('January')
      expect(enResult).toContain('2025')
      expect(zhResult).toContain('2025')
    })
  })

  describe('formatNumber', () => {
    it('should format numbers according to language locale', () => {
      const number = 1234567.89
      const enResult = languageUtils.formatNumber(number, 'en')
      const zhResult = languageUtils.formatNumber(number, 'zh')

      expect(enResult).toBeTruthy()
      expect(zhResult).toBeTruthy()
    })
  })

  describe('formatCurrency', () => {
    it('should format currency with correct symbols', () => {
      const amount = 100000
      const result = languageUtils.formatCurrency(amount, 'KRW', 'en')

      expect(result).toContain('100,000')
    })
  })
})

describe('formUtils', () => {
  describe('validateInquiryForm', () => {
    const validForm: Partial<InquiryForm> = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+821012345678',
      travelDate: '2025-06-01',
      agreeToTerms: true,
      agreeToPrivacy: true,
    }

    it('should pass validation for valid form', () => {
      const errors = formUtils.validateInquiryForm(validForm)
      expect(errors).toHaveLength(0)
    })

    it('should reject name with less than 2 characters', () => {
      const errors = formUtils.validateInquiryForm({ ...validForm, name: 'A' })
      expect(errors).toHaveLength(1)
      expect(errors[0].field).toBe('name')
    })

    it('should reject invalid email', () => {
      const errors = formUtils.validateInquiryForm({ ...validForm, email: 'invalid' })
      expect(errors).toHaveLength(1)
      expect(errors[0].field).toBe('email')
    })

    it('should reject invalid phone', () => {
      const errors = formUtils.validateInquiryForm({ ...validForm, phone: 'abc' })
      expect(errors).toHaveLength(1)
      expect(errors[0].field).toBe('phone')
    })

    it('should require travel date', () => {
      const errors = formUtils.validateInquiryForm({ ...validForm, travelDate: '' })
      expect(errors).toHaveLength(1)
      expect(errors[0].field).toBe('travelDate')
    })

    it('should require terms agreement', () => {
      const errors = formUtils.validateInquiryForm({ ...validForm, agreeToTerms: false })
      expect(errors).toHaveLength(1)
      expect(errors[0].field).toBe('agreeToTerms')
    })

    it('should require privacy agreement', () => {
      const errors = formUtils.validateInquiryForm({ ...validForm, agreeToPrivacy: false })
      expect(errors).toHaveLength(1)
      expect(errors[0].field).toBe('agreeToPrivacy')
    })

    it('should return multiple errors for multiple invalid fields', () => {
      const invalidForm = {
        name: 'A',
        email: 'invalid',
        phone: 'abc',
      }
      const errors = formUtils.validateInquiryForm(invalidForm)
      expect(errors.length).toBeGreaterThan(3)
    })
  })

  describe('resetInquiryForm', () => {
    it('should return form with default values', () => {
      const form = formUtils.resetInquiryForm()

      expect(form.name).toBe('')
      expect(form.email).toBe('')
      expect(form.phone).toBe('')
      expect(form.preferredContact).toBe('email')
      expect(form.serviceInterest).toBe('all')
      expect(form.agreeToTerms).toBe(false)
      expect(form.agreeToPrivacy).toBe(false)
    })
  })

  describe('formToQueryString', () => {
    it('should convert form to query string', () => {
      const form = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceInterest: 'medical',
      }
      const queryString = formUtils.formToQueryString(form)

      expect(queryString).toContain('name=John+Doe')
      expect(queryString).toContain('email=john')
      expect(queryString).toContain('serviceInterest=medical')
    })

    it('should skip empty values', () => {
      const form = {
        name: 'John',
        email: '',
        phone: undefined,
      }
      const queryString = formUtils.formToQueryString(form)

      expect(queryString).toContain('name=John')
      expect(queryString).not.toContain('email')
      expect(queryString).not.toContain('phone')
    })
  })
})

describe('arrayUtils', () => {
  describe('unique', () => {
    it('should remove duplicate values', () => {
      expect(arrayUtils.unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
      expect(arrayUtils.unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
    })

    it('should handle empty arrays', () => {
      expect(arrayUtils.unique([])).toEqual([])
    })
  })

  describe('shuffle', () => {
    it('should return array with same length', () => {
      const arr = [1, 2, 3, 4, 5]
      const shuffled = arrayUtils.shuffle(arr)
      expect(shuffled).toHaveLength(arr.length)
    })

    it('should contain all original elements', () => {
      const arr = [1, 2, 3, 4, 5]
      const shuffled = arrayUtils.shuffle(arr)

      arr.forEach(item => {
        expect(shuffled).toContain(item)
      })
    })

    it('should not modify original array', () => {
      const original = [1, 2, 3, 4, 5]
      const copy = [...original]
      arrayUtils.shuffle(original)

      expect(original).toEqual(copy)
    })

    it('should handle empty array', () => {
      expect(arrayUtils.shuffle([])).toEqual([])
    })

    it('should handle single element array', () => {
      expect(arrayUtils.shuffle([1])).toEqual([1])
    })

    it('should handle array with undefined values safely', () => {
      const arr = [1, undefined, 2, undefined, 3]
      const shuffled = arrayUtils.shuffle(arr)

      expect(shuffled).toHaveLength(5)
      expect(shuffled.filter(x => x === undefined)).toHaveLength(2)
      expect(shuffled.filter(x => x !== undefined)).toHaveLength(3)
    })
  })

  describe('chunk', () => {
    it('should split array into chunks of specified size', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7]
      const chunks = arrayUtils.chunk(arr, 3)

      expect(chunks).toEqual([[1, 2, 3], [4, 5, 6], [7]])
    })

    it('should handle array smaller than chunk size', () => {
      expect(arrayUtils.chunk([1, 2], 5)).toEqual([[1, 2]])
    })

    it('should handle empty array', () => {
      expect(arrayUtils.chunk([], 3)).toEqual([])
    })
  })
})

describe('stringUtils', () => {
  describe('slugify', () => {
    it('should convert string to URL-friendly slug', () => {
      expect(stringUtils.slugify('Hello World')).toBe('hello-world')
      expect(stringUtils.slugify('Seoul Care Concierge')).toBe('seoul-care-concierge')
    })

    it('should remove special characters', () => {
      expect(stringUtils.slugify('Hello! @World#')).toBe('hello-world')
    })

    it('should handle multiple spaces', () => {
      expect(stringUtils.slugify('hello   world')).toBe('hello-world')
    })
  })

  describe('truncate', () => {
    it('should truncate long strings', () => {
      const long = 'This is a very long string that needs truncation'
      expect(stringUtils.truncate(long, 20)).toBe('This is a very long ...')
    })

    it('should not truncate short strings', () => {
      expect(stringUtils.truncate('Short', 10)).toBe('Short')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(stringUtils.capitalize('hello')).toBe('Hello')
      expect(stringUtils.capitalize('HELLO')).toBe('Hello')
    })
  })

  describe('camelToKebab', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(stringUtils.camelToKebab('camelCase')).toBe('camel-case')
      expect(stringUtils.camelToKebab('myVariableName')).toBe('my-variable-name')
    })
  })
})

describe('objectUtils', () => {
  describe('deepClone', () => {
    it('should create deep copy of object', () => {
      const original = { a: 1, b: { c: 2 } }
      const cloned = objectUtils.deepClone(original)

      cloned.b.c = 3
      expect(original.b.c).toBe(2)
      expect(cloned.b.c).toBe(3)
    })
  })

  describe('removeEmptyValues', () => {
    it('should remove null, undefined, and empty string values', () => {
      const obj = {
        name: 'John',
        email: '',
        age: null,
        phone: undefined,
        city: 'Seoul',
      }

      const cleaned = objectUtils.removeEmptyValues(obj)

      expect(cleaned).toEqual({ name: 'John', city: 'Seoul' })
    })

    it('should keep zero values', () => {
      const obj = { count: 0, price: 0 }
      const cleaned = objectUtils.removeEmptyValues(obj)

      expect(cleaned).toEqual({ count: 0, price: 0 })
    })
  })
})
