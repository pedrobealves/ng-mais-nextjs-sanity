import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createClient,
  groq,
  type SanityClient,
  type SanityDocument,
} from 'next-sanity'
import { parseBody, type ParsedBody } from 'next-sanity/webhook'

export { config } from 'next-sanity/webhook'

const TYPES = ['post', 'news', 'review']

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )
    if (!isValidSignature) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (typeof body?._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    const staleRoutes = await queryStaleRoutes(body as any)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

type StaleRoute =
  | '/'
  | `/${string}`
  | `/post/${string}`
  | `/news/${string}`
  | `/review/${string}`
  | `/tag/${string}`

async function queryStaleRoutes(
  body: Pick<
    ParsedBody<SanityDocument>['body'],
    '_type' | '_id' | 'date' | 'slug' | 'category' | 'tag'
  >,
): Promise<StaleRoute[]> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  // Handle possible deletions
  if (body._type in TYPES) {
    let type = body._type as (typeof TYPES)[number]
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id })
    if (!exists) {
      let staleRoutes: StaleRoute[] = ['/']
      if ((body.slug as any)?.current) {
        staleRoutes.push(`/${type}/${(body.slug as any).current}`)
      }
      // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
      const moreStories = await client.fetch(
        groq`count(
          *[_type == "${type}"] | order(date desc, _updatedAt desc) [0...3] [dateTime(date) > dateTime($date)]
        )`,
        { date: body.date },
      )
      // If there's less than 3 posts with a newer date, we need to revalidate everything
      if (moreStories < 3) {
        return [
          ...new Set([
            ...(await queryAllPostRoutes(client, type)),
            ...staleRoutes,
          ]),
        ]
      }
      return staleRoutes
    }
  }

  switch (body._type) {
    case 'author':
      return await queryStaleCategoryRoutes(client, body._id, 'author')
    case 'post':
      return await queryStalePostRoutes(client, body._id, 'post')
    case 'news':
      return await queryStalePostRoutes(client, body._id, 'news')
    case 'review':
      return await queryStalePostRoutes(client, body._id, 'review')
    case 'settings':
      return await queryAllRoutes(client, TYPES)
    case 'category':
      return await queryStaleCategoryRoutes(client, body._id, 'category')
    case 'category':
      return await queryStaleCategoryRoutes(client, body._id, 'tag')
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

// Post

async function _queryAllPostRoutes(
  client: SanityClient,
  type: string,
): Promise<string[]> {
  return await client.fetch(groq`*[_type == "${type}"].slug.current`)
}

async function queryAllRoutes(
  client: SanityClient,
  types: string[],
): Promise<StaleRoute[]> {
  let slugs: StaleRoute[] = []

  for (const type of types) {
    const slugsType = await _queryAllPostRoutes(client, type)
    const mappedSlugs = slugsType.map(
      (slug) => `/${type}/${slug}` as StaleRoute,
    )
    slugs = [...slugs, ...mappedSlugs]
  }

  return ['/', '/linktree', '/feed', ...slugs]
}

async function queryAllPostRoutes(
  client: SanityClient,
  type: string,
): Promise<StaleRoute[]> {
  const slugs = await _queryAllPostRoutes(client, type)

  return [
    '/',
    '/feed',
    ...slugs.map((slug) => `/${type}/${slug}` as StaleRoute),
  ]
}

async function mergeWithMorePostStories(
  client,
  slugs: string[],
  type: string,
): Promise<string[]> {
  const moreStories = await client.fetch(
    groq`*[_type == "${type}"] | order(date desc, _updatedAt desc) [0...3].slug.current`,
  )
  if (slugs.some((slug) => moreStories.includes(slug))) {
    const allSlugs = await _queryAllPostRoutes(client, type)
    return [...new Set([...slugs, ...allSlugs])]
  }

  return slugs
}

async function queryStalePostRoutes(
  client: SanityClient,
  id: string,
  type: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "${type}" && _id == $id].slug.current`,
    { id },
  )

  let category = await client.fetch(
    groq`
  *[_type == "${type}" && _id == $id] {
    category->{
      "slug": slug.current
    }
}[0]["category"]
`,
    { id },
  )

  let tagSlugs = await client.fetch(
    groq`
  *[_type == "${type}" && _id == $id] {
    tag[]->{
      "slug": slug.current
    }
  }[0]["tag"]
`,
    { id },
  )

  if (slugs.length > 0) {
    slugs = await mergeWithMorePostStories(client, slugs, type)

    return [
      '/',
      ...(category ? [`/${category.slug}`] : []),
      ...slugs.map((slug) => `/${type}/${slug}`),
      ...(tagSlugs ? tagSlugs.map((tag) => `/tag/${tag.slug}`) : []),
    ]
  }

  return []
}

function getSlugsByType(
  client: SanityClient,
  id: string,
  category: string,
  type: string,
): Promise<string[]> {
  return client.fetch(
    groq`*[_type == "${category}" && _id == $id] {
    "slug": *[_type == "${type}" && references(^._id)].slug.current
  }["slug"][]`,
    { id },
  )
}

//Author

async function queryStaleCategoryRoutes(
  client: SanityClient,
  id: string,
  category: string,
): Promise<StaleRoute[]> {
  let slugsRoute = []

  for (let type of TYPES) {
    let slugs = await getSlugsByType(client, id, category, type)

    if (slugs.length > 0) {
      slugs = await mergeWithMorePostStories(client, slugs, type)
      slugsRoute.push(...slugs.map((slug) => `/${type}/${slug}`))
    }
  }

  return ['/', ...slugsRoute]
}
