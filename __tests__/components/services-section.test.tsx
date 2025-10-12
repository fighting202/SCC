import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ServicesSection from '@/components/services-section'

// Mock the store
vi.mock('@/lib/store/sccStore', () => ({
  useSCCStore: () => ({
    language: 'en',
    setLanguage: vi.fn(),
  }),
}))

describe('ServicesSection', () => {
  it('renders services section with correct title', () => {
    render(<ServicesSection />)
    
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText('Comprehensive Medical & Beauty Tourism Solutions')).toBeInTheDocument()
  })

  it('displays all service cards', () => {
    render(<ServicesSection />)
    
    // Check for service cards
    expect(screen.getByText('Medical Services')).toBeInTheDocument()
    expect(screen.getByText('Beauty Services')).toBeInTheDocument()
    expect(screen.getByText('Support Services')).toBeInTheDocument()
  })

  it('shows correct service descriptions', () => {
    render(<ServicesSection />)
    
    expect(screen.getByText(/We guide you to Korea's leading medical facilities/)).toBeInTheDocument()
    expect(screen.getByText(/Experience the latest in K-beauty treatments/)).toBeInTheDocument()
    expect(screen.getByText(/24\/7 concierge support throughout your journey/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ServicesSection />)
    
    const section = screen.getByRole('region', { name: /services/i })
    expect(section).toBeInTheDocument()
    
    // Check for proper heading structure
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('handles language switching', async () => {
    const mockSetLanguage = vi.fn()
    vi.mocked(useSCCStore).mockReturnValue({
      language: 'zh',
      setLanguage: mockSetLanguage,
    })

    render(<ServicesSection />)
    
    // Check if Chinese text is displayed
    expect(screen.getByText('我们的服务')).toBeInTheDocument()
  })

  it('has proper button interactions', () => {
    render(<ServicesSection />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
    
    // Test button click
    const firstButton = buttons[0]
    fireEvent.click(firstButton)
    // Add specific assertions based on button behavior
  })

  it('displays service icons correctly', () => {
    render(<ServicesSection />)
    
    // Check for icon elements (adjust based on actual implementation)
    const icons = screen.getAllByRole('img', { hidden: true })
    expect(icons.length).toBeGreaterThan(0)
  })

  it('has responsive design classes', () => {
    const { container } = render(<ServicesSection />)
    
    // Check for responsive classes
    expect(container.querySelector('.grid')).toBeInTheDocument()
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument()
    expect(container.querySelector('.lg\\:grid-cols-3')).toBeInTheDocument()
  })
})
