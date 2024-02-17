import type { SharedPageProps } from 'app/layout'
import { readToken } from 'lib/sanity.api'
import {
  getClient,
  getPostsPagination,
  getSettings,
  getTitleBySlugs,
} from 'lib/sanity.client'
import { Post } from 'lib/sanity.queries'
import { Settings } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export interface PageProps extends SharedPageProps {
  settings: Settings
  initialPosts: Post[]
  type: string
  title: string
  filter: string
  sub?: string
}

export interface Query {
  [key: string]: string
}

const POSTS_IN_INDEX_PAGE = 8

// Função para obter o cliente
export function getClientWithToken(ctx: any) {
  const { draftMode = false } = ctx
  return getClient(draftMode ? { token: readToken } : undefined)
}

// Função para obter posts e configurações
export async function getPostsAndSettings(
  client: any,
  type: string,
  params: any,
) {
  return await Promise.all([
    getPostsPagination(client, 0, POSTS_IN_INDEX_PAGE, type, params.slug),
    getSettings(client),
  ])
}

export async function getPost(params, type): Promise<PageProps> {
  const slug = params.slug

  const client = getClientWithToken(readToken)
  const [initialPosts = [], settings] = await getPostsAndSettings(
    client,
    type,
    params,
  )

  if (initialPosts.length === 0) {
    notFound()
  }

  const title = await getTitleBySlugs(client, slug)

  return {
    initialPosts,
    settings,
    type: slug,
    title,
    filter:
      type === 'tag'
        ? `"${slug}" in tag[]->slug.current`
        : `"${slug}" == category->slug.current`,
    draftMode: draftMode().isEnabled || false,
    token: draftMode().isEnabled ? readToken : '',
  }
}
