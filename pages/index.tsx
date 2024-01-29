import { MinimalGrid } from 'features/grid'
import {
  HomeExtraList,
  HomeHero,
  HomeLayout,
  HomeNews,
  HomeTopList,
} from 'features/home'
import PreviewIndexPage from 'features/preview/components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getClient, getIndexInfo } from 'lib/sanity.client'
import { Category, Post, Review, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  specialPosts: Post[]
  defaultPosts: Post[]
  extraPosts: Post[]
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
    defaultPosts,
    specialPosts,
    extraPosts,
    reviews,
    news,
    settings,
    draftMode,
    newsDrop,
    top,
    category,
  } = props

  const posts = [...specialPosts, ...defaultPosts, ...extraPosts]

  if (draftMode) {
    return (
      <PreviewIndexPage
        specialPosts={specialPosts}
        defaultPosts={defaultPosts}
        extraPosts={extraPosts}
        reviews={reviews}
        news={news}
        settings={settings}
        newsDrop={newsDrop}
        top={top}
        category={category}
      />
    )
  }

  return (
    <HomeLayout
      settings={settings}
      hero={<HomeHero posts={posts} reviews={reviews} />}
      main={
        <>
          <HomeNews news={news} categories={category} />
          <MinimalGrid title="Artigos" news={specialPosts} type="home" />
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
      newsDrop = [],
      news = [],
      reviews = [],
      defaultPosts = [],
      specialPosts = [],
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
      extraPosts,
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
