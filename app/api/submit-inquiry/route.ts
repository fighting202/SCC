import { NextRequest, NextResponse } from 'next/server'
import { saveCustomerInquiry } from '@/lib/notion/crm'
import { Resend } from 'resend'
import { CONTACT } from '@/lib/scc-constants'

const resend = new Resend(process.env.RESEND_API_KEY || (() => {
  throw new Error('RESEND_API_KEY 환경 변수가 설정되지 않았습니다.')
})())

export async function POST(request: NextRequest) {
  try {
    const inquiryData = await request.json()
    
    // 1. Notion CRM에 저장 (내부 관리용)
    const crmResult = await saveCustomerInquiry({
      ...inquiryData,
      source: 'website'
    })

    if (!crmResult.success) {
      console.error('CRM 저장 실패:', crmResult.error)
      // CRM 저장 실패해도 고객에게는 성공 응답 (내부 문제)
    }

    // 2. 고객에게 확인 이메일 발송
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: inquiryData.email,
        subject: '문의 접수 확인 - Seoul Care Concierge',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2C5F7C;">문의 접수 확인</h2>
            <p>안녕하세요, ${inquiryData.name}님!</p>
            <p>Seoul Care Concierge에 문의해주셔서 감사합니다.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2C5F7C; margin-top: 0;">문의 내용</h3>
              <p><strong>이름:</strong> ${inquiryData.name}</p>
              <p><strong>이메일:</strong> ${inquiryData.email}</p>
              <p><strong>전화번호:</strong> ${inquiryData.phone}</p>
              <p><strong>국적:</strong> ${inquiryData.nationality}</p>
              <p><strong>관심 서비스:</strong> ${inquiryData.serviceInterest}</p>
              <p><strong>여행 예정일:</strong> ${inquiryData.travelDate}</p>
              ${inquiryData.budget ? `<p><strong>예산:</strong> ${inquiryData.budget}</p>` : ''}
              ${inquiryData.message ? `<p><strong>메시지:</strong> ${inquiryData.message}</p>` : ''}
            </div>

            <h3 style="color: #2C5F7C;">다음 단계</h3>
            <p>담당자가 24시간 이내에 연락드리겠습니다.</p>
            
            <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #2C5F7C; margin-top: 0;">빠른 연락 방법</h4>
              <p>더 빠른 상담을 원하시면:</p>
              <p>📱 WhatsApp: <a href="${CONTACT.whatsapp}" style="color: #25D366;">${CONTACT.phone}</a></p>
              <p>💬 WeChat: ${CONTACT.wechatId}</p>
            </div>

            <p>감사합니다.<br>Seoul Care Concierge 팀</p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('확인 이메일 발송 실패:', emailError)
      // 이메일 발송 실패해도 문의는 성공으로 처리
    }

    // 3. 담당자에게 알림 이메일 발송
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: CONTACT.email,
        subject: `새로운 문의: ${inquiryData.name}님 - ${inquiryData.serviceInterest} 서비스`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2C5F7C;">새로운 고객 문의</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2C5F7C; margin-top: 0;">고객 정보</h3>
              <p><strong>이름:</strong> ${inquiryData.name}</p>
              <p><strong>이메일:</strong> ${inquiryData.email}</p>
              <p><strong>전화번호:</strong> ${inquiryData.phone}</p>
              <p><strong>국적:</strong> ${inquiryData.nationality}</p>
              <p><strong>선호 연락처:</strong> ${inquiryData.preferredContact}</p>
            </div>

            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #856404; margin-top: 0;">서비스 요청</h3>
              <p><strong>관심 서비스:</strong> ${inquiryData.serviceInterest}</p>
              <p><strong>여행 예정일:</strong> ${inquiryData.travelDate}</p>
              ${inquiryData.budget ? `<p><strong>예산:</strong> ${inquiryData.budget}</p>` : ''}
              ${inquiryData.message ? `<p><strong>메시지:</strong> ${inquiryData.message}</p>` : ''}
            </div>

            <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #0c5460; margin-top: 0;">빠른 연락</h4>
              <p>📱 WhatsApp: <a href="${CONTACT.whatsapp}" style="color: #25D366;">${CONTACT.phone}</a></p>
              <p>💬 WeChat: ${CONTACT.wechatId}</p>
              <p>📧 이메일: ${inquiryData.email}</p>
            </div>

            <p><a href="https://notion.so" style="background: #2C5F7C; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Notion CRM에서 확인하기</a></p>
          </div>
        `
      })
    } catch (notificationError) {
      console.error('알림 이메일 발송 실패:', notificationError)
    }

    return NextResponse.json({ 
      success: true, 
      message: '문의가 성공적으로 접수되었습니다. 24시간 이내에 연락드리겠습니다.' 
    })

  } catch (error) {
    console.error('문의 처리 실패:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '문의 처리 중 오류가 발생했습니다. 다시 시도해주세요.' 
      },
      { status: 500 }
    )
  }
}
