import { toPlainText } from '@portabletext/react'
import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface IndexPageHeadProps {
  settings: Settings
  text?: string
}

export default function IndexPageHead({ settings, text }: IndexPageHeadProps) {
  const {
    title = demo.title,
    description = demo.description,
    ogImage = {},
  } = settings
  const ogImageTitle = ogImage?.title || demo.ogImageTitle

  return (
    <Head>
      <title>{text ? `${text} | ${title}` : title}</title>
      <BlogMeta />
      <meta
        key="description"
        name="description"
        content={toPlainText(description)}
      />
      <meta
        property="og:image"
        // Because OG images must have a absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment’s URL.
        // More info:
        // https://vercel.com/docs/concepts/projects/environment-variables
        content={`${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: ogImageTitle })}`}
      />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}
      />
      <meta property="og:description" content={toPlainText(description)} />
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta name="twitter:site" content="@newgame_mais" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@newgame_mais" />
      <meta
        name="twitter:imageUrl"
        content={`${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: ogImageTitle })}`}
      />
      <meta
        name="twitter:image"
        content={`${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: ogImageTitle })}`}
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/feed`}
      />
    </Head>
  )
}
