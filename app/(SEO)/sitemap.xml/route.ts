import { MetadataRoute } from 'next'

// Use this to manually add routes to the sitemap
const defaultUrls: MetadataRoute.Sitemap = [
  {
    url: '/sitemap-news.xml',
  },
  {
    url: '/sitemap-posts.xml',
  },
  {
    url: '/sitemap-pages.xml',
  },
]

const createSitemap = (locations: MetadataRoute.Sitemap) => {
  const baseUrl = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL // Make sure to configure this
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${locations
    .map((location) => {
      return `
        <sitemap>
          <loc>${baseUrl}${location.url}</loc>
        </sitemap>
        `
    })
    .join('')}
        </sitemapindex>
        `
}

export async function GET() {
  const locations = [...defaultUrls]

  return new Response(createSitemap(locations), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
    },
  })
}
