import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FAQSection from '@/components/faq-section'

// Mock the store
vi.mock('@/lib/store/sccStore', () => ({
  useSCCStore: () => ({
    language: 'en',
    setLanguage: vi.fn(),
  }),
}))

describe('FAQSection', () => {
  it('renders FAQ section with correct title', () => {
    render(<FAQSection />)
    
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
    expect(screen.getByText('Everything you need to know about our services')).toBeInTheDocument()
  })

  it('displays all FAQ items', () => {
    render(<FAQSection />)
    
    // Check for FAQ questions
    expect(screen.getByText(/What services do you offer/)).toBeInTheDocument()
    expect(screen.getByText(/How do I book/)).toBeInTheDocument()
    expect(screen.getByText(/What is included/)).toBeInTheDocument()
    expect(screen.getByText(/Do you provide/)).toBeInTheDocument()
  })

  it('handles accordion interactions', async () => {
    render(<FAQSection />)
    
    // Find accordion triggers
    const accordionTriggers = screen.getAllByRole('button')
    expect(accordionTriggers.length).toBeGreaterThan(0)
    
    // Click first accordion item
    const firstTrigger = accordionTriggers[0]
    fireEvent.click(firstTrigger)
    
    // Wait for content to appear
    await waitFor(() => {
      expect(screen.getByText(/We offer comprehensive/)).toBeInTheDocument()
    })
  })

  it('shows correct FAQ answers', () => {
    render(<FAQSection />)
    
    // Check for answer content
    expect(screen.getByText(/We offer comprehensive/)).toBeInTheDocument()
    expect(screen.getByText(/Booking is simple/)).toBeInTheDocument()
    expect(screen.getByText(/Our packages include/)).toBeInTheDocument()
    expect(screen.getByText(/Yes, we provide/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<FAQSection />)
    
    const section = screen.getByRole('region', { name: /faq/i })
    expect(section).toBeInTheDocument()
    
    // Check for proper heading structure
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('handles keyboard navigation', () => {
    render(<FAQSection />)
    
    const accordionTriggers = screen.getAllByRole('button')
    const firstTrigger = accordionTriggers[0]
    
    // Focus first trigger
    firstTrigger.focus()
    expect(firstTrigger).toHaveFocus()
    
    // Test Enter key
    fireEvent.keyDown(firstTrigger, { key: 'Enter' })
    // Add specific assertions based on accordion behavior
  })

  it('shows FAQ categories correctly', () => {
    render(<FAQSection />)
    
    // Check for category headings or sections
    expect(screen.getByText('General Questions')).toBeInTheDocument()
    expect(screen.getByText('Booking & Payment')).toBeInTheDocument()
    expect(screen.getByText('Services & Support')).toBeInTheDocument()
  })

  it('has responsive design classes', () => {
    const { container } = render(<FAQSection />)
    
    // Check for responsive classes
    expect(container.querySelector('.max-w-4xl')).toBeInTheDocument()
    expect(container.querySelector('.mx-auto')).toBeInTheDocument()
  })

  it('handles language switching', async () => {
    const mockSetLanguage = vi.fn()
    vi.mocked(useSCCStore).mockReturnValue({
      language: 'zh',
      setLanguage: mockSetLanguage,
    })

    render(<FAQSection />)
    
    // Check if Chinese text is displayed
    expect(screen.getByText('常见问题')).toBeInTheDocument()
  })

  it('displays search functionality', () => {
    render(<FAQSection />)
    
    // Check for search input
    const searchInput = screen.getByPlaceholderText(/Search FAQs/)
    expect(searchInput).toBeInTheDocument()
    
    // Test search functionality
    fireEvent.change(searchInput, { target: { value: 'booking' } })
    expect(searchInput).toHaveValue('booking')
  })

  it('shows contact information in FAQ', () => {
    render(<FAQSection />)
    
    // Check for contact information
    expect(screen.getByText(/Still have questions/)).toBeInTheDocument()
    expect(screen.getByText(/Contact us/)).toBeInTheDocument()
  })
})
