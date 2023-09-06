import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient, groq, type SanityClient } from 'next-sanity'
import { type ParseBody, parseBody } from 'next-sanity/webhook'

export { config } from 'next-sanity/webhook'

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )
    if (isValidSignature === false) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (typeof body._id !== 'string' || !body._id) {
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
  | `/post/${string}`
  | `/news/${string}`
  | `/review/${string}`

async function queryStaleRoutes(
  body: Pick<ParseBody['body'], '_type' | '_id' | 'date' | 'slug'>,
): Promise<StaleRoute[]> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  // Handle possible deletions
  if (body._type === 'post') {
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id })
    if (!exists) {
      let staleRoutes: StaleRoute[] = ['/']
      if ((body.slug as any)?.current) {
        staleRoutes.push(`/post/${(body.slug as any).current}`)
      }
      // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
      const moreStories = await client.fetch(
        groq`count(
          *[_type == "post"] | order(date desc, _updatedAt desc) [0...3] [dateTime(date) > dateTime($date)]
        )`,
        { date: body.date },
      )
      // If there's less than 3 posts with a newer date, we need to revalidate everything
      if (moreStories < 3) {
        return [
          ...new Set([...(await queryAllPostRoutes(client)), ...staleRoutes]),
        ]
      }
      return staleRoutes
    }
  }

  if (body._type === 'news') {
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id })
    if (!exists) {
      let staleRoutes: StaleRoute[] = ['/']
      if ((body.slug as any)?.current) {
        staleRoutes.push(`/news/${(body.slug as any).current}`)
      }
      // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
      const moreStories = await client.fetch(
        groq`count(
          *[_type == "news"] | order(date desc, _updatedAt desc) [0...3] [dateTime(date) > dateTime($date)]
        )`,
        { date: body.date },
      )
      // If there's less than 3 posts with a newer date, we need to revalidate everything
      if (moreStories < 3) {
        return [
          ...new Set([...(await queryAllNewsRoutes(client)), ...staleRoutes]),
        ]
      }
      return staleRoutes
    }
  }

  if (body._type === 'review') {
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id })
    if (!exists) {
      let staleRoutes: StaleRoute[] = ['/']
      if ((body.slug as any)?.current) {
        staleRoutes.push(`/review/${(body.slug as any).current}`)
      }
      // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
      const moreStories = await client.fetch(
        groq`count(
          *[_type == "review"] | order(date desc, _updatedAt desc) [0...3] [dateTime(date) > dateTime($date)]
        )`,
        { date: body.date },
      )
      // If there's less than 3 posts with a newer date, we need to revalidate everything
      if (moreStories < 3) {
        return [
          ...new Set([...(await queryAllReviewRoutes(client)), ...staleRoutes]),
        ]
      }
      return staleRoutes
    }
  }

  switch (body._type) {
    case 'author':
      return await queryStaleAuthorRoutes(client, body._id)
    case 'post':
      return await queryStalePostRoutes(client, body._id)
    case 'news':
      return await queryStaleNewsRoutes(client, body._id)
    case 'review':
      return await queryStaleReviewRoutes(client, body._id)
    case 'settings':
      return await queryAllPostRoutes(client)
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

// Post

async function _queryAllPostRoutes(client: SanityClient): Promise<string[]> {
  return await client.fetch(groq`*[_type == "post"].slug.current`)
}

async function queryAllPostRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const slugs = await _queryAllPostRoutes(client)

  return ['/', ...slugs.map((slug) => `/post/${slug}` as StaleRoute)]
}

async function mergeWithMorePostStories(
  client,
  slugs: string[],
): Promise<string[]> {
  const moreStories = await client.fetch(
    groq`*[_type == "post"] | order(date desc, _updatedAt desc) [0...3].slug.current`,
  )
  if (slugs.some((slug) => moreStories.includes(slug))) {
    const allSlugs = await _queryAllPostRoutes(client)
    return [...new Set([...slugs, ...allSlugs])]
  }

  return slugs
}

async function queryStalePostRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "post" && _id == $id].slug.current`,
    { id },
  )

  slugs = await mergeWithMorePostStories(client, slugs)

  return ['/', ...slugs.map((slug) => `/post/${slug}`)]
}

//Review

async function _queryAllReviewRoutes(client: SanityClient): Promise<string[]> {
  return await client.fetch(groq`*[_type == "review"].slug.current`)
}

async function queryAllReviewRoutes(
  client: SanityClient,
): Promise<StaleRoute[]> {
  const slugs = await _queryAllReviewRoutes(client)

  return ['/', ...slugs.map((slug) => `/review/${slug}` as StaleRoute)]
}

async function mergeWithMoreReviewStories(
  client,
  slugs: string[],
): Promise<string[]> {
  const moreStories = await client.fetch(
    groq`*[_type == "review"] | order(date desc, _updatedAt desc) [0...3].slug.current`,
  )
  if (slugs.some((slug) => moreStories.includes(slug))) {
    const allSlugs = await _queryAllReviewRoutes(client)
    return [...new Set([...slugs, ...allSlugs])]
  }

  return slugs
}

async function queryStaleReviewRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "review" && _id == $id].slug.current`,
    { id },
  )

  slugs = await mergeWithMoreReviewStories(client, slugs)

  return ['/', ...slugs.map((slug) => `/review/${slug}`)]
}

//News

async function _queryAllNewsRoutes(client: SanityClient): Promise<string[]> {
  return await client.fetch(groq`*[_type == "news"].slug.current`)
}

async function queryAllNewsRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const slugs = await _queryAllNewsRoutes(client)

  return ['/', ...slugs.map((slug) => `/news/${slug}` as StaleRoute)]
}

async function mergeWithMoreNewsStories(
  client,
  slugs: string[],
): Promise<string[]> {
  const moreStories = await client.fetch(
    groq`*[_type == "news"] | order(date desc, _updatedAt desc) [0...3].slug.current`,
  )
  if (slugs.some((slug) => moreStories.includes(slug))) {
    const allSlugs = await _queryAllNewsRoutes(client)
    return [...new Set([...slugs, ...allSlugs])]
  }

  return slugs
}

async function queryStaleNewsRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "news" && _id == $id].slug.current`,
    { id },
  )

  slugs = await mergeWithMoreNewsStories(client, slugs)

  return ['/', ...slugs.map((slug) => `/news/${slug}`)]
}

//Author

async function queryStaleAuthorRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let postSlugs = await client.fetch(
    groq`*[_type == "author" && _id == $id] {
    "slug": *[_type == "post" && references(^._id)].slug.current
  }["slug"][]`,
    { id },
  )

  let newsSlugs = await client.fetch(
    groq`*[_type == "author" && _id == $id] {
    "slug": *[_type == "news" && references(^._id)].slug.current
  }["slug"][]`,
    { id },
  )

  let reviewSlugs = await client.fetch(
    groq`*[_type == "author" && _id == $id] {
    "slug": *[_type == "review" && references(^._id)].slug.current
  }["slug"][]`,
    { id },
  )

  if (postSlugs.length > 0) {
    postSlugs = await mergeWithMorePostStories(client, postSlugs)
    return ['/', ...postSlugs.map((slug) => `/post/${slug}`)]
  }

  if (newsSlugs.length > 0) {
    newsSlugs = await mergeWithMoreNewsStories(client, newsSlugs)
    return ['/', ...newsSlugs.map((slug) => `/news/${slug}`)]
  }

  if (reviewSlugs.length > 0) {
    reviewSlugs = await mergeWithMoreReviewStories(client, reviewSlugs)
    return ['/', ...reviewSlugs.map((slug) => `/review/${slug}`)]
  }

  return []
}
