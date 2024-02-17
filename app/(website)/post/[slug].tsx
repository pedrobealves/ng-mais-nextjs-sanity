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
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  post: Post
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, draftMode } = props

  if (draftMode) {
    return (
      <PreviewPostPage news={post.related} post={post} settings={settings} />
    )
  }

  return <PostPage post={post} settings={settings} news={post.related} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { post }] = await Promise.all([
    getSettings(client),
    getPostAndMoreStories(client, params.slug, 'post'),
  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs('post')

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
