import { Feed, FeedOptions, Item } from 'feed'
import { getAllByTypes, getClient, getSettings } from 'lib/sanity.client'
import { urlSimpleForImage } from 'lib/sanity.image'
import { Post, Settings } from 'lib/sanity.queries'
import { toHtml, toPlainText } from 'lib/utils'

const contentTypes = ['news', 'post', 'review']

const generateRssFeed = (posts: Post[], settings: Settings) => {
  const site_url = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL // Make sure to const

  const feedOptions: FeedOptions = {
    title: settings.title,
    description: toPlainText(settings.description),
    id: site_url,
    link: site_url,
    language: 'pt-BR',
    updated: new Date(),
    image: `${site_url}/favicon/mstile-150x150.png`,
    favicon: `${site_url}/favicon/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${settings.title}`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${site_url}/feed`,
    },
  }

  const feed = new Feed(feedOptions)

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/${post._type}/${post.slug}`,
      link: `${site_url}/${post._type}/${post.slug}`,
      description: post.excerpt,
      date: new Date(post._createdAt),
      content: toHtml(post.content),
      author: [{ name: post.author?.name }],
      category: post.tag?.map((item) => {
        return { name: `<![CDATA[ ${item.title} ]]>` }
      }),
    })
  })

  return feed.rss2()
}

export default function Rss() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const client = getClient()

  // Return the default urls, combined with dynamic urls above
  const postsLocations = []

  const posts = await getAllByTypes<Post>(client, contentTypes, 0, 9)

  postsLocations.push(...posts)

  const settings = await getSettings(client)

  // Set response to XML
  res.setHeader('Content-Type', 'text/xml')
  res.write(generateRssFeed(postsLocations, settings))
  res.end()

  return {
    props: {},
  }
}
