import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  type Category,
  categoryIndexQuery,
  newsAndMoreStoriesQuery,
  newsDropQuery,
  newsIndexQuery,
  newsSlugsQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postIndexQuery,
  postSlugsQuery,
  type Review,
  reviewAndMoreStoriesQuery,
  reviewsIndexQuery,
  reviewSlugsQuery,
  type Settings,
  settingsQuery,
  topIndexQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
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
  return (await client.fetch(newsIndexQuery)) || []
}

export async function getTop(client: SanityClient): Promise<Review[]> {
  return (await client.fetch(topIndexQuery)) || []
}

export async function getFetcher([query, params]) {
  const client = getClient()
  return await client.fetch(query, params)
}

export async function getAllCategory(
  client: SanityClient,
): Promise<Category[]> {
  return (await client.fetch(categoryIndexQuery)) || []
}

export async function getAllReviews(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(reviewsIndexQuery)) || []
}

export async function getAllNewsDrop(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(newsDropQuery)) || []
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
): Promise<{ post: Post; newsDrop: Post[] }> {
  return await client.fetch(postAndMoreStoriesQuery, { slug })
}

export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  const { defaultPosts, specialPosts } =
    (await client.fetch(postIndexQuery)) || []
  return [...defaultPosts, ...specialPosts]
}

export async function getNewsAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ news: Post; newsDrop: Post[] }> {
  return await client.fetch(newsAndMoreStoriesQuery, { slug })
}

export async function getReviewsAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ review: Post; reviewDetails: Review; newsDrop: Post[] }> {
  return await client.fetch(reviewAndMoreStoriesQuery, { slug })
}
