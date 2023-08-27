import { HomePage } from 'features/home'
import PreviewIndexPage from 'features/preview/components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllNews,
  getAllPosts,
  getAllReviews,
  getClient,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  news: Post[]
  reviews: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, reviews, news, settings, draftMode } = props

  if (draftMode) {
    return (
      <PreviewIndexPage
        posts={posts}
        reviews={reviews}
        news={news}
        settings={settings}
      />
    )
  }

  return (
    <HomePage posts={posts} reviews={reviews} news={news} settings={settings} />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, posts = [], news = [], reviews = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
    getAllNews(client),
    getAllReviews(client),
  ])

  return {
    props: {
      posts,
      news,
      reviews,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
