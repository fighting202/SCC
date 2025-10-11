'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { BilingualText } from './bilingualtext'
import { cn } from '@/lib/scc-utils'

interface CostEstimatorProps {
  className?: string
  onEstimateChange?: (estimate: EstimateResult) => void
}

interface EstimateResult {
  amount: number
  range: { min: number; max: number }
  currency: string
  services: string[]
  duration: number
}

const SERVICE_PRICES = {
  medical: { base: 2000, perDay: 300 },
  beauty: { base: 500, perDay: 100 },
  support: { base: 300, perDay: 50 },
  accommodation: { base: 0, perDay: 150 },
  transportation: { base: 0, perDay: 80 },
  interpreter: { base: 0, perDay: 120 }
}

const SERVICES = [
  { id: 'medical', label: { en: 'Medical Services', zh: '医疗服务' }, description: { en: 'Plastic surgery, dermatology, dental', zh: '整形外科、皮肤科、牙科' } },
  { id: 'beauty', label: { en: 'Beauty Services', zh: '美容服务' }, description: { en: 'K-beauty treatments, spa', zh: '韩式美容、水疗' } },
  { id: 'support', label: { en: 'Support Services', zh: '支持服务' }, description: { en: 'Concierge, planning', zh: '礼宾、规划' } },
  { id: 'accommodation', label: { en: 'Accommodation', zh: '住宿' }, description: { en: 'Hotel booking assistance', zh: '酒店预订协助' } },
  { id: 'transportation', label: { en: 'Transportation', zh: '交通' }, description: { en: 'Airport transfer, local transport', zh: '机场接送、当地交通' } },
  { id: 'interpreter', label: { en: 'Interpreter', zh: '翻译' }, description: { en: 'Professional interpreter service', zh: '专业翻译服务' } }
]

export function CostEstimator({ className, onEstimateChange }: CostEstimatorProps) {
  const [duration, setDuration] = useState([5])
  const [services, setServices] = useState<string[]>(['medical', 'support'])

  const estimate = useMemo((): EstimateResult => {
    const selectedServices = services.filter(service => SERVICE_PRICES[service as keyof typeof SERVICE_PRICES])
    const days = duration[0] ?? 5

    let totalBase = 0
    let totalPerDay = 0
    
    selectedServices.forEach(service => {
      const pricing = SERVICE_PRICES[service as keyof typeof SERVICE_PRICES]
      totalBase += pricing.base
      totalPerDay += pricing.perDay
    })
    
    const baseAmount = totalBase + (totalPerDay * days)
    
    // 20% 변동폭 적용
    const minAmount = Math.round(baseAmount * 0.8)
    const maxAmount = Math.round(baseAmount * 1.2)
    
    return {
      amount: baseAmount,
      range: { min: minAmount, max: maxAmount },
      currency: 'USD',
      services: selectedServices,
      duration: days
    }
  }, [duration, services])

  // 부모 컴포넌트에 변경사항 전달
  useState(() => {
    onEstimateChange?.(estimate)
  })

  const handleServiceToggle = (serviceId: string) => {
    setServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          <BilingualText 
            en="Estimate Your Cost" 
            zh="估算费用" 
          />
        </CardTitle>
        <p className="text-gray-600">
          <BilingualText 
            en="Get a personalized quote for your Korea trip" 
            zh="获取您的韩国之旅个性化报价" 
          />
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* 기간 선택 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <BilingualText 
              en="Trip Duration" 
              zh="旅行天数" 
              className="text-lg font-semibold"
            />
            <span className="text-2xl font-bold text-scc-primary">
              {duration[0]} {duration[0] === 1 ? 'day' : 'days'}
            </span>
          </div>
          <Slider
            value={duration}
            onValueChange={setDuration}
            max={30}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1 day</span>
            <span>30 days</span>
          </div>
        </div>

        {/* 서비스 선택 */}
        <div className="space-y-4">
          <BilingualText 
            en="Select Services" 
            zh="选择服务" 
            className="text-lg font-semibold"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className={cn(
                  "flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors",
                  services.includes(service.id)
                    ? "border-scc-primary bg-scc-primary/5"
                    : "border-[#e5e7eb] hover:border-gray-300"
                )}
                onClick={() => handleServiceToggle(service.id)}
              >
                <Checkbox
                  checked={services.includes(service.id)}
                  onChange={() => handleServiceToggle(service.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium">
                    <BilingualText 
                      en={service.label.en} 
                      zh={service.label.zh} 
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <BilingualText 
                      en={service.description.en} 
                      zh={service.description.zh} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 견적 결과 */}
        <div className="bg-scc-primary/5 rounded-xl p-6 text-center space-y-4">
          <div className="space-y-2">
            <BilingualText 
              en="Estimated Cost" 
              zh="预估费用" 
              className="text-lg font-semibold text-gray-700"
            />
            <div className="text-4xl font-bold text-scc-primary">
              {formatCurrency(estimate.amount)}
            </div>
            <div className="text-gray-600">
              <BilingualText 
                en={`Range: ${formatCurrency(estimate.range.min)} - ${formatCurrency(estimate.range.max)}`}
                zh={`范围：${formatCurrency(estimate.range.min)} - ${formatCurrency(estimate.range.max)}`}
              />
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <BilingualText 
                en={`For ${estimate.duration} ${estimate.duration === 1 ? 'day' : 'days'}`}
                zh={`${estimate.duration}天`}
              />
            </p>
            <p>
              <BilingualText 
                en={`Including: ${estimate.services.length} service${estimate.services.length !== 1 ? 's' : ''}`}
                zh={`包含：${estimate.services.length}项服务`}
              />
            </p>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 bg-scc-primary hover:bg-scc-primary/90 text-white"
            size="lg"
          >
            <BilingualText 
              en="Get Detailed Quote" 
              zh="获取详细报价" 
            />
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-scc-primary text-scc-primary hover:bg-scc-primary hover:text-white"
            size="lg"
          >
            <BilingualText 
              en="Contact Us" 
              zh="联系我们" 
            />
          </Button>
        </div>

        {/* 추가 정보 */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>
            <BilingualText 
              en="* Final cost may vary based on specific requirements and current market rates"
              zh="* 最终费用可能因具体要求和当前市场价格而有所不同"
            />
          </p>
          <p>
            <BilingualText 
              en="** All prices include consultation and planning services"
              zh="** 所有价格包含咨询和规划服务"
            />
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
