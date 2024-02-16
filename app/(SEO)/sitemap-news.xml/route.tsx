import { getAllByType, getClient } from 'lib/sanity.client'
import { urlSimpleForImage } from 'lib/sanity.image'
import { Post, Tag } from 'lib/sanity.queries'

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
  publication_date?: Date
  title?: string
  tags?: Tag[]
  image?: string
}

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL // Make sure to configure this
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  >
      ${locations
        .map((location) => {
          return `<url>
                    <loc>${baseUrl}${location.url}</loc>
                    <priority>${location.priority}</priority>
                    ${
                      location.lastmod
                        ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                        : ''
                    }
                    <news:news>
                      <news:publication>
                        <news:name>ng+</news:name>
                        <news:language>pt-BR</news:language>
                      </news:publication>
                      <news:publication_date>${location.publication_date.toISOString()}</news:publication_date>
                      <news:title>${location.title}</news:title>
                      <news:keywords>${location.tags?.map((tag) => tag.title).join(', ')}</news:keywords>
                    </news:news>
                    <image:image>
                      <image:loc>${location.image}</image:loc>
                    </image:image>
                  </url>`
        })
        .join('')}
  </urlset>
  `
}

export async function GET() {
  const client = getClient()

  // Get list of Post urls
  const [posts = []] = await Promise.all([getAllByType<Post>(client, 'news')])
  const postUrls: SitemapLocation[] = posts
    .filter(({ slug = '' }) => slug)
    .map((post) => {
      return {
        url: `/news/${post.slug}`,
        priority: 0.7,
        lastmod: new Date(post._updatedAt),
        publication_date: new Date(post.date),
        title: post.title,
        tags: post.tag,
        image: urlSimpleForImage(post.coverImage).url(),
      }
    })

  // ... get more routes here

  // Return the default urls, combined with dynamic urls above
  const locations = [...postUrls]

  return new Response(createSitemap(locations), {
    headers: {
      'content-type': 'application/xml',
    },
  })
}
