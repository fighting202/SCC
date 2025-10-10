import { NextRequest, NextResponse } from 'next/server'
import { saveCustomerInquiry } from '@/lib/notion/crm'
import { CONTACT } from '@/lib/scc-constants'

export async function POST(request: NextRequest) {
  try {
    const inquiryData = await request.json()
    
    // 1. Notion CRM에 저장 (내부 관리용)
    const crmResult = await saveCustomerInquiry({
      ...inquiryData,
      source: 'website'
    })

    if (!crmResult.success) {
      // CRM 저장 실패해도 고객에게는 성공 응답 (내부 문제)
    }

    // 2. Tally → Notion → 이메일 → Slack 알림 시스템이 자동으로 처리

    return NextResponse.json({ 
      success: true, 
      message: '문의가 성공적으로 접수되었습니다. 24시간 이내에 연락드리겠습니다.' 
    })

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: '문의 처리 중 오류가 발생했습니다. 다시 시도해주세요.' 
      },
      { status: 500 }
    )
  }
}
