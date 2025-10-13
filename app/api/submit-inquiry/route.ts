import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const inquiryData = await request.json()
    
    // 간단한 로그 출력 (실제 환경에서는 데이터베이스에 저장)
    console.log('Inquiry received:', inquiryData)

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
