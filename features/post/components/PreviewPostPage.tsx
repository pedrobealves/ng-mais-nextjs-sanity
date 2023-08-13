import PostPage, { PostPageProps } from 'features/post'
import {
  type Post,
  postAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewPostPage(props: PostPageProps) {
  const [{ post: postPreview, news }, loadingPost] = useLiveQuery<{
    post: Post
    news: Post[]
  }>({ post: props.post, news: props.news }, postAndMoreStoriesQuery, {
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
      news={news}
      settings={settings}
    />
  )
}
