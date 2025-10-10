import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/setup/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/setup/', '/admin/'],
        crawlDelay: 0,
      },
    ],
    sitemap: 'https://seoulcareconcierge.com/sitemap.xml',
  }
}
