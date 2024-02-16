import { getAllByType, getClient } from 'lib/sanity.client'
import { Category, Tag } from 'lib/sanity.queries'

const contentTypes = [
  { type: 'tag', path: '/tag/', priority: 0.7, changefreq: 'hourly' },
  { type: 'category', path: '/', priority: 0.7, changefreq: 'daily' },
]

type SitemapLocation = {
  url: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
  lastmod?: Date
}

// Use this to manually add routes to the sitemap
const defaultUrls: SitemapLocation[] = [
  {
    url: '/',
    changefreq: 'hourly',
    priority: 1,
    lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
  },
  {
    url: '/author',
    changefreq: 'weekly',
    priority: 0.3,
    lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
  },
  //   { url: '/about', priority: 0.5 },
  //   { url: '/blog', changefreq: 'weekly', priority: 0.7 },
]

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL // Make sure to configure this
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locations
        .map((location) => {
          return `<url>
                    <loc>${baseUrl}${location.url}</loc>
                    <changefreq>${location.changefreq || 'weekly'}</changefreq>
                    <priority>${location.priority}</priority>
                    ${
                      location.lastmod
                        ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                        : ''
                    }
                  </url>`
        })
        .join('')}
  </urlset>
  `
}

// Função para obter URLs
async function getUrls<T extends { slug?: string; _updatedAt?: string }>(
  client: any,
  contentType: {
    type: string
    path: string
    priority: number
    changefreq: string
  },
) {
  const [items = []] = await Promise.all([
    getAllByType<T>(client, contentType.type),
  ])
  return items
    .filter(({ slug = '' }) => slug)
    .map((item) => {
      return {
        url: `${contentType.path}${item.slug}`,
        priority: contentType.priority,
        lastmod: new Date(item._updatedAt),
        changefreq: contentType.changefreq,
      }
    })
}

export async function GET() {
  const client = getClient()

  // Return the default urls, combined with dynamic urls above
  const postUrls = []

  for (const contentType of contentTypes) {
    const tagsURL = await getUrls<Tag | Category>(client, contentType)
    postUrls.push(...tagsURL)
  }

  const locations = [...defaultUrls, ...postUrls]

  return new Response(createSitemap(locations), {
    headers: {
      'content-type': 'application/xml',
    },
  })
}
