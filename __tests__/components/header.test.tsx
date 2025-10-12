import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from '@/components/header'

// Mock the store
vi.mock('@/lib/store/sccStore', () => ({
  useSCCStore: () => ({
    language: 'en',
    setLanguage: vi.fn(),
  }),
}))

describe('Header Component', () => {
  it('renders header with logo', () => {
    render(<Header />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByAltText('SCC Logo')).toBeInTheDocument()
  })

  it('displays navigation menu', () => {
    render(<Header />)
    
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('How It Works')).toBeInTheDocument()
    expect(screen.getByText('Packages')).toBeInTheDocument()
  })

  it('has language toggle buttons', () => {
    render(<Header />)
    
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('中文')).toBeInTheDocument()
  })
})
