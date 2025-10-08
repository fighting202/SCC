'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Send, MessageCircle, Phone, Mail } from 'lucide-react'
import { BilingualText } from '../bilingualtext'
import { ContactButton } from '../contactbutton'
import { cn } from '@/lib/scc-utils'

// 문의 폼 스키마
const inquiryFormSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().min(10, '전화번호를 입력해주세요'),
  nationality: z.string().min(1, '국적을 선택해주세요'),
  preferredContact: z.enum(['wechat', 'whatsapp', 'email'], {
    required_error: '선호 연락처를 선택해주세요'
  }),
  serviceInterest: z.enum(['medical', 'beauty', 'support', 'all'], {
    required_error: '관심 서비스를 선택해주세요'
  }),
  travelDate: z.string().min(1, '여행 예정일을 선택해주세요'),
  budget: z.string().optional(),
  message: z.string().optional()
})

type InquiryFormValues = z.infer<typeof inquiryFormSchema>

interface OptimizedInquiryFormProps {
  className?: string
  showContactButtons?: boolean
  variant?: 'default' | 'compact' | 'minimal'
}

export function OptimizedInquiryForm({ 
  className, 
  showContactButtons = true,
  variant = 'default'
}: OptimizedInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      nationality: '',
      preferredContact: 'email',
      serviceInterest: 'all',
      travelDate: '',
      budget: '',
      message: ''
    }
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form
  const watchedValues = watch()

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        form.reset()
      } else {
        setSubmitError(result.error || '문의 제출에 실패했습니다.')
      }
    } catch (error) {
      console.error('문의 제출 오류:', error)
      setSubmitError('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 성공 화면
  if (isSubmitted) {
    return (
      <Card className={cn("w-full max-w-2xl mx-auto", className)}>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            <BilingualText 
              en="Inquiry Submitted Successfully!" 
              zh="咨询提交成功！" 
            />
          </h3>
          <p className="text-gray-600 mb-6">
            <BilingualText 
              en="We will contact you within 24 hours." 
              zh="我们将在24小时内与您联系。" 
            />
          </p>
          
          {showContactButtons && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                <BilingualText 
                  en="For faster response, contact us directly:" 
                  zh="如需更快回复，请直接联系我们：" 
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <ContactButton 
                  method="whatsapp" 
                  variant="default"
                  className="flex-1 sm:flex-none"
                />
                <ContactButton 
                  method="wechat" 
                  variant="default"
                  className="flex-1 sm:flex-none"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // 폼 렌더링
  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          <BilingualText 
            en="Get Your Free Consultation" 
            zh="获取免费咨询" 
          />
        </CardTitle>
        <CardDescription>
          <BilingualText 
            en="Tell us about your needs and we'll create a personalized plan for you." 
            zh="告诉我们您的需求，我们将为您制定个性化计划。" 
          />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 연락 버튼들 (상단) */}
        {showContactButtons && variant !== 'minimal' && (
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              <BilingualText 
                en="Prefer direct contact?" 
                zh="更喜欢直接联系？" 
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ContactButton method="whatsapp" variant="outline" />
              <ContactButton method="wechat" variant="outline" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  <BilingualText en="OR" zh="或" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 문의 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <BilingualText en="Full Name *" zh="姓名 *" />
              </label>
              <Input
                {...register('name')}
                placeholder={watchedValues.name ? '' : 'Enter your full name'}
                className={cn(errors.name && 'border-red-500')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <BilingualText en="Email *" zh="邮箱 *" />
              </label>
              <Input
                type="email"
                {...register('email')}
                placeholder={watchedValues.email ? '' : 'your@email.com'}
                className={cn(errors.email && 'border-red-500')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <BilingualText en="Phone Number *" zh="电话号码 *" />
              </label>
              <Input
                {...register('phone')}
                placeholder={watchedValues.phone ? '' : '+82 10-1234-5678'}
                className={cn(errors.phone && 'border-red-500')}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <BilingualText en="Nationality *" zh="国籍 *" />
              </label>
              <Select onValueChange={(value) => setValue('nationality', value)}>
                <SelectTrigger className={cn(errors.nationality && 'border-red-500')}>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="china">China 中国</SelectItem>
                  <SelectItem value="usa">United States 美国</SelectItem>
                  <SelectItem value="japan">Japan 日本</SelectItem>
                  <SelectItem value="singapore">Singapore 新加坡</SelectItem>
                  <SelectItem value="thailand">Thailand 泰国</SelectItem>
                  <SelectItem value="vietnam">Vietnam 越南</SelectItem>
                  <SelectItem value="other">Other 其他</SelectItem>
                </SelectContent>
              </Select>
              {errors.nationality && (
                <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>
              )}
            </div>
          </div>

          {/* 서비스 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <BilingualText en="Service Interest *" zh="感兴趣的服务 *" />
              </label>
              <Select onValueChange={(value) => setValue('serviceInterest', value as any)}>
                <SelectTrigger className={cn(errors.serviceInterest && 'border-red-500')}>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">
                    <BilingualText en="Medical Services" zh="医疗服务" />
                  </SelectItem>
                  <SelectItem value="beauty">
                    <BilingualText en="Beauty Services" zh="美容服务" />
                  </SelectItem>
                  <SelectItem value="support">
                    <BilingualText en="Support Services" zh="支持服务" />
                  </SelectItem>
                  <SelectItem value="all">
                    <BilingualText en="All Services" zh="所有服务" />
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceInterest && (
                <p className="text-red-500 text-xs mt-1">{errors.serviceInterest.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <BilingualText en="Travel Date *" zh="旅行日期 *" />
              </label>
              <Input
                type="date"
                {...register('travelDate')}
                className={cn(errors.travelDate && 'border-red-500')}
              />
              {errors.travelDate && (
                <p className="text-red-500 text-xs mt-1">{errors.travelDate.message}</p>
              )}
            </div>
          </div>

          {/* 선호 연락처 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BilingualText en="Preferred Contact Method *" zh="首选联系方式 *" />
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                { value: 'wechat', label: 'WeChat', icon: MessageCircle },
                { value: 'email', label: 'Email', icon: Mail }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue('preferredContact', value as any)}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3 border rounded-lg transition-colors",
                    watchedValues.preferredContact === value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-300 hover:border-gray-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
            {errors.preferredContact && (
              <p className="text-red-500 text-xs mt-1">{errors.preferredContact.message}</p>
            )}
          </div>

          {/* 예산 (선택사항) */}
          {variant !== 'minimal' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <BilingualText en="Budget (Optional)" zh="预算（可选）" />
              </label>
              <Input
                {...register('budget')}
                placeholder="e.g., $5,000 - $10,000"
                className="text-gray-500"
              />
            </div>
          )}

          {/* 메시지 (선택사항) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <BilingualText en="Additional Message (Optional)" zh="附加信息（可选）" />
            </label>
            <Textarea
              {...register('message')}
              placeholder="Tell us more about your specific needs..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* 에러 메시지 */}
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          {/* 제출 버튼 */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                <BilingualText en="Submitting..." zh="提交中..." />
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                <BilingualText en="Submit Inquiry" zh="提交咨询" />
              </>
            )}
          </Button>

          {/* 하단 연락 정보 */}
          {showContactButtons && variant !== 'minimal' && (
            <div className="text-center pt-4 border-t border-[#e5e7eb]">
              <p className="text-sm text-gray-500 mb-3">
                <BilingualText 
                  en="Need immediate assistance?" 
                  zh="需要立即帮助？" 
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <BilingualText en="Call: +82-10-2981-6653" zh="电话：+82-10-2981-6653" />
                </span>
                <span className="hidden sm:inline text-gray-300">|</span>
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <BilingualText en="Email: seoulcareconcierge@gmail.com" zh="邮箱：seoulcareconcierge@gmail.com" />
                </span>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
