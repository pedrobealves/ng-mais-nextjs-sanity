import PostPage, { PostPageProps } from 'features/post'
import {
  type Post,
  Review,
  reviewAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export function PreviewReviewPage(props: PostPageProps) {
  const [
    { review: postPreview, reviewDetails: reviewDetailsPreview },
    loadingPost,
  ] = useLiveQuery<{
    review: Post
    reviewDetails: Review
  }>(
    {
      review: props.post,
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
      settings={settings}
      reviewDetails={reviewDetailsPreview}
    />
  )
}
