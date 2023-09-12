import { HomePage, type IndexPageProps } from 'features/home'
import {
  type Category,
  categoryPaginationQuery,
  defaultPostsPaginationQuery,
  newsDropQuery,
  newsPaginationQuery,
  type Post,
  type Review,
  reviewsPaginationQuery,
  type Settings,
  settingsQuery,
  specialPostsPaginationQuery,
  topPaginationQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

interface IndexPreviewPageProps extends IndexPageProps {
  postsSpecial: Post[]
  postsDefault: Post[]
}

export default function PreviewIndexPage(props: IndexPreviewPageProps) {
  const [postsDefault, loadingDefaultPosts] = useLiveQuery<Post[]>(
    props.postsDefault,
    defaultPostsPaginationQuery,
    { pageIndex: 0, limit: 2 },
  )

  const [postsSpecial, loadingSpecialPosts] = useLiveQuery<Post[]>(
    props.postsSpecial,
    specialPostsPaginationQuery,
    { pageIndex: 0, limit: 4 },
  )

  const [news, loadingNews] = useLiveQuery<Post[]>(
    props.news,
    newsPaginationQuery,
    { pageIndex: 0, limit: 5 },
  )

  const [reviews, loadingReviews] = useLiveQuery<Post[]>(
    props.reviews,
    reviewsPaginationQuery,
    { pageIndex: 0, limit: 2 },
  )
  const [newsDrop, loadingNewsDrop] = useLiveQuery<Post[]>(
    props.newsDrop,
    newsPaginationQuery,
    { pageIndex: 0, limit: 3 },
  )

  const [category, loadingCategory] = useLiveQuery<Category[]>(
    props.category,
    categoryPaginationQuery,
    { pageIndex: 0, limit: 5 },
  )

  const [topGames, loadingTopGames] = useLiveQuery<Review[]>(
    props.topGames,
    topPaginationQuery,
    { pageIndex: 0, limit: 8 },
  )

  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <HomePage
      preview
      loading={
        loadingDefaultPosts ||
        loadingSpecialPosts ||
        loadingSettings ||
        loadingNews ||
        loadingReviews ||
        loadingNewsDrop ||
        loadingCategory ||
        loadingTopGames
      }
      news={news || []}
      newsDrop={newsDrop || []}
      reviews={reviews || []}
      posts={[...postsDefault, ...postsSpecial] || []}
      settings={settings || {}}
      category={category || []}
      topGames={topGames || []}
    />
  )
}
