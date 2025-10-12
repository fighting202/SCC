# Seoul Care Concierge

Professional concierge services for medical and beauty tourism in Korea.

## 🚀 Features

- **Bilingual Support**: English & Chinese language support
- **Medical Tourism**: Comprehensive medical and beauty tourism services
- **Real-time Contact**: WhatsApp, WeChat, and Email integration
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **SEO Optimized**: Structured data and meta tags for better search visibility
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.33
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Testing**: Vitest, Playwright
- **Deployment**: Vercel

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── scc/               # SCC-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions and stores
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── __tests__/             # Test files
```

## 🌐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=seoulcareconcierge@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=+82-10-2981-6653
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/821029816653
NEXT_PUBLIC_WECHAT_ID=SeoulCareConcierge

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🎨 Design System

- **Primary Color**: #2C5F7C (Teal)
- **Accent Color**: #D4AF37 (Gold)
- **Typography**: Raleway (Body), Playfair Display (Headings)
- **Chinese Font**: Noto Sans SC

## 📱 Responsive Breakpoints

- Mobile: 640px and below
- Tablet: 641px - 1024px
- Desktop: 1025px and above

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:coverage
```

## 🚀 Deployment

The project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📄 License

© 2025 Seoul Care Concierge. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, email seoulcareconcierge@gmail.com or contact us via WhatsApp.
