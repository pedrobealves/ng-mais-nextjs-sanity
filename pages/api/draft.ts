import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
  useCdn,
} from 'lib/sanity.api'
import {
  newsBySlugQuery,
  postBySlugQuery,
  reviewBySlugQuery,
} from 'lib/sanity.queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity'
import { SanityClient } from 'sanity'
import { isValidSecret } from 'sanity-plugin-iframe-pane/is-valid-secret'

function redirectToPreview(
  res: NextApiResponse<string | void>,
  Location: '/' | `/post/${string}` | `/review/${string}` | `/news/${string}`,
): void {
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true })
  // Redirect to a preview capable route
  res.writeHead(307, { Location })
  res.end()
}

const _client = createClient({ projectId, dataset, apiVersion, useCdn })

async function previewNews(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
  client: SanityClient,
) {
  const news = await client.fetch(newsBySlugQuery, {
    slug: req.query.slug,
  })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!news) {
    return res.status(401).send('Invalid slug')
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/news/${news.slug}`)
}

async function previewReview(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
  client: SanityClient,
) {
  const review = await client.fetch(reviewBySlugQuery, {
    slug: req.query.slug,
  })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!review) {
    return res.status(401).send('Invalid slug')
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/review/${review.slug}`)
}

async function previewPost(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
  client: SanityClient,
) {
  const post = await client.fetch(postBySlugQuery, {
    slug: req.query.slug,
  })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).send('Invalid slug')
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/post/${post.slug}`)
}

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse<string | void>,
) {
  // If you want to require preview mode sessions to be started from the Studio, set the SANITY_REQUIRE_PREVIEW_SECRET
  // environment variable to 'true'. The benefit of doing this that unauthorized users attempting to brute force into your
  // preview mode won't make it past the secret check, and only legitimate users are able to bypass the statically generated pages and load up
  // the serverless-powered preview mode.
  if (!req.query.secret) {
    return res.status(401).send('Invalid secret')
  }

  // If a secret is present in the URL, verify it and if valid we upgrade to token based preview mode, which works in Safari and Incognito mode
  const token = process.env.SANITY_API_READ_TOKEN
  if (!token) {
    throw new Error(
      'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
    )
  }
  const client = _client.withConfig({ token })

  // Ensure the actor attempting to start Draft Mode is allowed to do so
  const validSecret = await isValidSecret(
    client,
    previewSecretId,
    Array.isArray(req.query.secret) ? req.query.secret[0] : req.query.secret,
  )
  if (!validSecret) {
    return res.status(401).send('Invalid secret')
  }

  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, '/')
  }

  if (req.query.type == 'post') previewPost(req, res, client)
  if (req.query.type == 'news') previewNews(req, res, client)
  if (req.query.type == 'review') previewReview(req, res, client)
}
