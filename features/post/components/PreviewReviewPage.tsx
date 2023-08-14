import PostPage, { PostPageProps } from 'features/post'
import {
  type Post,
  Review,
  reviewAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewPostPage(props: PostPageProps) {
  const [
    { review: postPreview, newsDrop, reviewDetails: reviewDetailsPreview },
    loadingPost,
  ] = useLiveQuery<{
    review: Post
    newsDrop: Post[]
    reviewDetails: Review
  }>(
    {
      review: props.post,
      newsDrop: props.news,
      reviewDetails: props.reviewDetails,
    },
    reviewAndMoreStoriesQuery,
    {
      slug: props.post.slug,
    },
  )

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
      reviewDetails={reviewDetailsPreview}
    />
  )
}
