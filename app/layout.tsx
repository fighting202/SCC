import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Seoul Care Concierge | Medical & Beauty Tourism in Korea",
  description: "Professional medical and beauty care concierge service in Seoul, Korea. Airport pickup, accommodation, translation, and full support for international clients. Safe, transparent, affordable.",
  keywords: [
    "medical tourism Korea",
    "plastic surgery Seoul", 
    "K-beauty services",
    "Seoul medical concierge",
    "Korea beauty tourism",
    "medical interpreter Seoul",
    "韩国医疗旅游",
    "首尔整形",
    "韩国医疗翻译",
    "韩国美容服务"
  ],
  authors: [{ name: "Seoul Care Concierge" }],
  creator: "Seoul Care Concierge",
  publisher: "Seoul Care Concierge",
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
  icons: {
    icon: "/scc-logo-파비콘.svg",
    shortcut: "/scc-logo-파비콘.svg",
    apple: "/scc-logo-파비콘.svg",
  },
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
        {/* Tally.so embed script for the consultation form */}
        <Script 
          src="https://tally.so/widgets/embed.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}