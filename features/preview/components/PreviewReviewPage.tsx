'use client'

import { PostPage, PostPageProps } from 'features/post'
import {
  type Post,
  postAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'
import post from 'schemas/post'

export function PreviewReviewPage(props: PostPageProps) {
  const [{ post: postPreview }, loadingPost] = useLiveQuery<{
    post: Post
  }>(
    {
      post: props.post,
    },
    postAndMoreStoriesQuery('review'),
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
      reviewDetails={postPreview}
    />
  )
}
