'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  getErrorMessage,
  inquiryFormSchema,
  type InquiryFormData,
} from '@/lib/schemas/form-schemas';
import { useInquiryForm, useLanguage } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BilingualText } from '../bilingualtext';

const serviceOptions = [
  { value: 'medical', en: 'Medical Services', zh: '医疗服务' },
  { value: 'beauty', en: 'Beauty Services', zh: '美容服务' },
  { value: 'support', en: 'Support Services', zh: '支持服务' },
  { value: 'all', en: 'All Services', zh: '所有服务' },
];

const contactOptions = [
  { value: 'wechat', en: 'WeChat', zh: '微信' },
  { value: 'whatsapp', en: 'WhatsApp', zh: 'WhatsApp' },
  { value: 'email', en: 'Email', zh: '邮件' },
];

export function InquiryForm() {
  const { language } = useLanguage();
  const { inquiryForm, setInquiryForm, isFormSubmitted, setIsFormSubmitted } =
    useInquiryForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: inquiryForm.name || '',
      email: inquiryForm.email || '',
      phone: inquiryForm.phone || '',
      nationality: inquiryForm.nationality || '',
      preferredContact: inquiryForm.preferredContact || 'email',
      serviceInterest: inquiryForm.serviceInterest || 'all',
      travelDate: inquiryForm.travelDate || '',
      budget: inquiryForm.budget || '',
      message: inquiryForm.message || '',
      agreeToTerms: inquiryForm.agreeToTerms || false,
      agreeToPrivacy: inquiryForm.agreeToPrivacy || false,
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // 폼 데이터를 스토어에 저장
      setInquiryForm(data);

      // 실제 제출 로직 (API 호출 등)
      await new Promise(resolve => setTimeout(resolve, 2000)); // 시뮬레이션

      setIsFormSubmitted(true);
      setSubmitSuccess(true);

      // 성공 후 폼 초기화
      setTimeout(() => {
        form.reset();
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle2 className="w-16 h-16 text-success mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            <BilingualText
              en="Thank you for your inquiry!"
              zh="感谢您的咨询！"
            />
          </h3>
          <p className="text-muted-foreground text-center">
            <BilingualText
              en="We will contact you within 24 hours."
              zh="我们将在24小时内与您联系。"
            />
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          <BilingualText en="Get Free Consultation" zh="获取免费咨询" />
        </CardTitle>
        <CardDescription>
          <BilingualText
            en="Fill out the form below and we'll get back to you within 24 hours."
            zh="填写下面的表格，我们将在24小时内回复您。"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 개인 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                <BilingualText en="Full Name" zh="姓名" /> *
              </Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder={
                  language === 'zh' ? '请输入您的姓名' : 'Enter your full name'
                }
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {getErrorMessage(form.formState.errors.name, language)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                <BilingualText en="Email" zh="电子邮件" /> *
              </Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder={
                  language === 'zh' ? '请输入您的邮箱' : 'Enter your email'
                }
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {getErrorMessage(form.formState.errors.email, language)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
                <BilingualText en="Phone Number" zh="电话号码" /> *
              </Label>
              <Input
                id="phone"
                type="tel"
                {...form.register('phone')}
                placeholder={
                  language === 'zh'
                    ? '请输入您的电话号码'
                    : 'Enter your phone number'
                }
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive">
                  {getErrorMessage(form.formState.errors.phone, language)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">
                <BilingualText en="Nationality" zh="国籍" /> *
              </Label>
              <Input
                id="nationality"
                {...form.register('nationality')}
                placeholder={
                  language === 'zh'
                    ? '请输入您的国籍'
                    : 'Enter your nationality'
                }
              />
              {form.formState.errors.nationality && (
                <p className="text-sm text-destructive">
                  {getErrorMessage(form.formState.errors.nationality, language)}
                </p>
              )}
            </div>
          </div>

          {/* 서비스 선택 */}
          <div className="space-y-2">
            <Label>
              <BilingualText en="Service Interest" zh="感兴趣的服务" /> *
            </Label>
            <Select
              value={form.watch('serviceInterest')}
              onValueChange={value =>
                form.setValue('serviceInterest', value as any)
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === 'zh' ? '选择服务类型' : 'Select service type'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <BilingualText en={option.en} zh={option.zh} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.serviceInterest && (
              <p className="text-sm text-destructive">
                {getErrorMessage(
                  form.formState.errors.serviceInterest,
                  language
                )}
              </p>
            )}
          </div>

          {/* 연락 방법 */}
          <div className="space-y-2">
            <Label>
              <BilingualText en="Preferred Contact Method" zh="首选联系方式" />{' '}
              *
            </Label>
            <Select
              value={form.watch('preferredContact')}
              onValueChange={value =>
                form.setValue('preferredContact', value as any)
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === 'zh' ? '选择联系方式' : 'Select contact method'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {contactOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <BilingualText en={option.en} zh={option.zh} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.preferredContact && (
              <p className="text-sm text-destructive">
                {getErrorMessage(
                  form.formState.errors.preferredContact,
                  language
                )}
              </p>
            )}
          </div>

          {/* 여행 날짜 */}
          <div className="space-y-2">
            <Label htmlFor="travelDate">
              <BilingualText en="Travel Date" zh="旅行日期" /> *
            </Label>
            <Input
              id="travelDate"
              type="date"
              {...form.register('travelDate')}
            />
            {form.formState.errors.travelDate && (
              <p className="text-sm text-destructive">
                {getErrorMessage(form.formState.errors.travelDate, language)}
              </p>
            )}
          </div>

          {/* 예산 */}
          <div className="space-y-2">
            <Label htmlFor="budget">
              <BilingualText en="Budget (USD)" zh="预算（美元）" />
            </Label>
            <Input
              id="budget"
              {...form.register('budget')}
              placeholder={
                language === 'zh' ? '例如：5000-10000' : 'e.g., 5000-10000'
              }
            />
          </div>

          {/* 메시지 */}
          <div className="space-y-2">
            <Label htmlFor="message">
              <BilingualText en="Additional Message" zh="附加信息" />
            </Label>
            <Textarea
              id="message"
              {...form.register('message')}
              placeholder={
                language === 'zh'
                  ? '请告诉我们您的具体需求...'
                  : 'Tell us about your specific needs...'
              }
              rows={4}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">
                {getErrorMessage(form.formState.errors.message, language)}
              </p>
            )}
          </div>

          {/* 약관 동의 */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={form.watch('agreeToTerms')}
                onCheckedChange={checked =>
                  form.setValue('agreeToTerms', checked as boolean)
                }
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                <BilingualText
                  en="I agree to the Terms and Conditions"
                  zh="我同意条款和条件"
                />{' '}
                *
              </Label>
            </div>
            {form.formState.errors.agreeToTerms && (
              <p className="text-sm text-destructive">
                {getErrorMessage(form.formState.errors.agreeToTerms, language)}
              </p>
            )}

            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToPrivacy"
                checked={form.watch('agreeToPrivacy')}
                onCheckedChange={checked =>
                  form.setValue('agreeToPrivacy', checked as boolean)
                }
              />
              <Label htmlFor="agreeToPrivacy" className="text-sm">
                <BilingualText
                  en="I agree to the Privacy Policy"
                  zh="我同意隐私政策"
                />{' '}
                *
              </Label>
            </div>
            {form.formState.errors.agreeToPrivacy && (
              <p className="text-sm text-destructive">
                {getErrorMessage(
                  form.formState.errors.agreeToPrivacy,
                  language
                )}
              </p>
            )}
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            className="w-full hover:scale-105 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <BilingualText en="Submitting..." zh="提交中..." />
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                <BilingualText en="Send Inquiry" zh="发送咨询" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
