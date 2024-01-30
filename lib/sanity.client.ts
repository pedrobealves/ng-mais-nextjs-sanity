import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  type Category,
  categoryQuery,
  indexQuery,
  newsAndMoreStoriesQuery,
  newsDropPaginationQuery,
  newsPaginationQuery,
  newsQuery,
  newsSlugsQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsPaginationQuery,
  type Review,
  reviewAndMoreStoriesQuery,
  reviewSlugsQuery,
  reviewsPaginationQuery,
  reviewsQuery,
  type Settings,
  settingsQuery,
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

export async function getAllNews(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(newsQuery)) || []
}

export async function getNewsPagination(
  client: SanityClient,
  pageIndex: number = 0,
  limit: number,
): Promise<Post[]> {
  return (await client.fetch(newsPaginationQuery, { pageIndex, limit })) || []
}

export async function getTop(
  client: SanityClient,
  pageIndex: number = 0,
  limit: number,
): Promise<Review[]> {
  return (await client.fetch(topPaginationQuery, { pageIndex, limit })) || []
}

export async function getFetcher([query, params]) {
  const client = getClient()
  return await client.fetch(query, params)
}

export async function getAllCategory(
  client: SanityClient,
): Promise<Category[]> {
  return (await client.fetch(categoryQuery)) || []
}

export async function getAllReviews(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(reviewsQuery)) || []
}

export async function getReviewsPagination(
  client: SanityClient,
  pageIndex: number = 0,
  limit: number,
): Promise<Post[]> {
  return (
    (await client.fetch(reviewsPaginationQuery, { pageIndex, limit })) || []
  )
}

export async function getNewsDropPagination(
  client: SanityClient,
  pageIndex: number = 0,
  limit: number,
): Promise<Post[]> {
  return (
    (await client.fetch(newsDropPaginationQuery, { pageIndex, limit })) || []
  )
}

export async function getPostsPagination(
  client: SanityClient,
  pageIndex: number = 0,
  limit: number,
): Promise<Post[]> {
  return (
    (await client.fetch(postsPaginationQuery, {
      pageIndex,
      limit,
    })) || []
  )
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getAllNewsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(newsSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getAllReviewSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(reviewSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post }> {
  return await client.fetch(postAndMoreStoriesQuery, { slug })
}

export async function getNewsAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ news: Post }> {
  return await client.fetch(newsAndMoreStoriesQuery, { slug })
}

export async function getReviewsAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ review: Post; reviewDetails: Review }> {
  return await client.fetch(reviewAndMoreStoriesQuery, { slug })
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
  settings: Settings
  category: Category[]
  top: Review[]
}> {
  return await client.fetch(indexQuery, {
    pageIndex,
    limit,
  })
}
