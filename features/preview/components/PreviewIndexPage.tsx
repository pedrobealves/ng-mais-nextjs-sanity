import { HomePage } from 'features/home'
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
    settings,
    category,
    top,
  } = indexInfo

  return (
    <HomePage
      preview
      loading={loadingIndexInfo}
      news={news || []}
      newsDrop={newsDrop || []}
      reviews={reviews || []}
      posts={[...defaultPosts, ...specialPosts] || []}
      settings={settings || {}}
      category={category || []}
      topGames={top || []}
    />
  )
}
