import { PostPage, PostPageProps } from 'features/post'
import {
  newsAndMoreStoriesQuery,
  type Post,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export function PreviewNewsPage(props: PostPageProps) {
  const [{ news: postPreview }, loadingPost] = useLiveQuery<{
    news: Post
  }>({ news: props.post }, newsAndMoreStoriesQuery, {
    slug: props.post.slug,
  })

  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <PostPage
      preview
      loading={loadingPost || loadingSettings}
      post={postPreview}
      settings={settings}
    />
  )
}
