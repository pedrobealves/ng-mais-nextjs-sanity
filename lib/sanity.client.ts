import { is } from 'date-fns/locale'
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
  postsByCategoryPaginationQuery,
  postsByTagPaginationQuery,
  postSlugsQuery,
  postsPaginationFilterQuery,
  postsPaginationQuery,
  postTitleBySlugQuery,
  type Settings,
  settingsQuery,
  topPaginationQuery,
  typeBySlugQuery,
  typeQuery,
  typesQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: preview?.token ? true : false,
      studioUrl,
    },
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
  return (
    (await client.fetch(settingsQuery, {}, { next: { tags: ['settings'] } })) ||
    {}
  )
}

export async function getFetcher([query, params]) {
  const client = getClient()
  return await client.fetch(query, params, { cache: 'no-store' })
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
    case 'top':
      query = topPaginationQuery
      break
    default:
      query = postsPaginationQuery(type)
  }
  return (
    (await client.fetch(
      query,
      {
        pageIndex,
        limit,
      },
      { next: { tags: [`${type}`] } },
    )) || []
  )
}

export async function getPostsPaginationByTypes(
  client: SanityClient,
  types: string[],
  pageIndex: number = 0,
  limit: number,
): Promise<Post[]> {
  return (
    (await client.fetch(
      postsPaginationFilterQuery(`_type in ${JSON.stringify(types)}`),
      {
        pageIndex,
        limit,
      },
      { next: { tags: ['home'] } },
    )) || []
  )
}

export async function getAllPostsSlugs(
  type: string,
): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs =
    (await client.fetch<string[]>(
      postSlugsQuery(type),
      {},
      { next: { tags: [`${type}`] } },
    )) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getTitleBySlugs(
  client: SanityClient,
  slug: string,
): Promise<string> {
  return (
    (await client.fetch(
      postTitleBySlugQuery(),
      { slug },
      { next: { tags: ['home'] } },
    )) || ({} as any)
  )
}

export async function getAllByType<T>(
  client: SanityClient,
  type: string,
): Promise<T[]> {
  return (
    (await client.fetch(typeQuery(type), {}, { next: { tags: ['home'] } })) ||
    []
  )
}

export async function getAllByTypes<T>(
  client: SanityClient,
  types: string[],
): Promise<T[]> {
  return (
    (await client.fetch(typesQuery(types), {}, { next: { tags: ['home'] } })) ||
    []
  )
}

export async function getBySlug<T>(
  client: SanityClient,
  slug: string,
  type: string,
): Promise<T> {
  return (
    (await client.fetch(
      typeBySlugQuery(type),
      { slug },
      { next: { tags: ['home'] } },
    )) || ({} as any)
  )
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
  type: string,
): Promise<{ post: Post }> {
  return await client.fetch(
    postAndMoreStoriesQuery(type),
    { slug },
    { next: { tags: ['home'] } },
  )
}

const isCache = process.env.NODE_ENV === 'production'

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
  return await client.fetch(
    indexQuery,
    {
      pageIndex,
      limit,
    },
    { next: { tags: ['home'] } },
  )
}
