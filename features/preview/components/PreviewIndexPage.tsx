import { HomePage, type IndexPageProps } from 'features/home'
import {
  type Category,
  categoryIndexQuery,
  newsDropQuery,
  newsIndexQuery,
  type Post,
  postIndexQuery,
  type Review,
  reviewsIndexQuery,
  type Settings,
  settingsQuery,
  topIndexQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewIndexPage(props: IndexPageProps) {
  const [posts, loadingPosts] = useLiveQuery<Post[]>(
    props.posts,
    postIndexQuery,
  )
  const [news, loadingNews] = useLiveQuery<Post[]>(props.news, newsIndexQuery)
  const [reviews, loadingReviews] = useLiveQuery<Post[]>(
    props.reviews,
    reviewsIndexQuery,
  )
  const [newsDrop, loadingNewsDrop] = useLiveQuery<Post[]>(
    props.newsDrop,
    newsDropQuery,
  )

  const [category, loadingCategory] = useLiveQuery<Category[]>(
    props.category,
    categoryIndexQuery,
  )

  const [topGames, loadingTopGames] = useLiveQuery<Review[]>(
    props.topGames,
    topIndexQuery,
  )

  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <HomePage
      preview
      loading={
        loadingPosts ||
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
      posts={posts || []}
      settings={settings || {}}
      category={category || []}
      topGames={topGames || []}
    />
  )
}
