import { CompleteGrid, MinimalGrid, StandardGrid } from 'features/grid'
import { HomeExtraList, HomeHero, HomeTopList } from 'features/home'
import PreviewIndexPage from 'features/preview/components/PreviewIndexPage'
import { Home } from 'layouts/Home'
import { readToken } from 'lib/sanity.api'
import { getClient, getIndexInfo } from 'lib/sanity.client'
import { Category, Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  specialPosts: Post[]
  defaultPosts: Post[]
  chronologyPosts: Post[]
  extraPosts: Post[]
  news: Post[]
  reviews: Post[]
  top: Post[]
  settings: Settings
  category: Category[]
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const {
    defaultPosts,
    specialPosts,
    chronologyPosts,
    extraPosts,
    reviews,
    news,
    settings,
    draftMode,
    top,
    category,
  } = props

  if (draftMode) {
    return (
      <PreviewIndexPage
        specialPosts={specialPosts}
        defaultPosts={defaultPosts}
        chronologyPosts={chronologyPosts}
        extraPosts={extraPosts}
        reviews={reviews}
        news={news}
        settings={settings}
        top={top}
        category={category}
      />
    )
  }

  return (
    <Home
      settings={settings}
      hero={<HomeHero posts={defaultPosts} reviews={reviews} />}
      main={
        <>
          <StandardGrid title="Notícias" news={news} categories={category} />
          <CompleteGrid title="Especiais" news={specialPosts} type="home" />
          <MinimalGrid title="Cronologia" news={chronologyPosts} type="home" />
        </>
      }
      sidebar={
        <>
          <HomeTopList games={top} />
          <HomeExtraList posts={extraPosts} />
        </>
      }
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [
    {
      news = [],
      reviews = [],
      defaultPosts = [],
      specialPosts = [],
      chronologyPosts = [],
      extraPosts = [],
      settings,
      category,
      top,
    },
  ] = await Promise.all([getIndexInfo(client, 0, 6)])

  return {
    props: {
      specialPosts,
      defaultPosts,
      chronologyPosts,
      extraPosts,
      news,
      reviews,
      settings,
      draftMode,
      top,
      category,
      token: draftMode ? readToken : '',
    },
  }
}
