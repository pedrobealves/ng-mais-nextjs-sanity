import PostPage, { PostPageProps } from 'features/post'
import {
  newsAndMoreStoriesQuery,
  type Post,
  postAndMoreStoriesQuery,
  reviewAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export function PreviewPostPage(props: PostPageProps) {
  const [{ post: postPreview }, loadingPost] = useLiveQuery<{
    post: Post
  }>({ post: props.post }, postAndMoreStoriesQuery, {
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
