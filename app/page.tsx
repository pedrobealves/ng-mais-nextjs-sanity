import { toPlainText } from '@portabletext/react'
import { CompleteGrid, MinimalGrid, StandardGrid } from 'features/grid'
import { HomeExtraList, HomeHero, HomeTopList } from 'features/home'
import PreviewIndexPage from 'features/preview/components/PreviewIndexPage'
import { Home } from 'layouts/Home'
import { readToken } from 'lib/sanity.api'
import { getClient, getIndexInfo, getSettings } from 'lib/sanity.client'
import { Category, Post, Settings } from 'lib/sanity.queries'
import type { Metadata } from 'next'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  specialPosts: Post[]
  defaultPosts: Post[]
  chronologyPosts: Post[]
  extraPosts: Post[]
  news: Post[]
  reviews: Post[]
  top: Post[]
  settings: Settings
  category: Category[]
}

export default async function Page() {
  const {
    defaultPosts,
    specialPosts,
    chronologyPosts,
    extraPosts,
    reviews,
    news,
    settings,
    draftMode,
    top,
    category,
  } = await getIndex()

  if (draftMode) {
    return (
      <PreviewIndexPage
        specialPosts={specialPosts}
        defaultPosts={defaultPosts}
        chronologyPosts={chronologyPosts}
        extraPosts={extraPosts}
        reviews={reviews}
        news={news}
        settings={settings}
        top={top}
        category={category}
      />
    )
  }

  return (
    <Home
      settings={settings}
      hero={<HomeHero posts={defaultPosts} reviews={reviews} />}
      main={
        <>
          <StandardGrid title="Notícias" news={news} categories={category} />
          <CompleteGrid title="Especiais" news={specialPosts} type="home" />
          <MinimalGrid title="Cronologia" news={chronologyPosts} type="home" />
        </>
      }
      sidebar={
        <>
          <HomeTopList games={top} />
          <HomeExtraList posts={extraPosts} />
        </>
      }
    />
  )
}

async function getIndex(): Promise<PageProps> {
  const client = getClient(
    draftMode().isEnabled ? { token: readToken } : undefined,
  )

  const [
    {
      news = [],
      reviews = [],
      defaultPosts = [],
      specialPosts = [],
      chronologyPosts = [],
      extraPosts = [],
      settings,
      category,
      top,
    },
  ] = await Promise.all([getIndexInfo(client, 0, 6)])

  return {
    specialPosts,
    defaultPosts,
    chronologyPosts,
    extraPosts,
    news,
    reviews,
    settings,
    draftMode: draftMode().isEnabled,
    top,
    category,
    token: draftMode().isEnabled ? readToken : '',
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const isDraftMode = await draftMode().isEnabled

  const client = getClient(isDraftMode ? { token: readToken } : undefined)

  const [{ title, description, social, ogImage }] = await Promise.all([
    getSettings(client),
  ])

  const ogImageTitle = ogImage?.title

  return {
    openGraph: {
      title: title,
      description: toPlainText(description),
      url: process.env.NEXT_PUBLIC_NEXTJS_SITE_URL,
      siteName: title,
      locale: 'pt_BR',
      type: 'website',
      images: [
        {
          url: `${
            process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
          }/api/og?${new URLSearchParams({ title: ogImageTitle })}`, // Must be an absolute URL
        },
      ],
    },
    twitter: {
      site: '@newgame_mais',
      card: 'summary_large_image',
      title: title,
      description: toPlainText(description),
      creator: '@newgame_mais',
      images: [
        `${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: ogImageTitle })}`,
      ],
    },
  }
}
