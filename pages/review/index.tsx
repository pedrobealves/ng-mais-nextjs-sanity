'use client'

import { HeadCard } from 'components/HeadCard'
import IndexPageHead from 'components/IndexPageHead'
import { CardList } from 'features/pagination'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import { readToken } from 'lib/sanity.api'
import { getAllReviews, getClient, getSettings } from 'lib/sanity.client'
import { Post } from 'lib/sanity.queries'
import { reviewsIndexQuery, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  settings: Settings
  initialReviews: Post[]
}

interface Query {
  [key: string]: string
}

const POSTS_IN_INDEX_PAGE = 8

export default function Search(props: PageProps) {
  const { settings, initialReviews } = props

  return (
    <>
      <IndexPageHead settings={settings} />
      <Header social={settings.social} level={2} />
      <main className="w-full md:pt-40 pt-32 px-4 mb-14">
        <section className="max-w-col-12 mx-auto">
          <HeadCard title="Análises" />
          <CardList
            posts={initialReviews}
            type="review"
            pageQuery={reviewsIndexQuery}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [initialReviews = [], settings] = await Promise.all([
    getAllReviews(client, 0, POSTS_IN_INDEX_PAGE),
    getSettings(client),
  ])

  return {
    props: {
      initialReviews,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
