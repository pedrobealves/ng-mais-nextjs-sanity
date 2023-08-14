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

export default function PreviewPostPage(props: PostPageProps) {
  //console.log(props)
  const [{ post: postPreview, newsDrop }, loadingPost] = useLiveQuery<{
    post: Post
    newsDrop: Post[]
  }>({ post: props.post, newsDrop: props.news }, postAndMoreStoriesQuery, {
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
      news={newsDrop}
      settings={settings}
    />
  )
}
