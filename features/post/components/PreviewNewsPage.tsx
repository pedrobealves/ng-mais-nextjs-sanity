import PostPage, { PostPageProps } from 'features/post'
import {
  newsAndMoreStoriesQuery,
  type Post,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewPostPage(props: PostPageProps) {
  //console.log(props)
  const [{ news: postPreview, newsDrop }, loadingPost] = useLiveQuery<{
    news: Post
    newsDrop: Post[]
  }>({ news: props.post, newsDrop: props.news }, newsAndMoreStoriesQuery, {
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
