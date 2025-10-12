'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'service' | 'faq' | 'breadcrumb';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    let jsonLd: any = {};

    switch (type) {
      case 'organization':
        jsonLd = {
    '@context': 'https://schema.org',
          '@type': 'Organization',
    name: 'Seoul Care Concierge',
          alternateName: 'SCC',
          description:
            'Premium medical and beauty tourism concierge service in Seoul, Korea',
    url: 'https://seoulcareconcierge.com',
          logo: 'https://seoulcareconcierge.com/optimized/scc-logo-header.webp',
          contactPoint: {
            '@type': 'ContactPoint',
    telephone: '+82-10-2981-6653',
            contactType: 'customer service',
            availableLanguage: ['English', 'Chinese'],
            areaServed: 'KR',
    email: 'seoulcareconcierge@gmail.com',
          },
    address: {
      '@type': 'PostalAddress',
            addressCountry: 'KR',
      addressLocality: 'Seoul',
          },
          sameAs: [
            'https://wa.me/821029816653',
            'https://wechat.com/SeoulCareConcierge',
          ],
          serviceArea: {
            '@type': 'Country',
            name: 'South Korea',
          },
          foundingDate: '2024',
          slogan: 'Making Korea accessible, one journey at a time',
        };
        break;

      case 'website':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Seoul Care Concierge',
          url: 'https://seoulcareconcierge.com',
          description:
            'Premium medical and beauty tourism concierge service in Seoul, Korea',
          inLanguage: ['en-US', 'zh-CN'],
          potentialAction: {
            '@type': 'SearchAction',
            target:
              'https://seoulcareconcierge.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        };
        break;

      case 'service':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Medical & Beauty Tourism Concierge',
          description:
            'Comprehensive concierge services for medical and beauty tourism in Seoul, Korea',
          provider: {
            '@type': 'Organization',
            name: 'Seoul Care Concierge',
    },
    areaServed: {
      '@type': 'Country',
            name: 'South Korea',
          },
          serviceType: 'Medical Tourism',
          category: 'Health and Beauty Services',
          offers: [
            {
              '@type': 'Offer',
              name: 'Basic Package',
              description: 'Essential medical tourism support services',
              price: '500',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              name: 'Premium Package',
              description:
                'Comprehensive medical and beauty tourism concierge services',
              price: '1000',
              priceCurrency: 'USD',
            },
          ],
        };
        break;

      case 'faq':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What services do you provide?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We provide comprehensive medical and beauty tourism concierge services including hospital appointments, translation services, accommodation assistance, and cultural guidance.',
          },
        },
        {
              '@type': 'Question',
              name: 'Do you provide translation services?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, we provide professional translation services in English and Chinese for all medical consultations and procedures.',
          },
        },
        {
              '@type': 'Question',
              name: 'How do I get started?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Contact us via WhatsApp, WeChat, or email to discuss your needs and receive a personalized consultation.',
          },
        },
      ],
        };
        break;

      case 'breadcrumb':
        jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://seoulcareconcierge.com',
            },
            {
      '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://seoulcareconcierge.com#services',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Packages',
              item: 'https://seoulcareconcierge.com#packages',
            },
          ],
        };
        break;

      default:
        jsonLd = data || {};
    }

    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  return null;
}

// 모든 구조화된 데이터를 한 번에 렌더링하는 컴포넌트
export function AllStructuredData() {
  return (
    <>
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <StructuredData type="service" />
      <StructuredData type="faq" />
      <StructuredData type="breadcrumb" />
    </>
  );
}
