import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PackageComparison from '@/components/package-comparison'

// Mock the store
vi.mock('@/lib/store/sccStore', () => ({
  useSCCStore: () => ({
    language: 'en',
    setLanguage: vi.fn(),
  }),
}))

describe('PackageComparison', () => {
  it('renders package comparison section', () => {
    render(<PackageComparison />)
    
    expect(screen.getByText('Choose Your Package')).toBeInTheDocument()
    expect(screen.getByText('Tailored solutions for every need')).toBeInTheDocument()
  })

  it('displays all three packages', () => {
    render(<PackageComparison />)
    
    expect(screen.getByText('Basic Package')).toBeInTheDocument()
    expect(screen.getByText('Premium Package')).toBeInTheDocument()
    expect(screen.getByText('VIP Package')).toBeInTheDocument()
  })

  it('shows correct pricing information', () => {
    render(<PackageComparison />)
    
    // Check for price elements
    const priceElements = screen.getAllByText(/\$/)
    expect(priceElements.length).toBeGreaterThan(0)
  })

  it('displays package features correctly', () => {
    render(<PackageComparison />)
    
    // Check for feature lists
    expect(screen.getByText(/Medical consultation/)).toBeInTheDocument()
    expect(screen.getByText(/Hospital booking/)).toBeInTheDocument()
    expect(screen.getByText(/24\/7 support/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<PackageComparison />)
    
    const section = screen.getByRole('region', { name: /packages/i })
    expect(section).toBeInTheDocument()
    
    // Check for proper heading structure
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('handles package selection', () => {
    render(<PackageComparison />)
    
    const buttons = screen.getAllByRole('button')
    const getQuoteButtons = buttons.filter(button => 
      button.textContent?.includes('Get Quote')
    )
    
    expect(getQuoteButtons.length).toBe(3)
    
    // Test button click
    fireEvent.click(getQuoteButtons[0])
    // Add specific assertions based on button behavior
  })

  it('shows package badges correctly', () => {
    render(<PackageComparison />)
    
    // Check for badge elements
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
    expect(screen.getByText('Best Value')).toBeInTheDocument()
  })

  it('has responsive grid layout', () => {
    const { container } = render(<PackageComparison />)
    
    // Check for responsive grid classes
    expect(container.querySelector('.grid')).toBeInTheDocument()
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument()
    expect(container.querySelector('.lg\\:grid-cols-3')).toBeInTheDocument()
  })

  it('displays package comparisons correctly', () => {
    render(<PackageComparison />)
    
    // Check for comparison table or elements
    const comparisonElements = screen.getAllByText(/vs/)
    expect(comparisonElements.length).toBeGreaterThan(0)
  })

  it('handles language switching', async () => {
    const mockSetLanguage = vi.fn()
    vi.mocked(useSCCStore).mockReturnValue({
      language: 'zh',
      setLanguage: mockSetLanguage,
    })

    render(<PackageComparison />)
    
    // Check if Chinese text is displayed
    expect(screen.getByText('选择您的套餐')).toBeInTheDocument()
  })
})
