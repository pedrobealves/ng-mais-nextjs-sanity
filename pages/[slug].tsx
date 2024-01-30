'use client'
import {
  getClientWithToken,
  getPostsAndSettings,
  Page,
  PageProps,
  Query,
} from 'features/post'
import { readToken } from 'lib/sanity.api'
import { getAllPostsSlugs } from 'lib/sanity.client'
import { GetStaticProps } from 'next'

export default Page

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { params = {} } = ctx

  const type = 'category'
  const category = params.slug as string

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

  return {
    props: {
      initialPosts,
      settings,
      type: category,
      title: 'categoria',
      filter: `"${category}" == category->slug.current`,
      draftMode: ctx.draftMode || false,
      token: ctx.draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs('category')

  return {
    paths: slugs?.map(({ slug }) => `/${slug}`) || [],
    fallback: 'blocking',
  }
}
