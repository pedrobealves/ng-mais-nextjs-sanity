import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  type Category,
  indexQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postQuery,
  postsByCategoryPaginationQuery,
  postsByTagPaginationQuery,
  postSlugsQuery,
  postsPaginationQuery,
  postTitleBySlugQuery,
  type Settings,
  settingsQuery,
  tagQuery,
  topPaginationQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    encodeSourceMap: preview?.token ? true : false,
    studioUrl,
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export async function getTop(
  client: SanityClient,
  pageIndex: number = 0,
  limit: number,
): Promise<Post[]> {
  return (await client.fetch(topPaginationQuery, { pageIndex, limit })) || []
}

export async function getFetcher([query, params]) {
  const client = getClient()
  return await client.fetch(query, params)
}

export async function getPostsPagination(
  client: SanityClient,
  pageIndex: number = 0,
  limit: number,
  type: string,
  value?: string,
): Promise<Post[]> {
  let query
  switch (type) {
    case 'tag':
      query = postsByTagPaginationQuery(value)
      break
    case 'category':
      query = postsByCategoryPaginationQuery(value)
      break
    default:
      query = postsPaginationQuery(type)
  }
  return (
    (await client.fetch(query, {
      pageIndex,
      limit,
    })) || []
  )
}

export async function getAllPostsSlugs(
  type: string,
): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(postSlugsQuery(type))) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getTitleBySlugs(
  client: SanityClient,
  slug: string,
): Promise<string> {
  return (await client.fetch(postTitleBySlugQuery(), { slug })) || ({} as any)
}

export async function getAllPosts(
  client: SanityClient,
  type: string,
): Promise<Post[]> {
  return (await client.fetch(postQuery(type))) || []
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string,
  type: string,
): Promise<Post> {
  return (await client.fetch(postBySlugQuery(type), { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
  type: string,
): Promise<{ post: Post }> {
  return await client.fetch(postAndMoreStoriesQuery(type), { slug })
}

export async function getIndexInfo(
  client: SanityClient,
  pageIndex: number = 0,
  limit: number,
): Promise<{
  news: Post[]
  reviews: Post[]
  defaultPosts: Post[]
  specialPosts: Post[]
  extraPosts: Post[]
  chronologyPosts: Post[]
  settings: Settings
  category: Category[]
  top: Post[]
}> {
  return await client.fetch(indexQuery, {
    pageIndex,
    limit,
  })
}
