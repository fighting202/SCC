import { z } from 'zod'
import type { Language } from '@/lib/scc-types'

// 문의 폼 스키마
export const inquiryFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z.string()
    .email('Please enter a valid email address'),

  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 digits')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),

  nationality: z.string()
    .min(2, 'Please enter your nationality'),

  preferredContact: z.enum(['wechat', 'whatsapp', 'email'], {
    errorMap: () => ({ message: 'Please select a contact method' })
  }),

  serviceInterest: z.enum(['medical', 'beauty', 'support', 'all'], {
    errorMap: () => ({ message: 'Please select a service interest' })
  }),

  travelDate: z.string()
    .min(1, 'Please select your travel date')
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Travel date must be in the future'),

  budget: z.string().optional(),

  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),

  agreeToTerms: z.boolean()
    .refine((val) => val === true, 'You must agree to the terms and conditions'),

  agreeToPrivacy: z.boolean()
    .refine((val) => val === true, 'You must agree to the privacy policy')
})

// 비용 계산기 폼 스키마
export const costEstimatorSchema = z.object({
  serviceType: z.enum(['medical', 'beauty', 'support'], {
    errorMap: () => ({ message: 'Please select a service type' })
  }),

  duration: z.number()
    .min(1, 'Duration must be at least 1 day')
    .max(30, 'Duration must be less than 30 days'),

  accommodation: z.enum(['budget', 'standard', 'luxury'], {
    errorMap: () => ({ message: 'Please select accommodation type' })
  }),

  transportation: z.boolean().default(false),

  interpreter: z.boolean().default(false),

  emergencySupport: z.boolean().default(true)
})

// 예약 폼 스키마
export const bookingFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters'),

  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters'),

  email: z.string()
    .email('Please enter a valid email address'),

  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits'),

  nationality: z.string()
    .min(2, 'Please enter your nationality'),

  passportNumber: z.string()
    .min(6, 'Please enter a valid passport number')
    .optional(),

  serviceType: z.enum(['medical', 'beauty', 'support'], {
    errorMap: () => ({ message: 'Please select a service type' })
  }),

  preferredDate: z.string()
    .min(1, 'Please select your preferred date'),

  preferredTime: z.string()
    .min(1, 'Please select your preferred time'),

  specialRequests: z.string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional(),

  agreeToTerms: z.boolean()
    .refine((val) => val === true, 'You must agree to the terms and conditions')
})

// 연락처 폼 스키마
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters'),

  email: z.string()
    .email('Please enter a valid email address'),

  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),

  contactMethod: z.enum(['wechat', 'whatsapp', 'email'], {
    errorMap: () => ({ message: 'Please select a contact method' })
  }),

  urgency: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select urgency level' })
  })
})

// 타입 추출
export type InquiryFormData = z.infer<typeof inquiryFormSchema>
export type CostEstimatorData = z.infer<typeof costEstimatorSchema>
export type BookingFormData = z.infer<typeof bookingFormSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>

// 다국어 에러 메시지 매핑
const errorMessages: Record<string, { en: string; zh: string }> = {
  'Name must be at least 2 characters': {
    en: 'Name must be at least 2 characters',
    zh: '姓名至少需要2个字符'
  },
  'Name must be less than 50 characters': {
    en: 'Name must be less than 50 characters',
    zh: '姓名不能超过50个字符'
  },
  'Please enter a valid email address': {
    en: 'Please enter a valid email address',
    zh: '请输入有效的电子邮件地址'
  },
  'Phone number must be at least 10 digits': {
    en: 'Phone number must be at least 10 digits',
    zh: '电话号码至少需要10位数字'
  },
  'Phone number must be less than 20 digits': {
    en: 'Phone number must be less than 20 digits',
    zh: '电话号码不能超过20位数字'
  },
  'Please enter a valid phone number': {
    en: 'Please enter a valid phone number',
    zh: '请输入有效的电话号码'
  },
  'Please enter your nationality': {
    en: 'Please enter your nationality',
    zh: '请输入您的国籍'
  },
  'Please select a contact method': {
    en: 'Please select a contact method',
    zh: '请选择联系方式'
  },
  'Please select a service interest': {
    en: 'Please select a service interest',
    zh: '请选择感兴趣的服务'
  },
  'Please select your travel date': {
    en: 'Please select your travel date',
    zh: '请选择您的旅行日期'
  },
  'Travel date must be in the future': {
    en: 'Travel date must be in the future',
    zh: '旅行日期必须是未来日期'
  },
  'Message must be less than 1000 characters': {
    en: 'Message must be less than 1000 characters',
    zh: '消息不能超过1000个字符'
  },
  'You must agree to the terms and conditions': {
    en: 'You must agree to the terms and conditions',
    zh: '您必须同意条款和条件'
  },
  'You must agree to the privacy policy': {
    en: 'You must agree to the privacy policy',
    zh: '您必须同意隐私政策'
  },
  'Please select a service type': {
    en: 'Please select a service type',
    zh: '请选择服务类型'
  },
  'Duration must be at least 1 day': {
    en: 'Duration must be at least 1 day',
    zh: '持续时间至少1天'
  },
  'Duration must be less than 30 days': {
    en: 'Duration must be less than 30 days',
    zh: '持续时间不能超过30天'
  },
  'Please select accommodation type': {
    en: 'Please select accommodation type',
    zh: '请选择住宿类型'
  },
  'First name must be at least 2 characters': {
    en: 'First name must be at least 2 characters',
    zh: '名字至少需要2个字符'
  },
  'Last name must be at least 2 characters': {
    en: 'Last name must be at least 2 characters',
    zh: '姓氏至少需要2个字符'
  },
  'Please enter a valid passport number': {
    en: 'Please enter a valid passport number',
    zh: '请输入有效的护照号码'
  },
  'Please select your preferred date': {
    en: 'Please select your preferred date',
    zh: '请选择您偏好的日期'
  },
  'Please select your preferred time': {
    en: 'Please select your preferred time',
    zh: '请选择您偏好的时间'
  },
  'Special requests must be less than 500 characters': {
    en: 'Special requests must be less than 500 characters',
    zh: '特殊要求不能超过500个字符'
  },
  'Subject must be at least 5 characters': {
    en: 'Subject must be at least 5 characters',
    zh: '主题至少需要5个字符'
  },
  'Subject must be less than 100 characters': {
    en: 'Subject must be less than 100 characters',
    zh: '主题不能超过100个字符'
  },
  'Message must be at least 10 characters': {
    en: 'Message must be at least 10 characters',
    zh: '消息至少需要10个字符'
  },
  'Please select urgency level': {
    en: 'Please select urgency level',
    zh: '请选择紧急程度'
  }
}

// 다국어 에러 메시지 헬퍼
export function getErrorMessage(error: any, language: Language = 'en'): string {
  if (typeof error === 'string') {
    const mapped = errorMessages[error]
    return mapped ? mapped[language] : error
  }

  if (error?.message) {
    if (typeof error.message === 'string') {
      const mapped = errorMessages[error.message]
      return mapped ? mapped[language] : error.message
    }
    if (typeof error.message === 'object') {
      return error.message[language] || error.message.en || 'Invalid input'
    }
  }

  return 'Invalid input'
}
