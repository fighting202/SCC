import { z } from 'zod'
import type { Language, ContactMethod, ServiceType } from '@/lib/scc-types'

// 문의 폼 스키마
export const inquiryFormSchema = z.object({
  name: z.string()
    .min(2, { en: 'Name must be at least 2 characters', zh: '姓名至少需要2个字符' })
    .max(50, { en: 'Name must be less than 50 characters', zh: '姓名不能超过50个字符' }),
  
  email: z.string()
    .email({ en: 'Please enter a valid email address', zh: '请输入有效的电子邮件地址' }),
  
  phone: z.string()
    .min(10, { en: 'Phone number must be at least 10 digits', zh: '电话号码至少需要10位数字' })
    .max(20, { en: 'Phone number must be less than 20 digits', zh: '电话号码不能超过20位数字' })
    .regex(/^[\+]?[1-9][\d]{0,15}$/, { 
      en: 'Please enter a valid phone number', 
      zh: '请输入有效的电话号码' 
    }),
  
  nationality: z.string()
    .min(2, { en: 'Please enter your nationality', zh: '请输入您的国籍' }),
  
  preferredContact: z.enum(['wechat', 'whatsapp', 'email'], {
    errorMap: () => ({ 
      message: { en: 'Please select a contact method', zh: '请选择联系方式' } 
    })
  }),
  
  serviceInterest: z.enum(['medical', 'beauty', 'support', 'all'], {
    errorMap: () => ({ 
      message: { en: 'Please select a service interest', zh: '请选择感兴趣的服务' } 
    })
  }),
  
  travelDate: z.string()
    .min(1, { en: 'Please select your travel date', zh: '请选择您的旅行日期' })
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, { 
      message: { en: 'Travel date must be in the future', zh: '旅行日期必须是未来日期' } 
    }),
  
  budget: z.string().optional(),
  
  message: z.string()
    .max(1000, { en: 'Message must be less than 1000 characters', zh: '消息不能超过1000个字符' })
    .optional(),
  
  agreeToTerms: z.boolean()
    .refine((val) => val === true, { 
      message: { en: 'You must agree to the terms and conditions', zh: '您必须同意条款和条件' } 
    }),
  
  agreeToPrivacy: z.boolean()
    .refine((val) => val === true, { 
      message: { en: 'You must agree to the privacy policy', zh: '您必须同意隐私政策' } 
    })
})

// 비용 계산기 폼 스키마
export const costEstimatorSchema = z.object({
  serviceType: z.enum(['medical', 'beauty', 'support'], {
    errorMap: () => ({ 
      message: { en: 'Please select a service type', zh: '请选择服务类型' } 
    })
  }),
  
  duration: z.number()
    .min(1, { en: 'Duration must be at least 1 day', zh: '持续时间至少1天' })
    .max(30, { en: 'Duration must be less than 30 days', zh: '持续时间不能超过30天' }),
  
  accommodation: z.enum(['budget', 'standard', 'luxury'], {
    errorMap: () => ({ 
      message: { en: 'Please select accommodation type', zh: '请选择住宿类型' } 
    })
  }),
  
  transportation: z.boolean().default(false),
  
  interpreter: z.boolean().default(false),
  
  emergencySupport: z.boolean().default(true)
})

// 예약 폼 스키마
export const bookingFormSchema = z.object({
  firstName: z.string()
    .min(2, { en: 'First name must be at least 2 characters', zh: '名字至少需要2个字符' }),
  
  lastName: z.string()
    .min(2, { en: 'Last name must be at least 2 characters', zh: '姓氏至少需要2个字符' }),
  
  email: z.string()
    .email({ en: 'Please enter a valid email address', zh: '请输入有效的电子邮件地址' }),
  
  phone: z.string()
    .min(10, { en: 'Phone number must be at least 10 digits', zh: '电话号码至少需要10位数字' }),
  
  nationality: z.string()
    .min(2, { en: 'Please enter your nationality', zh: '请输入您的国籍' }),
  
  passportNumber: z.string()
    .min(6, { en: 'Please enter a valid passport number', zh: '请输入有效的护照号码' })
    .optional(),
  
  serviceType: z.enum(['medical', 'beauty', 'support'], {
    errorMap: () => ({ 
      message: { en: 'Please select a service type', zh: '请选择服务类型' } 
    })
  }),
  
  preferredDate: z.string()
    .min(1, { en: 'Please select your preferred date', zh: '请选择您偏好的日期' }),
  
  preferredTime: z.string()
    .min(1, { en: 'Please select your preferred time', zh: '请选择您偏好的时间' }),
  
  specialRequests: z.string()
    .max(500, { en: 'Special requests must be less than 500 characters', zh: '特殊要求不能超过500个字符' })
    .optional(),
  
  agreeToTerms: z.boolean()
    .refine((val) => val === true, { 
      message: { en: 'You must agree to the terms and conditions', zh: '您必须同意条款和条件' } 
    })
})

// 연락처 폼 스키마
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { en: 'Name must be at least 2 characters', zh: '姓名至少需要2个字符' }),
  
  email: z.string()
    .email({ en: 'Please enter a valid email address', zh: '请输入有效的电子邮件地址' }),
  
  subject: z.string()
    .min(5, { en: 'Subject must be at least 5 characters', zh: '主题至少需要5个字符' })
    .max(100, { en: 'Subject must be less than 100 characters', zh: '主题不能超过100个字符' }),
  
  message: z.string()
    .min(10, { en: 'Message must be at least 10 characters', zh: '消息至少需要10个字符' })
    .max(1000, { en: 'Message must be less than 1000 characters', zh: '消息不能超过1000个字符' }),
  
  contactMethod: z.enum(['wechat', 'whatsapp', 'email'], {
    errorMap: () => ({ 
      message: { en: 'Please select a contact method', zh: '请选择联系方式' } 
    })
  }),
  
  urgency: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ 
      message: { en: 'Please select urgency level', zh: '请选择紧急程度' } 
    })
  })
})

// 타입 추출
export type InquiryFormData = z.infer<typeof inquiryFormSchema>
export type CostEstimatorData = z.infer<typeof costEstimatorSchema>
export type BookingFormData = z.infer<typeof bookingFormSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>

// 다국어 에러 메시지 헬퍼
export function getErrorMessage(error: any, language: Language = 'en'): string {
  if (typeof error === 'string') return error
  
  if (error?.message) {
    if (typeof error.message === 'object') {
      return error.message[language] || error.message.en || 'Invalid input'
    }
    return error.message
  }
  
  return 'Invalid input'
}
