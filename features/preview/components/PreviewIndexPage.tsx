import { HomePage, type IndexPageProps } from 'features/home'
import {
  newsIndexQuery,
  type Post,
  postIndexQuery,
  reviewsIndexQuery,
  type Settings,
  settingsQuery,
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
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <HomePage
      preview
      loading={loadingPosts || loadingSettings || loadingNews || loadingReviews}
      news={news || []}
      reviews={reviews || []}
      posts={posts || []}
      settings={settings || {}}
    />
  )
}
