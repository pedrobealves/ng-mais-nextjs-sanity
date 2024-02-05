import { getAll, getClient } from 'lib/sanity.client'
import { Category, Tag } from 'lib/sanity.queries'

type Sitemap = {
  url: string
}

// Use this to manually add routes to the sitemap
const defaultUrls: Sitemap[] = [
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

const createSitemap = (locations: Sitemap[]) => {
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

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const locations = [...defaultUrls]

  // Set response to XML
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(locations))
  res.end()

  return {
    props: {},
  }
}
