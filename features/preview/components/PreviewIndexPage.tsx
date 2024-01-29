import { MinimalGrid } from 'features/grid'
import {
  HomeExtraList,
  HomeHero,
  HomeLayout,
  HomeNews,
  HomeTopList,
} from 'features/home'
import {
  type Category,
  indexQuery,
  type Post,
  type Review,
  type Settings,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

interface PageProps {
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

export default function PreviewIndexPage(props: PageProps) {
  const [indexInfo, loadingIndexInfo] = useLiveQuery<{
    newsDrop: Post[]
    news: Post[]
    reviews: Post[]
    defaultPosts: Post[]
    specialPosts: Post[]
    extraPosts: Post[]
    settings: Settings
    category: Category[]
    top: Review[]
  }>(props, indexQuery, { pageIndex: 0, limit: 6 })

  const {
    newsDrop,
    news,
    reviews,
    defaultPosts,
    specialPosts,
    extraPosts,
    settings,
    category,
    top,
  } = indexInfo

  return (
    <HomeLayout
      settings={settings}
      hero={<HomeHero posts={specialPosts || []} reviews={reviews || []} />}
      main={
        <>
          <HomeNews news={news || []} categories={category} />
          <MinimalGrid title="Artigos" news={defaultPosts || []} type="home" />
        </>
      }
      sidebar={
        <>
          <HomeTopList games={top || []} />
          <HomeExtraList posts={extraPosts || []} />
        </>
      }
    />
  )
}
