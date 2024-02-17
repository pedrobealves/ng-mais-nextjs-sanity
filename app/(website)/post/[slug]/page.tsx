import type { SharedPageProps } from 'app/layout'
import { PostPage } from 'features/post'
import { PreviewPostPage } from 'features/preview'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

interface PageProps extends SharedPageProps {
  post: Post
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default async function ProjectSlugRoute({ params }) {
  const { settings, post, draftMode } = await getPost(params)

  if (draftMode) {
    return (
      <PreviewPostPage news={post.related} post={post} settings={settings} />
    )
  }

  return <PostPage post={post} settings={settings} news={post.related} />
}

async function getPost(params): Promise<PageProps> {
  const client = getClient(
    draftMode().isEnabled ? { token: readToken } : undefined,
  )

  const [settings, { post }] = await Promise.all([
    getSettings(client),
    getPostAndMoreStories(client, params.slug, 'post'),
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
  const slugs = await getAllPostsSlugs('post')

  return slugs?.map(({ slug }) => `/post/${slug}`) || []
}
