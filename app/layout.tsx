import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Noto_Sans_SC, Playfair_Display, Raleway } from 'next/font/google';
import type React from 'react';
import './globals.css';

// Elegant, thin and refined sans-serif for body text (얇고 세련된 폰트)
// Only necessary weights for better performance
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Reduced from 6 to 3 weights
  variable: '--font-raleway',
  display: 'swap',
  preload: true,
});

// Elegant serif for headings (이미 좋은 선택)
// Only necessary weights for better performance
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Reduced from 5 to 3 weights
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

// Premium Chinese font (더 많은 weight 옵션)
// Only necessary weights for better performance
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Reduced from 5 to 3 weights
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Seoul Care Concierge | Medical & Beauty Tourism in Korea',
    template: '%s | Seoul Care Concierge',
  },
  description:
    'Professional medical and beauty care concierge service in Seoul, Korea. Airport pickup, accommodation, translation, and full support for international clients. Safe, transparent, affordable.',
  keywords: [
    'medical tourism Korea',
    'plastic surgery Seoul',
    'K-beauty services',
    'Seoul medical concierge',
    'Korea beauty tourism',
    'medical interpreter Seoul',
    'Korean medical tourism',
    'Seoul plastic surgery',
    'K-beauty concierge',
    'medical tourism Seoul',
    'Korea medical services',
    'Seoul beauty services',
    'Korean healthcare tourism',
    'medical travel Korea',
    'beauty tourism Seoul',
    '韩国医疗旅游',
    '首尔整形',
    '韩国医疗翻译',
    '韩国美容服务',
    '首尔医疗旅游',
    '韩国整形外科',
    '首尔美容服务',
    '韩国医疗翻译服务',
  ],
  authors: [{ name: 'Seoul Care Concierge' }],
  creator: 'Seoul Care Concierge',
  publisher: 'Seoul Care Concierge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://scc-kr.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scc-kr.vercel.app',
    siteName: 'Seoul Care Concierge',
    title: 'Seoul Care Concierge | Medical & Beauty Tourism in Korea',
    description: 'Professional medical and beauty care concierge service in Seoul, Korea. Airport pickup, accommodation, translation, and full support for international clients.',
    images: [
      {
        url: 'https://scc-kr.vercel.app/optimized/modern-seoul-skyline-at-sunset-with-luxury-medical-social.webp',
        width: 1200,
        height: 630,
        alt: 'Seoul medical tourism skyline with luxury medical facilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seoul Care Concierge | Medical & Beauty Tourism in Korea',
    description: 'Professional medical and beauty care concierge service in Seoul, Korea.',
    images: ['https://scc-kr.vercel.app/optimized/modern-seoul-skyline-at-sunset-with-luxury-medical-social.webp'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      zh: '/?lang=zh',
    },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Seoul Care Concierge',
    description: 'Medical and beauty tourism concierge service in Seoul, Korea',
    url: 'https://seoulcareconcierge.com',
    logo: 'https://seoulcareconcierge.com/scc-logo-가로.svg',
    image:
      'https://seoulcareconcierge.com/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: 'Seoul',
    },
    telephone: '+82-10-2981-6653',
    email: 'seoulcareconcierge@gmail.com',
    priceRange: '$$',
    languages: ['English', 'Chinese', 'Korean'],
    serviceType: ['Medical Tourism', 'Beauty Services', 'Concierge Services'],
    areaServed: {
      '@type': 'Country',
      name: 'South Korea',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical and Beauty Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Medical Services',
            description:
              'Plastic surgery, dermatology, dental care, traditional Korean medicine',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Beauty Services',
            description: 'K-Beauty skincare, hair & makeup, spa & wellness',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Complete Support',
            description:
              'Airport transfer, accommodation booking, interpreter service, restaurant recommendations, emergency assistance',
          },
        },
      ],
    },
  };

  return (
    <html
      lang="en"
      className={`${raleway.variable} ${playfair.variable} ${notoSansSC.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {/* Favicon for different sizes - using high quality PNG images */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/favicon-64x64.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/favicon-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/favicon-256x256.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon-512x512.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        {/* Tally Modal Animation Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let animationType = 'center'; // 기본 애니메이션 타입

                // 애니메이션 타입 설정 함수
                window.setTallyAnimation = function(type) {
                  animationType = type;
                };

                // 탤리 모달 애니메이션 적용 함수
                function applyTallyAnimation() {
                  const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(function(node) {
                          if (node.nodeType === Node.ELEMENT_NODE) {
                            const element = node;

                            // 탤리 모달이 추가되었는지 확인
                            if (element.tagName === 'DIV' && element.style.position === 'fixed') {
                              setTimeout(function() {
                                // 애니메이션 클래스 추가
                                element.classList.add('tally-modal-content');

                                switch (animationType) {
                                  case 'center':
                                    element.classList.add('tally-modal-center');
                                    break;
                                  case 'bottom-up':
                                    element.classList.add('tally-modal-bottom-up');
                                    break;
                                }
                              }, 100);
                            }
                          }
                        });
                      }
                    });
                  });

                  observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                  });
                }

                // DOM이 로드된 후 애니메이션 적용
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', applyTallyAnimation);
                } else {
                  applyTallyAnimation();
                }
              })();
            `,
          }}
        />
        {/* Tally Form Script */}
        <script src="https://tally.so/widgets/embed.js" async />
      </head>
      <body
        className={`${raleway.className} ${notoSansSC.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
