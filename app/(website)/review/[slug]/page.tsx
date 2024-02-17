import type { SharedPageProps } from 'app/layout'
import { PostPage } from 'features/post'
import { PreviewReviewPage } from 'features/preview'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { urlForImage } from 'lib/sanity.image'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

interface PageProps extends SharedPageProps {
  post: Post
  settings?: Settings
}

export default async function ProjectSlugRoute({ params }) {
  const { settings, post, draftMode } = await getPost(params)

  if (draftMode) {
    return (
      <PreviewReviewPage
        news={post.related}
        reviewDetails={post}
        post={post}
        settings={settings}
      />
    )
  }

  return (
    <PostPage
      post={post}
      reviewDetails={post}
      settings={settings}
      news={post.related}
    />
  )
}

async function getPost(params): Promise<PageProps> {
  const client = getClient(
    draftMode().isEnabled ? { token: readToken } : undefined,
  )

  const [settings, { post }] = await Promise.all([
    getSettings(client),
    getPostAndMoreStories(client, params.slug, 'review'),
  ])

  if (!post) {
    notFound()
  }

  return {
    post,
    settings,
    draftMode: draftMode().isEnabled,
    token: draftMode().isEnabled ? readToken : '',
  }
}

export const dynamicParams = true
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const slugs = await getAllPostsSlugs('review')

  return slugs?.map(({ slug }) => `/review/${slug}`) || []
}

// or Dynamic metadata
export async function generateMetadata({ params }) {
  const client = getClient(
    draftMode().isEnabled ? { token: readToken } : undefined,
  )

  const [{ post }, settings] = await Promise.all([
    getPostAndMoreStories(client, params.slug, 'review'),
    getSettings(client),
  ])

  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      site_name: settings?.title,
      type: 'article',
      locale: 'pt_BR',
      section: post?.category.title,
      tags: post?.tag?.map((tag) => tag.title),
      images: [
        {
          url:
            post &&
            urlForImage(post?.coverImage)
              .width(1280)
              .height(720)
              .fit('crop')
              .url(),
          with: 1280,
          height: 720,
          type: 'image/jpeg',
        },
      ],
      published_time: post?.date,
      modified_time: post?._updatedAt ? post?._updatedAt : post?.date,
      publisher: settings?.title,
      author: post?.author?.name,
    },
    category: post?._type,
    twitter: {
      title: post?.title,
      description: post?.excerpt,
      images: [
        post &&
          urlForImage(post?.coverImage)
            .width(1280)
            .height(720)
            .fit('crop')
            .url(),
      ],
    },
  }
}
