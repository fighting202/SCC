/**
 * Structured Data (JSON-LD) for SEO
 * Schema.org markup for better search engine understanding
 */

import Script from 'next/script'

interface OrganizationSchemaProps {
  language?: 'en' | 'zh'
}

export function OrganizationSchema({ language = 'en' }: OrganizationSchemaProps) {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://seoulcareconcierge.com',
    name: 'Seoul Care Concierge',
    alternateName: language === 'zh' ? '首尔护理礼宾' : 'SCC',
    url: 'https://seoulcareconcierge.com',
    logo: 'https://seoulcareconcierge.com/scc-logo-header.png',
    image: 'https://seoulcareconcierge.com/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg',
    description:
      language === 'zh'
        ? '首尔专业医疗和美容护理礼宾服务。为国际客户提供机场接送、住宿、翻译和全面支持。'
        : 'Professional medical and beauty care concierge service in Seoul, Korea. Airport pickup, accommodation, translation, and full support for international clients.',
    telephone: '+82-10-2981-6653',
    email: 'seoulcareconcierge@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seoul',
      addressCountry: 'KR',
      addressRegion: 'Seoul',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5665,
      longitude: 126.978,
    },
    areaServed: {
      '@type': 'Country',
      name: ['South Korea', 'China', 'International'],
    },
    availableLanguage: [
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
      {
        '@type': 'Language',
        name: 'Chinese',
        alternateName: 'zh',
      },
      {
        '@type': 'Language',
        name: 'Korean',
        alternateName: 'ko',
      },
    ],
    priceRange: '$$-$$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'WeChat Pay', 'Alipay'],
    sameAs: [
      'https://www.instagram.com/seoulcareconcierge',
      'https://www.facebook.com/seoulcareconcierge',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical & Beauty Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: language === 'zh' ? '医疗服务' : 'Medical Services',
            description:
              language === 'zh'
                ? '整形外科、皮肤科、牙科、韩医'
                : 'Plastic surgery, Dermatology, Dental care, Traditional Korean medicine',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: language === 'zh' ? '美容服务' : 'Beauty Services',
            description:
              language === 'zh'
                ? 'K-Beauty 护肤、美发化妆、水疗健康'
                : 'K-Beauty skincare, Hair & makeup, Spa & wellness',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: language === 'zh' ? '全面支持' : 'Complete Support',
            description:
              language === 'zh'
                ? '机场接送、住宿预订、翻译服务、紧急援助'
                : 'Airport transfer, Accommodation booking, Interpreter service, Emergency assistance',
          },
        },
      ],
    },
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      strategy="afterInteractive"
    />
  )
}

export function WebSiteSchema() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://seoulcareconcierge.com/#website',
    url: 'https://seoulcareconcierge.com',
    name: 'Seoul Care Concierge',
    inLanguage: ['en', 'zh'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://seoulcareconcierge.com/?s={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      strategy="afterInteractive"
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      strategy="afterInteractive"
    />
  )
}

export function ServiceSchema({
  name,
  description,
  provider = 'Seoul Care Concierge',
  areaServed = 'Seoul, South Korea',
}: {
  name: string
  description: string
  provider?: string
  areaServed?: string
}) {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    areaServed: {
      '@type': 'City',
      name: areaServed,
    },
  }

  return (
    <Script
      id={`service-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      strategy="afterInteractive"
    />
  )
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      strategy="afterInteractive"
    />
  )
}

export function ContactPointSchema() {
  const contactData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    telephone: '+82-10-2981-6653',
    contactType: 'Customer Service',
    email: 'seoulcareconcierge@gmail.com',
    availableLanguage: ['English', 'Chinese', 'Korean'],
    areaServed: ['KR', 'CN', 'International'],
    contactOption: 'TollFree',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
  }

  return (
    <Script
      id="contact-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(contactData) }}
      strategy="afterInteractive"
    />
  )
}
