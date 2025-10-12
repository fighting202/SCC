import {
  saveCustomerInquiry,
  updateInquiryStatus,
  getCustomerInquiries,
  getCustomerInquiry,
  getCRMStats
} from '@/lib/notion/crm'
import { getNotionClient } from '@/lib/notion/server'

// Mock Notion client
jest.mock('@/lib/notion/server', () => ({
  getNotionClient: jest.fn()
}))

// Mock environment variables
process.env.NOTION_DATABASE_ID = 'mock-database-id'

describe('Notion CRM Functions', () => {
  const mockNotionClient = {
    pages: {
      create: jest.fn(),
      update: jest.fn(),
      retrieve: jest.fn()
    },
    databases: {
      query: jest.fn(),
      retrieve: jest.fn()
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getNotionClient as jest.Mock).mockResolvedValue(mockNotionClient)
  })

  describe('saveCustomerInquiry', () => {
    const mockInquiryData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+11234567890',
      nationality: 'USA',
      preferredContact: 'email' as const,
      serviceInterest: 'medical' as const,
      travelDate: '2025-12-01',
      budget: '5000-10000',
      message: 'Need consultation',
      source: 'website' as const
    }

    it('successfully saves inquiry to Notion', async () => {
      const mockResponse = {
        id: 'page-123',
        created_time: '2025-01-01T00:00:00.000Z'
      }

      mockNotionClient.pages.create.mockResolvedValue(mockResponse)

      const result = await saveCustomerInquiry(mockInquiryData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockResponse)
      expect(result.error).toBeNull()
      expect(mockNotionClient.pages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          parent: { database_id: 'mock-database-id' },
          properties: expect.objectContaining({
            '이름': {
              title: [{ text: { content: mockInquiryData.name } }]
            },
            '이메일': {
              email: mockInquiryData.email
            },
            '전화번호': {
              phone_number: mockInquiryData.phone
            }
          })
        })
      )
    })

    it('handles optional fields correctly', async () => {
      const dataWithoutOptionals = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+11234567890',
        nationality: 'China',
        preferredContact: 'wechat' as const,
        serviceInterest: 'beauty' as const,
        travelDate: '2025-12-15',
        source: 'website' as const
      }

      mockNotionClient.pages.create.mockResolvedValue({ id: 'page-456' })

      const result = await saveCustomerInquiry(dataWithoutOptionals)

      expect(result.success).toBe(true)
      expect(mockNotionClient.pages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          properties: expect.objectContaining({
            '예산': { rich_text: [] },
            '메시지': { rich_text: [] }
          })
        })
      )
    })

    it('sets default status as "신규 문의"', async () => {
      mockNotionClient.pages.create.mockResolvedValue({ id: 'page-789' })

      await saveCustomerInquiry(mockInquiryData)

      expect(mockNotionClient.pages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          properties: expect.objectContaining({
            '상태': { select: { name: '신규 문의' } }
          })
        })
      )
    })

    it('handles Notion API errors', async () => {
      const error = new Error('Notion API Error')
      mockNotionClient.pages.create.mockRejectedValue(error)

      const result = await saveCustomerInquiry(mockInquiryData)

      expect(result.success).toBe(false)
      expect(result.data).toBeNull()
      expect(result.error).toBe('Notion API Error')
    })

    it('includes creation timestamp', async () => {
      mockNotionClient.pages.create.mockResolvedValue({ id: 'page-101' })

      await saveCustomerInquiry(mockInquiryData)

      expect(mockNotionClient.pages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          properties: expect.objectContaining({
            '생성일': expect.objectContaining({
              date: expect.objectContaining({
                start: expect.any(String)
              })
            })
          })
        })
      )
    })
  })

  describe('updateInquiryStatus', () => {
    const mockPageId = 'page-123'

    it('successfully updates inquiry status', async () => {
      const mockResponse = {
        id: mockPageId,
        last_edited_time: '2025-01-01T12:00:00.000Z'
      }

      mockNotionClient.pages.update.mockResolvedValue(mockResponse)

      const result = await updateInquiryStatus(mockPageId, '상담 중')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockResponse)
      expect(mockNotionClient.pages.update).toHaveBeenCalledWith({
        page_id: mockPageId,
        properties: {
          '상태': { select: { name: '상담 중' } }
        }
      })
    })

    it('handles all valid status values', async () => {
      const statuses = ['신규 문의', '상담 중', '견적 제공', '계약 진행', '완료', '취소'] as const

      for (const status of statuses) {
        mockNotionClient.pages.update.mockResolvedValue({ id: mockPageId })

        const result = await updateInquiryStatus(mockPageId, status)

        expect(result.success).toBe(true)
        expect(mockNotionClient.pages.update).toHaveBeenCalledWith(
          expect.objectContaining({
            properties: {
              '상태': { select: { name: status } }
            }
          })
        )
      }
    })

    it('handles update errors', async () => {
      const error = new Error('Page not found')
      mockNotionClient.pages.update.mockRejectedValue(error)

      const result = await updateInquiryStatus(mockPageId, '완료')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Page not found')
    })
  })

  describe('getCustomerInquiries', () => {
    it('retrieves customer inquiries without filters', async () => {
      const mockResponse = {
        id: 'db-123',
        title: [{ text: { content: 'CRM Database' } }]
      }

      mockNotionClient.databases.retrieve.mockResolvedValue(mockResponse)

      const result = await getCustomerInquiries()

      expect(result.success).toBe(true)
      expect(result.data).toEqual([mockResponse])
      expect(mockNotionClient.databases.retrieve).toHaveBeenCalledWith({
        database_id: 'mock-database-id'
      })
    })

    it('applies status filter', async () => {
      mockNotionClient.databases.retrieve.mockResolvedValue({ id: 'db-123' })

      const result = await getCustomerInquiries({ status: '신규 문의' })

      expect(result.success).toBe(true)
    })

    it('applies service interest filter', async () => {
      mockNotionClient.databases.retrieve.mockResolvedValue({ id: 'db-123' })

      const result = await getCustomerInquiries({ serviceInterest: 'medical' })

      expect(result.success).toBe(true)
    })

    it('applies date range filters', async () => {
      mockNotionClient.databases.retrieve.mockResolvedValue({ id: 'db-123' })

      const result = await getCustomerInquiries({
        dateFrom: '2025-01-01',
        dateTo: '2025-12-31'
      })

      expect(result.success).toBe(true)
    })

    it('handles query errors', async () => {
      const error = new Error('Database not accessible')
      mockNotionClient.databases.retrieve.mockRejectedValue(error)

      const result = await getCustomerInquiries()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Database not accessible')
    })
  })

  describe('getCustomerInquiry', () => {
    const mockPageId = 'page-123'

    it('successfully retrieves inquiry details', async () => {
      const mockResponse = {
        id: mockPageId,
        properties: {
          '이름': { title: [{ text: { content: 'John Doe' } }] },
          '이메일': { email: 'john@example.com' }
        }
      }

      mockNotionClient.pages.retrieve.mockResolvedValue(mockResponse)

      const result = await getCustomerInquiry(mockPageId)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockResponse)
      expect(mockNotionClient.pages.retrieve).toHaveBeenCalledWith({
        page_id: mockPageId
      })
    })

    it('handles page not found errors', async () => {
      const error = new Error('Page not found')
      mockNotionClient.pages.retrieve.mockRejectedValue(error)

      const result = await getCustomerInquiry(mockPageId)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Page not found')
    })
  })

  describe('getCRMStats', () => {
    it('retrieves CRM statistics', async () => {
      mockNotionClient.databases.retrieve.mockResolvedValue({
        id: 'db-123',
        title: []
      })

      const result = await getCRMStats()

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('total')
      expect(result.data).toHaveProperty('thisMonth')
      expect(result.data).toHaveProperty('statusStats')
      expect(result.data).toHaveProperty('serviceStats')
    })

    it('includes all status categories', async () => {
      mockNotionClient.databases.retrieve.mockResolvedValue({ id: 'db-123' })

      const result = await getCRMStats()

      expect(result.success).toBe(true)
      expect(result.data?.statusStats).toHaveLength(6)

      const statuses = result.data?.statusStats.map(s => s.status)
      expect(statuses).toContain('신규 문의')
      expect(statuses).toContain('상담 중')
      expect(statuses).toContain('견적 제공')
      expect(statuses).toContain('계약 진행')
      expect(statuses).toContain('완료')
      expect(statuses).toContain('취소')
    })

    it('includes all service categories', async () => {
      mockNotionClient.databases.retrieve.mockResolvedValue({ id: 'db-123' })

      const result = await getCRMStats()

      expect(result.success).toBe(true)
      expect(result.data?.serviceStats).toHaveLength(4)

      const services = result.data?.serviceStats.map(s => s.service)
      expect(services).toContain('medical')
      expect(services).toContain('beauty')
      expect(services).toContain('support')
      expect(services).toContain('all')
    })

    it('handles stats retrieval errors', async () => {
      const error = new Error('Database access denied')
      mockNotionClient.databases.retrieve.mockRejectedValue(error)

      const result = await getCRMStats()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Database access denied')
    })
  })
})
