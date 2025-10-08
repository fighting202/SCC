/**
 * SCC 내부 CRM용 Notion 통합
 * 고객용이 아닌 내부 관리용으로만 사용
 */

import { getNotionClient } from './server'
import { NotionDatabase } from '@/lib/scc_types'

// CRM 데이터베이스 ID (환경변수에서 가져옴)
const CRM_DATABASE_ID = process.env.NOTION_DATABASE_ID || (() => {
  throw new Error('NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.')
})()

/**
 * 고객 문의를 Notion CRM에 저장
 */
export async function saveCustomerInquiry(inquiryData: {
  name: string
  email: string
  phone: string
  nationality: string
  preferredContact: 'wechat' | 'whatsapp' | 'email'
  serviceInterest: 'medical' | 'beauty' | 'support' | 'all'
  travelDate: string
  budget?: string
  message?: string
  source: 'website' | 'whatsapp' | 'wechat' | 'referral'
}) {
  try {
    const client = await getNotionClient()
    
    const response = await client.pages.create({
      parent: { database_id: CRM_DATABASE_ID! },
      properties: {
        '이름': {
          title: [{ text: { content: inquiryData.name } }]
        },
        '이메일': {
          email: inquiryData.email
        },
        '전화번호': {
          phone_number: inquiryData.phone
        },
        '국적': {
          select: { name: inquiryData.nationality }
        },
        '선호 연락처': {
          select: { name: inquiryData.preferredContact }
        },
        '관심 서비스': {
          select: { name: inquiryData.serviceInterest }
        },
        '여행 예정일': {
          date: { start: inquiryData.travelDate }
        },
        '예산': {
          rich_text: inquiryData.budget ? [{ text: { content: inquiryData.budget } }] : []
        },
        '메시지': {
          rich_text: inquiryData.message ? [{ text: { content: inquiryData.message } }] : []
        },
        '유입 경로': {
          select: { name: inquiryData.source }
        },
        '상태': {
          select: { name: '신규 문의' }
        },
        '생성일': {
          created_time: new Date().toISOString()
        }
      }
    })

    return {
      success: true,
      data: response,
      error: null
    }
  } catch (error) {
    console.error('CRM 문의 저장 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '문의 저장에 실패했습니다.'
    }
  }
}

/**
 * 고객 문의 상태 업데이트
 */
export async function updateInquiryStatus(pageId: string, status: '신규 문의' | '상담 중' | '견적 제공' | '계약 진행' | '완료' | '취소') {
  try {
    const client = await getNotionClient()
    
    const response = await client.pages.update({
      page_id: pageId,
      properties: {
        '상태': {
          select: { name: status }
        },
        '마지막 업데이트': {
          last_edited_time: new Date().toISOString()
        }
      }
    })

    return {
      success: true,
      data: response,
      error: null
    }
  } catch (error) {
    console.error('문의 상태 업데이트 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '상태 업데이트에 실패했습니다.'
    }
  }
}

/**
 * 고객 문의 목록 조회 (내부 관리용)
 */
export async function getCustomerInquiries(filters?: {
  status?: string
  serviceInterest?: string
  dateFrom?: string
  dateTo?: string
}) {
  try {
    const client = await getNotionClient()
    
    let filterConditions: any = {
      and: []
    }

    if (filters?.status) {
      filterConditions.and.push({
        property: '상태',
        select: { equals: filters.status }
      })
    }

    if (filters?.serviceInterest) {
      filterConditions.and.push({
        property: '관심 서비스',
        select: { equals: filters.serviceInterest }
      })
    }

    if (filters?.dateFrom || filters?.dateTo) {
      const dateFilter: any = {
        property: '생성일',
        created_time: {}
      }

      if (filters.dateFrom) {
        dateFilter.created_time.after = filters.dateFrom
      }

      if (filters.dateTo) {
        dateFilter.created_time.before = filters.dateTo
      }

      filterConditions.and.push(dateFilter)
    }

    const response = await client.databases.query({
      database_id: CRM_DATABASE_ID!,
      filter: filterConditions.and.length > 0 ? filterConditions : undefined,
      sorts: [
        {
          property: '생성일',
          direction: 'descending'
        }
      ]
    })

    return {
      success: true,
      data: response.results,
      error: null
    }
  } catch (error) {
    console.error('문의 목록 조회 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '문의 목록 조회에 실패했습니다.'
    }
  }
}

/**
 * 고객 문의 상세 조회
 */
export async function getCustomerInquiry(pageId: string) {
  try {
    const client = await getNotionClient()
    
    const response = await client.pages.retrieve({
      page_id: pageId
    })

    return {
      success: true,
      data: response,
      error: null
    }
  } catch (error) {
    console.error('문의 상세 조회 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '문의 상세 조회에 실패했습니다.'
    }
  }
}

/**
 * CRM 통계 조회
 */
export async function getCRMStats() {
  try {
    const client = await getNotionClient()
    
    // 전체 문의 수
    const totalInquiries = await client.databases.query({
      database_id: CRM_DATABASE_ID!
    })

    // 상태별 문의 수
    const statusStats = await Promise.all([
      '신규 문의', '상담 중', '견적 제공', '계약 진행', '완료', '취소'
    ].map(async (status) => {
      const response = await client.databases.query({
        database_id: CRM_DATABASE_ID!,
        filter: {
          property: '상태',
          select: { equals: status }
        }
      })
      return { status, count: response.results.length }
    }))

    // 서비스별 문의 수
    const serviceStats = await Promise.all([
      'medical', 'beauty', 'support', 'all'
    ].map(async (service) => {
      const response = await client.databases.query({
        database_id: CRM_DATABASE_ID!,
        filter: {
          property: '관심 서비스',
          select: { equals: service }
        }
      })
      return { service, count: response.results.length }
    }))

    // 이번 달 문의 수
    const thisMonth = new Date()
    thisMonth.setDate(1)
    thisMonth.setHours(0, 0, 0, 0)
    
    const thisMonthInquiries = await client.databases.query({
      database_id: CRM_DATABASE_ID!,
      filter: {
        property: '생성일',
        created_time: {
          after: thisMonth.toISOString()
        }
      }
    })

    return {
      success: true,
      data: {
        total: totalInquiries.results.length,
        thisMonth: thisMonthInquiries.results.length,
        statusStats,
        serviceStats
      },
      error: null
    }
  } catch (error) {
    console.error('CRM 통계 조회 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'CRM 통계 조회에 실패했습니다.'
    }
  }
}
