'use client'
import {
  getClientWithToken,
  getPostsAndSettings,
  Page,
  PageProps,
  Query,
} from 'features/pagination'
import { readToken } from 'lib/sanity.api'
import { getAllPostsSlugs, getTitleBySlugs } from 'lib/sanity.client'
import { GetStaticProps } from 'next'

export default Page

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { params = {} } = ctx

  const type = 'tag'
  const tag = params.slug as string

  const client = getClientWithToken(ctx)
  const [initialPosts = [], settings] = await getPostsAndSettings(
    client,
    type,
    ctx,
  )

  if (initialPosts.length === 0) {
    return {
      notFound: true,
    }
  }

  const title = await getTitleBySlugs(client, tag)

  return {
    props: {
      initialPosts,
      settings,
      type: tag,
      title,
      filter: `"${tag}" in tag[]->slug.current`,
      draftMode: ctx.draftMode || false,
      token: ctx.draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs('tag')
  return {
    paths: slugs?.map(({ slug }) => `/tag/${slug}`) || [],
    fallback: 'blocking',
  }
}
