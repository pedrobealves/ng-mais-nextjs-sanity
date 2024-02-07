import { getAllByType, getClient } from 'lib/sanity.client'
import { urlSimpleForImage } from 'lib/sanity.image'
import { Post } from 'lib/sanity.queries'

const contentTypes = [
  { type: 'post', path: '/post/' },
  { type: 'review', path: '/review/', priority: 1, changefreq: 'daily' },
]

type SitemapLocation = {
  url: string
  lastmod?: Date
  title?: string
  image?: string
}

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL // Make sure to configure this
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  >
      ${locations
        .map((location) => {
          return `<url>
                    <loc>${baseUrl}${location.url}</loc>
                    ${
                      location.lastmod
                        ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                        : ''
                    }
                    <image:image>
                      <image:loc>${location.image}</image:loc>
                      <image:title>${location.title}</image:title>
                    </image:image>
                  </url>`
        })
        .join('')}
  </urlset>
  `
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
// Função para obter URLs
async function getUrls<T extends { slug?: string; _updatedAt?: string }>(
  client: any,
  contentType: {
    type: string
    path: string
  },
) {
  const [items = []] = await Promise.all([
    getAllByType<Post>(client, contentType.type),
  ])
  return items
    .filter(({ slug = '' }) => slug)
    .map((item) => {
      return {
        url: `${contentType.path}${item.slug}`,
        lastmod: new Date(item._updatedAt),
        title: item.title,
        image: urlSimpleForImage(item.coverImage).url(),
      }
    })
}

export async function getServerSideProps({ res }) {
  const client = getClient()

  // Return the default urls, combined with dynamic urls above
  const postUrls = []

  for (const contentType of contentTypes) {
    const tagsURL = await getUrls(client, contentType)
    postUrls.push(...tagsURL)
  }

  const locations = [...postUrls]

  // Set response to XML
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(locations))
  res.end()

  return {
    props: {},
  }
}
