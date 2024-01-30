import { PostPage } from 'features/post'
import { PreviewReviewPage } from 'features/preview'
import { readToken } from 'lib/sanity.api'
import {
  getAllNewsSlugs,
  getClient,
  getReviewsAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Post, Review, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  review: Post
  reviewDetails: Review
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, review, reviewDetails, draftMode } = props

  if (draftMode) {
    return (
      <PreviewReviewPage
        news={review.related}
        reviewDetails={reviewDetails}
        post={review}
        settings={settings}
      />
    )
  }

  return (
    <PostPage
      post={review}
      reviewDetails={reviewDetails}
      settings={settings}
      news={review.related}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { review, reviewDetails }] = await Promise.all([
    getSettings(client),
    getReviewsAndMoreStories(client, params.slug),
  ])

  if (!review) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      review,
      reviewDetails,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllNewsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/review/${slug}`) || [],
    fallback: 'blocking',
  }
}
