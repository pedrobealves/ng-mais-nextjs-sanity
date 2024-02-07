import { MinimalGrid } from 'features/grid'
import { HomeExtraList, HomeHero, HomeNews, HomeTopList } from 'features/home'
import { Home } from 'layouts/Home'
import {
  type Category,
  indexQuery,
  type Post,
  type Settings,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

interface PageProps {
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

export default function PreviewIndexPage(props: PageProps) {
  const [indexInfo, loadingIndexInfo] = useLiveQuery<{
    news: Post[]
    reviews: Post[]
    defaultPosts: Post[]
    specialPosts: Post[]
    chronologyPosts: Post[]
    extraPosts: Post[]
    settings: Settings
    category: Category[]
    top: Post[]
  }>(props, indexQuery, { pageIndex: 0, limit: 6 })

  const {
    news,
    reviews,
    defaultPosts,
    specialPosts,
    chronologyPosts,
    extraPosts,
    settings,
    category,
    top,
  } = indexInfo

  return (
    <Home
      preview
      settings={settings}
      hero={<HomeHero posts={specialPosts || []} reviews={reviews || []} />}
      main={
        <>
          <HomeNews news={news || []} categories={category} />
          <MinimalGrid title="Artigos" news={defaultPosts || []} type="home" />
          <MinimalGrid
            title="Cronologia"
            news={chronologyPosts || []}
            type="home"
          />
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
