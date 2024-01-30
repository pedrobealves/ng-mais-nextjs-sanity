'use client'
import {
  getClientWithToken,
  getPostsAndSettings,
  Page,
  PageProps,
  Query,
} from 'features/post'
import { readToken } from 'lib/sanity.api'
import { GetStaticProps } from 'next'

export default Page

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const type = 'post'

  const client = getClientWithToken(ctx)
  const [initialPosts = [], settings] = await getPostsAndSettings(client, type)

  return {
    props: {
      initialPosts,
      settings,
      type,
      title: 'Artigos',
      filter: '&& tag == null',
      draftMode: ctx.draftMode || false,
      token: ctx.draftMode ? readToken : '',
    },
  }
}
