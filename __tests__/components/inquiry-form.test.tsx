import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import { InquiryForm } from '@/components/scc/forms/inquiry-form'
import { useLanguage, useInquiryForm } from '@/lib/store'

// Mock store hooks
jest.mock('@/lib/store', () => ({
  useLanguage: jest.fn(),
  useInquiryForm: jest.fn()
}))

// Mock BilingualText component
jest.mock('@/components/scc/bilingualtext', () => ({
  BilingualText: ({ en, zh }: { en: string; zh: string }) => {
    const { language } = require('@/lib/store').useLanguage()
    return <span>{language === 'zh' ? zh : en}</span>
  }
}))

describe('InquiryForm', () => {
  const mockSetInquiryForm = jest.fn()
  const mockSetIsFormSubmitted = jest.fn()

  const defaultMockInquiryFormHook = {
    inquiryForm: {},
    setInquiryForm: mockSetInquiryForm,
    resetInquiryForm: jest.fn(),
    isFormSubmitted: false,
    setIsFormSubmitted: mockSetIsFormSubmitted
  }

  const defaultMockLanguageHook = {
    language: 'en' as const,
    setLanguage: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useLanguage as jest.Mock).mockReturnValue(defaultMockLanguageHook)
    ;(useInquiryForm as jest.Mock).mockReturnValue(defaultMockInquiryFormHook)
  })

  describe('Rendering', () => {
    it('renders form with all required fields', () => {
      render(<InquiryForm />)

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/nationality/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/preferred contact method/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/travel date/i)).toBeInTheDocument()
    })

    it('renders optional fields', () => {
      render(<InquiryForm />)

      expect(screen.getByLabelText(/budget/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/additional message/i)).toBeInTheDocument()
    })

    it('renders agreement checkboxes', () => {
      render(<InquiryForm />)

      expect(screen.getByText(/agree to the terms and conditions/i)).toBeInTheDocument()
      expect(screen.getByText(/agree to the privacy policy/i)).toBeInTheDocument()
    })

    it('renders submit button', () => {
      render(<InquiryForm />)

      expect(screen.getByRole('button', { name: /send inquiry/i })).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('shows validation errors for empty required fields', async () => {
      render(<InquiryForm />)

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })

      await act(async () => {
        fireEvent.click(submitButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
      })
    })

    it('validates email format', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      const emailInput = screen.getByLabelText(/email/i)

      await user.type(emailInput, 'invalid-email')

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
      })
    })

    it('validates phone number format', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      const phoneInput = screen.getByLabelText(/phone number/i)

      await user.type(phoneInput, '123')

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/phone number must be at least 10 digits/i)).toBeInTheDocument()
      })
    })

    it('validates travel date is in the future', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      const travelDateInput = screen.getByLabelText(/travel date/i)

      // Set date to yesterday
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toISOString().split('T')[0]

      await user.type(travelDateInput, yesterdayString)

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/travel date must be in the future/i)).toBeInTheDocument()
      })
    })

    it('validates terms agreement', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      // Fill all required fields
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '1234567890')
      await user.type(screen.getByLabelText(/nationality/i), 'USA')

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      await user.type(screen.getByLabelText(/travel date/i), tomorrowString)

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/you must agree to the terms and conditions/i)).toBeInTheDocument()
        expect(screen.getByText(/you must agree to the privacy policy/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('submits form successfully with valid data', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      // Fill all required fields
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '+11234567890')
      await user.type(screen.getByLabelText(/nationality/i), 'USA')

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      await user.type(screen.getByLabelText(/travel date/i), tomorrowString)

      // Check agreements
      const termsCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
      const privacyCheckbox = screen.getByRole('checkbox', { name: /privacy policy/i })

      await user.click(termsCheckbox)
      await user.click(privacyCheckbox)

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockSetInquiryForm).toHaveBeenCalled()
        expect(mockSetIsFormSubmitted).toHaveBeenCalledWith(true)
      })
    })

    it('shows loading state during submission', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      // Fill required fields
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '+11234567890')
      await user.type(screen.getByLabelText(/nationality/i), 'USA')

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      await user.type(screen.getByLabelText(/travel date/i), tomorrowString)

      await user.click(screen.getByRole('checkbox', { name: /terms and conditions/i }))
      await user.click(screen.getByRole('checkbox', { name: /privacy policy/i }))

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      // Check for loading text
      expect(screen.getByText(/submitting/i)).toBeInTheDocument()
    })

    it('shows success message after submission', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      // Fill and submit form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '+11234567890')
      await user.type(screen.getByLabelText(/nationality/i), 'USA')

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      await user.type(screen.getByLabelText(/travel date/i), tomorrowString)

      await user.click(screen.getByRole('checkbox', { name: /terms and conditions/i }))
      await user.click(screen.getByRole('checkbox', { name: /privacy policy/i }))

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/thank you for your inquiry/i)).toBeInTheDocument()
        expect(screen.getByText(/we will contact you within 24 hours/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Field Interactions', () => {
    it('allows selecting service interest', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      const serviceSelect = screen.getByRole('combobox', { name: /service interest/i })

      await user.click(serviceSelect)

      await waitFor(() => {
        expect(screen.getByText('Medical Services')).toBeInTheDocument()
        expect(screen.getByText('Beauty Services')).toBeInTheDocument()
        expect(screen.getByText('Support Services')).toBeInTheDocument()
        expect(screen.getByText('All Services')).toBeInTheDocument()
      })
    })

    it('allows selecting preferred contact method', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      const contactSelect = screen.getByRole('combobox', { name: /preferred contact method/i })

      await user.click(contactSelect)

      await waitFor(() => {
        expect(screen.getByText('WeChat')).toBeInTheDocument()
        expect(screen.getByText('WhatsApp')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
      })
    })

    it('allows entering budget', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      const budgetInput = screen.getByLabelText(/budget/i)

      await user.type(budgetInput, '5000-10000')

      expect(budgetInput).toHaveValue('5000-10000')
    })

    it('allows entering additional message', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      const messageTextarea = screen.getByLabelText(/additional message/i)

      await user.type(messageTextarea, 'I need help with plastic surgery consultation')

      expect(messageTextarea).toHaveValue('I need help with plastic surgery consultation')
    })
  })

  describe('Language Support', () => {
    it('displays Chinese labels when language is zh', () => {
      ;(useLanguage as jest.Mock).mockReturnValue({
        language: 'zh',
        setLanguage: jest.fn()
      })

      render(<InquiryForm />)

      expect(screen.getByText('获取免费咨询')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/请输入您的姓名/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/请输入您的邮箱/i)).toBeInTheDocument()
    })

    it('displays English labels when language is en', () => {
      render(<InquiryForm />)

      expect(screen.getByText('Get Free Consultation')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    })
  })

  describe('Store Integration', () => {
    it('loads initial values from store', () => {
      ;(useInquiryForm as jest.Mock).mockReturnValue({
        ...defaultMockInquiryFormHook,
        inquiryForm: {
          name: 'Jane Doe',
          email: 'jane@example.com'
        }
      })

      render(<InquiryForm />)

      expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Doe')
      expect(screen.getByLabelText(/email/i)).toHaveValue('jane@example.com')
    })

    it('saves form data to store on submission', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '+11234567890')
      await user.type(screen.getByLabelText(/nationality/i), 'USA')

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      await user.type(screen.getByLabelText(/travel date/i), tomorrowString)

      await user.click(screen.getByRole('checkbox', { name: /terms and conditions/i }))
      await user.click(screen.getByRole('checkbox', { name: /privacy policy/i }))

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockSetInquiryForm).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+11234567890',
            nationality: 'USA'
          })
        )
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<InquiryForm />)

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    })

    it('associates error messages with fields', async () => {
      render(<InquiryForm />)

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await act(async () => {
        fireEvent.click(submitButton)
      })

      await waitFor(() => {
        const errors = screen.getAllByRole('generic').filter(el =>
          el.className.includes('text-destructive')
        )
        expect(errors.length).toBeGreaterThan(0)
      })
    })

    it('disables submit button during submission', async () => {
      const user = userEvent.setup()
      render(<InquiryForm />)

      // Fill form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '+11234567890')
      await user.type(screen.getByLabelText(/nationality/i), 'USA')

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      await user.type(screen.getByLabelText(/travel date/i), tomorrowString)

      await user.click(screen.getByRole('checkbox', { name: /terms and conditions/i }))
      await user.click(screen.getByRole('checkbox', { name: /privacy policy/i }))

      const submitButton = screen.getByRole('button', { name: /send inquiry/i })
      await user.click(submitButton)

      // Button should be disabled during submission
      expect(submitButton).toBeDisabled()
    })
  })
})
