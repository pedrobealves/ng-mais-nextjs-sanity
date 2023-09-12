import { HomePage } from 'features/home'
import PreviewIndexPage from 'features/preview/components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import {
  getCategoryPagination,
  getClient,
  getDefaultPostsPagination,
  getNewsDropPagination,
  getNewsPagination,
  getReviewsPagination,
  getSettings,
  getSpecialPostsPagination,
  getTop,
} from 'lib/sanity.client'
import { Category, Post, Review, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  postsSpecial: Post[]
  postsDefault: Post[]
  news: Post[]
  reviews: Post[]
  newsDrop: Post[]
  top: Review[]
  settings: Settings
  category: Category[]
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const {
    postsDefault,
    postsSpecial,
    reviews,
    news,
    settings,
    draftMode,
    newsDrop,
    top,
    category,
  } = props

  const posts = [...postsSpecial, ...postsDefault]

  if (draftMode) {
    return (
      <PreviewIndexPage
        postsSpecial={postsSpecial}
        postsDefault={postsDefault}
        posts={posts}
        reviews={reviews}
        news={news}
        settings={settings}
        newsDrop={newsDrop}
        topGames={top}
        category={category}
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
      category={category}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [
    settings,
    postsSpecial = [],
    postsDefault = [],
    news = [],
    reviews = [],
    newsDrop = [],
    top = [],
    category = [],
  ] = await Promise.all([
    getSettings(client),
    getDefaultPostsPagination(client, 0, 2),
    getSpecialPostsPagination(client, 0, 4),
    getNewsPagination(client, 0, 5),
    getReviewsPagination(client, 0, 2),
    getNewsDropPagination(client, 0, 3),
    getTop(client, 0, 8),
    getCategoryPagination(client, 0, 5),
  ])

  return {
    props: {
      postsSpecial,
      postsDefault,
      news,
      newsDrop,
      reviews,
      settings,
      draftMode,
      top,
      category,
      token: draftMode ? readToken : '',
    },
  }
}
