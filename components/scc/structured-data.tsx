'use client'

import Script from 'next/script'

interface StructuredDataProps {
  type: 'faq' | 'service' | 'organization' | 'breadcrumb'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const schemas = {
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.questions?.map((q: any) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    },
    service: {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: 'Seoul Care Concierge',
      description: data.description,
      url: 'https://seoulcareconcierge.com',
      telephone: '+82-10-2981-6653',
      email: 'seoulcareconcierge@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Seoul',
        addressCountry: 'KR'
      },
      priceRange: '$$',
      medicalSpecialty: data.specialties || [
        'PlasticSurgery',
        'Dermatology',
        'DentalCare'
      ]
    },
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Seoul Care Concierge',
      url: 'https://seoulcareconcierge.com',
      logo: 'https://seoulcareconcierge.com/scc-logo-가로.svg',
      sameAs: [
        data.socialLinks?.wechat,
        data.socialLinks?.whatsapp,
        data.socialLinks?.email
      ].filter(Boolean),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-10-2981-6653',
        contactType: 'customer service',
        availableLanguage: ['English', 'Chinese', 'Korean']
      }
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.items?.map((item: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  }

  const schema = schemas[type]

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQStructuredData({ questions }: { questions: Array<{ question: string; answer: string }> }) {
  return <StructuredData type="faq" data={{ questions }} />
}

export function ServiceStructuredData({ description, specialties }: { description: string; specialties?: string[] }) {
  return <StructuredData type="service" data={{ description, specialties }} />
}

export function OrganizationStructuredData({ socialLinks }: { socialLinks?: any }) {
  return <StructuredData type="organization" data={{ socialLinks }} />
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  return <StructuredData type="breadcrumb" data={{ items }} />
}
