import { NextRequest } from 'next/server'
import { POST } from '@/app/api/submit-inquiry/route'
import { saveCustomerInquiry } from '@/lib/notion/crm'

// Mock Notion CRM functions
jest.mock('@/lib/notion/crm', () => ({
  saveCustomerInquiry: jest.fn()
}))

describe('/api/submit-inquiry', () => {
  const mockInquiryData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+11234567890',
    nationality: 'USA',
    preferredContact: 'email' as const,
    serviceInterest: 'medical' as const,
    travelDate: '2025-12-01',
    budget: '5000-10000',
    message: 'I need consultation for plastic surgery'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Success Cases', () => {
    it('successfully saves inquiry to Notion CRM', async () => {
      ;(saveCustomerInquiry as jest.Mock).mockResolvedValue({
        success: true,
        data: { id: 'mock-notion-page-id' },
        error: null
      })

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(mockInquiryData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(saveCustomerInquiry).toHaveBeenCalledWith({
        ...mockInquiryData,
        source: 'website'
      })
      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('성공적으로 접수')
    })

    it('returns success even if CRM save fails (internal error)', async () => {
      ;(saveCustomerInquiry as jest.Mock).mockResolvedValue({
        success: false,
        data: null,
        error: 'Notion API error'
      })

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(mockInquiryData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('handles minimal required data', async () => {
      const minimalData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+11234567890',
        nationality: 'China',
        preferredContact: 'wechat' as const,
        serviceInterest: 'beauty' as const,
        travelDate: '2025-12-15'
      }

      ;(saveCustomerInquiry as jest.Mock).mockResolvedValue({
        success: true,
        data: { id: 'mock-id' },
        error: null
      })

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(minimalData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(saveCustomerInquiry).toHaveBeenCalledWith({
        ...minimalData,
        source: 'website'
      })
      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })

  describe('Error Cases', () => {
    it('handles invalid JSON payload', async () => {
      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: 'invalid-json'
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('오류가 발생')
    })

    it('handles missing request body', async () => {
      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST'
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })

    it('handles CRM function exceptions', async () => {
      ;(saveCustomerInquiry as jest.Mock).mockRejectedValue(
        new Error('Database connection error')
      )

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(mockInquiryData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('오류가 발생')
    })
  })

  describe('Data Validation', () => {
    it('accepts all valid service interests', async () => {
      const serviceInterests = ['medical', 'beauty', 'support', 'all'] as const

      for (const interest of serviceInterests) {
        ;(saveCustomerInquiry as jest.Mock).mockResolvedValue({
          success: true,
          data: { id: 'mock-id' },
          error: null
        })

        const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
          method: 'POST',
          body: JSON.stringify({
            ...mockInquiryData,
            serviceInterest: interest
          })
        })

        const response = await POST(request)
        const data = await response.json()

        expect(data.success).toBe(true)
      }
    })

    it('accepts all valid contact methods', async () => {
      const contactMethods = ['wechat', 'whatsapp', 'email'] as const

      for (const method of contactMethods) {
        ;(saveCustomerInquiry as jest.Mock).mockResolvedValue({
          success: true,
          data: { id: 'mock-id' },
          error: null
        })

        const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
          method: 'POST',
          body: JSON.stringify({
            ...mockInquiryData,
            preferredContact: method
          })
        })

        const response = await POST(request)
        const data = await response.json()

        expect(data.success).toBe(true)
      }
    })

    it('handles optional budget and message fields', async () => {
      ;(saveCustomerInquiry as jest.Mock).mockResolvedValue({
        success: true,
        data: { id: 'mock-id' },
        error: null
      })

      const dataWithoutOptionals = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+11234567890',
        nationality: 'Japan',
        preferredContact: 'email' as const,
        serviceInterest: 'support' as const,
        travelDate: '2025-12-20'
      }

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(dataWithoutOptionals)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })

  describe('Integration Flow', () => {
    it('completes full inquiry submission flow', async () => {
      const mockNotionResponse = {
        success: true,
        data: {
          id: 'notion-page-123',
          created_time: '2025-01-01T00:00:00.000Z',
          properties: {}
        },
        error: null
      }

      ;(saveCustomerInquiry as jest.Mock).mockResolvedValue(mockNotionResponse)

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(mockInquiryData)
      })

      const response = await POST(request)
      const data = await response.json()

      // Verify CRM save was called with correct data
      expect(saveCustomerInquiry).toHaveBeenCalledTimes(1)
      expect(saveCustomerInquiry).toHaveBeenCalledWith(
        expect.objectContaining({
          name: mockInquiryData.name,
          email: mockInquiryData.email,
          phone: mockInquiryData.phone,
          nationality: mockInquiryData.nationality,
          source: 'website'
        })
      )

      // Verify successful response
      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBeTruthy()
    })

    it('maintains data integrity through the pipeline', async () => {
      let capturedData: any

      ;(saveCustomerInquiry as jest.Mock).mockImplementation((data) => {
        capturedData = data
        return Promise.resolve({
          success: true,
          data: { id: 'test-id' },
          error: null
        })
      })

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(mockInquiryData)
      })

      await POST(request)

      // Verify all fields are passed correctly
      expect(capturedData.name).toBe(mockInquiryData.name)
      expect(capturedData.email).toBe(mockInquiryData.email)
      expect(capturedData.phone).toBe(mockInquiryData.phone)
      expect(capturedData.nationality).toBe(mockInquiryData.nationality)
      expect(capturedData.preferredContact).toBe(mockInquiryData.preferredContact)
      expect(capturedData.serviceInterest).toBe(mockInquiryData.serviceInterest)
      expect(capturedData.travelDate).toBe(mockInquiryData.travelDate)
      expect(capturedData.budget).toBe(mockInquiryData.budget)
      expect(capturedData.message).toBe(mockInquiryData.message)
      expect(capturedData.source).toBe('website')
    })
  })

  describe('Response Format', () => {
    it('returns consistent success response structure', async () => {
      ;(saveCustomerInquiry as jest.Mock).mockResolvedValue({
        success: true,
        data: { id: 'mock-id' },
        error: null
      })

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(mockInquiryData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data).toHaveProperty('success')
      expect(data).toHaveProperty('message')
      expect(data.success).toBe(true)
      expect(typeof data.message).toBe('string')
    })

    it('returns consistent error response structure', async () => {
      ;(saveCustomerInquiry as jest.Mock).mockRejectedValue(
        new Error('Test error')
      )

      const request = new NextRequest('http://localhost:3000/api/submit-inquiry', {
        method: 'POST',
        body: JSON.stringify(mockInquiryData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data).toHaveProperty('success')
      expect(data).toHaveProperty('error')
      expect(data.success).toBe(false)
      expect(typeof data.error).toBe('string')
    })
  })
})
