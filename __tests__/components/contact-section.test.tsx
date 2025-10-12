import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react'
import ContactSection from '@/components/contact-section'
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

// Mock window.open
const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen
})

describe('ContactSection', () => {
  const mockStore = {
    language: 'en' as const
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSCCStore as unknown as jest.Mock).mockReturnValue(mockStore)
    mockWindowOpen.mockClear()
  })

  describe('Rendering', () => {
    it('renders the section with English content', () => {
      render(<ContactSection />)

      expect(screen.getByText('Get Started Today')).toBeInTheDocument()
      expect(screen.getByText('Complete our quick form and receive a personalized consultation within 24 hours')).toBeInTheDocument()
      expect(screen.getByText('Get Free Consultation')).toBeInTheDocument()
    })

    it('renders the section with Chinese content', () => {
      ;(useSCCStore as unknown as jest.Mock).mockReturnValue({
        language: 'zh'
      })

      render(<ContactSection />)

      expect(screen.getByText('立即开始')).toBeInTheDocument()
      expect(screen.getByText('填写快速表格，24小时内收到个性化咨询')).toBeInTheDocument()
      expect(screen.getByText('免费咨询')).toBeInTheDocument()
    })

    it('renders contact buttons', () => {
      render(<ContactSection />)

      expect(screen.getByText('WhatsApp')).toBeInTheDocument()
      expect(screen.getByText('WeChat')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
    })
  })

  describe('Tally Form Integration', () => {
    beforeEach(() => {
      // Mock Tally
      ;(window as any).Tally = {
        openPopup: jest.fn()
      }
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      })
    })

    it('opens Tally popup on desktop when button is clicked', async () => {
      render(<ContactSection />)

      const consultationButton = screen.getByText('Get Free Consultation')

      await act(async () => {
        fireEvent.click(consultationButton)
      })

      await waitFor(() => {
        expect((window as any).Tally.openPopup).toHaveBeenCalledWith(
          process.env.NEXT_PUBLIC_TALLY_FORM_ID,
          expect.objectContaining({
            layout: 'modal',
            width: 700
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

      render(<ContactSection />)

      const consultationButton = screen.getByText('Get Free Consultation')

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

  describe('WeChat QR Modal', () => {
    it('opens WeChat QR modal on desktop when WeChat button is clicked', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      })

      render(<ContactSection />)

      const wechatButton = screen.getAllByText('WeChat')[0]

      await act(async () => {
        fireEvent.click(wechatButton)
      })

      await waitFor(() => {
        expect(screen.getByText('WeChat QR Code')).toBeInTheDocument()
      })
    })

    it('opens WeChat page in new tab on mobile', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500
      })

      render(<ContactSection />)

      const wechatButton = screen.getAllByText('WeChat')[0]

      await act(async () => {
        fireEvent.click(wechatButton)
      })

      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith('/wechat-qr', '_blank')
      })
    })

    it('closes WeChat QR modal when Close button is clicked', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      })

      render(<ContactSection />)

      const wechatButton = screen.getAllByText('WeChat')[0]

      await act(async () => {
        fireEvent.click(wechatButton)
      })

      await waitFor(() => {
        expect(screen.getByText('WeChat QR Code')).toBeInTheDocument()
      })

      const closeButton = screen.getByText('Close')

      await act(async () => {
        fireEvent.click(closeButton)
      })

      await waitFor(() => {
        expect(screen.queryByText('WeChat QR Code')).not.toBeInTheDocument()
      })
    })

    it('copies WeChat ID to clipboard when Copy ID button is clicked', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      })

      const mockWriteText = jest.fn()
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText
        }
      })

      render(<ContactSection />)

      const wechatButton = screen.getAllByText('WeChat')[0]

      await act(async () => {
        fireEvent.click(wechatButton)
      })

      const copyButton = await screen.findByText('Copy ID')

      await act(async () => {
        fireEvent.click(copyButton)
      })

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('SeoulCareConcierge')
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })
    })
  })

  describe('Language Support', () => {
    it('displays Chinese content when language is zh', () => {
      ;(useSCCStore as unknown as jest.Mock).mockReturnValue({
        language: 'zh'
      })

      render(<ContactSection />)

      expect(screen.getByText('或直接联系我们：')).toBeInTheDocument()
      expect(screen.getByText('微信')).toBeInTheDocument()
      expect(screen.getByText('邮箱')).toBeInTheDocument()
    })

    it('displays English content when language is en', () => {
      render(<ContactSection />)

      expect(screen.getByText('Or contact us directly:')).toBeInTheDocument()
    })

    it('shows correct button order for Chinese users', () => {
      ;(useSCCStore as unknown as jest.Mock).mockReturnValue({
        language: 'zh'
      })

      const { container } = render(<ContactSection />)

      const buttons = container.querySelectorAll('.w-full.sm\\:w-auto')
      expect(buttons[0]).toHaveTextContent('微信')
      expect(buttons[1]).toHaveTextContent('WhatsApp')
      expect(buttons[2]).toHaveTextContent('邮箱')
    })

    it('shows correct button order for English users', () => {
      const { container } = render(<ContactSection />)

      const buttons = container.querySelectorAll('a.w-full.sm\\:w-auto, button.w-full.sm\\:w-auto')
      expect(buttons[0]).toHaveTextContent('WhatsApp')
    })
  })

  describe('Accessibility', () => {
    it('has proper section ID for navigation', () => {
      const { container } = render(<ContactSection />)

      const section = container.querySelector('#get-started')
      expect(section).toBeInTheDocument()
    })

    it('has accessible button labels', () => {
      render(<ContactSection />)

      const consultationButton = screen.getByRole('button', { name: /consultation/i })
      expect(consultationButton).toBeInTheDocument()
    })
  })
})
