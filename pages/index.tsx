import { HomePage } from 'features/home'
import PreviewIndexPage from 'features/preview/components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllNews,
  getAllNewsDrop,
  getAllPosts,
  getAllReviews,
  getClient,
  getSettings,
  getTop,
} from 'lib/sanity.client'
import { Post, Review, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  news: Post[]
  reviews: Post[]
  newsDrop: Post[]
  top: Review[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, reviews, news, settings, draftMode, newsDrop, top } = props

  if (draftMode) {
    return (
      <PreviewIndexPage
        posts={posts}
        reviews={reviews}
        news={news}
        settings={settings}
        newsDrop={newsDrop}
        topGames={top}
      />
    )
  }

  return (
    <HomePage
      posts={posts}
      reviews={reviews}
      news={news}
      settings={settings}
      newsDrop={newsDrop}
      topGames={top}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [
    settings,
    posts = [],
    news = [],
    reviews = [],
    newsDrop = [],
    top = [],
  ] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
    getAllNews(client),
    getAllReviews(client),
    getAllNewsDrop(client),
    getTop(client),
  ])

  return {
    props: {
      posts,
      news,
      newsDrop,
      reviews,
      settings,
      draftMode,
      top,
      token: draftMode ? readToken : '',
    },
  }
}
