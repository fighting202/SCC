import type React from "react"
import type { Metadata } from "next"
import { Raleway, Playfair_Display, Noto_Sans_SC } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LanguageAwareLayout } from "@/components/language-aware-layout"
import { GoogleAnalytics, GoogleTagManager } from "@/components/analytics"
import { SkipToMain, SkipToNavigation } from "@/components/ui/skip-link"
import "./globals.css"

// Elegant, thin and refined sans-serif for body text (얇고 세련된 폰트)
// Only necessary weights for better performance
const raleway = Raleway({
  subsets: ["latin"],
  weight: ['400', '600', '700'], // Reduced from 6 to 3 weights
  variable: "--font-raleway",
  display: "swap",
  preload: true,
})

// Elegant serif for headings (이미 좋은 선택)
// Only necessary weights for better performance
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '600', '700'], // Reduced from 5 to 3 weights
  variable: "--font-playfair",
  display: "swap",
  preload: true,
})

// Premium Chinese font (더 많은 weight 옵션)
// Only necessary weights for better performance
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Reduced from 5 to 3 weights
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: true,
})


export const metadata: Metadata = {
  title: {
    default: "Seoul Care Concierge | Medical & Beauty Tourism in Korea",
    template: "%s | Seoul Care Concierge"
  },
  description: "Professional medical and beauty care concierge service in Seoul, Korea. Airport pickup, accommodation, translation, and full support for international clients. Safe, transparent, affordable.",
  keywords: [
    "medical tourism Korea",
    "plastic surgery Seoul", 
    "K-beauty services",
    "Seoul medical concierge",
    "Korea beauty tourism",
    "medical interpreter Seoul",
    "Korean medical tourism",
    "Seoul plastic surgery",
    "K-beauty concierge",
    "medical tourism Seoul",
    "Korea medical services",
    "Seoul beauty services",
    "Korean healthcare tourism",
    "medical travel Korea",
    "beauty tourism Seoul",
    "韩国医疗旅游",
    "首尔整形",
    "韩国医疗翻译",
    "韩国美容服务",
    "首尔医疗旅游",
    "韩国整形外科",
    "首尔美容服务",
    "韩国医疗翻译服务"
  ],
  authors: [{ name: "Seoul Care Concierge" }],
  creator: "Seoul Care Concierge",
  publisher: "Seoul Care Concierge",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-160x160.png', sizes: '160x160', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-112x112.png', sizes: '112x112', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-80x80.png', sizes: '80x80', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-24x24.png', sizes: '24x24', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '400x400', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://seoulcareconcierge.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'zh': '/?lang=zh',
    },
  },
  openGraph: {
    title: "Seoul Care Concierge | Medical & Beauty Tourism in Korea",
    description: "Professional medical and beauty care concierge service in Seoul, Korea. Safe, transparent, affordable.",
    url: 'https://seoulcareconcierge.com',
    siteName: 'Seoul Care Concierge',
    images: [
      {
        url: '/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg',
        width: 1200,
        height: 630,
        alt: 'Seoul medical tourism skyline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Seoul Care Concierge | Medical & Beauty Tourism in Korea",
    description: "Professional medical and beauty care concierge service in Seoul, Korea.",
    images: ['/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Seoul Care Concierge",
    "description": "Medical and beauty tourism concierge service in Seoul, Korea",
    "url": "https://seoulcareconcierge.com",
    "logo": "https://seoulcareconcierge.com/scc-logo-가로.svg",
    "image": "https://seoulcareconcierge.com/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressLocality": "Seoul"
    },
    "telephone": "+82-10-2981-6653",
    "email": "seoulcareconcierge@gmail.com",
    "priceRange": "$$",
    "languages": ["English", "Chinese", "Korean"],
    "serviceType": ["Medical Tourism", "Beauty Services", "Concierge Services"],
    "areaServed": {
      "@type": "Country",
      "name": "South Korea"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medical and Beauty Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Medical Services",
            "description": "Plastic surgery, dermatology, dental care, traditional Korean medicine"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Beauty Services",
            "description": "K-Beauty skincare, hair & makeup, spa & wellness"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Complete Support",
            "description": "Airport transfer, accommodation booking, interpreter service, restaurant recommendations, emergency assistance"
          }
        }
      ]
    }
  }

  return (
    <html lang="en" className={`${raleway.variable} ${playfair.variable} ${notoSansSC.variable}`} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className={`${raleway.className} ${notoSansSC.className} antialiased`} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageAwareLayout />
          {children}
          {/* Analytics */}
          <GoogleAnalytics />
          <GoogleTagManager />
          {/* Vercel Speed Insights */}
          <SpeedInsights />
        </ThemeProvider>
        {/* Tally.so embed script for the consultation form */}
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}