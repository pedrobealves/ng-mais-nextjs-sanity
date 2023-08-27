import { PostPage } from 'features/post'
import { PreviewNewsPage } from 'features/preview'
import { readToken } from 'lib/sanity.api'
import {
  getAllNewsSlugs,
  getClient,
  getNewsAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  news: Post
  newsDrop: Post[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, news, newsDrop, draftMode } = props

  if (draftMode) {
    return <PreviewNewsPage post={news} news={newsDrop} settings={settings} />
  }

  return <PostPage post={news} settings={settings} news={newsDrop} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { news, newsDrop }] = await Promise.all([
    getSettings(client),
    getNewsAndMoreStories(client, params.slug),
  ])

  if (!news) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      news,
      newsDrop,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllNewsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/news/${slug}`) || [],
    fallback: 'blocking',
  }
}
