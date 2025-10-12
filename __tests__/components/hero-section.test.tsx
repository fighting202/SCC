import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react'
import HeroSection from '@/components/hero-section'
import { useSCCStore } from '@/lib/store/sccStore'

// Mock useSCCStore
jest.mock('@/lib/store/sccStore', () => ({
  useSCCStore: jest.fn()
}))

// Mock Next Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  }
}))

// Mock TrustIndicators
jest.mock('@/components/scc/trust-indicators', () => ({
  TrustIndicators: () => <div data-testid="trust-indicators">Trust Indicators</div>
}))

// Mock window.open and scrollTo
const mockWindowOpen = jest.fn()
const mockScrollTo = jest.fn()

Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen
})

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: mockScrollTo
})

describe('HeroSection', () => {
  const mockStore = {
    language: 'en' as const
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSCCStore as unknown as jest.Mock).mockReturnValue(mockStore)
    mockWindowOpen.mockClear()
    mockScrollTo.mockClear()

    // Mock document.getElementById for scroll tests
    document.getElementById = jest.fn((id) => {
      return {
        getBoundingClientRect: () => ({
          top: 100,
          bottom: 200,
          left: 0,
          right: 0,
          width: 0,
          height: 100
        })
      } as any
    })
  })

  describe('Rendering', () => {
    it('renders hero section with English content', () => {
      render(<HeroSection />)

      expect(screen.getByText('Your Safe & Seamless Journey in Korea')).toBeInTheDocument()
      expect(screen.getByText('Professional Medical & Beauty Concierge')).toBeInTheDocument()
      expect(screen.getByText('Get Free Consultation')).toBeInTheDocument()
    })

    it('renders hero section with Chinese content', () => {
      ;(useSCCStore as unknown as jest.Mock).mockReturnValue({
        language: 'zh'
      })

      render(<HeroSection />)

      expect(screen.getByText('您在韩国的安全无忧之旅')).toBeInTheDocument()
      expect(screen.getByText('专业医疗美容管家服务')).toBeInTheDocument()
      expect(screen.getByText('免费咨询')).toBeInTheDocument()
    })

    it('renders navigation buttons', () => {
      render(<HeroSection />)

      expect(screen.getByText('View Services')).toBeInTheDocument()
      expect(screen.getByText('How It Works')).toBeInTheDocument()
      expect(screen.getByText('View Packages')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
    })

    it('renders trust indicators', () => {
      render(<HeroSection />)

      expect(screen.getByTestId('trust-indicators')).toBeInTheDocument()
    })

    it('renders background image with proper attributes', () => {
      const { container } = render(<HeroSection />)

      const image = container.querySelector('img')
      expect(image).toHaveAttribute('src', expect.stringContaining('modern-seoul-skyline'))
      expect(image).toHaveAttribute('alt', 'Seoul medical tourism skyline with luxury medical facilities')
    })
  })

  describe('Tally Form Integration', () => {
    beforeEach(() => {
      ;(window as any).Tally = {
        openPopup: jest.fn()
      }
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      })
    })

    it('opens Tally popup on desktop when consultation button is clicked', async () => {
      render(<HeroSection />)

      const consultationButton = screen.getByRole('button', { name: /consultation/i })

      await act(async () => {
        fireEvent.click(consultationButton)
      })

      await waitFor(() => {
        expect((window as any).Tally.openPopup).toHaveBeenCalledWith(
          process.env.NEXT_PUBLIC_TALLY_FORM_ID,
          expect.objectContaining({
            layout: 'modal',
            width: 700,
            autoClose: 3000,
            emoji: {
              text: '✈️',
              animation: 'wave'
            }
          })
        )
      })
    })

    it('opens Tally in new tab on mobile', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500
      })

      render(<HeroSection />)

      const consultationButton = screen.getByRole('button', { name: /consultation/i })

      await act(async () => {
        fireEvent.click(consultationButton)
      })

      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('tally.so'),
          '_blank'
        )
      })
    })

    it('falls back to window.open when Tally is not loaded', async () => {
      ;(window as any).Tally = undefined

      render(<HeroSection />)

      const consultationButton = screen.getByRole('button', { name: /consultation/i })

      await act(async () => {
        fireEvent.click(consultationButton)
      })

      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('tally.so'),
          '_blank'
        )
      })
    })
  })

  describe('Scroll Navigation', () => {
    it('scrolls to services section when View Services is clicked', async () => {
      render(<HeroSection />)

      const servicesButton = screen.getByText('View Services')

      await act(async () => {
        fireEvent.click(servicesButton)
      })

      await waitFor(() => {
        expect(document.getElementById).toHaveBeenCalledWith('services')
        expect(mockScrollTo).toHaveBeenCalledWith(
          expect.objectContaining({
            behavior: 'smooth'
          })
        )
      })
    })

    it('scrolls to how-it-works section when How It Works is clicked', async () => {
      render(<HeroSection />)

      const howItWorksButton = screen.getByText('How It Works')

      await act(async () => {
        fireEvent.click(howItWorksButton)
      })

      await waitFor(() => {
        expect(document.getElementById).toHaveBeenCalledWith('how-it-works')
      })
    })

    it('scrolls to packages section when View Packages is clicked', async () => {
      render(<HeroSection />)

      const packagesButton = screen.getByText('View Packages')

      await act(async () => {
        fireEvent.click(packagesButton)
      })

      await waitFor(() => {
        expect(document.getElementById).toHaveBeenCalledWith('packages')
      })
    })

    it('scrolls to FAQ section when FAQ is clicked', async () => {
      render(<HeroSection />)

      const faqButton = screen.getByText('FAQ')

      await act(async () => {
        fireEvent.click(faqButton)
      })

      await waitFor(() => {
        expect(document.getElementById).toHaveBeenCalledWith('faq')
      })
    })
  })

  describe('Language Support', () => {
    it('displays Chinese navigation buttons when language is zh', () => {
      ;(useSCCStore as unknown as jest.Mock).mockReturnValue({
        language: 'zh'
      })

      render(<HeroSection />)

      expect(screen.getByText('查看服务')).toBeInTheDocument()
      expect(screen.getByText('使用指南')).toBeInTheDocument()
      expect(screen.getByText('查看套餐')).toBeInTheDocument()
      expect(screen.getByText('常见问题')).toBeInTheDocument()
    })

    it('applies Chinese font class when language is zh', () => {
      ;(useSCCStore as unknown as jest.Mock).mockReturnValue({
        language: 'zh'
      })

      const { container } = render(<HeroSection />)

      const chineseElements = container.querySelectorAll('.font-chinese')
      expect(chineseElements.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('has proper section role and aria-label', () => {
      const { container } = render(<HeroSection />)

      const section = container.querySelector('section[role="banner"]')
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('aria-label', 'Hero section')
    })

    it('has proper heading hierarchy', () => {
      render(<HeroSection />)

      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
    })

    it('has accessible button with aria-label', () => {
      render(<HeroSection />)

      const consultationButton = screen.getByRole('button', { name: /consultation/i })
      expect(consultationButton).toHaveAttribute('aria-label')
    })
  })

  describe('Responsive Behavior', () => {
    it('applies correct styles for mobile', () => {
      const { container } = render(<HeroSection />)

      const section = container.querySelector('section')
      expect(section).toHaveClass('min-h-screen')
      expect(section).toHaveClass('pt-16')
    })

    it('has responsive text sizing', () => {
      render(<HeroSection />)

      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl')
    })
  })
})
